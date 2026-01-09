/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import {
  PlusCircle,
  LogOut,
  ArrowLeft,
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Image as ImageIcon,
  Loader2,
  XCircle,
  UploadCloud,
  Trash2,
  Mail,
  AlertCircle,
} from "lucide-react";
import { useFirebase } from "../../components/FirebaseProvider";
import Button from "../../components/Button";
import Card from "../../components/Card";
import EditorToolbar from "../../components/EditorToolbar";
import BlogCard from "../../components/BlogCard";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import EmptyState from "../../components/EmptyState";

function TaxBlogApp() {
  const { db, auth } = useFirebase();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [view, setView] = useState("home");
  const [formLoading, setFormLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editorRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "npwp",
    imageUrl: "",
    tags: [], // This will store the URL after upload
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth State Changed:", currentUser);
      if (currentUser) {
        // Guard Rule 3: Auth Before Queries
        // Menggunakan userId (UID) sebagai document ID di koleksi users (Public path agar bisa dicek)
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef); // Check if user document exists
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            createdAt: serverTimestamp(),
            role: "user",
          });
        }
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false); // Set loading to false after auth state is determined
    });
    return () => unsubscribe();
  }, [db, auth]);

  useEffect(() => {
    if (!user) return;
    // Rule 1: Strict Paths
    const blogsRef = collection(db, "blogs");
    const unsubscribe = onSnapshot(
      blogsRef,
      (snapshot) => {
        const blogsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as any[];
        // Rule 2: In-memory sort
        const sorted = blogsData.sort(
          (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
        );
        setBlogs(sorted);
      },
      (err) => console.error("Firestore Error:", err),
    );
    return () => unsubscribe();
  }, [user, db]);

  useEffect(() => {
    if (view === "home") {
      setPreviewMode(false);
    }
  }, [view]);

  const handleEditorInput = () => {
    if (!editorRef.current) return;

    setFormData((prev) => ({
      ...prev,
      content: editorRef.current!.innerHTML,
    }));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setFormLoading(true);
    setLoginError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Login successful, search result.user.uid in Firestore users collection if exists setUser
      if (result.user) {
        const userRef = doc(db, "users", result.user.uid);
        const userSnap = await getDoc(userRef); // Check if user document exists
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: result.user.uid,
            email: result.user.email,
            createdAt: serverTimestamp(),
            role: "user",
          });
        }
        setUser(result.user);
      }
    } catch (error: any) {
      console.error("Login Error:", error.message);
      setLoginError("Email atau kata sandi salah. Silakan coba lagi.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleAddBlog = async (e: any) => {
    e.preventDefault();
    if (!user) {
      // User not authenticated, prevent adding blog
      return;
    }
    setFormLoading(true);
    try {
      const blogData = {
        ...formData,
        content: editorRef.current?.innerHTML || formData.content,
        authorId: user.uid,
        slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
        likes: [],
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "blogs"), blogData);
      setFormData({
        title: "",
        content: "",
        category: "npwp",
        imageUrl: "", // This will store the URL after upload
        tags: [],
      });
      setView("home");
      setPreviewMode(false);
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleLike = async (blogId: string, currentLikes: string[] = []) => {
    if (!user) return;
    const blogRef = doc(db, "blogs", blogId);
    const isLiked = currentLikes.includes(user.uid);
    try {
      await updateDoc(blogRef, {
        likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploadingImage(true);
    setUploadProgress(0);
    setUploadError("");

    const storage = getStorage();

    // 🔥 penting: sanitize appId (tidak boleh ada :)
    const rawAppId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID!;
    const safeAppId = rawAppId.replace(/:/g, "_");

    const storageRef = ref(
      storage,
      `artifacts/${safeAppId}/public/images/${user.uid}/${Date.now()}_${file.name}`,
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploadError("Upload gagal. Periksa koneksi atau izin.");
        setUploadingImage(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData((prev) => ({ ...prev, imageUrl: downloadURL }));
        setUploadingImage(false);
      },
    );
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file input
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <div className="w-12 h-12 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/40 rounded-full blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="p-8 md:p-10 shadow-2xl border-none">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="bg-[#064e3b] p-4 rounded-2xl text-white mb-6 shadow-xl shadow-emerald-900/20">
                <Image
                  src="/images/logo-white.png"
                  alt="Koe Legali Indonesia"
                  title="Koe Legali Indonesia"
                  width={60}
                  height={60}
                />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 font-digitale uppercase tracking-tight">
                Koe Login
              </h1>
              <p className="text-slate-500 text-sm">
                Masuk untuk mengelola dokumentasi legalitas bisnis Anda.
              </p>
            </div>

            <AnimatePresence>
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs flex items-center gap-2"
                >
                  <AlertCircle size={14} /> {loginError}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-3 text-slate-400"
                    size={16}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full text-black pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="user@taxdocs.com"
                    disabled={formLoading}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-3 text-slate-400"
                    size={16}
                  />
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-black pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="••••••••"
                    disabled={formLoading}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full py-3"
                loading={formLoading}
              >
                Masuk Ke Dashboard
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-emerald-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-digitale { font-family: 'Inter', sans-serif; font-weight: 800; letter-spacing: -0.02em; }
        .rich-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .rich-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .rich-content p { margin-bottom: 0.75rem; }
      `}</style>

      <nav className="sticky top-0 z-50 bg-white border-b border-emerald-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#064e3b] p-2 rounded-lg text-white">
              <ShieldCheck size={20} />
            </div>
            <h1 className="text-lg font-bold text-[#064e3b] font-digitale uppercase tracking-wider">
              Koe Legali Indonesia
            </h1>
          </div>
          <Button
            variant="ghost"
            className="text-sm py-1.5"
            onClick={() => signOut(auth)}
          >
            <LogOut size={16} /> Keluar
          </Button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {view === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Dashboard Publikasi
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Update informasi legalitas NPWP, NIB, & Halal.
                  </p>
                </div>
                <Button onClick={() => setView("add")}>
                  <PlusCircle size={18} /> Buat Blog Baru
                </Button>
              </header>

              {blogs.length === 0 ? (
                <EmptyState onAdd={() => setView("add")} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogs.map((blog, idx) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      index={idx}
                      userId={user.uid}
                      onLike={() => handleLike(blog.id, blog.likes)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="add"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <header className="mb-6 flex justify-between items-end">
                <div>
                  <button
                    onClick={() => setView("home")}
                    className="flex items-center gap-2 text-emerald-700 font-semibold text-sm mb-2"
                  >
                    <ArrowLeft size={16} /> Kembali
                  </button>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Editor Dokumen Blog
                  </h2>
                </div>
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${previewMode ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}
                >
                  {previewMode ? <EyeOff size={16} /> : <Eye size={16} />}{" "}
                  {previewMode ? "Sembunyikan Preview" : "Preview"}
                </button>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card className="p-6">
                  <form onSubmit={handleAddBlog} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">
                          Judul
                        </label>
                        <input
                          name="title"
                          required
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Judul dokumen..."
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">
                          Jenis Produk
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="npwp">NPWP</option>
                          <option value="nib">NIB</option>
                          <option value="halal">Sertifikat Halal</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                        <ImageIcon size={14} /> Gambar Header
                      </label>
                      {formData.imageUrl ? (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-200 group">
                          <Image
                            src={formData.imageUrl}
                            alt="Header Preview"
                            objectFit="cover"
                            width={600}
                            height={200}
                            className="transition-transform duration-300 group-hover:scale-105"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition-colors z-10"
                            title="Remove image"
                          >
                            <Trash2 size={16} />
                          </button>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                      ) : (
                        <div
                          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors
                            ${uploadError ? "border-red-400" : "border-slate-300"}`}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {uploadingImage ? (
                            <div className="flex flex-col items-center">
                              <Loader2
                                className="animate-spin text-emerald-500"
                                size={24}
                              />
                              <p className="mt-2 text-sm text-slate-600">
                                Mengunggah: {Math.round(uploadProgress)}%
                              </p>
                              <div className="w-24 h-1 bg-emerald-200 rounded-full mt-1">
                                <div
                                  className="h-full bg-emerald-500 rounded-full"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <UploadCloud
                                className="text-slate-400"
                                size={28}
                              />
                              <p className="mt-2 text-sm text-slate-600">
                                <span className="font-semibold text-emerald-600">
                                  Klik untuk mengunggah
                                </span>{" "}
                                atau seret & lepas
                              </p>
                              <p className="text-xs text-slate-500">
                                PNG, JPG, GIF (MAX. 5MB)
                              </p>
                            </>
                          )}
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleImageUpload}
                            accept="image/*"
                            disabled={uploadingImage || formLoading}
                          />
                        </div>
                      )}
                      {uploadError && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <XCircle size={14} /> {uploadError}
                        </p>
                      )}
                    </div>

                    {/* Tags Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">
                        Tags (Pisahkan dengan koma)
                      </label>
                      <input
                        name="tags"
                        type="text"
                        value={formData.tags.join(", ")}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tags: e.target.value
                              .split(",")
                              .map((tag: string) => tag.trim())
                              .filter(
                                (tag: string) => tag.length > 0,
                              ) as never[],
                          }))
                        }
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="misal: pajak, npwp, bisnis"
                      />
                    </div>

                    {/* Rich Text Editor for Content */}

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">
                        Tags
                      </label>
                      <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
                        <EditorToolbar onCommand={handleEditorInput} />
                        <div
                          ref={editorRef}
                          contentEditable
                          onInput={handleEditorInput}
                          onBlur={() =>
                            setFormData((prev) => ({
                              ...prev,
                              content: editorRef.current?.innerHTML || "",
                            }))
                          }
                          className="min-h-[300px] p-4 outline-none bg-white rich-content text-slate-700 empty:before:content-['Mulai_menulis_konten_di_sini...'] empty:before:text-slate-400"
                          data-placeholder="Mulai menulis konten di sini..."
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={formLoading}
                      loading={formLoading}
                    >
                      Publish
                    </Button>
                  </form>
                </Card>

                <div className={`${previewMode ? "block" : "hidden lg:block"}`}>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Pratinjau Hasil Akhir
                  </h3>
                  <div className="opacity-90 scale-95 origin-top">
                    <BlogCard
                      blog={{
                        ...formData,
                        likes: [],
                        createdAt: { seconds: Date.now() / 1000 },
                      }}
                      index={0}
                      userId=""
                      onLike={() => {}}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default TaxBlogApp;

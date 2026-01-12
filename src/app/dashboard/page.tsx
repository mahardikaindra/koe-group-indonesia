"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  PlusCircle,
  ArrowLeft,
  Eye,
  ImageIcon,
  Trash2,
  UploadCloud,
  Loader2,
  XCircle,
  Heart,
  Calendar,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  List as ListIcon,
  Type,
  Link2,
  Heading1,
  Heading2,
  Undo,
  Redo,
  CheckCircle2,
  Sparkles,
  Zap,
  Info,
  Clock,
  FileText,
  ExternalLink,
  Edit3,
} from "lucide-react";

import {
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  query,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useFirebase } from "@/src/components/FirebaseProvider";

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-3xl border border-slate-100 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const Button = ({
  children,
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  className = "",
  variant = "primary",
}: any) => {
  const baseStyles =
    "flex items-center justify-center gap-2 rounded-xl transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 font-medium px-4 py-2.5";
  const variants: any = {
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-900/10",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-50",
    outline:
      "bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    ai: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-900/10",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : children}
    </button>
  );
};

// --- Custom Editor ---
const CustomKoeEditor = ({
  value,
  onChange,
  editorRef,
}: {
  value: string;
  onChange: (val: string) => void;
  editorRef: React.RefObject<HTMLDivElement | null>;
}) => {
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value, editorRef]);

  const exec = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const addLink = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const url = window.prompt("Masukkan URL Link:");
    if (url) {
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("createLink", false, url);
      if (editorRef.current) onChange(editorRef.current.innerHTML);
    }
  };

  const btnClass =
    "p-2 rounded-lg hover:bg-white text-slate-600 transition-colors hover:text-emerald-600";

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 bg-white transition-all shadow-sm">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("bold");
          }}
          className={btnClass}
          title="Bold"
        >
          <BoldIcon size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("italic");
          }}
          className={btnClass}
          title="Italic"
        >
          <ItalicIcon size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("insertUnorderedList");
          }}
          className={btnClass}
          title="List"
        >
          <ListIcon size={18} />
        </button>
        <div className="w-px h-4 bg-slate-300 mx-1" />
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("formatBlock", "H1");
          }}
          className={btnClass}
          title="H1"
        >
          <Heading1 size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("formatBlock", "H2");
          }}
          className={btnClass}
          title="H2"
        >
          <Heading2 size={18} />
        </button>
        <div className="w-px h-4 bg-slate-300 mx-1" />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addLink();
          }}
          className={btnClass}
          title="Add Link"
        >
          <Link2 size={18} />
        </button>
        <div className="flex-1" />
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("undo");
          }}
          className={btnClass}
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("redo");
          }}
          className={btnClass}
          title="Redo"
        >
          <Redo size={18} />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        className="ProseMirror min-h-[350px] p-8 outline-none text-slate-700 empty:before:content-['Mulai_menulis_konten_publikasi_Anda...'] empty:before:text-slate-300"
      />
    </div>
  );
};

const BlogCard = ({ blog, userId, onLike, onEdit, onView, onDelete }: any) => {
  const isLiked = blog.likes?.includes(userId);
  const date = blog.createdAt?.seconds
    ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Baru saja";
  const summedContent = blog.content
    ? blog.content.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
    : "Tidak ada ringkasan";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 border-transparent hover:border-emerald-100">
        <div className="relative h-48 overflow-hidden bg-slate-100">
          {blog.imageUrl ? (
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={600}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <ImageIcon size={48} />
            </div>
          )}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              {blog.category}
            </span>
          </div>
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="bg-white text-slate-600 p-2 rounded-full hover:bg-emerald-600 hover:text-white shadow-lg transition-all"
              title="Edit Artikel"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="bg-white text-red-500 p-2 rounded-full hover:bg-red-600 hover:text-white shadow-lg transition-all"
              title="Hapus Artikel"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
            {blog.title || "Tanpa Judul"}
          </h3>
          <div
            className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1 rich-content"
            dangerouslySetInnerHTML={{ __html: summedContent }}
          />

          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <div className="flex items-center gap-4">
              <button
                onClick={onLike}
                className={`flex items-center gap-1.5 transition-colors ${isLiked ? "text-red-500" : "text-slate-400 hover:text-red-400"}`}
              >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                <span className="text-xs font-bold">
                  {blog.likes?.length || 0}
                </span>
              </button>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Calendar size={12} /> {date}
              </div>
            </div>

            <button
              onClick={onView}
              className="text-emerald-600 hover:text-emerald-700 font-bold text-xs flex items-center gap-1 group/btn"
            >
              Lihat Detail{" "}
              <ExternalLink
                size={12}
                className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// --- Main DashboardPage ---

export default function DashboardPage() {
  const { db, auth, storage } = useFirebase();
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID!.replace(/:/g, "_");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"home" | "add">("home");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "npwp",
    imageUrl: "",
    content: "",
    focusKeyword: "",
    metaDescription: "",
    backlinkUrl: "",
    backlinkText: "",
    isFeatured: false,
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // --- Real-time SEO Analysis Logic ---
  const seoAnalysis = useMemo(() => {
    const textOnly = formData.content.replace(/<[^>]*>/g, "");
    const words = textOnly
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    const wordCount = words.length;
    const readingTime = Math.ceil(wordCount / 200);

    const keyword = formData.focusKeyword.toLowerCase();
    const titleLower = formData.title.toLowerCase();

    const checks = [
      {
        id: "title-len",
        label: "Panjang Judul (30-60 karakter)",
        pass: formData.title.length >= 30 && formData.title.length <= 60,
      },
      {
        id: "kw-title",
        label: "Keyword di Judul",
        pass: keyword && titleLower.includes(keyword),
      },
      {
        id: "meta-len",
        label: "Meta Description (120-160 karakter)",
        pass:
          formData.metaDescription.length >= 120 &&
          formData.metaDescription.length <= 160,
      },
      { id: "word-count", label: "Minimal 300 Kata", pass: wordCount >= 300 },
      {
        id: "link",
        label: "Tautan Eksternal/Backlink",
        pass: formData.backlinkUrl.startsWith("http"),
      },
      {
        id: "img",
        label: "Gambar Header Terpasang",
        pass: formData.imageUrl !== "",
      },
    ];

    const score = Math.round(
      (checks.filter((c) => c.pass).length / checks.length) * 100,
    );

    return { wordCount, readingTime, checks, score };
  }, [formData]);

  // --- Functions ---

  const handleEditInit = (blog: any) => {
    setFormData({
      title: blog.title,
      category: blog.category,
      imageUrl: blog.imageUrl,
      content: blog.content,
      focusKeyword: blog.focusKeyword || "",
      metaDescription: blog.metaDescription || "",
      backlinkUrl: blog.backlinkUrl || "",
      backlinkText: blog.backlinkText || "",
      isFeatured: blog.isFeatured || false,
    });
    setEditingId(blog.id);
    setView("add");
  };

  const handleViewDetail = (blog: any) => {
    setFormData({
      title: blog.title,
      category: blog.category,
      imageUrl: blog.imageUrl,
      content: blog.content,
      focusKeyword: blog.focusKeyword || "",
      metaDescription: blog.metaDescription || "",
      backlinkUrl: blog.backlinkUrl || "",
      backlinkText: blog.backlinkText || "",
      isFeatured: blog.isFeatured || false,
    });
    setPreviewMode(true);
  };

  const handleDelete = async (blogId: string) => {
    if (
      !window.confirm(
        "Apakah Anda yakin ingin menghapus artikel ini secara permanen?",
      )
    )
      return;
    try {
      await deleteDoc(
        doc(db, "artifacts", appId, "public", "data", "articles", blogId),
      );
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const generateAiSeo = async () => {
    if (!formData.title || !formData.content) {
      alert(
        "Harap isi judul dan konten terlebih dahulu agar AI dapat menganalisis.",
      );
      return;
    }

    setAiGenerating(true);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_STUDIO!;
    const textOnly = formData.content.replace(/<[^>]*>/g, "");
    const prompt = `Analisis konten blog berikut dan buatkan optimasi SEO:
    Judul: ${formData.title}
    Konten: ${textOnly.substring(0, 1000)}...
    
    Berikan respon dalam JSON format dengan key: 
    "metaDescription" (maks 160 karakter), 
    "suggestedKeyword" (kata kunci utama yang relevan),
    "suggestedSlug" (url slug yang SEO friendly, lowercase dash separated).
    Gunakan bahasa Indonesia yang profesional.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        },
      );

      const data = await response.json();
      const aiResults = JSON.parse(
        data.candidates?.[0]?.content?.parts?.[0]?.text || "{}",
      );

      setFormData((prev) => ({
        ...prev,
        metaDescription: aiResults.metaDescription || prev.metaDescription,
        focusKeyword: aiResults.suggestedKeyword || prev.focusKeyword,
      }));
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setAiGenerating(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (!user) return;
    const blogsQuery = query(collection(db, "articles"));
    const unsubscribe = onSnapshot(blogsQuery, (snapshot) => {
      const blogList = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort(
          (a: any, b: any) =>
            (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
        );
      setBlogs(blogList);
    });
    return () => unsubscribe();
  }, [db, user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingImage(true);
    const safeAppId = appId.replace(/:/g, "_");
    const storageRef = ref(
      storage,
      `artifacts/${safeAppId}/public/images/${user.uid}/${Date.now()}_${file.name}`,
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (s) => setUploadProgress((s.bytesTransferred / s.totalBytes) * 100),
      (e) => {
        setUploadingImage(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData((prev) => ({ ...prev, imageUrl: url }));
        setUploadingImage(false);
      },
    );
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setFormLoading(true);
    try {
      const blogData = {
        ...formData,
        authorId: user.uid,
        slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
        createdAt: editingId
          ? blogs.find((b) => b.id === editingId)?.createdAt ||
            serverTimestamp()
          : serverTimestamp(),
        updatedAt: serverTimestamp(),
        seoScore: seoAnalysis.score,
        isFeatured: formData.isFeatured || false,
      };

      if (editingId) {
        await updateDoc(
          doc(db, "articles", editingId),
          blogData,
        );
      } else {
        await addDoc(
          collection(db, "articles"),
          {
            ...blogData,
            likes: [],
          },
        );
      }

      setFormData({
        title: "",
        content: "",
        category: "npwp",
        imageUrl: "",
        focusKeyword: "",
        metaDescription: "",
        backlinkUrl: "",
        backlinkText: "",
        isFeatured: false,
      });
      if (editorRef.current) editorRef.current.innerHTML = "";
      setEditingId(null);
      setView("home");
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleLike = async (blogId: string, currentLikes: string[] = []) => {
    if (!user) return;
    const isLiked = currentLikes.includes(user.uid);
    const blogRef = doc(
      db, "articles",
      blogId,
    );
    try {
      await updateDoc(blogRef, {
        likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-emerald-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; letter-spacing: -0.02em; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-30px); } }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .bg-grid { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px); }
        .ProseMirror h1 { font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; color: #0f172a; }
        .ProseMirror h2 { font-size: 1.75rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: #1e293b; }
        .ProseMirror p { margin-bottom: 1.5rem; line-height: 1.8; color: #334155; font-size: 1.125rem; }
        .ProseMirror ul { list-style-type: disc; padding-left: 2rem; margin-bottom: 1.5rem; }
        .ProseMirror a { color: #059669; text-decoration: underline; font-weight: 600; cursor: pointer; }
        .rich-content a { color: #059669; text-decoration: underline; }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#064e3b] p-2.5 rounded-xl text-white shadow-lg shadow-emerald-900/20">
              <Image
                src={"/images/logo-white.png"}
                alt="Pajak!Koe Logo"
                width={100}
                height={100}
                className="w-8 h-8"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#064e3b] uppercase tracking-tighter">
                Koe Legali Indonesia
              </h1>
              <p className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase">
                Content Management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden md:flex flex-col items-end">
              <p className="text-xs font-bold text-slate-900">{user?.email}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Administrator
              </p>
            </div>
            <Button
              variant="danger"
              className="py-2 text-xs px-5 rounded-full"
              onClick={() => signOut(auth)}
            >
              <LogOut size={16} /> Keluar
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {view === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                    Ringkasan Publikasi
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Kelola edukasi legalitas bisnis di Koe Legali Indonesia.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      title: "",
                      content: "",
                      category: "npwp",
                      imageUrl: "",
                      focusKeyword: "",
                      metaDescription: "",
                      backlinkUrl: "",
                      backlinkText: "",
                      isFeatured: false,
                    });
                    setView("add");
                  }}
                  className="px-8 py-4 shadow-2xl shadow-emerald-900/20 rounded-2xl transform transition-hover hover:scale-105"
                >
                  <PlusCircle size={22} /> Buat Publikasi Baru
                </Button>
              </header>

              {blogs.length === 0 ? (
                <Card className="p-24 text-center border-dashed border-2 border-slate-200 bg-slate-50/50">
                  <ImageIcon
                    className="mx-auto text-slate-300 mb-6"
                    size={64}
                  />
                  <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">
                    Belum ada konten publikasi
                  </h3>
                  <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                    Mulai bangun brand authority Anda hari ini melalui konten
                    edukasi yang berkualitas.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setView("add")}
                    className="rounded-full"
                  >
                    Klik untuk Mulai Menulis
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      userId={user?.uid}
                      onLike={() => handleLike(blog.id, blog.likes)}
                      onEdit={() => handleEditInit(blog)}
                      onView={() => handleEditInit(blog)}
                      onDelete={() => handleDelete(blog.id)}
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
              exit={{ opacity: 0, x: -20 }}
            >
              <header className="mb-10 flex justify-between items-end">
                <div>
                  <button
                    onClick={() => {
                      setView("home");
                      setEditingId(null);
                    }}
                    className="text-emerald-600 font-bold text-sm mb-3 flex items-center gap-2 hover:-translate-x-1 transition-transform"
                  >
                    <ArrowLeft size={18} /> Kembali ke Dashboard
                  </button>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                    {editingId ? "Edit Artikel" : "Koe Writing Hub"}
                  </h2>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setPreviewMode(!previewMode)}
                    className="px-6 py-2.5 rounded-2xl bg-white"
                  >
                    {previewMode ? <Type size={18} /> : <Eye size={18} />}
                    {previewMode ? "Mode Edit" : "Live Preview"}
                  </Button>
                </div>
              </header>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                <div className="xl:col-span-2 space-y-8">
                  <Card className="p-8 shadow-2xl border-none ring-1 ring-slate-100">
                    <form onSubmit={handleSaveBlog} className="space-y-8">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                            <Zap size={16} /> Informasi Utama
                          </h4>
                          <div className="flex gap-3 text-xs text-slate-400 font-bold">
                            <span className="flex items-center gap-1">
                              <FileText size={14} /> {seoAnalysis.wordCount}{" "}
                              Kata
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} /> {seoAnalysis.readingTime}{" "}
                              Menit Baca
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2 space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                              Judul Artikel
                            </label>
                            <input
                              name="title"
                              required
                              value={formData.title}
                              onChange={handleInputChange}
                              className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-lg font-bold"
                              placeholder="Tulis judul menarik..."
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                              Kategori
                            </label>
                            <select
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold"
                            >
                              <option value="npwp">NPWP</option>
                              <option value="nib">NIB</option>
                              <option value="halal">Halal</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-6 border-t border-slate-50">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                            <BoldIcon size={14} /> Editor Konten
                          </h4>
                          <span className="text-[10px] text-slate-400 italic">
                            Formatting otomatis dibersihkan untuk SEO
                          </span>
                        </div>
                        <CustomKoeEditor
                          value={formData.content}
                          onChange={(val) =>
                            setFormData((p) => ({ ...p, content: val }))
                          }
                          editorRef={editorRef}
                        />
                      </div>

                      <div className="space-y-6 pt-8 border-t border-slate-50 bg-slate-50/30 -mx-8 px-8 py-1 rounded-b-3xl">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                            <Sparkles size={16} /> AI SEO Assistant
                          </h4>
                          <Button
                            variant="ai"
                            onClick={generateAiSeo}
                            loading={aiGenerating}
                            disabled={aiGenerating}
                            className="py-2 text-xs rounded-full"
                          >
                            <Zap size={14} /> Optimalkan via AI
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                              Fokus Keyword Utama
                            </label>
                            <input
                              name="focusKeyword"
                              value={formData.focusKeyword}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                              placeholder="Target kata kunci Google..."
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                              Backlink Sumber
                            </label>
                            <input
                              name="backlinkUrl"
                              value={formData.backlinkUrl}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex justify-between">
                            <span>Meta Description</span>
                            <span
                              className={
                                formData.metaDescription.length > 160
                                  ? "text-red-500"
                                  : "text-slate-400"
                              }
                            >
                              {formData.metaDescription.length}/160
                            </span>
                          </label>
                          <textarea
                            name="metaDescription"
                            value={formData.metaDescription}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-sm leading-relaxed"
                            placeholder="Deskripsi pendek untuk hasil pencarian Google..."
                            maxLength={200}
                          />
                        </div>
                      </div>

                      {/* Add radio buttons for publish status is featured ? */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                          Status Publikasi
                        </label>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="isFeatured"
                              value="true"
                              checked={formData.isFeatured === true}
                              onChange={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  isFeatured: true,
                                }))
                              }
                              className="form-radio h-4 w-4 text-emerald-600 transition duration-150 ease-in-out"
                            />
                            <span className="ml-2 text-sm text-slate-700 font-medium">
                              Tampilkan di Halaman Utama
                            </span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="isFeatured"
                              value="false"
                              checked={formData.isFeatured === false}
                              onChange={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  isFeatured: false,
                                }))
                              }
                              className="form-radio h-4 w-4 text-slate-400 transition duration-150 ease-in-out"
                            />
                            <span className="ml-2 text-sm text-slate-700 font-medium">
                              Hanya Publikasi Biasa
                            </span>
                          </label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full py-5 text-xl font-black shadow-2xl shadow-emerald-900/20 active:scale-95 rounded-2xl"
                        loading={formLoading}
                      >
                        {editingId
                          ? "Simpan Perubahan"
                          : "Tayangkan Publikasi Sekarang"}
                      </Button>
                    </form>
                  </Card>
                </div>

                <div className="space-y-8 sticky top-28">
                  <Card className="p-8 text-center shadow-xl border-none ring-1 ring-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                      SEO Health Score
                    </h4>
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="58"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-slate-100"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="58"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={364}
                          strokeDashoffset={
                            364 - (364 * seoAnalysis.score) / 100
                          }
                          className={`transition-all duration-1000 ${seoAnalysis.score > 80 ? "text-emerald-500" : seoAnalysis.score > 50 ? "text-amber-500" : "text-red-500"}`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-black text-slate-800">
                          {seoAnalysis.score}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-slate-500 px-4 leading-relaxed">
                      {seoAnalysis.score === 100
                        ? "Konten Anda sudah sangat optimal!"
                        : "Lengkapi checklist untuk skor maksimal."}
                    </p>
                  </Card>

                  <Card className="p-6 shadow-xl border-none ring-1 ring-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ImageIcon size={14} /> Gambar Header
                    </h4>
                    {formData.imageUrl ? (
                      <div className="relative h-40 rounded-2xl overflow-hidden group">
                        <Image
                          src={formData.imageUrl}
                          alt="Header Preview"
                          width={600}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((p) => ({ ...p, imageUrl: "" }))
                          }
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold"
                        >
                          <Trash2 size={24} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="h-40 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 cursor-pointer transition-all"
                      >
                        {uploadingImage ? (
                          <Loader2 className="animate-spin text-emerald-500" />
                        ) : (
                          <>
                            <UploadCloud
                              className="text-slate-300 mb-2"
                              size={32}
                            />
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                              Upload Thumbnail
                            </p>
                          </>
                        )}
                        <input
                          type="file"
                          ref={fileInputRef}
                          hidden
                          onChange={handleImageUpload}
                          accept="image/*"
                        />
                      </div>
                    )}
                  </Card>

                  <Card className="p-8 shadow-xl border-none ring-1 ring-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                      Writing Checklist
                    </h4>
                    <ul className="space-y-4">
                      {seoAnalysis.checks.map((check) => (
                        <li key={check.id} className="flex items-start gap-4">
                          <div
                            className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${check.pass ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-300"}`}
                          >
                            {check.pass ? (
                              <CheckCircle2 size={12} />
                            ) : (
                              <Info size={10} />
                            )}
                          </div>
                          <span
                            className={`text-sm font-medium ${check.pass ? "text-slate-700" : "text-slate-400 italic"}`}
                          >
                            {check.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </div>

              <AnimatePresence>
                {previewMode && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                  >
                    <motion.div
                      initial={{ scale: 0.95, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      className="bg-white w-full max-w-4xl h-full rounded-[40px] overflow-hidden flex flex-col shadow-2xl"
                    >
                      <div className="p-6 border-b flex justify-between items-center bg-white/80">
                        <h2 className="font-black uppercase tracking-tight text-slate-800">
                          Detail Artikel
                        </h2>
                        <button
                          onClick={() => setPreviewMode(false)}
                          className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                        >
                          <XCircle size={24} />
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto p-10 md:p-20 bg-white">
                        <div className="max-w-3xl mx-auto">
                          <div className="flex items-center gap-3 mb-8">
                            <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                              {formData.category}
                            </span>
                            <span className="text-slate-400 text-xs font-medium italic">
                              Legalitas Terverifikasi
                            </span>
                          </div>
                          <h1 className="text-5xl font-black text-slate-900 leading-tight mb-10">
                            {formData.title || "Judul Belum Diisi"}
                          </h1>
                          {formData.imageUrl && (
                            <Image
                              alt="imageUrl"
                              src={formData.imageUrl}
                              width={600}
                              height={300}
                              className="w-full aspect-video object-cover rounded-[32px] mb-12 shadow-2xl shadow-slate-200"
                            />
                          )}
                          <div
                            className="rich-content text-xl text-slate-700 leading-relaxed ProseMirror"
                            dangerouslySetInnerHTML={{
                              __html:
                                formData.content ||
                                "<p className='italic text-slate-400'>Konten artikel kosong...</p>",
                            }}
                          />

                          {formData.backlinkUrl && (
                            <div className="mt-16 p-8 bg-blue-50/50 rounded-3xl border border-blue-100">
                              <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">
                                Referensi Terverifikasi
                              </p>
                              <a
                                href={formData.backlinkUrl}
                                target="_blank"
                                className="text-blue-600 font-bold underline flex items-center gap-2 text-lg"
                              >
                                <ExternalLink size={20} />{" "}
                                {formData.backlinkText ||
                                  "Kunjungi Sumber Terkait"}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

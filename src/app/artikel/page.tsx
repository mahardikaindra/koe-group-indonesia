/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useMemo, useEffect } from "react";
import { Search, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Footer from "@/src/components/Footer";
import { handlePesanWA, encodeSlug } from "@/src/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useArticleStore } from "@/src/store/useArticleStore";

// Data Lengkap Hasil Mapping dari Content Plan - Coretax Implementation Series
const BLOG_DATA = [
  {
    id: "pillar-1",
    title: "10 Kendala Daftar NPWP di Coretax System dan Solusinya",
    slug: "10-kendala-daftar-npwp-di-coretax-system-dan-solusinya",
    summary:
      "Baru mau mulai rapihin administrasi pajak tapi sudah kena mental duluan gara-gara sistem baru? Transisi ke Coretax System memang lagi jadi topik hangat karena banyak calon wajib pajak yang merasa alurnya jauh lebih tricky, mulai dari NIK gagal validasi sampai OTP yang tak kunjung masuk.",
    content: `
      <p>Transisi ke Coretax System memang menantang. Pelajari 10 hambatan utama mulai dari validasi NIK hingga masalah teknis sistem terbaru yang sering dihadapi wajib pajak.</p>
      <h3>1. Sinkronisasi Data NIK</h3>
      <p>Banyak wajib pajak mengeluhkan NIK mereka tidak tervalidasi. Hal ini biasanya terjadi karena perbedaan data di sistem Dukcapil dan DJP. Pastikan Anda melakukan pemadanan NIK secara mandiri sebelum memulai proses registrasi.</p>
      <blockquote>
        "Integrasi data adalah kunci dari efisiensi perpajakan masa depan, namun tantangan teknis di masa transisi adalah hal yang lumrah terjadi."
      </blockquote>
    `,
    category: "Kesulitan Pendaftaran",
    tags: ["Pillar", "Tutorial"],
    author: "Tim Pajakkoe",
    authorRole: "Konsultan Utama @ Pajakkoe",
    date: "29 Des 2025",
    readTime: "12 mnt",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&h=800&fit=crop",
    ctaLink: "https://pajakkoe.co.id/layanan-pajak",
    featured: true,
  },
  {
    id: "cluster-1",
    title: "NIK Gagal Validasi Saat Daftar NPWP? Ini Langkah Perbaikannya",
    slug: "nik-gagal-validasi-saat-daftar-npwp-ini-langkah-perbaikannya",
    summary:
      "Pernah nggak sih lagi semangat mau rapihin administrasi pajak, eh tiba-tiba sistem Coretax bilang NIK kamu nggak valid? Masalah ini adalah penyakit paling umum karena sistem mengandalkan integrasi real-time. Satu ketidaksesuaian kecil saja bisa bikin proses pendaftaran terhenti di tahap awal.",
    category: "Kesulitan Pendaftaran",
    tags: ["Cluster", "Validasi"],
    author: "Admin Pajak",
    authorRole: "Editor Konten Pajak",
    date: "28 Des 2025",
    readTime: "7 mnt",
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1200&h=800&fit=crop",
    ctaLink: "https://pajakkoe.co.id/cek-nik",
  },
  {
    id: "cluster-2",
    title: "OTP Tidak Masuk ke Email/WhatsApp? Cek Pengaturan Ini",
    slug: "otp-tidak-masuk-ke-email-whatsapp-cek-pengaturan-ini",
    summary:
      "Nungguin kode OTP masuk itu rasanya bikin geregetan! Masalah klasik di sistem Coretax ini biasanya terjadi karena server overload atau email masuk ke folder Spam. Jangan klik berkali-kali karena sistem bisa menganggap Anda bot dan akhirnya akun malah kena suspend sementara.",
    category: "Kesulitan Pendaftaran",
    tags: ["Cluster", "Teknis"],
    author: "Support Pajakkoe",
    date: "28 Des 2025",
    readTime: "5 mnt",
    image:
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1200&h=800&fit=crop",
    ctaLink: "https://pajakkoe.co.id/bantuan-otp",
  },
  {
    id: "pillar-2",
    title: "5 Manfaat Coretax System: Revolusi Administrasi Pajak Indonesia",
    slug: "5-manfaat-coretax-system-revolusi-administrasi-pajak-indonesia",
    summary:
      "Transisi ke Coretax System itu ibarat kita baru pindah dari HP jadul ke smartphone terbaru; butuh waktu adaptasi tapi fiturnya jauh lebih canggih. Sistem ini menawarkan efisiensi waktu di mana semua data perpajakan sudah saling terhubung secara otomatis dan transparan bagi pengusaha.",
    category: "Fitur Coretax",
    tags: ["Pillar", "Edukasi"],
    author: "Konsultan Utama",
    date: "27 Des 2025",
    readTime: "10 mnt",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&h=800&fit=crop",
    ctaLink: "https://pajakkoe.co.id/manfaat-coretax",
  },
  {
    id: "cluster-5",
    title: "Mengenal Fitur Tax Deposit: Dompet Digital Khusus Pajak",
    slug: "mengenal-fitur-tax-deposit-dompet-digital-khusus-pajak",
    summary:
      "Dulu, tiap kali mau bayar pajak itu rasanya kayak harus ngelewatin ritual yang panjang dan melelahkan. Sekarang ada fitur Tax Deposit yang fungsinya mirip banget sama saldo e-wallet. Anda tinggal isi saldo dan nantinya bisa digunakan melunasi pajak tanpa harus bolak-balik bikin kode billing baru.",
    category: "Fitur Coretax",
    tags: ["Cluster", "Fintech"],
    author: "Tim Keuangan",
    date: "26 Des 2025",
    readTime: "5 mnt",
    image:
      "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=1200&h=800&fit=crop",
    ctaLink: "https://pajakkoe.co.id/tax-deposit",
  },
  {
    id: "cluster-8",
    title: "Dampak Fatal Jika Tidak Melakukan Update Data Coretax",
    slug: "dampak-fatal-jika-tidak-melakukan-update-data-coretax",
    summary:
      "Salah satu aturan main paling penting di Coretax adalah kewajiban aktivasi profil secara mandiri. Kalau Anda menunda-nunda migrasi data, risiko akun pajak 'beku' atau terkunci itu nyata banget. Jika terkunci, Anda tidak bisa akses fitur penting seperti bikin faktur atau lapor SPT.",
    category: "Dampak Perubahan",
    tags: ["Cluster", "Urgent"],
    author: "Legal Pajak",
    date: "25 Des 2025",
    readTime: "8 mnt",
    image:
      "https://images.unsplash.com/photo-1574607383476-f517f220d356?q=80&w=1200&h=800&fit=crop",
    ctaLink: "https://pajakkoe.co.id/update-data",
  },
];

const CATEGORIES = [
  "Semua",
  "Kesulitan Pendaftaran",
  "Fitur Coretax",
  "Dampak Perubahan",
];

interface ArtikelPageProps {
  authorId: string;
  backlinkUrl: string;
  backlinkText: string;
  category: string;
  content: string;
  seoScore: number;
  slug: string;
  title: string;
  updateAt: string;
  isFeatured: boolean;
  likes: number;
  metaDescription: string;
  imageUrl: string;
  focusedKeyword: string;
  createdAt: string;
}

const ArtikelPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<ArtikelPageProps[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const setArticleId = useArticleStore((state) => state.setArticleId);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          "https://www.koegroupindonesia.id/api/articles",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          },
        );
        setBlogs(res.data);
      } catch (err) {
        console.error("❌ Fetch articles error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_DATA.filter((post) => {
      const matchesCategory =
        selectedCategory === "Semua" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Konten Featured (Biasanya yang bertanda Pillar)
  const featuredPost = useMemo(() => blogs.find((p) => p.isFeatured), [blogs]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-emerald-900 selection:text-white">
      {/* Tipografi Digitale Modern */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        :root { --font-digitale: 'Plus Jakarta Sans', sans-serif; --font-serif: 'Lora', serif; }
        body { font-family: var(--font-digitale); -webkit-font-smoothing: antialiased; }
        .digitale-heading { font-family: var(--font-digitale); letter-spacing: -0.02em; }
        .medium-serif { font-family: var(--font-serif); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Navigasi Utama */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <div
                className="cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                <Image
                  src="/images/icon.png"
                  alt="Koe Legali Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <div className="flex flex-col">
                  <span className="font-extrabold text-[#2c4f40] text-sm leading-none tracking-tight">
                    KOE LEGALI
                  </span>
                  <span className="text-[8px] font-bold tracking-[0.2em] text-gray-400">
                    INDONESIA
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center bg-gray-50 px-5 py-2.5 rounded-full border border-gray-100 focus-within:ring-2 focus-within:ring-emerald-900/10 transition-all">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Cari solusi pendaftaran..."
                className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-72"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              className="text-sm font-bold text-emerald-900 hover:opacity-70"
              onClick={() => (window.location.href = "/")}
            >
              Halaman Utama
            </button>
            <div className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-white font-bold text-xs shadow-lg">
              PK
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Featured Post - Pillar Content */}
        {loading ? (
          <section className="mb-20 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-gray-50 rounded-[3rem] p-8 lg:p-12 border border-gray-100">
              <div className="aspect-9/5 bg-gray-200 rounded-lg w-full" />
              <div className="space-y-6 w-full">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-4 bg-gray-200 rounded-full" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
                <div className="h-12 w-full bg-gray-200 rounded" />
                <div className="h-12 w-3/4 bg-gray-200 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded" />
                </div>
                <div className="pt-4 flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div className="h-8 w-32 bg-gray-200 rounded" />
                  </div>
                  <div className="h-14 w-40 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>
          </section>
        ) : (
          selectedCategory === "Semua" &&
          !searchQuery &&
          featuredPost && (
            <section className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-emerald-50/30 rounded-[3rem] p-8 lg:p-12 border border-emerald-100/50">
                <div className="relative aspect-9/5 rounded-lg overflow-hidden shadow-2xl">
                  {featuredPost.imageUrl ? (
                    <Image
                      src={featuredPost.imageUrl}
                      alt={featuredPost.title}
                      className="object-cover hover:scale-110 transition-transform duration-1000"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  {/* <div className="absolute top-6 left-6 bg-emerald-900 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                  <Zap size={14} /> Terpopuler
                </div> */}
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
                      {featuredPost.category}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500 font-bold uppercase">
                      {(() => {
                        const date = (featuredPost.createdAt as any)?.seconds
                          ? new Date(
                              (featuredPost.createdAt as any).seconds * 1000,
                            )
                          : new Date(featuredPost.createdAt);

                        return date.toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });
                      })()}
                    </span>
                  </div>
                  <h2
                    className="text-4xl lg:text-5xl font-black leading-tight text-emerald-950 digitale-heading italic"
                    onClick={() => {
                      setArticleId(featuredPost.slug);
                      router.push(`/artikel/${encodeSlug(featuredPost.slug)}`);
                    }}
                  >
                    {featuredPost.title.slice(0, 100)}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed italic">
                    {featuredPost.content.replace(/<[^>]+>/g, "").slice(0, 300)}
                    ...
                  </p>
                  <div className="pt-4 flex items-center gap-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <ShieldCheck size={20} className="text-emerald-900" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {"Admin Pajak!Koe"}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">
                          Verifikasi Ahli
                        </p>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-2 bg-emerald-950 text-white px-8 py-4 rounded-lg font-bold hover:bg-emerald-800 transition-all shadow-xl active:scale-95"
                      onClick={() => {
                        setArticleId(featuredPost.slug);
                        router.push(
                          `/artikel/${encodeSlug(featuredPost.slug)}`,
                        );
                      }}
                    >
                      Baca Sekarang <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            {/* Navigasi Kategori */}
            {/* <div className="flex items-center gap-8 border-b border-gray-100 mb-12 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`pb-5 text-sm font-bold transition-all relative whitespace-nowrap ${
                    selectedCategory === cat
                      ? "text-emerald-950"
                      : "text-gray-400 hover:text-emerald-900"
                  }`}
                >
                  {cat}
                  {selectedCategory === cat && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-emerald-900 rounded-full" />
                  )}
                </button>
              ))}
            </div> */}

            {/* List Artikel */}
            <div className="space-y-20">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex flex-col-reverse sm:flex-row gap-10 items-start animate-pulse"
                    >
                      <div className="flex-1 space-y-4 w-full">
                        <div className="h-6 w-32 bg-gray-200 rounded-lg" />
                        <div className="h-8 w-3/4 bg-gray-200 rounded" />
                        <div className="space-y-2">
                          <div className="h-4 w-full bg-gray-200 rounded" />
                          <div className="h-4 w-2/3 bg-gray-200 rounded" />
                        </div>
                      </div>
                      <div className="w-full sm:w-[400px] h-[250px] bg-gray-200 rounded-lg shrink-0" />
                    </div>
                  ))
                : blogs.map(
                    (post) =>
                      post.imageUrl && (
                        <article
                          key={post.slug}
                          className="group cursor-pointer"
                        >
                          <div className="flex flex-col-reverse sm:flex-row gap-10 items-start">
                            <div className="flex-1 space-y-4">
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-lg">
                                  {post.category}
                                </span>
                              </div>

                              <h3
                                className="text-2xl font-black leading-tight text-emerald-950 group-hover:text-emerald-800 transition-colors digitale-heading"
                                onClick={() => {
                                  setArticleId(post.slug);
                                  router.push(
                                    `/artikel/${encodeSlug(post.slug)}`,
                                  );
                                }}
                              >
                                {post.title}
                              </h3>

                              <p className="text-gray-600 text-base leading-relaxed line-clamp-2">
                                {post.content
                                  .replace(/<[^>]+>/g, "")
                                  .slice(0, 300)}
                                ...
                              </p>
                            </div>

                            <div className="w-full sm:w-90 h-50 shrink-0 overflow-hidden rounded-lg relative">
                              <Image
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                width={400}
                                height={250}
                                // sizes="(max-width: 640px) 100vw, 200px"
                              />
                              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-lg" />
                            </div>
                          </div>
                        </article>
                      ),
                  )}

              {!loading && filteredPosts.length === 0 && (
                <div className="py-20 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-100">
                  <AlertTriangle
                    className="mx-auto text-emerald-900/20 mb-4"
                    size={48}
                  />
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                    Konten belum tersedia
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="sticky top-32 space-y-12">
              {/* Sidebar CTA Card */}
              <div className="bg-emerald-950 rounded-2xl p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                <h4 className="text-xl font-black leading-tight mb-4">
                  Gagal Daftar NPWP Karena NIK?
                </h4>
                <p className="text-emerald-100/60 text-sm leading-relaxed mb-8">
                  Tim Pajakkoe membantu sinkronisasi data Anda dengan Coretax
                  System secara resmi dan cepat.
                </p>
                <button
                  className="w-full bg-white text-emerald-950 py-4 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl active:scale-95"
                  onClick={() => handlePesanWA("Konsultasi Umum")}
                >
                  Konsultasi Gratis
                </button>
              </div>

              {/* Trending Section */}
              <div className="space-y-8">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-100 pb-4">
                  Topik Terhangat
                </h4>
                <div className="space-y-8">
                  {loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex gap-6 animate-pulse">
                          <div className="h-10 w-8 bg-gray-200 rounded" />
                          <div className="space-y-2 w-full">
                            <div className="h-4 w-full bg-gray-200 rounded" />
                            <div className="h-3 w-1/2 bg-gray-200 rounded" />
                          </div>
                        </div>
                      ))
                    : blogs
                        .filter((p) => !p.isFeatured)
                        .slice(0, 3)
                        .map((p, i) => (
                          <div
                            key={p.slug}
                            className="flex gap-6 group cursor-pointer"
                          >
                            <span className="text-4xl font-black text-black group-hover:text-emerald-100 transition-colors">
                              0{i + 1}
                            </span>
                            <div className="space-y-1">
                              <h5
                                className="text-sm font-black leading-snug group-hover:text-emerald-900"
                                onClick={() =>
                                  (window.location.href = `/artikel/${p.slug}`)
                                }
                              >
                                {p.title}
                              </h5>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                {"Admin Pajak!Koe"}
                              </p>
                            </div>
                          </div>
                        ))}
                </div>
              </div>

              {/* Tag Cloud */}
              <div className="pt-8">
                <div className="flex flex-wrap gap-2">
                  {[
                    "NPWP",
                    "Coretax",
                    "DJP",
                    "EFIN",
                    "Validasi NIK",
                    "Pajak Digital",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-bold text-gray-500 hover:border-emerald-900 transition-all cursor-pointer uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtikelPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Twitter, Linkedin } from "lucide-react";
import axios from "axios";
import ShareButton from "./ShareButton";
import Navbar from "@/src/components/Header";
import StoreInitializer from "./StoreInitializer";
interface ArtikelPageProps {
  id: string;
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

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { id } = params;

  try {
    const res = await axios.get(
      `https://www.koegroupindonesia.id/api/articles/${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    const postData: ArtikelPageProps = res.data.data;

    if (!postData) {
      return {
        title: "Artikel Tidak Ditemukan - Pajak!Koe",
      };
    }

    return {
      title: `${postData.title} - Pajak!Koe`,
      description: postData.metaDescription,
      openGraph: {
        title: postData.title,
        description: postData.metaDescription,
        images: postData.imageUrl ? [{ url: postData.imageUrl }] : [],
        type: "article",
        publishedTime: postData.createdAt,
        authors: ["Admin Pajak!Koe"],
      },
      twitter: {
        card: "summary_large_image",
        title: postData.title,
        description: postData.metaDescription,
        images: postData.imageUrl ? [postData.imageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: "Artikel - Pajak!Koe",
      description: "Baca artikel perpajakan terbaru.",
    };
  }
}

// Mock blog data for demonstration purposes
const BlogDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const { id } = params;
  let postData: ArtikelPageProps | null = null;
  let blogs: ArtikelPageProps[] = [];

  try {
    const res = await axios.get(
      `https://www.koegroupindonesia.id/api/articles/${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    postData = res.data.data;
    console.log("✅ Fetched article data:", postData);
    // Fetch related articles
    const resBlogs = await axios.get(
      "https://www.koegroupindonesia.id/api/articles",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    blogs = resBlogs.data;
  } catch (err) {
    console.error(`❌ Fetch article error for ID: ${id}`, err);
  }

  if (!postData) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-20">
          <h1 className="text-3xl md:text-4xl font-black text-emerald-950 mb-4 digitale-heading italic">
            Artikel Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Mohon maaf, artikel yang Anda cari tidak dapat ditemukan atau sedang
            terjadi gangguan pada server kami.
          </p>
          <Link
            href="/artikel"
            className="bg-emerald-950 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-800 transition-all shadow-xl"
          >
            Kembali ke Artikel
          </Link>
        </div>
      </div>
    );
  }

  const getSafeDate = (dateVal: any): string => {
    try {
      if (!dateVal) return new Date().toISOString();
      const date = dateVal?.seconds
        ? new Date(dateVal.seconds * 1000)
        : new Date(dateVal);
      return isNaN(date.getTime())
        ? new Date().toISOString()
        : date.toISOString();
    } catch {
      return new Date().toISOString();
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: postData.title,
    image: postData.imageUrl ? [postData.imageUrl] : [],
    datePublished: getSafeDate(postData.createdAt),
    dateModified: getSafeDate(postData.updateAt || postData.createdAt),
    author: {
      "@type": "Person",
      name: "Admin Pajak!Koe",
    },
    publisher: {
      "@type": "Organization",
      name: "Pajak!Koe",
      logo: {
        "@type": "ImageObject",
        url: "https://pajakkoe.co.id/images/logo.png",
      },
    },
    description: postData.metaDescription,
  };

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Tipografi Digitale Modern */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
        :root { --font-digitale: 'Plus Jakarta Sans', sans-serif; --font-serif: 'Lora', serif; }
        body { font-family: var(--font-digitale); -webkit-font-smoothing: antialiased; }
        .digitale-heading { font-family: var(--font-digitale); letter-spacing: -0.02em; }
        .medium-serif { font-family: var(--font-serif); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoreInitializer id={id} />
      <Navbar />
      <main className="bg-grid pt-15">
        {/* Article Header */}
        <header className="max-w-3xl mx-auto px-6 pt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-emerald-950 digitale-heading leading-[1.1] mb-8 italic">
            {postData.title}
          </h1>

          {/* Author Bio Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between py-8 border-y border-gray-100 mb-10 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 overflow-hidden shrink-0">
                <div className="w-full h-full bg-linear-to-br from-emerald-200 to-emerald-900/20" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900">
                    {"Admin Pajak!Koe"}
                  </h4>
                  {/* <span className="text-emerald-600 font-bold text-xs hover:underline cursor-pointer">
                  Ikuti
                </span> */}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {/* <span>{postData.readTime} baca</span> */}
                  {/* <span>•</span> */}
                  <span>
                    {(() => {
                      const date = (postData.createdAt as any)?.seconds
                        ? new Date((postData.createdAt as any).seconds * 1000)
                        : new Date(postData.createdAt);

                      return date.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });
                    })()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 border-r border-gray-200 pr-4">
                <Twitter
                  size={18}
                  className="text-gray-400 hover:text-black cursor-pointer"
                />
                <Linkedin
                  size={18}
                  className="text-gray-400 hover:text-black cursor-pointer"
                />
                <ShareButton />
              </div>
              {/* <Bookmark
              size={20}
              className="text-gray-400 hover:text-emerald-900 cursor-pointer"
            /> */}
            </div>
          </div>
        </header>

        {/* Hero Image */}
        {postData.imageUrl && (
          <figure className="max-w-5xl mx-auto mb-16 px-6 lg:px-0">
            <Image
              src={postData.imageUrl}
              alt={postData.title}
              className="w-full h-auto rounded-3xl shadow-xl"
              width={800}
              height={400}
            />
            <figcaption className="text-center text-sm text-gray-400 mt-4 italic font-medium">
              Ilustrasi implementasi Coretax System - Dokumen Pajakkoe
            </figcaption>
          </figure>
        )}

        {/* Article Body */}
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="text-lg md:text-xl text-gray-800 leading-relaxed space-y-8 prose prose-emerald prose-lg"
            dangerouslySetInnerHTML={{ __html: postData.content || "" }}
          />

          {/* Tags */}
          {/* <div className="flex flex-wrap gap-2 mt-16 pb-12 border-b border-gray-100">
          {postData.tags.map((tag: any) => (
            <span
              key={tag}
              className="px-4 py-2 bg-gray-50 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-900 cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div> */}

          {/* Interaction Bar (Bottom) */}
          {/* <div className="flex items-center justify-between py-12">
          <div className="flex items-center gap-8 text-gray-500">
            <div className="flex items-center gap-2 group hover:text-emerald-900 transition-colors">
              <ThumbsUp
                size={24}
                className="group-active:scale-125 transition-transform"
              />
              <span className="font-bold text-sm">{postData.likes || 0}</span>
            </div>
            <button className="flex items-center gap-2 group hover:text-emerald-900 transition-colors">
                <Share2 size={20} className="hover:text-black cursor-pointer" />
            </button>
          </div>
        </div> */}
        </div>

        {/* Recommendations */}
        <section className="bg-gray-50 mt-12 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-black text-emerald-950 mb-12 digitale-heading italic">
              Baca Juga
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs
                .filter((p) => p.id !== postData.id)
                .slice(0, 3)
                .map((rec) => (
                  <Link
                    href={`/artikel/${rec.slug}`}
                    key={rec.id}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100">
                      {rec.imageUrl && (
                        <Image
                          src={rec.imageUrl}
                          alt={rec.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          width={400}
                          height={250}
                        />
                      )}
                    </div>
                    <h4 className="font-black text-emerald-950 group-hover:text-emerald-700 leading-tight mb-2">
                      {rec.title}
                    </h4>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogDetail;

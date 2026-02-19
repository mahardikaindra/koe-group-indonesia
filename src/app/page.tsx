"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calculator,
  FileText,
  ShieldCheck,
  Briefcase,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Handshake,
  Menu,
  X,
  CheckCircle2,
  Award,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import { handlePesanWA } from "@/src/lib/utils";

// --- Navbar Component ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`transition-all duration-500 px-6 py-3 rounded-full flex justify-between items-center ${
            isScrolled
              ? "bg-white/80 backdrop-blur-md shadow-lg shadow-[#2c4f40]/5 border border-gray-100"
              : "bg-transparent"
          }`}
        >
          <div className="flex items-center gap-2">
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

          <div className="hidden md:flex items-center gap-10">
            {["Layanan", "Tentang", "Media", "Kontak"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-bold text-gray-600 hover:text-[#2c4f40] transition-colors uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="#kontak"
              className="bg-[#2c4f40] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-xl hover:shadow-[#2c4f40]/20 transition-all active:scale-95"
            >
              Mulai Sekarang
            </a>
          </div>

          <button
            className="md:hidden text-[#2c4f40]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-6 right-6 mt-4 bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 flex flex-col gap-6 md:hidden">
          <a
            href="#layanan"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-[#2c4f40]"
          >
            Layanan
          </a>
          <a
            href="#tentang"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-[#2c4f40]"
          >
            Tentang Kami
          </a>
          <a
            href="#media"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-bold text-[#2c4f40]"
          >
            Media
          </a>
          <a
            href="#kontak"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#2c4f40] text-white px-6 py-4 rounded-2xl font-bold text-center"
          >
            Konsultasi Gratis
          </a>
        </div>
      )}
    </nav>
  );
};

// --- Hero Section ---
const Hero = () => (
  <section className="relative pt-32 lg:pt-48 pb-0 lg:pb-0 overflow-hidden bg-[#fcfdfc]">
    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        <div className="lg:w-7/12 text-center lg:text-left z-20 pb-20 lg:pb-32">
          <div className="inline-flex items-center gap-2 bg-[#2c4f40]/5 border border-[#2c4f40]/10 px-4 py-2 rounded-full mb-8">
            <Award size={16} className="text-[#2c4f40]" />
            <span className="text-[11px] font-black text-[#2c4f40] uppercase tracking-[0.2em]">
              Partner Pertumbuhan Bisnis
            </span>
          </div>

          <h1 className="text-5xl lg:text-8xl font-black text-[#2c4f40] leading-[0.95] tracking-tighter mb-8">
            Solusi Legal <br />
            <span className="text-gray-300 italic">Tanpa Kompromi.</span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-500 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Kami membantu pengusaha menavigasi kompleksitas hukum, pajak, dan
            perizinan dengan pendekatan berbasis teknologi yang cepat dan
            transparan.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              className="bg-[#2c4f40] text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-[#2c4f40]/30 transition-all active:scale-95"
              onClick={() => handlePesanWA("Konsultasi Ahli")}
            >
              Konsultasi Ahli <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="lg:w-5/12 relative self-end h-full">
          <div className="relative z-10 w-full h-full flex items-end">
            <div className="relative w-full aspect-4/5 lg:aspect-auto lg:h-175 overflow-visible">
              <div className="absolute bottom-0 right-0 w-[120%] h-[80%] bg-[#2c4f40]/5 rounded-[4rem] -rotate-6 transform translate-x-10 translate-y-10"></div>

              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000"
                alt="Profesional Perempuan Indonesia"
                fill
                className="z-10 object-contain object-bottom drop-shadow-[0_20px_50px_rgba(44,79,64,0.3)] grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />

              {/* Floating Stats Card */}
              <div className="absolute top-1/4 -left-12 lg:-left-20 z-20 bg-white p-6 rounded-3xl shadow-2xl shadow-[#2c4f40]/10 border border-gray-100 hidden sm:block animate-bounce-slow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#2c4f40]">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Status Legalitas
                    </p>
                    <p className="font-bold text-[#2c4f40]">
                      Terverifikasi 2025
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div
                      key={s}
                      className="w-6 h-1 bg-green-500 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Section Klien ---
const Clients = () => (
  <section className="py-16 bg-white overflow-hidden border-b border-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-12">
        Telah Dipercaya Oleh 500+ Perusahaan
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all">
        {[
          "CORPORATE",
          "FINANCE",
          "LOGISTIC",
          "RETAIL",
          "STARTUP",
          "MANUFACTURING",
        ].map((client) => (
          <div
            key={client}
            className="font-black text-2xl lg:text-3xl text-gray-400 tracking-tighter italic"
          >
            {client}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Stats Section ---
const Stats = () => (
  <section className="py-20 bg-[#fcfdfc]">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {[
          { label: "Klien Puas", value: "500+" },
          { label: "Proses Sertifikat", value: "1.2k" },
          { label: "Tahun Berdiri", value: "2025" },
          { label: "Kota Jangkauan", value: "15+" },
        ].map((stat, i) => (
          <div key={i} className="text-center lg:text-left">
            <h4 className="text-4xl lg:text-6xl font-black text-[#2c4f40] tracking-tighter mb-2">
              {stat.value}
            </h4>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Service Grid Section ---
const Services = () => (
  <section id="layanan" className="py-24 lg:py-40 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-xl">
          <span className="text-[#2c4f40] font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            Ekosistem Kami
          </span>
          <h2 className="text-4xl lg:text-7xl font-black text-[#2c4f40] leading-none tracking-tighter">
            Layanan Tanpa Batas.
          </h2>
        </div>
        {/* <p className="text-gray-500 text-lg max-w-sm">
          Didesain untuk fleksibilitas bisnis modern, dari startup hingga
          korporasi besar.
        </p> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pajak - Big Card */}
        <a
          href="https://www.pajakkoe.co.id"
          target="_blank"
          rel="noreferrer"
          className="group relative bg-gray-50 border border-gray-100 p-10 lg:p-16 rounded-[4rem] hover:shadow-2xl hover:shadow-[#2c4f40]/10 transition-all duration-500 overflow-hidden"
        >
          <div className="relative z-10">
            <div className="w-16 h-16 bg-[#2c4f40]/5 rounded-2xl flex items-center justify-center text-[#2c4f40] mb-10 group-hover:scale-110 transition-transform duration-500">
              <Image
                src="/images/koe-logo.png"
                width={32}
                height={32}
                alt="Koe Logo"
              />
            </div>
            <h3 className="text-3xl font-black text-[#2c4f40] mb-4">
              PajakKoe
            </h3>
            <p className="text-gray-500 text-lg mb-10 max-w-xs">
              Konsultasi pajak strategis untuk efisiensi bisnis Anda di era
              digital.
            </p>
            <div className="flex items-center gap-2 font-black text-[11px] uppercase tracking-widest text-[#2c4f40]">
              Eksplorasi <ExternalLink size={14} />
            </div>
          </div>
        </a>

        {/* NIB - Accent Card */}
        <a
          href="https://www.nibkoe.co.id"
          target="_blank"
          rel="noreferrer"
          className="group relative bg-[#9b1f15] p-10 lg:p-16 rounded-[4rem] hover:shadow-2xl hover:shadow-[#2c4f40]/30 transition-all duration-500 overflow-hidden text-white"
        >
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-10 group-hover:rotate-12 transition-transform duration-500">
              <Image
                src="/images/nib-logo.png"
                width={32}
                height={32}
                alt="NIBKoe Logo"
                className="object-contain"
              />
            </div>
            <h3 className="text-3xl font-black mb-4">NIBKoe</h3>
            <p className="text-white/60 text-lg mb-10 max-w-xs">
              Pengurusan legalitas usaha kilat dengan sistem OSS terintegrasi.
            </p>
            <div className="flex items-center gap-2 font-black text-[11px] uppercase tracking-widest text-white">
              Cek Status <ExternalLink size={14} />
            </div>
          </div>
        </a>

        {/* Halal - Normal Card */}
        <a
          href="https://www.halalkoe.co.id"
          target="_blank"
          rel="noreferrer"
          className="group bg-gray-50 border border-gray-100 p-10 lg:p-12 rounded-[3rem] hover:shadow-xl transition-all"
        >
          <div className="flex flex-col h-full">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-[#2c4f40] mb-8 group-hover:bg-[#2c4f40] group-hover:text-white transition-colors duration-500">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-bold text-[#2c4f40] mb-4">HalalKoe</h3>
            <p className="text-gray-400 mb-8 grow text-sm">
              Sertifikasi halal untuk jangkauan pasar yang lebih luas.
            </p>
            <div className="font-bold text-[10px] text-gray-300 group-hover:text-[#2c4f40] transition-colors uppercase tracking-widest">
              Kunjungi Situs
            </div>
          </div>
        </a>

        {/* Usaha - Normal Card */}
        <a
          href="https://www.usahakoe.co.id"
          target="_blank"
          rel="noreferrer"
          className="group bg-gray-50 border border-gray-100 p-10 lg:p-12 rounded-[3rem] hover:shadow-xl transition-all"
        >
          <div className="flex flex-col h-full">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-[#2c4f40] mb-8 group-hover:bg-[#2c4f40] group-hover:text-white transition-colors duration-500">
              <Briefcase size={28} />
            </div>
            <h3 className="text-2xl font-bold text-[#2c4f40] mb-4">UsahaKoe</h3>
            <p className="text-gray-400 mb-8 grow text-sm">
              Pendirian badan usaha (PT/CV) dengan akta resmi.
            </p>
            <div className="font-bold text-[10px] text-gray-300 group-hover:text-[#2c4f40] transition-colors uppercase tracking-widest">
              Kunjungi Situs
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
);

// --- Section Media ---
const Media = () => (
  <section id="media" className="py-24 lg:py-40 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-8">
        <div className="max-w-xl">
          <span className="text-[#2c4f40] font-black text-xs uppercase tracking-[0.4em] mb-4 block">
            Liputan Media
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-[#2c4f40] tracking-tighter">
            Otoritas di Industri.
          </h2>
        </div>
        <button className="flex items-center gap-2 text-[#2c4f40] font-bold text-sm uppercase tracking-widest group">
          Lihat Semua Berita{" "}
          <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            source: "Business Daily",
            title: "PT Koe Legali Indonesia Revolusi Perizinan UMKM di Bandung",
            date: "20 Des 2025",
            category: "Berita Utama",
          },
          {
            source: "Legal Insight",
            title: "Pentingnya NIB bagi Akselerasi Ekspor Produk Lokal",
            date: "15 Des 2025",
            category: "Opini Ahli",
          },
          {
            source: "Fintech Post",
            title: "Inovasi Digital Koe Legali dalam Manajemen Pajak Korporasi",
            date: "10 Des 2025",
            category: "Teknologi",
          },
        ].map((news, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-video bg-gray-100 rounded-[2.5rem] mb-8 overflow-hidden relative">
              <div className="absolute inset-0 bg-[#2c4f40]/5 group-hover:bg-[#2c4f40]/20 transition-all"></div>
              <div className="absolute top-6 left-6">
                <span className="bg-white text-[#2c4f40] px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm">
                  {news.category}
                </span>
              </div>
            </div>
            <div className="px-2">
              <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                <span>{news.source}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{news.date}</span>
              </div>
              <h4 className="text-xl font-bold text-[#2c4f40] group-hover:text-gray-400 transition-colors leading-snug">
                {news.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Trust Section ---
const Trust = () => (
  <section id="tentang" className="py-24 bg-[#fcfdfc]">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-[#2c4f40]/5 p-8 rounded-[2.5rem] border border-[#2c4f40]/10">
              <CheckCircle2 className="text-[#2c4f40] mb-4" />
              <h5 className="font-bold text-[#2c4f40] mb-2 uppercase text-xs tracking-widest">
                Kepatuhan
              </h5>
              <p className="text-[11px] text-gray-500 font-medium">
                Sesuai regulasi UU terbaru.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-[2.5rem]">
              <Globe className="text-gray-400 mb-4" />
              <h5 className="font-bold text-gray-700 mb-2 uppercase text-xs tracking-widest">
                Nasional
              </h5>
              <p className="text-[11px] text-gray-400 font-medium">
                Cakupan seluruh Indonesia.
              </p>
            </div>
          </div>
          <div className="space-y-6 pt-12">
            <div className="bg-gray-50 p-8 rounded-[2.5rem]">
              <Handshake className="text-gray-400 mb-4" />
              <h5 className="font-bold text-gray-700 mb-2 uppercase text-xs tracking-widest">
                Profesional
              </h5>
              <p className="text-[11px] text-gray-400 font-medium">
                Tim ahli berpengalaman.
              </p>
            </div>
            <div className="bg-[#2c4f40] p-8 rounded-[2.5rem] text-white">
              <Award className="text-white/50 mb-4" />
              <h5 className="font-bold mb-2 uppercase text-xs tracking-widest">
                Terdaftar
              </h5>
              <p className="text-[11px] text-white/60 font-medium">
                Legalitas SK AHU Resmi.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-4xl lg:text-6xl font-black text-[#2c4f40] leading-tight tracking-tighter mb-8">
            Dikerjakan Oleh Ahli, Diawasi Oleh Negara.
          </h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            Keamanan data dan validitas hukum adalah prioritas kami. Setiap
            dokumen yang kami terbitkan memiliki dasar hukum yang kuat dan
            terverifikasi di kementerian terkait.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// --- Footer ---
const Footer = () => (
  <footer id="kontak" className="bg-[#2c4f40] text-white pt-32 pb-16">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <span className="text-[#2c4f40] font-black text-2xl">K</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-xl leading-none tracking-tight uppercase">
                Koe Legali
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-white/40">
                INDONESIA
              </span>
            </div>
          </div>
          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-sm">
            Membangun standar baru dalam layanan legalitas dan pajak di
            Indonesia melalui efisiensi dan integritas.
          </p>
          <div className="inline-block px-6 py-4 rounded-3xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] block mb-2">
              Legalitas AHU
            </span>
            <p className="font-bold text-sm">SK AHU-069446.AH.01.30.2025</p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-10">
            Ekosistem
          </h4>
          <ul className="space-y-6">
            {["PajakKoe", "NIBKoe", "HalalKoe", "UsahaKoe"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-white hover:text-white/60 transition-colors flex items-center justify-between font-bold group uppercase tracking-widest text-xs"
                >
                  {item}{" "}
                  <ChevronRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-10">
            Hubungi Kami
          </h4>
          <div className="space-y-8">
            <div className="flex gap-6 items-start group cursor-pointer">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#2c4f40] transition-colors">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">
                  WhatsApp
                </p>
                <p className="font-bold text-lg">0822-4007-2717</p>
              </div>
            </div>
            <div className="flex gap-6 items-start group cursor-pointer">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#2c4f40] transition-colors">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">
                  Email
                </p>
                <p className="font-bold text-sm">info@koegroupindonesia.id</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">
                  Head Office
                </p>
                <p className="font-bold text-sm leading-relaxed">
                  HQuarters Lantai 20
                  <br />
                  Jl Asia Afrika No 158, Bandung
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
          &copy; 2025 PT Koe Legali Indonesia. All rights reserved.
        </p>
        <div className="flex gap-10">
          <a
            href="#"
            className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            Terms
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Root Component ---
export default function App() {
  return (
    <div className="min-h-screen bg-[#fcfdfc] text-[#1a1a1a] selection:bg-[#2c4f40] selection:text-white antialiased">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }

        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `,
        }}
      />

      <Navbar />
      <Hero />
      <Clients />
      <Stats />
      <Services />
      {/* <Media /> */}
      <Trust />
      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

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
            {["Layanan", "Tentang", "Artikel", "Media", "Kontak"].map(
              (item) => (
                <a
                  key={item}
                  href={
                    item.toLowerCase() === "artikel"
                      ? "/artikel"
                      : `#${item.toLowerCase()}`
                  }
                  className="text-sm font-bold text-gray-600 hover:text-[#2c4f40] transition-colors uppercase tracking-widest"
                >
                  {item}
                </a>
              ),
            )}
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

export default Navbar;

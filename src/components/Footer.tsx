import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";

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
            href="/privacy-policy"
            className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            Privacy
          </a>
          <a
            href="/terms-conditions"
            className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
          >
            Terms
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

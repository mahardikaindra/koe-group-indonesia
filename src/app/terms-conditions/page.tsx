"use client";

import { ArrowLeft } from "lucide-react";

const TermCondition = () => {
  return (
    <div className="min-h-screen bg-[#f0f7f4] font-sans text-slate-700 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm py-4 px-6 fixed w-full top-0 z-50">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-slate-100 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <span className="font-bold text-lg text-[#2c4f40]">
            Syarat & Ketentuan Layanan
          </span>
        </div>
      </div>

      <div className="pt-24 px-4 max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Syarat dan Ketentuan Layanan
          </h1>

          <p>
            Selamat datang di Koe Legali Indonesia, sebuah layanan yang
            dioperasikan oleh PT Koe Legali Indonesia (&quot;Kami&quot;). Harap
            membaca Syarat dan Ketentuan ini dengan saksama sebelum menggunakan
            layanan Kami. Dengan mengakses atau menggunakan layanan Kami
            (melalui website, WhatsApp, atau formulir pemesanan), Anda
            (&quot;Pengguna&quot; atau &quot;Klien&quot;) dianggap telah
            membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan
            Ketentuan ini.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              1. Definisi Layanan
            </h2>
            <p className="mb-2">
              <strong>1.1.</strong> Koe Legali Indonesia adalah penyedia jasa
              asist ensi/perantara administrasi perpajakan yang membantu
              Pengguna dalam proses pendaftaran Nomor Pokok Wajib Pajak (NPWP)
              secara elektronik melalui sistem Direktorat Jenderal Pajak (DJP).
            </p>
            <p>
              <strong>1.2.</strong> Kami bukan merupakan perwakilan resmi dari
              Direktorat Jenderal Pajak (DJP) atau instansi pemerintah manapun.
              Kami bertindak sebagai konsultan/biro jasa swasta yang membantu
              mempermudah proses administrasi Anda.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              2. Kewajiban & Pernyataan Pengguna
            </h2>
            <p className="mb-2">
              <strong>2.1.</strong> Keaslian Data: Pengguna menjamin bahwa
              seluruh data dan dokumen yang diserahkan (seperti Foto KTP, No KK,
              Data Usaha) adalah asli, benar, akurat, dan merupakan milik
              Pengguna sendiri.
            </p>
            <p className="mb-2">
              <strong>2.2.</strong> Larangan Penyalahgunaan: Pengguna dilarang
              keras menggunakan layanan ini untuk tujuan penipuan, pemalsuan
              identitas, pencucian uang, atau tindakan melanggar hukum lainnya.
            </p>
            <p>
              <strong>2.3.</strong> Tanggung Jawab Hukum: PT Koe Legali
              Indonesia tidak bertanggung jawab atas segala konsekuensi hukum
              yang timbul akibat ketidakbenaran data yang diberikan oleh
              Pengguna. Segala sanksi perpajakan di kemudian hari akibat
              kelalaian pelaporan pajak adalah tanggung jawab penuh Pengguna.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              3. Prosedur Layanan & Pembayaran
            </h2>
            <p className="mb-2">
              <strong>3.1.</strong> Sistem Bayar Belakangan: Kami menerapkan
              sistem kepercayaan di mana pembayaran dilakukan setelah Nomor NPWP
              diterbitkan secara elektronik (softcopy) dan diverifikasi
              validitasnya oleh Pengguna.
            </p>
            <p className="mb-2">
              <strong>3.2.</strong> Kewajiban Pembayaran: Setelah bukti
              pendaftaran NPWP berhasil kami kirimkan, Pengguna wajib melunasi
              pembayaran sesuai paket yang dipilih (Kilat/Freelancer/Badan)
              dalam waktu maksimal 1x24 jam.
            </p>
            <p className="mb-2">
              <strong>3.3.</strong> Pembatalan Sepihak: Jika Pengguna
              membatalkan pesanan secara sepihak setelah proses pendaftaran di
              sistem DJP selesai/berhasil, Pengguna tetap diwajibkan membayar
              biaya jasa penuh sebagai kompensasi waktu dan kerja tim admin.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              4. Kebijakan Privasi & Keamanan Data
            </h2>
            <p className="mb-2">
              <strong>4.1.</strong> Penggunaan Data: Data pribadi yang Anda
              unggah hanya digunakan untuk keperluan pendaftaran NPWP di sistem
              DJP Online.
            </p>
            <p className="mb-2">
              <strong>4.2.</strong> Penyimpanan & Penghapusan: - Kami menyimpan
              data Anda di server yang aman (terenkripsi) selama proses
              pengerjaan. Dokumen sensitif (Foto KTP/Akta) akan dihapus dari
              penyimpanan lokal kami secara berkala setelah pesanan selesai,
              kecuali data dasar (Nama & No WA) untuk keperluan riwayat pesanan.
            </p>
            <p>
              <strong>4.3.</strong> Tidak Ada Bagi Pakai: Kami menjamin tidak
              akan menjual, menyewakan, atau membagikan data pribadi Anda kepada
              pihak ketiga manapun untuk tujuan pemasaran.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              5. Batasan Tanggung Jawab (Disclaimer)
            </h2>
            <p className="mb-2">
              <strong>5.1.</strong> Kartu Fisik: Kami hanya menyediakan NPWP
              Elektronik (Softfile PDF) yang resmi dan sah. Pengiriman kartu
              fisik NPWP merupakan wewenang penuh Kantor Pelayanan Pajak (KPP)
              terdaftar dan biasanya dikirimkan via Pos Indonesia ke alamat
              KTP/Domisili. Kami tidak bertanggung jawab atas keterlambatan atau
              hilangnya kartu fisik dalam pengiriman oleh pihak ekspedisi/Pos.
            </p>
            <p>
              <strong>5.2.</strong> Penolakan DJP: Jika pendaftaran ditolak oleh
              sistem DJP dikarenakan data NIK/KK Pengguna tidak valid atau
              bermasalah di Dukcapil, maka hal tersebut di luar kendali Kami.
              Kami akan membantu mengarahkan solusinya, namun biaya jasa tidak
              dapat dikembalikan jika proses gagal karena data Pengguna yang
              bermasalah.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              6. Kontak Kami
            </h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai Syarat dan Ketentuan ini,
              silakan hubungi kami melalui:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>WhatsApp: 0857-9794-6263</li>
              <li>Email: info@koegroupindonesia.id</li>
              <li>
                Alamat Kantor: HQuarters Lantai 20 Jl Asia Afrika No 158, Kota
                Bandung
              </li>
            </ul>
          </section>

          <p>
            Dengan menggunakan layanan Koe Legali Indonesia, Anda dianggap telah
            menyetujui seluruh poin di atas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermCondition;

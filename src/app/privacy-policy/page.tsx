"use client";

import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
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
            Kebijakan Privasi
          </span>
        </div>
      </div>

      <div className="pt-24 px-4 max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Kebijakan Privasi Koe Legali Indonesia
          </h1>
          <p>
            Selamat datang di Koe Legali Indonesia, layanan yang dioperasikan
            oleh PT Koe Group Indonesia (&quot;Kami&quot;). Kami sangat
            menghargai privasi Anda dan berkomitmen untuk melindungi data
            pribadi yang Anda bagikan kepada Kami. Kebijakan Privasi ini
            menjelaskan bagaimana Kami mengumpulkan, menggunakan, menyimpan, dan
            melindungi informasi pribadi Anda saat Anda menggunakan layanan
            pembuatan NPWP kami. Dengan menggunakan layanan Koe Legali
            Indonesia, Anda dianggap telah menyetujui praktik data yang
            dijelaskan dalam Kebijakan Privasi ini.
          </p>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              1. Informasi yang Kami Kumpulkan
            </h2>
            <p className="mb-2">
              Untuk memproses permohonan NPWP Anda secara sah dan akurat sesuai
              ketentuan Direktorat Jenderal Pajak (DJP), Kami perlu mengumpulkan
              data pribadi berikut:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <strong>1.1. Data Identitas</strong>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Nama Lengkap (sesuai KTP).</li>
                  <li>Nomor Induk Kependudukan (NIK).</li>
                  <li>Tempat dan Tanggal Lahir.</li>
                  <li>Nomor Kartu Keluarga (KK).</li>
                  <li>Foto KTP (Kartu Tanda Penduduk) asli.</li>
                </ul>
              </li>
              <li>
                <strong>1.2. Data Kontak</strong>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Nomor WhatsApp aktif (untuk komunikasi status pesanan).
                  </li>
                  <li>Alamat Email (untuk pendaftaran akun DJP Online).</li>
                  <li>Alamat Domisili/Tempat Tinggal lengkap.</li>
                </ul>
              </li>
              <li>
                <strong>1.3. Data Pekerjaan/Usaha</strong>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Status Pekerjaan (Karyawan/Freelancer/Usahawan).</li>
                  <li>
                    Detail Usaha (Nama usaha, bidang usaha, alamat usaha) bagi
                    pemohon NPWP Badan atau UMKM.
                  </li>
                  <li>
                    Dokumen pendukung (Akta Pendirian, SK Kemenkumham) khusus
                    untuk NPWP Badan.
                  </li>
                </ul>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              2. Penggunaan Informasi
            </h2>
            <p className="mb-2">
              Kami menggunakan informasi yang Anda berikan semata-mata untuk
              tujuan berikut:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                Pemrosesan Administrasi: Mengisi formulir pendaftaran resmi pada
                sistem e-Reg DJP (ereg.pajak.go.id) atas nama Anda.
              </li>
              <li>
                Komunikasi: Menghubungi Anda melalui WhatsApp/Email untuk
                konfirmasi data, update status pendaftaran, dan pengiriman
                softfile NPWP.
              </li>
              <li>
                Verifikasi: Memastikan keaslian identitas pemohon untuk mencegah
                penyalahgunaan data atau penipuan (fraud).
              </li>
              <li>
                Layanan Pelanggan: Menjawab pertanyaan atau keluhan Anda terkait
                layanan perpajakan.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              3. Penyimpanan dan Keamanan Data
            </h2>
            <p className="mb-2">
              Kami menerapkan langkah-langkah keamanan teknis dan organisasional
              yang ketat untuk melindungi data Anda:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                Enkripsi: Data sensitif yang dikirimkan melalui formulir website
                kami dilindungi menggunakan enkripsi SSL/TLS.
              </li>
              <li>
                Akses Terbatas: Akses terhadap data pribadi Anda dibatasi hanya
                kepada staf admin Kami yang telah terverifikasi dan berkewajiban
                menjaga kerahasiaan.
              </li>
              <li>
                Penyimpanan Sementara: Dokumen sensitif (seperti Foto KTP dan
                Akta) disimpan di server kami (Firebase Storage) dengan aturan
                keamanan ketat.
              </li>
              <li>
                Penghapusan Data: Kami akan menghapus dokumen identitas (Foto
                KTP/KK) dari penyimpanan kami secara berkala setelah proses
                pendaftaran dinyatakan SELESAI (NPWP terbit dan pembayaran
                lunas), kecuali data riwayat transaksi dasar (Nama & No WA)
                untuk keperluan pembukuan internal.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              4. Pengungkapan kepada Pihak Ketiga
            </h2>
            <p>
              Kami menjamin TIDAK AKAN menjual, menyewakan, atau memperdagangkan
              data pribadi Anda kepada pihak ketiga manapun untuk tujuan
              pemasaran (marketing). Data Anda hanya akan diungkapkan kepada:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                Direktorat Jenderal Pajak (DJP): Sebagai instansi pemerintah
                yang berwenang menerbitkan NPWP. Penyerahan data ini adalah
                bagian inti dari layanan kami.
              </li>
              <li>
                Penegak Hukum: Jika diwajibkan oleh hukum atau peraturan
                perundang-undangan yang berlaku di Republik Indonesia.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              5. Hak Pengguna
            </h2>
            <p>Sebagai pemilik data, Anda memiliki hak untuk:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                Meminta informasi mengenai status data Anda di sistem kami.
              </li>
              <li>
                Meminta koreksi jika terdapat kesalahan pada data yang Anda
                kirimkan (sebelum data diproses ke DJP).
              </li>
              <li>
                Meminta penghapusan data dokumen Anda dari penyimpanan kami
                setelah layanan selesai.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              6. Perubahan Kebijakan Privasi
            </h2>
            <p>
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu
              untuk mencerminkan perubahan pada layanan atau peraturan hukum.
              Setiap perubahan akan diinformasikan melalui halaman ini. Kami
              menyarankan Anda untuk meninjau halaman ini secara berkala.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              7. Hubungi Kami
            </h2>
            <p>
              Jika Anda memiliki pertanyaan, saran, atau keluhan mengenai
              praktik privasi kami, silakan hubungi kami melalui:
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

          <p>Terakhir Diperbarui: 17 Desember 2025</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

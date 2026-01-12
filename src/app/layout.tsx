import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FirebaseProvider } from "@/src/components/FirebaseProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT Koe Legali Indonesia",
  description:
    "Koe Legali Indonesia adalah perusahaan yang bergerak di bidang jasa legalisasi dokumen internasional, membantu klien dalam mengurus legalisasi dokumen untuk keperluan bisnis, pendidikan, dan imigrasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}

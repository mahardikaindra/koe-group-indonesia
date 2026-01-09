/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(false);

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
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login Error:", error.message);
      setLoginError("Email atau kata sandi salah. Silakan coba lagi.");
    } finally {
      setFormLoading(false);
    }
  };

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
              Login Koe
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
            <Button type="submit" className="w-full py-3" loading={formLoading}>
              Masuk Ke Dashboard
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Zap, Loader2, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SovereignInput } from "@/components/ui/SovereignInput";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionChecking, setSessionChecking] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch(`/api/auth/session?t=${Date.now()}`, { cache: "no-store" });
        const data = await res.json();
        if (data.authenticated) {
          if (data.user.isOnboarded) {
            const params = new URLSearchParams(window.location.search);
            const redirectUrl = params.get("redirect") || "/learn";
            router.replace(redirectUrl);
          } else {
            router.replace("/onboarding");
          }
        } else {
          setSessionChecking(false);
        }
      } catch (e) {
        console.error("Session check failed", e);
        setSessionChecking(false);
      }
    }
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/send-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send magic link.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sessionChecking) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center font-mono text-xs text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 text-black animate-spin" />
          <span>VERIFYING ACTIVE REGISTER SESSION...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-850 relative overflow-hidden flex flex-col justify-between">
      
      {/* STATUS BAR PROMO */}
      <div className="w-full bg-[#eae3d7] text-[#5c5346] py-2.5 px-6 text-center text-xs tracking-widest uppercase font-mono font-bold flex items-center justify-center gap-6 border-b border-slate-200">
        <span>THE SOVEREIGN SYNDICATE</span>
        <span className="text-[#c7baa4] select-none">•</span>
        <span>FOUNDRY AUTHENTICATION</span>
      </div>

      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4 bg-[#faf9f6]">
        <div className="bg-white border border-slate-200 p-8 md:p-12 max-w-md w-full shadow-sm rounded-none text-left space-y-6">
          <div className="w-12 h-12 bg-[#faf9f6] border border-slate-200 text-slate-905 flex items-center justify-center rounded-none">
            <Zap className="w-6 h-6 fill-amber-500 text-amber-500" />
          </div>
          
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono block">
              WORKSPACE ACCESS
            </span>
            <h2 className="text-xl md:text-2xl font-heading text-slate-950 uppercase tracking-widest font-bold">
              Enter the Foundry
            </h2>
            <p className="text-slate-500 text-xs leading-relaxed font-sans font-medium">
              Lock in access to your personal workspace. Enter your email below to receive a secure login link.
            </p>
          </div>

          {success ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 space-y-3 rounded-none text-left">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm uppercase tracking-wider font-mono">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Link Dispatched</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed font-sans font-medium">
                We've sent a magic verification link to <strong className="text-slate-900">{email}</strong>. Check your inbox (and spam folder) and click the link to log in.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-400" />
                  </span>
                  <SovereignInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="pl-10 py-3.5"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-xs font-semibold leading-relaxed">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#000000] hover:bg-[#1a1a1a] disabled:bg-slate-200 disabled:text-slate-400 text-white font-heading text-xs uppercase tracking-widest py-4 text-center rounded-none font-bold shadow-sm transition-all h-12 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-500" /> Sending Magic Link...
                  </>
                ) : (
                  "Request Connection Link &rarr;"
                )}
              </button>
            </form>
          )}

          <div className="text-center">
            <a 
              href="/"
              className="text-[10px] text-slate-400 hover:text-slate-900 uppercase font-mono tracking-widest font-bold inline-block"
            >
              &larr; Return to Homepage
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

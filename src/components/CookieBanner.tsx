"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAccepted, setAnalyticsAccepted] = useState(true);

  useEffect(() => {
    // Check if consent has already been given or rejected
    const consent = localStorage.getItem("hi_cookie_consent");
    if (!consent) {
      // Delay slightly for premium animation entrance feel
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("hi_cookie_consent", "accepted");
    localStorage.setItem("hi_analytics_cookies", "true");
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem("hi_cookie_consent", "rejected");
    localStorage.setItem("hi_analytics_cookies", "false");
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("hi_cookie_consent", "preferences");
    localStorage.setItem("hi_analytics_cookies", analyticsAccepted ? "true" : "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md bg-[#faf9f6] border border-slate-300 text-slate-800 p-6 md:p-8 z-50 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-in slide-in-from-bottom-10 duration-500 font-sans print:hidden">
      
      {/* Banner Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-slate-900 shrink-0" />
          <span className="font-heading text-xs uppercase tracking-widest font-black text-slate-900 font-mono">
            Privacy Registry / Cookies
          </span>
        </div>
        <button 
          onClick={handleRejectAll} 
          className="text-slate-400 hover:text-black transition-colors"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Preferences Toggle Form */}
      {showPreferences ? (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Customize your data tracking preferences. Necessary system session tracking cookies cannot be disabled.
          </p>
          
          <div className="space-y-3 pt-2 border-t border-slate-200">
            {/* Functional Cookies */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-905">System Session Logs</p>
                <p className="text-[10px] text-slate-500 font-medium">Required to save workspace states and keep you logged in.</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 py-1 px-2 select-none">
                Always Active
              </span>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-905">Analytics & Optimization</p>
                <p className="text-[10px] text-slate-500 font-medium">Helps us refine onboarding pathways and study card metrics.</p>
              </div>
              <button
                type="button"
                onClick={() => setAnalyticsAccepted(!analyticsAccepted)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-none border border-black transition-colors duration-200 ease-in-out focus:outline-none ${
                  analyticsAccepted ? "bg-black" : "bg-slate-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white shadow ring-0 transition duration-200 ease-in-out border border-black ${
                    analyticsAccepted ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              onClick={handleSavePreferences}
              className="flex-1 bg-black hover:bg-neutral-800 text-white font-heading text-[10px] uppercase tracking-widest font-bold py-2.5 px-4 rounded-none transition-colors border border-black"
            >
              Save Registry
            </button>
            <button
              onClick={() => setShowPreferences(false)}
              className="bg-transparent hover:bg-slate-100 text-slate-800 font-heading text-[10px] uppercase tracking-widest font-bold py-2.5 px-4 rounded-none transition-colors border border-slate-350"
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
            We use secure, localized registries (cookies) to safeguard login sessions, preserve dashboard progress states, and run compliance trackers. By continuing, you agree to our policies. Review our{" "}
            <Link href="/terms-privacy" className="underline text-black font-semibold hover:text-[#d4af37]">
              Terms & Privacy Policy
            </Link>.
          </p>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 w-full">
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-black hover:bg-neutral-800 text-white font-heading text-[10px] uppercase tracking-widest font-bold py-2.5 px-4 rounded-none transition-colors border border-black"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 bg-transparent hover:bg-slate-100 text-slate-800 font-heading text-[10px] uppercase tracking-widest font-bold py-2.5 px-4 rounded-none transition-colors border border-slate-350"
              >
                Reject
              </button>
            </div>
            <button
              onClick={() => setShowPreferences(true)}
              className="w-full text-center text-[10px] font-mono uppercase tracking-widest font-bold text-slate-450 hover:text-black py-1.5 transition-colors mt-1"
            >
              Preferences Registry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

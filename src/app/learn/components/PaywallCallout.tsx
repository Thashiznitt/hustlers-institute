"use client";

import React from "react";
import { Lock, Check, Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function PaywallCallout({ onUnlock }: { onUnlock?: () => void }) {
  const premiumFeatures = [
    "Complete lifetime access to all 5 phases & 35 lessons",
    "Full database integration with user checklists",
    "All 44 interactive methodology guide cards in the vault",
    "Elevator pitch timer, content calendar, and wireframe simulator",
    "Unrestricted access to the Master Hub (Millionaire Hub) dashboard",
    "LEO AI Boardroom Coach analysis & target tracking calibrations",
    "Generate and compile HCD notes into professional PDF reports"
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200 p-8 md:p-12 shadow-sm rounded-none text-left space-y-6 font-sans">
      
      {/* Locked icon header */}
      <div className="w-16 h-16 bg-[#faf9f6] border border-red-200 text-red-500 flex items-center justify-center rounded-none">
        <Lock className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono block">
          TRIAL LIMITATION
        </span>
        <h2 className="text-xl md:text-2xl font-heading text-slate-950 uppercase tracking-widest font-bold">
          Sovereign Pro Curriculum Locked
        </h2>
        <p className="text-slate-500 text-xs leading-relaxed font-sans font-medium">
          Lessons 1.1, 1.2, and 1.3 are open as a free trial. Unlock the entire Sovereign Millionaires curriculum and start building.
        </p>
      </div>

      {/* Premium Features List */}
      <div className="border-t border-b border-slate-100 py-6 space-y-3 font-sans text-xs">
        <span className="text-[10px] font-mono text-slate-400 uppercase font-black tracking-widest block mb-2">
          What's included in Sovereign Pro
        </span>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          {premiumFeatures.map((feat, idx) => (
            <div key={idx} className="flex gap-2.5 items-start">
              <span className="shrink-0 mt-0.5 w-4 h-4 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span className="text-slate-700 leading-normal font-medium">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            if (onUnlock) {
              onUnlock();
            } else {
              window.open("/#pricing", "_self");
            }
          }}
          className="flex-1 bg-[#000000] hover:bg-[#1a1a1a] text-white font-heading text-xs uppercase tracking-widest font-bold py-4 text-center rounded-none shadow-sm transition-all h-12 cursor-pointer flex items-center justify-center gap-2"
        >
          <Zap className="w-3.5 h-3.5 fill-white text-white" /> Unlock Sovereign Pro Now
        </button>
        <button
          onClick={() => {
            window.open("/#pricing", "_self");
          }}
          className="bg-transparent border border-[#000000] text-[#000000] hover:bg-[#faf9f6] font-heading text-xs uppercase tracking-widest font-bold py-4 px-6 text-center rounded-none transition-all h-12 cursor-pointer"
        >
          Review Pricing & Tiers
        </button>
      </div>

      <div className="text-center pt-2">
        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
          🔒 SECURE CHECKOUT SHIELDED BY RESEND & PAYSTACK
        </span>
      </div>
    </div>
  );
}

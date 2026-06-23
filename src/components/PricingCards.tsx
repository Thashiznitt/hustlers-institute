"use client";

import React from "react";
import { Check } from "lucide-react";

export default function PricingCards() {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
       {/* Tier 1 - Sovereign Syndicate */}
      <div className="bg-black border-2 border-[#d4af37] rounded-none p-8 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 bg-[#d4af37] text-black font-heading font-black text-xs uppercase tracking-widest py-1.5 px-5 rounded-none">
          Best Value
        </div>
        
        <div>
          <span className="text-xs font-heading text-[#d4af37] tracking-widest uppercase block mb-1">
            TIER 01
          </span>
          <h3 className="text-xl font-heading text-white uppercase mb-3 tracking-widest font-bold">
            The Sovereign Syndicate (Full Bundle)
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-6 font-sans font-medium">
            The complete 5-Phase blueprint suite. Get lifetime access to all 15 systems, interactive sandboxes, and your sovereign graduation registry.
          </p>
          
          <div className="mb-6">
            <span className="text-4xl font-heading text-white font-bold">$799</span>
            <span className="text-slate-400 text-xs font-mono ml-1">USD / Lifetime</span>
          </div>

          <ul className="space-y-3 pt-6 border-t border-neutral-900 text-xs text-slate-300 font-sans font-medium">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>15 detailed, easy-to-follow lessons</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>All 5 interactive engineering sandboxes</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Graduation case studies & digital certificate</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Help from other founders in our community board</span>
            </li>
          </ul>
        </div>

        <a href="/learn" className="w-full text-center mt-8 py-3 rounded-none bg-[#d4af37] hover:bg-[#c59d27] text-black font-heading text-xs uppercase tracking-widest font-bold transition-all block">
          Lock In Access
        </a>
      </div>

      {/* Tier 2 - Phase Foundry Pass */}
      <div className="bg-black border border-neutral-900 rounded-none p-8 flex flex-col justify-between hover:border-[#d4af37] transition-all duration-300 relative overflow-hidden group">
        <div>
          <span className="text-xs font-heading text-slate-500 uppercase tracking-widest block mb-1">
            TIER 02
          </span>
          <h3 className="text-xl font-heading text-white uppercase mb-3 tracking-widest font-bold">
            Phase Foundry Pass
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-6 font-sans font-medium">
            Build one layer at a time. Purchase any of the 5 phases separately. Upgrade your blueprint anytime.
          </p>
          
          <div className="mb-6">
            <span className="text-4xl font-heading text-white font-bold">$300</span>
            <span className="text-slate-400 text-xs font-mono block mt-1">USD / Per Phase</span>
          </div>

          <ul className="space-y-3 pt-6 border-t border-neutral-900 text-xs text-slate-300 font-sans">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Access to any single Phase and its 3 blueprints</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Interactive sandbox for your selected phase</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Phase-specific practical case studies</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Past credits count towards full bundle upgrade</span>
            </li>
          </ul>
        </div>

        <a href="/learn" className="w-full text-center mt-8 py-3 rounded-none bg-[#d4af37] hover:bg-[#c59d27] text-black font-heading text-xs uppercase tracking-widest font-bold transition-all block">
          Forge Selected Phase
        </a>
      </div>

      {/* Tier 3 - Sovereign Platform */}
      <div className="bg-black border border-neutral-900 rounded-none p-8 flex flex-col justify-between hover:border-[#d4af37] transition-all duration-300 relative overflow-hidden group">
        <div>
          <span className="text-xs font-heading text-slate-500 uppercase tracking-widest block mb-1">
            ADDITIONAL
          </span>
          <h3 className="text-xl font-heading text-white uppercase mb-3 tracking-widest font-bold">
            Sovereign Platform
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-6 font-sans font-medium">
            Add-on access to run compliance simulations and see live data tools on your active master hub. <strong className="text-slate-350 block mt-1">(Available only after course completion)</strong>
          </p>
          
          <div className="mb-6">
            <span className="text-4xl font-heading text-white font-bold">$50</span>
            <span className="text-slate-500 text-xs font-mono ml-1">USD / Month</span>
          </div>

          <ul className="space-y-3 pt-6 border-t border-neutral-900 text-xs text-slate-300 font-sans">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Live business dashboard access</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Easy customer check tools and simulator logs</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Interactive customer data mappings</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Connect your own dummy data streams to test</span>
            </li>
          </ul>
        </div>

        <a href="/dashboard" className="w-full text-center mt-8 py-3 rounded-none bg-[#d4af37] hover:bg-[#c59d27] text-black font-heading text-xs uppercase tracking-widest font-bold transition-all block">
          Enter Master Hub
        </a>
      </div>
    </div>
  );
}

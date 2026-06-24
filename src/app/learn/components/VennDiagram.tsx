"use client";

import React from "react";
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

interface VennDiagramProps {
  feasibilityScore: number;
  desirabilityScore: number;
  viabilityScore: number;
  improvementTips?: string[];
}

export default function VennDiagram({
  feasibilityScore,
  desirabilityScore,
  viabilityScore,
  improvementTips = []
}: VennDiagramProps) {
  const isSweetSpot = feasibilityScore >= 85 && desirabilityScore >= 85 && viabilityScore >= 85;

  return (
    <div className="w-full bg-white border-2 border-black p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left space-y-6 transition-all duration-300">
      <div className="flex items-start justify-between gap-4 border-b-2 border-black pb-4">
        <div className="space-y-1">
          <h4 className="font-heading text-sm md:text-base font-black uppercase tracking-wider text-black flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
            Venture Sweet Spot Analysis
          </h4>
          <p className="text-xs text-slate-600 font-medium">
            Striving for the intersection of Desirability, Feasibility, and Viability.
          </p>
        </div>
        <div className={`px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0 ${
          isSweetSpot ? "bg-emerald-400 text-black" : "bg-amber-400 text-black"
        }`}>
          {isSweetSpot ? "Sweet Spot Achieved" : "Needs Refinement"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Venn Diagram Container */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-[280px] aspect-square">
            <svg
              viewBox="0 0 320 320"
              className="w-full h-full drop-shadow-sm overflow-visible"
            >
              <defs>
                <radialGradient id="sweetSpotGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#d97706" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                </radialGradient>
                <filter id="shadow">
                  <feDropShadow dx="2" dy="2" stdDeviation="1" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* Circles with multiply blend mode for visual overlap */}
              <g style={{ mixBlendMode: "multiply" }} className="opacity-80">
                {/* Desirability: Top */}
                <circle
                  cx="160"
                  cy="110"
                  r="72"
                  fill="rgba(244, 63, 94, 0.18)"
                  stroke="#f43f5e"
                  strokeWidth="3.5"
                  className="transition-all duration-500 hover:fill-rose-500/30"
                />
                
                {/* Feasibility: Bottom Left */}
                <circle
                  cx="115"
                  cy="185"
                  r="72"
                  fill="rgba(6, 182, 212, 0.18)"
                  stroke="#06b6d4"
                  strokeWidth="3.5"
                  className="transition-all duration-500 hover:fill-cyan-500/30"
                />

                {/* Viability: Bottom Right */}
                <circle
                  cx="205"
                  cy="185"
                  r="72"
                  fill="rgba(16, 185, 129, 0.18)"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  className="transition-all duration-500 hover:fill-emerald-500/30"
                />
              </g>

              {/* Center intersection area */}
              {isSweetSpot ? (
                <>
                  <circle
                    cx="160"
                    cy="160"
                    r="30"
                    fill="url(#sweetSpotGlow)"
                    className="animate-pulse"
                  />
                  <circle
                    cx="160"
                    cy="160"
                    r="22"
                    fill="#fbbf24"
                    stroke="#000000"
                    strokeWidth="2.5"
                    filter="url(#shadow)"
                  />
                  <text
                    x="160"
                    y="165"
                    textAnchor="middle"
                    className="text-[12px] font-black fill-black font-mono tracking-tighter"
                  >
                    🎯
                  </text>
                </>
              ) : (
                <>
                  <circle
                    cx="160"
                    cy="160"
                    r="22"
                    fill="#f1f5f9"
                    stroke="#64748b"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                  <text
                    x="160"
                    y="164"
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-slate-500 font-mono"
                  >
                    ⚠️
                  </text>
                </>
              )}

              {/* Labels with matching colors */}
              <g className="text-[10px] font-bold font-mono tracking-wider fill-black">
                {/* Desirability Label */}
                <text x="160" y="55" textAnchor="middle" className="text-xs font-black fill-rose-600">
                  DESIRABILITY
                </text>
                <text x="160" y="70" textAnchor="middle" className="text-xs font-extrabold fill-slate-800 bg-white">
                  {desirabilityScore}%
                </text>

                {/* Feasibility Label */}
                <text x="52" y="215" textAnchor="end" className="text-xs font-black fill-cyan-700">
                  FEASIBILITY
                </text>
                <text x="52" y="230" textAnchor="end" className="text-xs font-extrabold fill-slate-800">
                  {feasibilityScore}%
                </text>

                {/* Viability Label */}
                <text x="268" y="215" textAnchor="start" className="text-xs font-black fill-emerald-700">
                  VIABILITY
                </text>
                <text x="268" y="230" textAnchor="start" className="text-xs font-extrabold fill-slate-800">
                  {viabilityScore}%
                </text>

                {/* Center Sweet Spot Label */}
                <text x="160" y="295" textAnchor="middle" className="text-[10px] font-black tracking-widest fill-black uppercase">
                  {isSweetSpot ? "🚀 Sweet Spot Achieved" : "❌ Gaps to Resolve"}
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2">
            <h5 className="font-mono text-xs uppercase font-black text-black tracking-wider flex items-center gap-1.5">
              Score Breakdown & Status
            </h5>
            <div className="grid grid-cols-3 gap-2">
              <div className="border-2 border-black p-3 bg-rose-50 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-rose-650 font-mono">{desirabilityScore}%</span>
                <span className="text-[9px] font-extrabold uppercase text-rose-800 font-mono mt-0.5">Desire</span>
              </div>
              <div className="border-2 border-black p-3 bg-cyan-50 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-cyan-650 font-mono">{feasibilityScore}%</span>
                <span className="text-[9px] font-extrabold uppercase text-cyan-800 font-mono mt-0.5">Feasible</span>
              </div>
              <div className="border-2 border-black p-3 bg-emerald-50 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-emerald-650 font-mono">{viabilityScore}%</span>
                <span className="text-[9px] font-extrabold uppercase text-emerald-800 font-mono mt-0.5">Viable</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase font-black text-black tracking-wider flex items-center gap-1.5">
              💡 Actionable Recommendations
            </h5>

            {improvementTips.length > 0 ? (
              <ul className="space-y-2 text-xs">
                {improvementTips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start bg-slate-50 border border-slate-200 p-2.5 font-medium leading-relaxed text-slate-700">
                    <ArrowRight className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex gap-2.5 items-start bg-emerald-50 border border-emerald-200 p-3 text-emerald-800 text-xs font-bold leading-relaxed">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>
                  Congratulations! Your venture plan is aligned perfectly right in the center sweet spot of desirability, feasibility, and viability. You are ready to start launching!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

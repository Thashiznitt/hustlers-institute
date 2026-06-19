"use client";

import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { ShieldCheck, Award, AlertTriangle, HelpCircle } from "lucide-react";

export default function GradeCalculator() {
  // Vectors
  const [designScore, setDesignScore] = useState<number>(27); // max 30
  const [techScore, setTechScore] = useState<number>(26); // max 30
  const [opsScore, setOpsScore] = useState<number>(17); // max 20
  const [financeScore, setFinanceScore] = useState<number>(18); // max 20

  const [totalScore, setTotalScore] = useState<number>(88);

  useEffect(() => {
    setTotalScore(designScore + techScore + opsScore + financeScore);
  }, [designScore, techScore, opsScore, financeScore]);

  // Helper for handling slider values safely regardless of single number or array types
  const handleScoreChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (val: number | number[] | readonly number[]) => {
    if (Array.isArray(val)) {
      setter(val[0]);
    } else if (typeof val === "number") {
      setter(val);
    }
  };

  // Determine Certificate Level
  let certLevel = "REVISION REQUIRED";
  let badgeColor = "text-red-700 border-red-200 bg-red-50";
  let cardBorder = "border-slate-200 shadow-none rounded-none";
  let pathColor = "#ef4444";
  let adviceText = "Your Capstone portfolio requires revision to meet the passing benchmark of 80 points. Focus on strengthening technical infrastructure viability and business P&L connections.";
  let badgeIcon = <AlertTriangle className="w-4 h-4 text-red-600 animate-pulse" />;

  if (totalScore >= 90) {
    certLevel = "SOVEREIGN PRODUCT ARCHITECT (DISTINCTION)";
    badgeColor = "text-[#b59a7c] border-[#b59a7c]/40 bg-[#faf9f6]";
    cardBorder = "border-[#b59a7c] shadow-none rounded-none";
    pathColor = "#b59a7c";
    adviceText = "Distinguished performance. Your blueprint is production-ready, featuring flawless regulatory navigation, relational database logic, and a solid cross-border corporate setup.";
    badgeIcon = <Award className="w-4 h-4 text-[#b59a7c]" />;
  } else if (totalScore >= 80) {
    certLevel = "CERTIFIED PRODUCT ARCHITECT";
    badgeColor = "text-[#b59a7c] border-[#b59a7c]/30 bg-[#faf9f6]";
    cardBorder = "border-[#b59a7c] shadow-none rounded-none";
    pathColor = "#b59a7c";
    adviceText = "Core competence verified. You have designed a solid, viable digital ecosystem matching enterprise guardrails and agile backlogs. Eligible for sovereign graduation.";
    badgeIcon = <ShieldCheck className="w-4 h-4 text-[#b59a7c]" />;
  }

  // Circular gauge setup
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (totalScore / 100) * circumference;

  return (
    <section className="w-full px-6 md:px-16 lg:px-24 py-20 bg-[#faf9f6] border-y border-slate-200" id="calculator">
      <div className="max-w-7xl mx-auto flex flex-col items-start mb-12">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono mb-2">
          Assessment Matrix
        </span>
        <h2 className="text-3xl md:text-5xl font-heading text-slate-900 uppercase tracking-widest mb-4">
          Capstone Grading Engine
        </h2>
        <p className="text-slate-500 max-w-3xl text-left text-lg font-sans">
          See how the 4 core vectors shape your architectural certification. Adjust the slider weights below to calculate your dynamic portfolio result.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Sliders Area - Left Column */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-none p-6 md:p-8 flex flex-col justify-between shadow-none">
          <div className="space-y-8">
            
            {/* Vector 1 */}
            <div className="space-y-2 font-sans">
              <div className="flex justify-between items-center text-sm">
                <span className="font-heading text-slate-800 uppercase tracking-widest text-xs font-bold">
                  <span className="text-slate-400 font-mono">01.</span> Strategic Design & Behavior
                </span>
                <span className="font-mono text-slate-700 font-bold bg-slate-50 border border-slate-200 py-0.5 px-2 rounded-none">
                  {designScore} / 30 pts
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-snug">
                Contextual extraction methods (Culture Probes), regulatory CBK compliance mapping, and HMW synthesis.
              </p>
              <Slider
                value={[designScore]}
                max={30}
                step={1}
                onValueChange={handleScoreChange(setDesignScore)}
                className="pt-2 hover:cursor-grab active:cursor-grabbing"
              />
            </div>

            {/* Vector 2 */}
            <div className="space-y-2 font-sans">
              <div className="flex justify-between items-center text-sm">
                <span className="font-heading text-slate-800 uppercase tracking-widest text-xs font-bold">
                  <span className="text-slate-400 font-mono">02.</span> Technical & Server Architecture
                </span>
                <span className="font-mono text-slate-700 font-bold bg-slate-50 border border-slate-200 py-0.5 px-2 rounded-none">
                  {techScore} / 30 pts
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-snug">
                DOM rendering optimizations, relational database schema mapping, Cloudflare R2 configurations, and Tableau endpoints.
              </p>
              <Slider
                value={[techScore]}
                max={30}
                step={1}
                onValueChange={handleScoreChange(setTechScore)}
                className="pt-2 hover:cursor-grab active:cursor-grabbing"
              />
            </div>

            {/* Vector 3 */}
            <div className="space-y-2 font-sans">
              <div className="flex justify-between items-center text-sm">
                <span className="font-heading text-slate-800 uppercase tracking-widest text-xs font-bold">
                  <span className="text-slate-400 font-mono">03.</span> Operational Delivery
                </span>
                <span className="font-mono text-slate-700 font-bold bg-slate-50 border border-slate-200 py-0.5 px-2 rounded-none">
                  {opsScore} / 20 pts
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-snug">
                Jira Epic hierarchies, detailed user stories with tech acceptance criteria, and cross-functional Miro workshop setups.
              </p>
              <Slider
                value={[opsScore]}
                max={20}
                step={1}
                onValueChange={handleScoreChange(setOpsScore)}
                className="pt-2 hover:cursor-grab active:cursor-grabbing"
              />
            </div>

            {/* Vector 4 */}
            <div className="space-y-2 font-sans">
              <div className="flex justify-between items-center text-sm">
                <span className="font-heading text-slate-800 uppercase tracking-widest text-xs font-bold">
                  <span className="text-slate-400 font-mono">04.</span> Financial & GTM Feasibility
                </span>
                <span className="font-mono text-slate-700 font-bold bg-slate-50 border border-slate-200 py-0.5 px-2 rounded-none">
                  {financeScore} / 20 pts
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-snug">
                Corporate structuring (Cyprus, Dubai), product P&L metrics connection, MMF interest engines, and digital lending GTM.
              </p>
              <Slider
                value={[financeScore]}
                max={20}
                step={1}
                onValueChange={handleScoreChange(setFinanceScore)}
                className="pt-2 hover:cursor-grab active:cursor-grabbing"
              />
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
            <div className="text-slate-500 text-xs flex gap-2">
              <HelpCircle className="w-4 h-4 text-slate-650 shrink-0 mt-0.5" />
              <span>
                Grading is modeled after rigorous real-world audits. Passing standard requires a cumulative score of <strong>80 / 100</strong>.
              </span>
            </div>
            <div className="text-slate-500 text-xs flex gap-2">
              <HelpCircle className="w-4 h-4 text-slate-650 shrink-0 mt-0.5" />
              <span>
                Scores above <strong>90</strong> grant the <strong>Distinction</strong> title with direct corporate board introductions.
              </span>
            </div>
          </div>

        </div>

        {/* Dynamic Calculator Output - Right Column */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          
          {/* Radial score gauge */}
          <div className={`bg-white border p-6 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-500 ${cardBorder}`}>
            
            {/* SVG Ring */}
            <div className="relative w-36 h-36 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-slate-100"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  stroke={pathColor}
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-heading text-slate-900 tracking-tight">
                  {totalScore}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                  Cumulative
                </span>
              </div>
            </div>

            {/* Badge */}
            <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none border text-xs font-heading tracking-widest uppercase mb-3 ${badgeColor} font-bold`}>
              {badgeIcon}
              <span>{certLevel}</span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed max-w-sm px-2 font-sans">
              {adviceText}
            </p>
          </div>

          {/* Diagnostics checklist */}
          <div className="bg-white border border-slate-200 rounded-none p-6 flex-1 flex flex-col justify-between shadow-none">
            <div>
              <h4 className="font-heading text-slate-900 text-xs uppercase tracking-widest mb-4 font-bold">
                Curriculum Audit Warnings
              </h4>
              <div className="space-y-3.5 font-sans">
                <div className="flex gap-2.5 items-start text-xs">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${designScore < 24 ? "bg-amber-600" : "bg-slate-800"}`} />
                  <div>
                    <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px] font-mono">Strategic Design Segment</span>
                    <span className="text-slate-500 leading-snug">
                      {designScore < 24 ? "Warning: Generic persona mapping detected. Needs Culture Probes logs." : "Diagnostics clear. Research tools fully integrated."}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start text-xs">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${techScore < 24 ? "bg-amber-600" : "bg-slate-800"}`} />
                  <div>
                    <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px] font-mono">Server Infrastructure Segment</span>
                    <span className="text-slate-500 leading-snug">
                      {techScore < 24 ? "Warning: rel-model ignores performance load constraints or Cloudflare routing." : "Diagnostics clear. Architecture scales to 15,000+ users."}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start text-xs">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${opsScore < 16 ? "bg-amber-600" : "bg-slate-800"}`} />
                  <div>
                    <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px] font-mono">Operational Delivery Segment</span>
                    <span className="text-slate-500 leading-snug">
                      {opsScore < 16 ? "Warning: Backlog needs precise user stories matching engineering cycles." : "Diagnostics clear. Sprints mapped with valid acceptance criteria."}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start text-xs">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${financeScore < 16 ? "bg-amber-600" : "bg-slate-800"}`} />
                  <div>
                    <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px] font-mono">Financial GTM Segment</span>
                    <span className="text-slate-500 leading-snug">
                      {financeScore < 16 ? "Warning: Business strategy fails to tie design metrics back to client P&L." : "Diagnostics clear. Cross-border structure supports VC routing."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

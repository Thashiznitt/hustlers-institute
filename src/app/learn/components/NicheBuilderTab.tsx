"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SovereignInput as Input } from "@/components/ui/SovereignInput";
import { SovereignSelect as Select } from "@/components/ui/SovereignSelect";
import { SovereignTextarea as Textarea } from "@/components/ui/SovereignTextarea";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BrutalistDialog } from "./BrutalistDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, RefreshCw, Trash2, ArrowRight } from "lucide-react";
import { industryDefaults } from "../data/cards-map";
import { useLearnProgress } from "../hooks/useLearnProgress";
import VennDiagram from "./VennDiagram";

function renderFormattedReport(reportText: string) {
  if (!reportText) return null;

  const lines = reportText.split("\n");
  const sections: { title: string; bullets: { label: string; text: string }[] }[] = [];
  let currentSection: { title: string; bullets: { label: string; text: string }[] } | null = null;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith("####")) {
      if (currentSection) sections.push(currentSection);
      currentSection = {
        title: trimmed.replace(/####\s*/, ""),
        bullets: []
      };
    } else if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
      if (currentSection) {
        const rawContent = trimmed.replace(/^[\*\-\s]+/, "");
        const boldMatch = rawContent.match(/^\*\*(.*?)\*\*:\s*(.*)/);
        if (boldMatch) {
          currentSection.bullets.push({
            label: boldMatch[1],
            text: boldMatch[2]
          });
        } else {
          currentSection.bullets.push({
            label: "",
            text: rawContent
          });
        }
      }
    }
  });
  if (currentSection) sections.push(currentSection);

  if (sections.length === 0) {
    return <div className="whitespace-pre-wrap text-slate-700 font-medium leading-relaxed">{reportText}</div>;
  }

  return (
    <div className="space-y-4">
      {sections.map((sec, idx) => (
        <div key={idx} className="border-2 border-black p-4 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-left">
          <h5 className="font-mono text-xs font-black uppercase text-black border-b border-slate-200 pb-1.5 mb-2.5 flex items-center gap-2">
            <span className="w-5 h-5 flex items-center justify-center bg-black text-white text-[9px] font-black rounded-none">
              {idx + 1}
            </span>
            {sec.title}
          </h5>
          <div className="space-y-2">
            {sec.bullets.map((b, bIdx) => (
              <div key={bIdx} className="text-xs leading-relaxed text-slate-700">
                {b.label && (
                  <span className="inline-block px-1.5 py-0.5 bg-slate-100 text-slate-800 font-mono font-black uppercase text-[9px] border border-slate-300 mr-2 rounded-none">
                    {b.label}
                  </span>
                )}
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function NicheBuilderTab() {
  const { activePhaseIndex } = useLearnProgress();
  const [activeSubTab, setActiveSubTab] = useState<"creator" | "alignment" | "ledger">("creator");

  const [ventureName, setVentureName] = useState("");
  const [ventureIndustry, setVentureIndustry] = useState("");
  const [ventureType, setVentureType] = useState("");

  // 5 Ws
  const [whatProblem, setWhatProblem] = useState("");
  const [whoAffected, setWhoAffected] = useState("");
  const [whereHappening, setWhereHappening] = useState("");
  const [whenHappening, setWhenHappening] = useState("");
  const [howHappening, setHowHappening] = useState("");

  // AI
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiNicheSummary, setAiNicheSummary] = useState("");
  const [leoReport, setLeoReport] = useState("");
  const [isBrainstormModalOpen, setIsBrainstormModalOpen] = useState(false);
  const [alignmentScore, setAlignmentScore] = useState<number | null>(null);
  const [alignmentFeedback, setAlignmentFeedback] = useState("");

  // Venn Diagram Scores
  const [feasibilityScore, setFeasibilityScore] = useState<number>(75);
  const [desirabilityScore, setDesirabilityScore] = useState<number>(80);
  const [viabilityScore, setViabilityScore] = useState<number>(75);
  const [improvementTips, setImprovementTips] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const vn = localStorage.getItem("hi_venture_name");
    const vi = localStorage.getItem("hi_venture_industry");
    const vt = localStorage.getItem("hi_venture_type");
    const nf = localStorage.getItem("hi_niche_builder_fields");
    const ai = localStorage.getItem("hi_niche_ai_data");

    if (vn) setVentureName(vn);
    if (vi) setVentureIndustry(vi);
    if (vt) setVentureType(vt);
    if (nf) {
      const p = JSON.parse(nf);
      setWhatProblem(p.what || "");
      setWhoAffected(p.who || "");
      setWhereHappening(p.where || "");
      setWhenHappening(p.when || "");
      setHowHappening(p.how || "");
    }
    if (ai) {
      const p = JSON.parse(ai);
      setAiNicheSummary(p.nicheSummary || "");
      setLeoReport(p.boardroomReport || "");
      setAlignmentScore(p.alignmentScore !== undefined ? p.alignmentScore : null);
      setAlignmentFeedback(p.alignmentFeedback || "");

      let fScore = p.feasibilityScore;
      let dScore = p.desirabilityScore;
      let vScore = p.viabilityScore;
      let tips = p.improvementTips || [];

      if (fScore === undefined || dScore === undefined || vScore === undefined) {
        const targetWhat = p.what || "";
        const targetWho = p.who || "";
        const targetHow = p.how || "";
        const targetWhere = p.where || "";

        const base = p.alignmentScore !== undefined ? p.alignmentScore : 85;
        let d = base;
        let f = base - 3;
        let v = base - 5;
        
        if (targetWho.length > 15) d += 5;
        if (targetWhat.length > 20) d += 3;
        if (targetHow.length > 20) v += 6;
        if (targetWhere.length > 15) f += 4;

        fScore = Math.min(Math.max(f, 50), 98);
        dScore = Math.min(Math.max(d, 50), 98);
        vScore = Math.min(Math.max(v, 50), 98);

        tips = [];
        if (dScore < 85) {
          tips.push(`Desirability: Talk to 5 more people matching "${targetWho || "your customers"}" to prove that they are actively trying to solve "${targetWhat || "the problem"}" right now.`);
        }
        if (fScore < 85) {
          tips.push(`Feasibility: Simplify the tech stack and MVP flow at "${targetWhere || "the location"}" to launch without complex features.`);
        }
        if (vScore < 85) {
          tips.push(`Viability: Establish higher pricing tiers and reduce initial transaction costs to reach your break-even goal faster.`);
        }
      }

      setFeasibilityScore(fScore);
      setDesirabilityScore(dScore);
      setViabilityScore(vScore);
      setImprovementTips(tips);
    }
  }, []);

  const handleVentureNameChange = (v: string) => {
    setVentureName(v);
    localStorage.setItem("hi_venture_name", v);
    window.dispatchEvent(new Event("storage"));
  };

  const handleVentureIndustryChange = (v: string) => {
    setVentureIndustry(v);
    localStorage.setItem("hi_venture_industry", v);
    const d = industryDefaults[v] || "";
    setVentureType(d);
    localStorage.setItem("hi_venture_type", d);
    window.dispatchEvent(new Event("storage"));
  };

  const handleVentureTypeChange = (v: string) => {
    setVentureType(v);
    localStorage.setItem("hi_venture_type", v);
    window.dispatchEvent(new Event("storage"));
  };

  const handleNicheFieldChange = (field: string, val: string) => {
    const fields = {
      what: field === "what" ? val : whatProblem,
      who: field === "who" ? val : whoAffected,
      where: field === "where" ? val : whereHappening,
      when: field === "when" ? val : whenHappening,
      how: field === "how" ? val : howHappening,
    };
    if (field === "what") setWhatProblem(val);
    if (field === "who") setWhoAffected(val);
    if (field === "where") setWhereHappening(val);
    if (field === "when") setWhenHappening(val);
    if (field === "how") setHowHappening(val);
    localStorage.setItem("hi_niche_builder_fields", JSON.stringify(fields));
    window.dispatchEvent(new Event("storage"));
  };

  const handleClearNiche = () => {
    setVentureName("");
    setVentureIndustry("");
    setVentureType("");
    setWhatProblem("");
    setWhoAffected("");
    setWhereHappening("");
    setWhenHappening("");
    setHowHappening("");
    setAiNicheSummary("");
    setLeoReport("");
    setAlignmentScore(null);
    setAlignmentFeedback("");
    setFeasibilityScore(75);
    setDesirabilityScore(80);
    setViabilityScore(75);
    setImprovementTips([]);

    localStorage.removeItem("hi_venture_name");
    localStorage.removeItem("hi_venture_industry");
    localStorage.removeItem("hi_venture_type");
    localStorage.removeItem("hi_niche_builder_fields");
    localStorage.removeItem("hi_niche_ai_data");

    window.dispatchEvent(new Event("storage"));
  };

  const handleBrainstormNiche = async () => {
    setLoadingAI(true);
    setLeoReport("");
    setIsBrainstormModalOpen(true);
    try {
      const exercise11 = JSON.parse(localStorage.getItem("hi_exercise_1.1") || "null");
      const exercise12 = JSON.parse(localStorage.getItem("hi_exercise_1.2") || "null");
      const exercise13 = JSON.parse(localStorage.getItem("hi_exercise_1.3") || "null");
      const exercise21 = JSON.parse(localStorage.getItem("hi_exercise_2.1") || "null");
      const exercise22 = JSON.parse(localStorage.getItem("hi_exercise_2.2") || "null");
      const exercise23 = JSON.parse(localStorage.getItem("hi_exercise_2.3") || "null");
      const exercise31 = JSON.parse(localStorage.getItem("hi_exercise_3.1") || "null");
      const exercise32 = JSON.parse(localStorage.getItem("hi_exercise_3.2") || "null");
      const exercise33 = JSON.parse(localStorage.getItem("hi_exercise_3.3") || "null");
      const exercise41 = JSON.parse(localStorage.getItem("hi_exercise_4.1") || "null");
      const exercise42 = JSON.parse(localStorage.getItem("hi_exercise_4.2") || "null");
      const exercise43 = JSON.parse(localStorage.getItem("hi_exercise_4.3") || "null");
      const exercise51 = JSON.parse(localStorage.getItem("hi_exercise_5.1") || "null");
      const exercise52 = JSON.parse(localStorage.getItem("hi_exercise_5.2") || "null");
      const exercise53 = JSON.parse(localStorage.getItem("hi_exercise_5.3") || "null");
      const cardNotes = JSON.parse(localStorage.getItem("hi_card_notes") || "{}");

      const res = await fetch("/api/niche-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: ventureName,
          industry: ventureIndustry,
          whatProblem,
          whoAffected,
          whereHappening,
          whenHappening,
          howHappening,
          cardNotes,
          exercise11,
          exercise12,
          exercise13,
          exercise21,
          exercise22,
          exercise23,
          exercise31,
          exercise32,
          exercise33,
          exercise41,
          exercise42,
          exercise43,
          exercise51,
          exercise52,
          exercise53
        })
      });
      const data = await res.json();
      if (data.success) {
        setAiNicheSummary(data.nicheSummary || "");
        if (data.customType) {
          setVentureType(data.customType);
          localStorage.setItem("hi_venture_type", data.customType);
        }
        setLeoReport(data.boardroomReport || "");
        setAlignmentScore(data.alignmentScore !== undefined ? data.alignmentScore : null);
        setAlignmentFeedback(data.alignmentFeedback || "");
        
        const fScore = data.feasibilityScore !== undefined ? data.feasibilityScore : 80;
        const dScore = data.desirabilityScore !== undefined ? data.desirabilityScore : 82;
        const vScore = data.viabilityScore !== undefined ? data.viabilityScore : 78;
        const tips = data.improvementTips || [];
        
        setFeasibilityScore(fScore);
        setDesirabilityScore(dScore);
        setViabilityScore(vScore);
        setImprovementTips(tips);

        localStorage.setItem(
          "hi_niche_ai_data",
          JSON.stringify({
            nicheSummary: data.nicheSummary,
            customApplications: data.customApplications,
            boardroomReport: data.boardroomReport,
            alignmentScore: data.alignmentScore,
            alignmentFeedback: data.alignmentFeedback,
            feasibilityScore: fScore,
            desirabilityScore: dScore,
            viabilityScore: vScore,
            improvementTips: tips
          })
        );
        window.dispatchEvent(new Event("storage"));
        // Auto transition to Sweet Spot tab to present analysis
        setActiveSubTab("alignment");
      } else {
        setLeoReport(`Error: ${data.error}`);
      }
    } catch (e: any) {
      setLeoReport(`Network error: ${e.message}`);
    } finally {
      setLoadingAI(false);
    }
  };

  const fieldsConfig = activePhaseIndex === 4 ? [
    { label: "What is the launch plan?", key: "what", val: whatProblem },
    { label: "Who is on the team?", key: "who", val: whoAffected },
    { label: "Where are feedback loops?", key: "where", val: whereHappening },
    { label: "When is launch day?", key: "when", val: whenHappening },
    { label: "How will you scale?", key: "how", val: howHappening },
  ] : activePhaseIndex === 3 ? [
    { label: "What is the pricing tier?", key: "what", val: whatProblem },
    { label: "What is the revenue model?", key: "who", val: whoAffected },
    { label: "Where is the price defensible?", key: "where", val: whereHappening },
    { label: "When do clients pay?", key: "when", val: whenHappening },
    { label: "How does it break even?", key: "how", val: howHappening },
  ] : activePhaseIndex === 2 ? [
    { label: "What is the product?", key: "what", val: whatProblem },
    { label: "What does it deliver?", key: "who", val: whoAffected },
    { label: "Where does it deliver value?", key: "where", val: whereHappening },
    { label: "When does it deliver value?", key: "when", val: whenHappening },
    { label: "Why choose it over alternatives?", key: "how", val: howHappening },
  ] : [
    { label: "What is the problem?", key: "what", val: whatProblem },
    { label: "Who is affected?", key: "who", val: whoAffected },
    { label: "Where?", key: "where", val: whereHappening },
    { label: "When?", key: "when", val: whenHappening },
    { label: "How is it broken?", key: "how", val: howHappening },
  ];

  return (
    <div className="w-full pb-12 font-sans space-y-6">
      {/* Header Info */}
      <div className="mb-6 text-left">
        <h2 className="font-heading text-2xl font-extrabold text-slate-909 mb-1 uppercase tracking-wider flex items-center gap-2">
          <span>Venture Niche Builder</span>
          <span className="text-[10px] bg-slate-900 text-white px-2.5 py-1 rounded-none font-mono font-bold uppercase tracking-widest leading-none">
            Coherence Lab
          </span>
        </h2>
        <p className="text-slate-500 text-sm">Define your venture details and align them across desirability, feasibility, and viability layers.</p>
      </div>

      {/* Sub navigation tabs */}
      <div className="flex flex-wrap gap-2 border-b border-black pb-4 mb-6">
        <button
          onClick={() => setActiveSubTab("creator")}
          className={`px-4 py-2.5 text-xs font-mono font-black uppercase border-2 border-black transition-all cursor-pointer ${
            activeSubTab === "creator"
              ? "bg-slate-900 text-white shadow-none translate-x-[2px] translate-y-[2px]"
              : "bg-white text-slate-800 hover:bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          🛠️ Niche Creator
        </button>
        <button
          onClick={() => setActiveSubTab("alignment")}
          className={`px-4 py-2.5 text-xs font-mono font-black uppercase border-2 border-black transition-all cursor-pointer ${
            activeSubTab === "alignment"
              ? "bg-slate-900 text-white shadow-none translate-x-[2px] translate-y-[2px]"
              : "bg-white text-slate-800 hover:bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          🎯 Sweet Spot Alignment
        </button>
        <button
          onClick={() => setActiveSubTab("ledger")}
          className={`px-4 py-2.5 text-xs font-mono font-black uppercase border-2 border-black transition-all cursor-pointer ${
            activeSubTab === "ledger"
              ? "bg-slate-900 text-white shadow-none translate-x-[2px] translate-y-[2px]"
              : "bg-white text-slate-800 hover:bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          📓 Boardroom Ledger
        </button>
      </div>

      {/* Creator Form Tab */}
      {activeSubTab === "creator" && (
        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardContent className="p-6 md:p-8">
            <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-black flex items-center gap-2 mb-4 border-b border-black pb-3 font-mono text-left">
              🛠️ Niche Creator Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono text-left">Brand Name</Label>
                  <Input type="text" value={ventureName} onChange={(e) => handleVentureNameChange(e.target.value)} placeholder="Name your venture" className="rounded-none h-10 text-sm placeholder:text-slate-400" />
                </div>
                <div>
                  <Label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono text-left">Industry</Label>
                  <Select value={ventureIndustry} onChange={(e) => handleVentureIndustryChange(e.target.value)}>
                    <option value="" disabled>Select your industry</option>
                    {Object.keys(industryDefaults).map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono text-left">Service Type</Label>
                  <Textarea rows={3} value={ventureType} onChange={(e) => handleVentureTypeChange(e.target.value)} placeholder="What does your venture offer? (e.g. bookings, delivery, custom orders)" className="rounded-none text-sm resize-none placeholder:text-slate-400" />
                </div>
              </div>
              <div className="space-y-3">
                {fieldsConfig.map((f) => (
                  <div key={f.key}>
                    <Label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono text-left">{f.label}</Label>
                    <Input type="text" value={f.val} onChange={(e) => handleNicheFieldChange(f.key, e.target.value)} placeholder={f.label} className="rounded-none h-10 text-sm placeholder:text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 border-t-2 border-black pt-6 flex justify-end gap-3">
              <Button 
                onClick={handleClearNiche} 
                variant="outline" 
                className="border-2 border-red-600 hover:bg-red-50 text-red-600 rounded-none font-mono font-black uppercase text-xs h-11 px-6 shadow-[2px_2px_0px_0px_rgba(220,38,38,1)] cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Clear Niche Data
              </Button>
              <Button onClick={handleBrainstormNiche} disabled={loadingAI} className="bg-black hover:bg-slate-900 text-white font-bold rounded-none uppercase tracking-widest text-xs h-11 px-6 border-2 border-black transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {loadingAI ? <><RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5" /> Brainstorming...</> : <><Sparkles className="w-3.5 h-3.5 mr-1.5" /> Brainstorm with LEO</>}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alignment / Venn Diagram Tab */}
      {activeSubTab === "alignment" && (
        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardContent className="p-6 md:p-8 space-y-6">
            <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-black flex items-center gap-2 mb-4 border-b border-black pb-3 font-mono text-left">
              🎯 Sweet Spot Alignment Analysis
            </h3>
            {aiNicheSummary ? (
              <div className="space-y-6">
                <div className="bg-[#eae3d7]/30 border-2 border-black p-6 shadow-none relative overflow-hidden rounded-none">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2 text-left">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eae3d7] text-[#5c5346] rounded-none border border-[#5c5346]/20 text-[10px] font-extrabold uppercase tracking-widest font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-amber-700 fill-amber-350 animate-pulse" />
                        LEO Coherence Analysis
                      </span>
                      <h4 className="text-base font-bold text-slate-800 leading-tight uppercase font-mono tracking-wider">
                        Venture Niche Alignment
                      </h4>
                      <p className="text-xs text-slate-655 max-w-xl leading-relaxed">
                        {alignmentFeedback || "Your inputs are successfully mapped across your previous lessons. Leo has evaluated the flow of your ideas."}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 shrink-0 bg-white border-2 border-black p-4 rounded-none">
                      <div className="relative flex items-center justify-center">
                        <div className="text-center">
                          <span className="block text-3xl font-black text-slate-900 font-mono">
                            {alignmentScore || 85}%
                          </span>
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-450 font-mono block mt-0.5">
                            Connection Score
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border-2 border-black p-5 rounded-none text-left">
                  <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-amber-800 flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-300" />
                    LEO Niche Summary:
                  </span>
                  <p className="text-amber-950 font-bold italic text-sm leading-relaxed">&ldquo;{aiNicheSummary}&rdquo;</p>
                </div>

                <VennDiagram
                  feasibilityScore={feasibilityScore}
                  desirabilityScore={desirabilityScore}
                  viabilityScore={viabilityScore}
                  improvementTips={improvementTips}
                />
              </div>
            ) : (
              <div className="border-2 border-black border-dashed p-8 bg-slate-50 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="font-mono text-sm font-black uppercase text-slate-800">LEO Analysis Pending</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Fill in your brand and niche details in the <strong>Niche Creator</strong> tab, and click <strong>Brainstorm with LEO</strong> to unlock your Sweet Spot Alignment and Boardroom Ledger reports.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Boardroom Ledger Tab */}
      {activeSubTab === "ledger" && (
        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardContent className="p-6 md:p-8 space-y-6">
            <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-black flex items-center gap-2 mb-4 border-b border-black pb-3 font-mono text-left">
              📓 Executive Boardroom Ledger
            </h3>
            {leoReport ? (
              <div className="border-2 border-black p-5 bg-slate-50 text-xs">
                <h5 className="font-heading text-xs font-black uppercase tracking-wider text-black border-b-2 border-black pb-2 mb-4 font-mono flex items-center gap-2">
                  📓 Executive Lens Boardroom Ledger
                </h5>
                <div className="pr-1">
                  {renderFormattedReport(leoReport)}
                </div>
              </div>
            ) : (
              <div className="border-2 border-black border-dashed p-8 bg-slate-50 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="font-mono text-sm font-black uppercase text-slate-800">LEO Report Pending</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Fill in your brand and niche details in the <strong>Niche Creator</strong> tab, and click <strong>Brainstorm with LEO</strong> to unlock your Sweet Spot Alignment and Boardroom Ledger reports.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* AI BOARDROOM MODAL LOADER */}
      <BrutalistDialog open={isBrainstormModalOpen} onOpenChange={setIsBrainstormModalOpen} className="max-w-4xl lg:!max-w-6xl md:!max-w-4xl">
        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-sm font-heading uppercase tracking-widest font-black flex items-center gap-2 font-mono text-slate-900">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-350 animate-pulse" />
              LEO Boardroom Report
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 font-medium">
              LEO's evaluation of your venture niche and sweet spot mapping
            </DialogDescription>
          </DialogHeader>
          
          {loadingAI ? (
            <div className="space-y-3 py-4">
              {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-4 w-full rounded-none" />)}
              <p className="text-xs text-slate-400 text-center animate-pulse">LEO is analyzing your venture...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="sticky top-0">
                  <VennDiagram
                    feasibilityScore={feasibilityScore}
                    desirabilityScore={desirabilityScore}
                    viabilityScore={viabilityScore}
                    improvementTips={improvementTips}
                  />
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4 max-h-[550px] overflow-y-auto pr-1">
                {renderFormattedReport(leoReport)}
              </div>
            </div>
          )}
          
          <div className="flex justify-end mt-6 border-t border-slate-200 pt-4">
            <Button variant="outline" onClick={() => setIsBrainstormModalOpen(false)} className="rounded-none border-slate-250 text-xs font-bold bg-white text-slate-700 hover:text-black">
              Close Report
            </Button>
          </div>
        </div>
      </BrutalistDialog>
    </div>
  );
}

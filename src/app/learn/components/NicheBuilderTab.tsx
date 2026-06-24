"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BrutalistDialog } from "./BrutalistDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, RefreshCw } from "lucide-react";
import { industryDefaults } from "../data/cards-map";
import { useLearnProgress } from "../hooks/useLearnProgress";

export default function NicheBuilderTab() {
  const { activePhaseIndex } = useLearnProgress();

  const [ventureName, setVentureName] = useState("OneApp Lifestyle");
  const [ventureIndustry, setVentureIndustry] = useState("Sports & Recreation");
  const [ventureType, setVentureType] = useState("Muay Thai bookings, meal delivery, and local rides");

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
    }
  }, []);

  const handleVentureNameChange = (v: string) => {
    setVentureName(v);
    localStorage.setItem("hi_venture_name", v);
    // Dispatch storage event for same-tab updates
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
        localStorage.setItem(
          "hi_niche_ai_data",
          JSON.stringify({
            nicheSummary: data.nicheSummary,
            customApplications: data.customApplications,
            boardroomReport: data.boardroomReport,
            alignmentScore: data.alignmentScore,
            alignmentFeedback: data.alignmentFeedback
          })
        );
        window.dispatchEvent(new Event("storage"));
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
    <div className="w-full pb-12">
      <Card className="border border-slate-200 rounded-none shadow-none">
        <CardContent className="p-6 md:p-8">
          <h3 className="font-heading text-slate-900 text-sm uppercase tracking-widest font-bold flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <Sparkles className="w-5 h-5 text-amber-500" /> Niche Builder & AI Brainstorming
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono">Brand Name</Label>
                <Input type="text" value={ventureName} onChange={(e) => handleVentureNameChange(e.target.value)} className="border-slate-350 rounded-none h-10 text-sm bg-white focus-visible:ring-0 focus-visible:border-black" />
              </div>
              <div>
                <Label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono">Industry</Label>
                <Select value={ventureIndustry} onValueChange={(v) => handleVentureIndustryChange(v || "")}>
                  <SelectTrigger className="border-slate-350 rounded-none h-10 text-sm bg-white focus:ring-0 focus:border-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none text-xs border border-slate-350 bg-white">
                    {Object.keys(industryDefaults).map((k) => (
                      <SelectItem key={k} value={k} className="rounded-none">{k}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono">Service Type</Label>
                <Textarea rows={3} value={ventureType} onChange={(e) => handleVentureTypeChange(e.target.value)} className="border-slate-350 rounded-none text-sm bg-white resize-none focus-visible:ring-0 focus-visible:border-black" />
              </div>
            </div>
            <div className="space-y-3">
              {fieldsConfig.map((f) => (
                <div key={f.key}>
                  <Label className="block text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono">{f.label}</Label>
                  <Input type="text" value={f.val} onChange={(e) => handleNicheFieldChange(f.key, e.target.value)} className="border-slate-350 rounded-none h-10 text-sm bg-white focus-visible:ring-0 focus-visible:border-black" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 border-t border-slate-200 pt-6 flex justify-end">
            <Button onClick={handleBrainstormNiche} disabled={loadingAI} className="bg-black hover:bg-[#1a1a1a] text-white font-bold rounded-none uppercase tracking-widest text-xs h-10 gap-2 border border-black transition-all">
              {loadingAI ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Brainstorming...</> : <><Sparkles className="w-3.5 h-3.5" /> Brainstorm with AI</>}
            </Button>
          </div>
          {aiNicheSummary && (
            <div className="mt-6 space-y-4 text-left">
              <div className="bg-[#eae3d7]/30 border border-slate-200 p-6 shadow-none relative overflow-hidden rounded-none">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eae3d7] text-[#5c5346] rounded-none text-[10px] font-extrabold uppercase tracking-widest font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700 fill-amber-350 animate-pulse" />
                      AI Coherence Analysis
                    </span>
                    <h4 className="text-base font-bold text-slate-800 leading-tight uppercase font-mono tracking-wider">
                      Venture Niche Alignment
                    </h4>
                    <p className="text-xs text-slate-650 max-w-xl leading-relaxed">
                      {alignmentFeedback || "Your inputs are successfully mapped across your previous lessons. Leo has evaluated the flow of your ideas."}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0 bg-white border border-slate-200 p-4 rounded-none">
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

              <div className="bg-amber-50 border border-amber-250 p-5 rounded-none">
                <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-amber-800 flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-300" />
                  AI Niche Summary:
                </span>
                <p className="text-amber-950 font-bold italic text-sm leading-relaxed">&ldquo;{aiNicheSummary}&rdquo;</p>
              </div>
            </div>
          )}
          {leoReport && (
            <div className="bg-slate-50 border border-slate-200 rounded-none p-4 mt-4 max-h-60 overflow-y-auto text-xs font-sans whitespace-pre-wrap">{leoReport}</div>
          )}
        </CardContent>
      </Card>

      {/* AI BOARDROOM MODAL */}
      <BrutalistDialog open={isBrainstormModalOpen} onOpenChange={setIsBrainstormModalOpen} className="max-w-2xl">
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-sm font-heading uppercase tracking-widest font-black flex items-center gap-2 font-mono text-slate-900"><Sparkles className="w-4 h-4 text-amber-500 fill-amber-350" /> LEO Boardroom Report</DialogTitle>
            <DialogDescription className="text-xs text-slate-500 font-medium">LEO's AI evaluation of your venture niche</DialogDescription>
          </DialogHeader>
          {loadingAI ? (
            <div className="space-y-3 py-4">
              {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-4 w-full rounded-none" />)}
              <p className="text-xs text-slate-400 text-center animate-pulse">LEO is analyzing your venture...</p>
            </div>
          ) : (
            <div className="whitespace-pre-wrap text-xs text-slate-700 bg-slate-50 p-4 rounded-none border border-slate-100 max-h-80 overflow-y-auto">{leoReport || "No report generated yet."}</div>
          )}
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => setIsBrainstormModalOpen(false)} className="rounded-none border-slate-250 text-xs font-bold bg-white text-slate-700 hover:text-black">Close</Button>
          </div>
        </div>
      </BrutalistDialog>
    </div>
  );
}

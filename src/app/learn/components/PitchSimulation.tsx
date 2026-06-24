"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SovereignInput } from "@/components/ui/SovereignInput";
import { SovereignTextarea } from "@/components/ui/SovereignTextarea";
import { 
  Sparkles, 
  Mic, 
  MicOff, 
  User, 
  TrendingUp, 
  CheckCircle2, 
  Lock, 
  Loader2, 
  ArrowRight,
  ShieldAlert,
  Volume2
} from "lucide-react";

interface PitchSimulationProps {
  lessonId: string;
  onComplete: () => void;
}

interface GradingResult {
  grade: "A" | "B" | "C" | "D";
  score: number;
  feedback: string;
  breakdown: {
    clarity: string;
    viability: string;
    math: string;
  };
  boardQuestions: string[];
}

export default function PitchSimulation({ lessonId, onComplete }: PitchSimulationProps) {
  // Load venture details from localStorage
  const [ventureName, setVentureName] = useState("My Venture");
  const [industry, setIndustry] = useState("Lifestyle");
  const [persona, setPersona] = useState("target customer");
  const [pricePoint, setPricePoint] = useState("custom rate");
  const [revenueModel, setRevenueModel] = useState("retainer");

  // Interactive controls
  const [evaluatorRole, setEvaluatorRole] = useState<"investor" | "consumer">("investor");
  const [pitchText, setPitchText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Grading states
  const [result, setResult] = useState<GradingResult | null>(null);
  const [followupAnswers, setFollowupAnswers] = useState<string[]>(["", "", ""]);
  const [submittedAnswers, setSubmittedAnswers] = useState(false);

  // Speech recognition API ref
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const vn = localStorage.getItem("hi_venture_name");
      const vi = localStorage.getItem("hi_venture_industry");
      const p22 = localStorage.getItem("hi_exercise_2.2"); // Persona
      const p41 = localStorage.getItem("hi_exercise_4.1"); // Pricing
      const p43 = localStorage.getItem("hi_exercise_4.3"); // Offer sheet

      if (vn) setVentureName(vn);
      if (vi) setIndustry(vi);
      if (p22) {
        try {
          const parsed = JSON.parse(p22);
          if (parsed.name) setPersona(parsed.name);
        } catch {}
      }
      if (p41) {
        try {
          const parsed = JSON.parse(p41);
          if (parsed.pricingTier) setPricePoint(parsed.pricingTier);
        } catch {}
      }
      if (p43) {
        try {
          const parsed = JSON.parse(p43);
          if (parsed.revenueModel) setRevenueModel(parsed.revenueModel);
        } catch {}
      }

      // Check for SpeechRecognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = "en-US";

        rec.onresult = (event: any) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setPitchText(prev => prev + (prev ? " " : "") + finalTranscript);
          }
        };

        rec.onerror = (e: any) => {
          console.error("Speech recognition error:", e);
          setIsListening(false);
        };

        rec.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, [lessonId]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice speech recognition is not supported in this browser. Please type your pitch statement in the text box.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleGradePitch = async () => {
    if (!pitchText.trim()) return;
    setLoading(true);
    setResult(null);
    setSubmittedAnswers(false);
    setFollowupAnswers(["", "", ""]);

    try {
      const response = await fetch("/api/pitch-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: ventureName,
          industry,
          targetPersona: persona,
          pricingTier: pricePoint,
          revenueModel,
          pitchStatement: pitchText,
          evaluatorRole
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        console.error("Pitch simulation API failed");
      }
    } catch (err) {
      console.error("Error calling pitch API:", err);
    } finally {
      setLoading(false);
    }
  };

  const wordCount = pitchText.trim().split(/\s+/).filter(Boolean).length;
  // Guidelines: average 30 second pitch is 60-75 words.
  const isOptimalLength = wordCount >= 45 && wordCount <= 90;

  const handleAnswerSubmit = () => {
    setSubmittedAnswers(true);
  };

  const getGradeColor = (g: string) => {
    switch (g) {
      case "A": return "border-emerald-500 text-emerald-600 bg-emerald-50";
      case "B": return "border-sky-500 text-sky-600 bg-sky-50";
      case "C": return "border-amber-500 text-amber-600 bg-amber-50";
      default: return "border-rose-500 text-rose-600 bg-rose-50";
    }
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="bg-[#1e293b] text-white p-5 rounded-xl border border-slate-700 flex flex-col sm:flex-row justify-between gap-4 text-left">
        <div>
          <span className="text-[10px] bg-amber-500 text-slate-900 font-mono font-bold px-2 py-0.5 rounded tracking-widest uppercase">
            Active Venture Context
          </span>
          <h3 className="text-base font-bold mt-2 uppercase tracking-wide font-mono">
            {ventureName}
          </h3>
          <p className="text-xs text-slate-350 mt-1 leading-normal max-w-lg">
            Targeting **{persona}** in the **{industry}** sector at a pricing of **{pricePoint}** using a **{revenueModel}** structure.
          </p>
        </div>
        <div className="flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-2 shrink-0">
          <span className="text-[9px] uppercase font-mono text-slate-400">XP Reward</span>
          <span className="text-sm font-black text-amber-400 bg-white/10 px-3 py-1 rounded font-mono">
            +100 XP
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Setup & Input (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
            <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-4 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-500" />
                Select Board Evaluator
              </h3>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setEvaluatorRole("investor")}
                  className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    evaluatorRole === "investor"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  Investor VC
                </button>
                <button
                  onClick={() => setEvaluatorRole("consumer")}
                  className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    evaluatorRole === "consumer"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  Target Client
                </button>
              </div>
            </div>
            <CardContent className="p-5 text-left flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Evaluator Focus Description
                </label>
                <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed font-medium">
                  {evaluatorRole === "investor" ? (
                    <span>
                      💼 **Investor Mode**: Focuses strictly on financial defensibility, customer acquisition strategies, scalable monetization, and business profit margins.
                    </span>
                  ) : (
                    <span>
                      🤩 **Consumer Mode**: Focuses strictly on solving personal struggles, ease of onboarding, value matching, and pricing trust.
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 relative">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Your 30-Second Pitch (approx 60-75 words)
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleListening}
                    className={`h-7 px-2.5 text-[10px] font-bold uppercase gap-1.5 rounded border border-slate-200/80 cursor-pointer ${
                      isListening ? "bg-red-50 text-red-600 border-red-200 animate-pulse hover:bg-red-50" : "bg-slate-50 text-slate-650 hover:bg-slate-100"
                    }`}
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-3 h-3 text-red-500" /> Stop Mic
                      </>
                    ) : (
                      <>
                        <Mic className="w-3 h-3 text-slate-500" /> Speech to Text
                      </>
                    )}
                  </Button>
                </div>
                <SovereignTextarea
                  value={pitchText}
                  onChange={e => setPitchText(e.target.value)}
                  rows={6}
                  className="text-sm font-semibold leading-relaxed"
                  placeholder="Introduce your business: We improve [deliverable/what] for [customer/who] because [pain/why], charging [price] via [revenue model]..."
                />
                <div className="flex justify-between items-center mt-1 text-[10px] font-mono">
                  <span className={isOptimalLength ? "text-emerald-600 font-bold" : "text-slate-450"}>
                    Word Count: {wordCount} {isOptimalLength ? " (Optimal 45-90)" : " (Target: 60-75)"}
                  </span>
                  {isListening && (
                    <span className="text-red-500 font-bold animate-pulse flex items-center gap-1">
                      ● Recording speaking...
                    </span>
                  )}
                </div>
              </div>

              <Button
                disabled={!pitchText.trim() || loading}
                onClick={handleGradePitch}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-11 text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:bg-slate-150 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                    Simulating Evaluation...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400 fill-amber-300" />
                    Present Pitch to LEO
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Results & Grading (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {!result && !loading && (
            <Card className="border-2 border-dashed border-slate-200 shadow-none rounded-xl h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 min-h-[300px]">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5 text-slate-400" />
              </div>
              <h4 className="text-slate-800 font-bold text-sm mb-1 uppercase tracking-wider font-mono">
                LEO Boardroom Closed
              </h4>
              <p className="text-slate-500 text-xs max-w-xs leading-relaxed font-medium">
                Submit your pitch statement to open LEO's simulated boardroom grading matrix and receive review scores.
              </p>
            </Card>
          )}

          {loading && (
            <Card className="border border-slate-200 shadow-sm rounded-xl h-full flex flex-col items-center justify-center p-8 text-center bg-white min-h-[300px] animate-pulse">
              <Loader2 className="w-8 h-8 animate-spin text-slate-900 mb-3" />
              <h4 className="text-slate-800 font-bold text-sm mb-1 uppercase tracking-wider font-mono">
                Analyzing Pitch
              </h4>
              <p className="text-slate-500 text-xs max-w-xs leading-normal font-medium">
                LEO is simulating client response curves, calculating budget projections, and formulating follow-up board questions...
              </p>
            </Card>
          )}

          {result && !loading && (
            <div className="flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
              <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                <div className="bg-slate-50/50 border-b border-slate-100 px-5 py-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    Board Evaluation Matrix
                  </h3>
                </div>
                <CardContent className="p-5 text-left flex flex-col gap-4">
                  {/* Circular Score Gauge */}
                  <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                    <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl font-black font-mono shrink-0 ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Score Rating: {result.score} / 100
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                        Grade evaluates clarity, logic, and client-pain alignment.
                      </p>
                    </div>
                  </div>

                  {/* LEO Feedback */}
                  <div className="bg-[#fbfaf7] border border-amber-200/50 p-4 rounded-lg text-xs leading-relaxed font-medium text-slate-700 italic flex gap-2">
                    <Volume2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p>&ldquo;{result.feedback}&rdquo;</p>
                  </div>

                  {/* Score Breakdown Bars */}
                  <div className="space-y-3 pt-2">
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Criteria Scorecard
                    </h5>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700">
                        <span>1. Hook & Clarity</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight">{result.breakdown.clarity}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700">
                        <span>2. Problem Fit & Niche</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight">{result.breakdown.viability}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-slate-700">
                        <span>3. Financial & Revenue Logic</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight">{result.breakdown.math}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Boardroom follow-up questions */}
              <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                <div className="bg-slate-50/50 border-b border-slate-100 px-5 py-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    Evaluator Follow-up Questions
                  </h3>
                </div>
                <CardContent className="p-5 text-left flex flex-col gap-4">
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    Answer these questions from the board to complete the pitch validation exercise:
                  </p>

                  <div className="space-y-4">
                    {result.boardQuestions.map((q, idx) => (
                      <div key={idx} className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-700 block leading-snug">
                          {idx + 1}. {q}
                        </label>
                        <SovereignInput
                          value={followupAnswers[idx]}
                          onChange={e => {
                            const copy = [...followupAnswers];
                            copy[idx] = e.target.value;
                            setFollowupAnswers(copy);
                          }}
                          disabled={submittedAnswers}
                          className="h-9 font-medium"
                          placeholder="Type your response..."
                        />
                      </div>
                    ))}
                  </div>

                  {!submittedAnswers ? (
                    <Button
                      onClick={handleAnswerSubmit}
                      disabled={followupAnswers.some(a => !a.trim())}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-9 text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      Submit Responses
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-3 pt-2">
                      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-start gap-2 text-xs text-emerald-800 font-semibold leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Boardroom validation completed! Your pitch logic has been calibrated and saved to your project.</span>
                      </div>
                      <Button
                        onClick={onComplete}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
                      >
                        Complete Lesson
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

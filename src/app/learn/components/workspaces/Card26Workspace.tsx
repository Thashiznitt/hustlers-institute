"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  Sparkles, 
  Volume2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SovereignInput as Input } from "@/components/ui/SovereignInput";
import { Label } from "@/components/ui/label";
import { SovereignTextarea as Textarea } from "@/components/ui/SovereignTextarea";
import { useNicheCardContent } from "../../hooks/useNicheCardContent";
import NicheTailorBadge from "../NicheTailorBadge";

export default function Card26Workspace() {
  const niche = useNicheCardContent("elevator-pitch");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [need, setNeed] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [benefit, setBenefit] = useState("");

  // Timer states
  const [timerDuration, setTimerDuration] = useState(30); // default 30s
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load state on mount
  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_elevator-pitch");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.targetCustomer) setTargetCustomer(p.targetCustomer);
        if (p.need) setNeed(p.need);
        if (p.productName) setProductName(p.productName);
        if (p.category) setCategory(p.category);
        if (p.benefit) setBenefit(p.benefit);
        if (p.timerDuration) {
          setTimerDuration(p.timerDuration);
          setSecondsLeft(p.timerDuration);
        }
      } catch (e) {
        console.error("Failed to load elevator pitch state", e);
      }
    }
  }, []);

  // Save state on changes
  useEffect(() => {
    const data = { targetCustomer, need, productName, category, benefit, timerDuration };
    localStorage.setItem("hi_card_inputs_elevator-pitch", JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
  }, [targetCustomer, need, productName, category, benefit, timerDuration]);

  // Clear listener
  useEffect(() => {
    const handleClear = () => {
      setTargetCustomer("");
      setNeed("");
      setProductName("");
      setCategory("");
      setBenefit("");
      setTimerDuration(30);
      setSecondsLeft(30);
      setIsRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    window.addEventListener("hi_clear_card_elevator-pitch", handleClear);
    return () => {
      window.removeEventListener("hi_clear_card_elevator-pitch", handleClear);
    };
  }, []);

  // Timer tick effect
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(timerDuration);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(timerDuration);
  };

  const handleDurationChange = (duration: number) => {
    setIsRunning(false);
    setTimerDuration(duration);
    setSecondsLeft(duration);
  };

  const generatedPitch = `For ${targetCustomer || "[target customer]"} who ${need || "[have a need]"}, our ${productName || "[product name]"} is a ${category || "[category]"} that ${benefit || "[benefit]"}.`;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Determine timer visual styling based on seconds remaining
  const isTimeUp = secondsLeft === 0;
  const isLowTime = secondsLeft > 0 && secondsLeft <= 5;

  return (
    <div className="space-y-6 text-left">
      <NicheTailorBadge status={niche.status} isTailored={niche.isTailored} ventureName={niche.ventureName} onRefresh={niche.refresh} />
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ 30-SECOND PITCH BUILDER & COUNTDOWN TIMER
      </h5>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Inputs */}
        <div className="lg:col-span-6 border-2 border-black p-4 bg-slate-50 space-y-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase block border-b border-black pb-1.5 mb-2">Configure Pitch Statements</span>
          
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Who are your customers?</Label>
            <Input value={targetCustomer} onChange={e => setTargetCustomer(e.target.value)} placeholder={niche.placeholder("targetCustomer")} className="rounded-none text-xs mt-1 h-9 placeholder:text-slate-400" />
          </div>

          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">What problem do they have?</Label>
            <Input value={need} onChange={e => setNeed(e.target.value)} placeholder={niche.placeholder("need")} className="rounded-none text-xs mt-1 h-9 placeholder:text-slate-400" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Product Name</Label>
              <Input value={productName} onChange={e => setProductName(e.target.value)} placeholder={niche.placeholder("productName")} className="rounded-none text-xs mt-1 h-9 placeholder:text-slate-400" />
            </div>
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Product Category</Label>
              <Input value={category} onChange={e => setCategory(e.target.value)} placeholder={niche.placeholder("category")} className="rounded-none text-xs mt-1 h-9 placeholder:text-slate-400" />
            </div>
          </div>

          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">What makes you different?</Label>
            <Textarea value={benefit} onChange={e => setBenefit(e.target.value)} placeholder={niche.placeholder("benefit")} rows={3} className="rounded-none text-xs mt-1 resize-none placeholder:text-slate-400" />
          </div>
        </div>

        {/* Pitch Display & Countdown Timer */}
        <div className="lg:col-span-6 space-y-4">
          {/* Practice Timer Card */}
          <div className={`border-2 border-black p-5 relative shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors duration-300 ${
            isTimeUp ? "bg-rose-50 border-rose-500" : isLowTime ? "bg-amber-50 animate-pulse border-amber-500" : "bg-white"
          }`}>
            <span className="text-[9px] font-mono font-black text-slate-400 uppercase block mb-1">Practice Countdown Timer</span>
            
            <div className="flex flex-col items-center py-4 space-y-3">
              {/* Massive time indicator */}
              <div className={`font-mono text-5xl font-black tracking-widest ${
                isTimeUp ? "text-rose-600 animate-bounce" : isLowTime ? "text-amber-600" : "text-black"
              }`}>
                {isTimeUp ? "TIME'S UP!" : formatTime(secondsLeft)}
              </div>

              {/* Pitch duration selector */}
              <div className="flex gap-2 items-center">
                <span className="text-[9px] font-mono font-black text-slate-500 uppercase">Limit:</span>
                {[30, 45, 60].map(dur => (
                  <button
                    key={dur}
                    onClick={() => handleDurationChange(dur)}
                    className={`px-2 py-0.5 border text-[9px] font-mono font-black uppercase rounded-none transition-all cursor-pointer ${
                      timerDuration === dur ? "bg-black text-white border-black" : "bg-white text-slate-700 border-slate-300 hover:border-black"
                    }`}
                  >
                    {dur}s
                  </button>
                ))}
              </div>

              {/* Playback Controls */}
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={toggleTimer} 
                  className={`border-2 border-black rounded-none uppercase font-black text-xs px-5 h-9 gap-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${
                    isRunning ? "bg-amber-400 text-black hover:bg-amber-500" : "bg-black hover:bg-slate-900 text-white"
                  }`}
                >
                  {isRunning ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4 fill-white" /> Start Pitch</>}
                </Button>
                <Button 
                  onClick={resetTimer} 
                  variant="outline" 
                  className="border-2 border-black rounded-none uppercase font-black text-xs px-4 h-9 gap-1 bg-white hover:bg-slate-100 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Generated Script Box */}
          <div className="bg-[#fffbeb] border-2 border-black p-5 relative shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-[9px] font-bold text-rose-500 font-mono block mb-2.5">📓 GENERATED ELEVATOR PITCH STATEMENT</span>
            <div className="border-l-4 border-black pl-3.5 py-1.5">
              <p className="text-sm font-sans font-bold leading-relaxed text-slate-900 italic">
                &ldquo;{generatedPitch}&rdquo;
              </p>
            </div>
            <div className="text-[9px] font-mono text-slate-500 mt-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Read this statement aloud while practicing under your selected time limit!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

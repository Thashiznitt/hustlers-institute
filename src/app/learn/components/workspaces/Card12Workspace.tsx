"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Coffee,
  AlertTriangle,
  Search,
  Download,
  BookOpen,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Smartphone,
  Palette,
  Layout,
  MapPin,
  ListTodo,
  Users,
  Compass,
  Database,
  Activity,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SovereignInput as Input } from "@/components/ui/SovereignInput";
import { Label } from "@/components/ui/label";
import { SovereignTextarea as Textarea } from "@/components/ui/SovereignTextarea";
import { SovereignSelect } from "@/components/ui/SovereignSelect";

export default function Card12Workspace() {
  const [empathy, setEmpathy] = useState<{ say: string[]; think: string[]; doActions: string[]; feel: string[] }>({
    say: [], think: [], doActions: [], feel: []
  });
  const [selectedQuadrant, setSelectedQuadrant] = useState<"say" | "think" | "doActions" | "feel">("say");
  const [text, setText] = useState("");

  const defaultEmpathy = {
    say: ["I just want a simple payment report.", "How do I know the receipt worked?"],
    think: ["Will this transaction fail in front of clients?", "Is Stripe secure for my market?"],
    doActions: ["Taps phone multiple times when loader appears", "Manually doublechecks bank balance"],
    feel: ["Anxious during delay animations", "Highly relieved when payment receipt goes green"]
  };

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_empathy-map");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.empathy) {
          setEmpathy(parsed.empathy);
          return;
        }
      } catch(e) {}
    }
    setEmpathy(defaultEmpathy);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_empathy-map", JSON.stringify({ empathy }));
  }, [empathy]);

  const addCard = () => {
    if (text.trim()) {
      setEmpathy({
        ...empathy,
        [selectedQuadrant]: [...empathy[selectedQuadrant], text.trim()]
      });
      setText("");
    }
  };

  const removeCard = (quad: "say" | "think" | "doActions" | "feel", idx: number) => {
    setEmpathy({
      ...empathy,
      [quad]: empathy[quad].filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="space-y-6 text-left">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ CUSTOMER EMPATHY FEELINGS BOARD
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 border-2 border-black p-4 bg-slate-50 space-y-3">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase">Create Empathy Card</span>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500 block mb-1">Target Quadrant</Label>
            <SovereignSelect value={selectedQuadrant} onChange={e => setSelectedQuadrant(e.target.value as any)} className="w-full rounded-none p-1.5 text-xs focus-visible:outline-none">
              <option value="say">💬 What they Say</option>
              <option value="think">💭 What they Think</option>
              <option value="doActions">🏃‍♂️ What they Do</option>
              <option value="feel">💖 What they Feel</option>
            </SovereignSelect>
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Observation Content</Label>
            <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Say, Think, Do or Feel..." rows={3} className="rounded-none text-xs mt-1 resize-none" />
          </div>
          <Button onClick={addCard} className="w-full bg-black hover:bg-slate-900 border border-black rounded-none text-white font-black uppercase text-[10px] h-8 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Empathy Card
          </Button>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border-2 border-black p-3.5 bg-rose-50/70 min-h-[140px] flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-black text-rose-800 uppercase block mb-1.5">💬 SAYS (Verbatim quotes)</span>
              <div className="space-y-1.5">
                {empathy.say.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs border border-slate-200 bg-white p-1.5 rounded-none leading-relaxed">
                    <span className="italic text-slate-800">&ldquo;{item}&rdquo;</span>
                    <button onClick={() => removeCard("say", idx)} className="text-slate-400 hover:text-red-500 cursor-pointer ml-1 shrink-0"><Trash2 className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-2 border-black p-3.5 bg-amber-50/70 min-h-[140px] flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-black text-amber-800 uppercase block mb-1.5">💭 THINKS (Internal beliefs)</span>
              <div className="space-y-1.5">
                {empathy.think.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs border border-slate-200 bg-white p-1.5 rounded-none leading-relaxed">
                    <span className="text-slate-800">{item}</span>
                    <button onClick={() => removeCard("think", idx)} className="text-slate-400 hover:text-red-500 cursor-pointer ml-1 shrink-0"><Trash2 className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-2 border-black p-3.5 bg-emerald-50/70 min-h-[140px] flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-black text-emerald-800 uppercase block mb-1.5">🏃‍♂️ DOES (Behaviors / Actions)</span>
              <div className="space-y-1.5">
                {empathy.doActions.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs border border-slate-200 bg-white p-1.5 rounded-none leading-relaxed">
                    <span className="text-slate-800">{item}</span>
                    <button onClick={() => removeCard("doActions", idx)} className="text-slate-400 hover:text-red-500 cursor-pointer ml-1 shrink-0"><Trash2 className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-2 border-black p-3.5 bg-sky-50/70 min-h-[140px] flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-black text-sky-800 uppercase block mb-1.5">💖 FEELS (Emotions state)</span>
              <div className="space-y-1.5">
                {empathy.feel.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs border border-slate-200 bg-white p-1.5 rounded-none leading-relaxed">
                    <span className="text-slate-800">{item}</span>
                    <button onClick={() => removeCard("feel", idx)} className="text-slate-400 hover:text-red-500 cursor-pointer ml-1 shrink-0"><Trash2 className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 14: DAILY TASK MAP (experience-map)
   ============================================================================ */
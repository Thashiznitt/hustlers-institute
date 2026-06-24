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

export default function Card18Workspace() {
  const [matrix, setMatrix] = useState<{ quickWins: string[]; strategicBets: string[]; lowPriority: string[]; moneyPits: string[] }>({
    quickWins: [], strategicBets: [], lowPriority: [], moneyPits: []
  });
  const [selectedQuadrant, setSelectedQuadrant] = useState<"quickWins" | "strategicBets" | "lowPriority" | "moneyPits">("quickWins");
  const [idea, setIdea] = useState("");

  const defaultMatrix = {
    quickWins: ["Mpesa instant client receipt SMS checkout confirmations", "Add Whatsapp checkout ledger sharing"],
    strategicBets: ["Build offline system capability for bad connections", "Integrate credit-scoring card automation"],
    lowPriority: ["Support custom shop logo design file uploads", "Enable client timezone translations"],
    moneyPits: ["Build fully offline native payment terminal device hardware", "Create AI client scheduling assistant chatbot"]
  };

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_2-by-2-axis");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.matrix) {
          setMatrix(parsed.matrix);
          return;
        }
      } catch(e) {}
    }
    setMatrix(defaultMatrix);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_2-by-2-axis", JSON.stringify({ matrix }));
  }, [matrix]);

  const addIdea = () => {
    if (idea.trim()) {
      setMatrix({
        ...matrix,
        [selectedQuadrant]: [...matrix[selectedQuadrant], idea.trim()]
      });
      setIdea("");
    }
  };

  const removeIdea = (quad: "quickWins" | "strategicBets" | "lowPriority" | "moneyPits", idx: number) => {
    setMatrix({
      ...matrix,
      [quad]: matrix[quad].filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="space-y-6 text-left">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ PRIORITIZATION 2X2 WORKSPACE MATRIX
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 border-2 border-black p-4 bg-slate-50 space-y-3">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase">Map Product Idea</span>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500 block mb-1">Matrix Quadrant</Label>
            <SovereignSelect value={selectedQuadrant} onChange={e => setSelectedQuadrant(e.target.value as any)} className="w-full rounded-none p-1.5 text-xs focus-visible:outline-none">
              <option value="quickWins">⭐ Quick Wins (High Value, Easy)</option>
              <option value="strategicBets">🎯 Strategic Bets (High Value, Hard)</option>
              <option value="lowPriority">⚙️ Low Priority (Low Value, Easy)</option>
              <option value="moneyPits">❌ Money Pits (Low Value, Hard)</option>
            </SovereignSelect>
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Product Idea / Feature</Label>
            <Textarea value={idea} onChange={e => setIdea(e.target.value)} placeholder="Describe the proposed feature..." rows={3} className="rounded-none text-xs mt-1 resize-none" />
          </div>
          <Button onClick={addIdea} className="w-full bg-black hover:bg-slate-900 border border-black rounded-none text-white font-black uppercase text-[10px] h-8 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-3.5 h-3.5 mr-1" /> Plot on 2x2 Map
          </Button>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border-2 border-black p-3.5 bg-emerald-50/70 min-h-[140px] flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-black text-emerald-800 uppercase block mb-1.5">⭐ QUICK WINS (High Value, Easy)</span>
              <div className="space-y-1.5">
                {matrix.quickWins.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs border border-slate-200 bg-white p-1.5 rounded-none leading-relaxed">
                    <span className="text-slate-800 font-bold">{item}</span>
                    <button onClick={() => removeIdea("quickWins", idx)} className="text-slate-400 hover:text-red-500 cursor-pointer ml-1 shrink-0"><Trash2 className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-2 border-black p-3.5 bg-sky-50/70 min-h-[140px] flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-black text-sky-800 uppercase block mb-1.5">🎯 STRATEGIC BETS (High Value, Hard)</span>
              <div className="space-y-1.5">
                {matrix.strategicBets.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs border border-slate-200 bg-white p-1.5 rounded-none leading-relaxed">
                    <span className="text-slate-800 font-bold">{item}</span>
                    <button onClick={() => removeIdea("strategicBets", idx)} className="text-slate-400 hover:text-red-500 cursor-pointer ml-1 shrink-0"><Trash2 className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-2 border-black p-3.5 bg-amber-50/70 min-h-[140px] flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-black text-amber-800 uppercase block mb-1.5">⚙️ LOW PRIORITY (Low Value, Easy)</span>
              <div className="space-y-1.5">
                {matrix.lowPriority.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs border border-slate-200 bg-white p-1.5 rounded-none leading-relaxed">
                    <span className="text-slate-800">{item}</span>
                    <button onClick={() => removeIdea("lowPriority", idx)} className="text-slate-400 hover:text-red-500 cursor-pointer ml-1 shrink-0"><Trash2 className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-2 border-black p-3.5 bg-rose-50/70 min-h-[140px] flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-black text-rose-800 uppercase block mb-1.5">❌ MONEY PITS (Low Value, Hard)</span>
              <div className="space-y-1.5">
                {matrix.moneyPits.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs border border-slate-200 bg-white p-1.5 rounded-none leading-relaxed">
                    <span className="text-slate-800">{item}</span>
                    <button onClick={() => removeIdea("moneyPits", idx)} className="text-slate-400 hover:text-red-500 cursor-pointer ml-1 shrink-0"><Trash2 className="w-3 h-3" /></button>
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
   CARD 38: BUSINESS SLIDE DECK (pitch-deck)
   ============================================================================ */
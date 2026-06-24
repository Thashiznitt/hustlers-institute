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

export default function Card17Workspace() {
  const [insights, setInsights] = useState<any[]>([]);
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("Payment trust");

  const defaultInsights = [
    { id: 1, note: "Merchants doublecheck ledger balances via SMS immediately after transfers", category: "Payment trust" },
    { id: 2, note: "Users close and restart booking pages if loader spins > 3 seconds", category: "Speed & Performance" },
    { id: 3, note: "Trainers prefer mobile chat apps over dedicated admin logins", category: "Usability preferences" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_themes");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.insights) {
          setInsights(parsed.insights);
          return;
        }
      } catch(e) {}
    }
    setInsights(defaultInsights);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_themes", JSON.stringify({ insights }));
  }, [insights]);

  const addInsight = () => {
    if (note.trim()) {
      setInsights([...insights, { id: Date.now(), note, category }]);
      setNote("");
    }
  };

  const categories = ["Payment trust", "Speed & Performance", "Usability preferences", "Pricing Strategy"];

  return (
    <div className="space-y-6 text-left">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ CUSTOMER RESEARCH THEME BOARD
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 border-2 border-black p-4 bg-slate-50 space-y-3">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase">Add Empathy Observation Note</span>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Observation Note / Insight</Label>
            <Textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Describe customer reaction..." rows={3} className="rounded-none text-xs mt-1 resize-none" />
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500 block mb-1">Theme cluster</Label>
            <SovereignSelect value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded-none p-1.5 text-xs focus-visible:outline-none">
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </SovereignSelect>
          </div>
          <Button onClick={addInsight} className="w-full bg-black hover:bg-slate-900 border border-black rounded-none text-white font-black uppercase text-[10px] h-8 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Insight to Theme
          </Button>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map(cat => {
              const catInsights = insights.filter(i => i.category === cat);
              return (
                <div key={cat} className="border-2 border-black p-3.5 bg-[#fffbeb] min-h-[140px] flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <div>
                    <span className="text-[9px] font-mono font-black text-slate-900 uppercase block mb-2 border-b border-black pb-1">{cat} ({catInsights.length})</span>
                    <div className="space-y-2">
                      {catInsights.map(i => (
                        <div key={i.id} className="flex justify-between items-start text-xs border border-slate-200 bg-white p-1.5 leading-relaxed">
                          <span className="text-slate-800 font-sans italic text-[11px] leading-snug">&ldquo;{i.note}&rdquo;</span>
                          <button onClick={() => setInsights(insights.filter(item => item.id !== i.id))} className="text-slate-400 hover:text-red-500 cursor-pointer ml-1 shrink-0"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 18: PRIORITIZATION MATRIX (2-by-2-axis)
   ============================================================================ */
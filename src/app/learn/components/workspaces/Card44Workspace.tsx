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

export default function Card44Workspace() {
  const [features, setFeatures] = useState<string[]>([]);
  const [selections, setSelections] = useState<string[]>([]);
  const [tally, setTally] = useState<Record<string, number>>({});
  const [newFeature, setNewFeature] = useState("");

  const defaultFeatures = [
    "Mpesa Mobile Payment checkout integration",
    "Offline SMS payment receipt print option",
    "Daily automated ledger reports on Whatsapp",
    "Staff dashboard custom roles and permissions",
    "Paystack global card checkout integration",
    "Pesapal local currency payment support",
    "Intasend instant cashout payments API"
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_my-top-5");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.features) {
          setFeatures(p.features);
          setSelections(p.selections || []);
          setTally(p.tally || {});
          return;
        }
      } catch (e) {
        console.error("Failed to load my-top-5 features state", e);
      }
    }
    setFeatures(defaultFeatures);
    setSelections([]);
    const defaultTally: Record<string, number> = {};
    defaultFeatures.forEach(f => {
      defaultTally[f] = Math.floor(Math.random() * 8) + 2;
    });
    setTally(defaultTally);
  }, []);

  useEffect(() => {
    if (features.length > 0) {
      localStorage.setItem("hi_card_inputs_my-top-5", JSON.stringify({ features, selections, tally }));
    }
  }, [features, selections, tally]);

  const toggleSelection = (feat: string) => {
    if (selections.includes(feat)) {
      setSelections(selections.filter(s => s !== feat));
    } else {
      if (selections.length >= 5) return;
      setSelections([...selections, feat]);
    }
  };

  const addCustomFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      const cleaned = newFeature.trim();
      setFeatures([...features, cleaned]);
      setTally({ ...tally, [cleaned]: 0 });
      setNewFeature("");
    }
  };

  const deleteFeature = (feat: string) => {
    setFeatures(features.filter(f => f !== feat));
    setSelections(selections.filter(s => s !== feat));
    const newTally = { ...tally };
    delete newTally[feat];
    setTally(newTally);
  };

  const logVoterSelection = () => {
    if (selections.length === 0) return;
    const newTally = { ...tally };
    selections.forEach(s => {
      newTally[s] = (newTally[s] || 0) + 1;
    });
    setTally(newTally);
    setSelections([]);
  };

  const sortedFeatures = [...features].sort((a, b) => (tally[b] || 0) - (tally[a] || 0));
  const maxVotes = Math.max(...features.map(f => tally[f] || 0), 1);

  return (
    <div className="space-y-6">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ INTERACTIVE FEATURE VOTE PRIORITIZER
      </h5>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
        <div className="lg:col-span-5 space-y-4">
          <div className="border-2 border-black p-4 bg-slate-50 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-250 pb-1.5">
              <span className="text-[10px] font-mono font-black text-slate-700 uppercase">Proposed Feature Deck</span>
              <Badge className="bg-black text-white font-mono rounded-none text-[8px]">{selections.length}/5 Selected</Badge>
            </div>
            <div className="space-y-1.5 max-h-[220px] overflow-y-auto">
              {features.map((f, idx) => {
                const isSelected = selections.includes(f);
                return (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => toggleSelection(f)}
                      className={`w-4 h-4 border-2 border-black flex items-center justify-center font-bold text-[10px] transition-all cursor-pointer shrink-0 rounded-none ${
                        isSelected ? "bg-amber-400 text-black" : "bg-white text-slate-350"
                      }`}
                    >
                      {isSelected && "✓"}
                    </button>
                    <span className="flex-1 truncate leading-tight font-medium text-slate-800">{f}</span>
                    <button onClick={() => deleteFeature(f)} className="text-slate-400 hover:text-red-500 cursor-pointer shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 pt-2 border-t border-slate-200">
              <Input
                value={newFeature}
                onChange={e => setNewFeature(e.target.value)}
                placeholder="New feature details..."
                className="rounded-none h-8 text-xs flex-1"
                onKeyDown={e => e.key === "Enter" && addCustomFeature()}
              />
              <Button onClick={addCustomFeature} className="bg-black hover:bg-slate-900 border-2 border-black rounded-none h-8 px-2.5">
                <Plus className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>

          <div className="border-2 border-black p-4 bg-white space-y-3">
            <span className="text-[10px] font-mono font-black text-slate-550 uppercase block">Active Tester Selections</span>
            <div className="space-y-1">
              {selections.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No features selected yet (Max 5).</p>
              ) : (
                selections.map((s, idx) => (
                  <div key={idx} className="flex gap-2 items-center text-xs font-mono">
                    <span className="font-black text-slate-900">Rank #{idx + 1}:</span>
                    <span className="truncate text-slate-700">{s}</span>
                  </div>
                ))
              )}
            </div>
            <Button
              onClick={logVoterSelection}
              disabled={selections.length === 0}
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-black border border-black rounded-none font-black uppercase text-[10px] h-9 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
            >
              Log Tester Group Selection
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border-2 border-black p-4 bg-white space-y-4">
            <span className="text-[9px] font-mono font-black text-slate-400 uppercase block mb-3 border-b border-slate-100 pb-1.5">📈 Aggregate Voter Analytics</span>
            
            <div className="space-y-3 font-mono">
              {sortedFeatures.map((f, idx) => {
                const count = tally[f] || 0;
                const percentage = (count / maxVotes) * 100;
                return (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-[10px] text-slate-800">
                      <span className="truncate pr-4">{f}</span>
                      <span className="shrink-0">{count} votes</span>
                    </div>
                    <div className="w-full bg-slate-100 border border-black h-4 relative">
                      <div
                        className="h-full bg-black border-r border-black transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 08: LONG-TERM JOURNALS (diaries)
   ============================================================================ */
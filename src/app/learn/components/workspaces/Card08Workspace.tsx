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

export default function Card08Workspace() {
  const [entries, setEntries] = useState<any[]>([]);
  const [activity, setActivity] = useState("");
  const [score, setScore] = useState(3);
  const [frustration, setFrustration] = useState("");

  const defaultEntries = [
    { day: 1, activity: "Checks digital ledger on phone", score: 4, frustration: "A bit slow to load, but simple layout." },
    { day: 2, activity: "Tries to pay agent supplier", score: 2, frustration: "SMS gateway was down. Payment timed out." },
    { day: 3, activity: "Logs morning cash sales", score: 5, frustration: "Super fast, dashboard updated immediately." }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_diaries");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.entries) {
          setEntries(parsed.entries);
          return;
        }
      } catch(e) {}
    }
    setEntries(defaultEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_diaries", JSON.stringify({ entries }));
  }, [entries]);

  const addEntry = () => {
    if (activity.trim()) {
      setEntries([...entries, { day: entries.length + 1, activity, score, frustration: frustration || "None" }]);
      setActivity("");
      setFrustration("");
      setScore(3);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        📓 INTERACTIVE CUSTOMER DIARY LOGGER
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 border-2 border-black p-4 bg-slate-50 space-y-3">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase">Log Day {entries.length + 1} Activity</span>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Activity Details</Label>
            <Input value={activity} onChange={e => setActivity(e.target.value)} placeholder="What did they do?" className="rounded-none text-xs mt-1 h-8" />
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Mood Score (1-5)</Label>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map(num => (
                <button key={num} onClick={() => setScore(num)} className={`flex-1 py-1 border border-black text-xs font-black rounded-none transition-all ${score === num ? "bg-black text-white" : "bg-white text-black hover:bg-slate-100"}`}>
                  {num} ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Friction or Pain Faced</Label>
            <Textarea value={frustration} onChange={e => setFrustration(e.target.value)} placeholder="Frustrations experienced..." rows={2} className="rounded-none text-xs mt-1 resize-none" />
          </div>
          <Button onClick={addEntry} className="w-full bg-black hover:bg-slate-900 border border-black rounded-none text-white font-black uppercase text-[10px] h-8 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-3.5 h-3.5 mr-1" /> Save Day Entry
          </Button>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-black p-4 bg-white">
            <span className="text-[9px] font-mono font-black text-slate-400 uppercase block mb-2">Timeline Summary</span>
            <div className="flex gap-2.5 overflow-x-auto py-1">
              {entries.map((e, i) => (
                <div key={i} className="flex-1 min-w-[70px] border border-black p-2 bg-[#fffbeb] text-center font-mono relative">
                  <div className="text-[9px] font-black text-slate-400">DAY {e.day}</div>
                  <div className="text-xl font-bold my-1">{e.score === 5 ? "🤩" : e.score === 4 ? "😊" : e.score === 3 ? "😐" : e.score === 2 ? "😟" : "😡"}</div>
                  <div className="text-[10px] font-bold">{e.score}/5</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto">
            {entries.map((e, idx) => (
              <div key={idx} className="border border-slate-200 p-2.5 bg-white flex justify-between items-start gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-amber-550">DAY {e.day}</span>
                    <Badge className="bg-slate-100 text-slate-800 border border-black rounded-none text-[8px] font-mono">Score: {e.score}/5</Badge>
                  </div>
                  <p className="font-bold text-slate-900 mt-1">{e.activity}</p>
                  <p className="text-rose-600 italic text-[10px] mt-0.5">Friction: &ldquo;{e.frustration}&rdquo;</p>
                </div>
                <button onClick={() => setEntries(entries.filter((_, i) => i !== idx))} className="text-slate-400 hover:text-red-500 cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 09: PARTNER MAPS (stakeholder-maps)
   ============================================================================ */
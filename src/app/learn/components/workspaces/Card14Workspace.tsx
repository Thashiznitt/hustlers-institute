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

export default function Card14Workspace() {
  const [steps, setSteps] = useState<any[]>([]);
  const [action, setAction] = useState("");
  const [pain, setPain] = useState("");

  const defaultSteps = [
    { id: 1, action: "Wakes up and turns on smartphone to check client booking requests", pain: "Notification loads slow, doesn't immediately refresh without pull down" },
    { id: 2, action: "Tries to confirm bookings via chat client message links", pain: "Link times out; user has to copy code manually" },
    { id: 3, action: "Enters payment transactions into the digital ledger manually", pain: "Takes 2 minutes per entry, merchant gets distracted by clients" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_experience-map");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.steps) {
          setSteps(parsed.steps);
          return;
        }
      } catch(e) {}
    }
    setSteps(defaultSteps);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_experience-map", JSON.stringify({ steps }));
  }, [steps]);

  const addStep = () => {
    if (action.trim()) {
      setSteps([...steps, { id: Date.now(), action, pain: pain || "None" }]);
      setAction("");
      setPain("");
    }
  };

  return (
    <div className="space-y-6 text-left">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ SPRINT TASK EXPERIENCE PATHWAY
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 border-2 border-black p-4 bg-slate-50 space-y-3">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase">Log Task Pathway Step</span>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Action / What they do</Label>
            <Input value={action} onChange={e => setAction(e.target.value)} placeholder="e.g. logins to view ledger" className="rounded-none text-xs mt-1 h-8" />
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Pain or Frictions Faced</Label>
            <Textarea value={pain} onChange={e => setPain(e.target.value)} placeholder="Frictions experienced..." rows={2} className="rounded-none text-xs mt-1 resize-none" />
          </div>
          <Button onClick={addStep} className="w-full bg-black hover:bg-slate-900 border border-black rounded-none text-white font-black uppercase text-[10px] h-8 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Step Node
          </Button>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-black p-4 bg-white">
            <span className="text-[9px] font-mono font-black text-slate-400 uppercase block mb-3">Pathway Sequence</span>
            <div className="relative border-l-2 border-black pl-5 space-y-4 text-xs">
              {steps.length === 0 ? (
                <p className="italic text-slate-400">No steps logged.</p>
              ) : (
                steps.map((s, idx) => (
                  <div key={s.id} className="relative">
                    <span className="absolute -left-[27px] top-0 w-3.5 h-3.5 bg-black text-white rounded-full flex items-center justify-center font-mono text-[7px] font-black">{idx + 1}</span>
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 leading-snug block">{s.action}</span>
                        <span className="text-rose-600 italic text-[10px] block leading-tight">Friction: &ldquo;{s.pain}&rdquo;</span>
                      </div>
                      <button onClick={() => setSteps(steps.filter(item => item.id !== s.id))} className="text-slate-400 hover:text-red-500 cursor-pointer shrink-0 ml-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 15: CUSTOMER PROFILES (end-user-maps)
   ============================================================================ */
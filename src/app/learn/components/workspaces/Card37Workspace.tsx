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

interface Milestone {
  id: string;
  letter: string;
  title: string;
  responsible: string;
  tasks: string;
}

export default function Card37Workspace() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [newLetter, setNewLetter] = useState("");

  const roles = ["Developer", "Designer", "Business Lead", "Product Manager"];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_team-journey");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.milestones && p.milestones.length > 0) {
          setMilestones(p.milestones);
          setActiveId(p.activeId || p.milestones[0].id);
          return;
        }
      } catch (e) {
        console.error("Failed to load roadmap", e);
      }
    }
    const defaults = [
      { id: "1", letter: "A", title: "Empathy Chats & Wireframes", responsible: "Designer", tasks: "Talk to 5 active merchants about payment friction points and sketch login steps." },
      { id: "2", letter: "B", title: "Paystack & Mpesa Integration", responsible: "Developer", tasks: "Configure payment checkout callback APIs and build security webhooks." },
      { id: "3", letter: "C", title: "Beta Sprint Launch", responsible: "Business Lead", tasks: "Enroll 3 pilot businesses and monitor transactions on live dashboards." }
    ];
    setMilestones(defaults);
    setActiveId("1");
  }, []);

  useEffect(() => {
    if (milestones.length > 0) {
      localStorage.setItem("hi_card_inputs_team-journey", JSON.stringify({ milestones, activeId }));
    }
  }, [milestones, activeId]);

  const addMilestone = () => {
    const defaultLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nextIdx = milestones.length;
    const letter = newLetter.trim() || (nextIdx < 26 ? defaultLetters[nextIdx] : `M${nextIdx + 1}`);
    const newM = {
      id: Date.now().toString(),
      letter,
      title: "New Milestone",
      responsible: "Developer",
      tasks: "Describe tasks to perform..."
    };
    setMilestones([...milestones, newM]);
    setActiveId(newM.id);
    setNewLetter("");
  };

  const deleteMilestone = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = milestones.filter(m => m.id !== id);
    setMilestones(updated);
    if (activeId === id && updated.length > 0) {
      setActiveId(updated[0].id);
    }
  };

  const updateMilestone = (field: keyof Milestone, val: string) => {
    setMilestones(milestones.map(m => m.id === activeId ? { ...m, [field]: val } : m));
  };

  const activeM = milestones.find(m => m.id === activeId);

  return (
    <div className="space-y-6">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ SPRINT TEAM TIMELINE ROADMAP
      </h5>

      <div className="border-2 border-black p-6 bg-slate-50 relative flex flex-col items-center select-none overflow-x-auto">
        <span className="text-[9px] font-mono font-black text-slate-400 uppercase block mr-auto mb-4">📍 Milestone Execution Pathway</span>
        
        <div className="flex items-center gap-2 min-w-[500px] justify-center py-4 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-black -translate-y-1/2 z-0" />
          
          {milestones.map((m, idx) => (
            <React.Fragment key={m.id}>
              {idx > 0 && (
                <div className="w-10 flex items-center justify-center z-0">
                  <span className="text-black font-bold font-mono text-lg">➔</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => setActiveId(m.id)}
                className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-mono font-black text-lg transition-all z-10 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                  activeId === m.id
                    ? "bg-amber-400 border-black text-black scale-110"
                    : "bg-white border-black text-slate-700 hover:bg-slate-100"
                }`}
              >
                {m.letter}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
        {activeM ? (
          <div className="border-2 border-black p-4 bg-white space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-[10px] font-mono font-black text-slate-550 uppercase">Edit Point details ({activeM.letter})</span>
              {milestones.length > 1 && (
                <Button 
                  onClick={(e) => deleteMilestone(activeM.id, e)} 
                  variant="outline"
                  className="border border-red-600 hover:bg-red-50 text-red-600 rounded-none h-7 px-2.5 text-[10px] font-black uppercase cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete Node
                </Button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Letter</Label>
                <Input
                  value={activeM.letter}
                  onChange={e => updateMilestone("letter", e.target.value)}
                  className="rounded-none h-8 text-xs mt-1"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Milestone Title</Label>
                <Input
                  value={activeM.title}
                  onChange={e => updateMilestone("title", e.target.value)}
                  className="rounded-none h-8 text-xs mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-[10px] font-mono font-black uppercase text-slate-500 block mb-1">Responsible Role</Label>
              <div className="flex gap-1.5">
                {roles.map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => updateMilestone("responsible", r)}
                    className={`flex-1 py-1 border border-black text-[9px] font-black uppercase transition-all cursor-pointer ${
                      activeM.responsible === r ? "bg-black text-white" : "bg-white text-black hover:bg-slate-100"
                    }`}
                  >
                    {r.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Execution Plan / Tasks</Label>
              <Textarea
                value={activeM.tasks}
                onChange={e => updateMilestone("tasks", e.target.value)}
                placeholder="What specific tasks are required to complete this point?"
                rows={3}
                className="rounded-none text-xs mt-1 resize-none"
              />
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">Select a point along the timeline to edit.</p>
        )}

        <div className="border-2 border-black p-4 bg-slate-50 space-y-4">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase block">Roadmap Controls</span>
          <div className="space-y-3">
            <div>
              <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Milestone Letter ID (Optional)</Label>
              <Input
                value={newLetter}
                onChange={e => setNewLetter(e.target.value)}
                placeholder="e.g. D"
                className="rounded-none h-8 text-xs mt-1"
              />
            </div>
            <Button onClick={addMilestone} className="w-full bg-black hover:bg-slate-900 border-2 border-black rounded-none text-white font-black uppercase text-[10px] h-9 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Milestone Node
            </Button>
          </div>

          <div className="border-t border-slate-200 pt-3 text-xs space-y-1.5 font-sans font-medium text-slate-750">
            <span className="text-[8px] font-mono font-black text-slate-400 block uppercase">Sequential Ledger Manifest</span>
            {milestones.map((m, idx) => (
              <div key={m.id} className="flex gap-2 items-start text-[11px]">
                <span className="font-mono font-black text-slate-900 shrink-0">{m.letter}:</span>
                <span className="text-slate-850">
                  <strong>{m.title}</strong> &mdash; <span className="italic text-[10px] text-slate-500">[{m.responsible}]</span>: &ldquo;{m.tasks}&rdquo;
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 39: FEEDBACK QUADRANT (2X2 ANALYSIS INTERFACE)
   ============================================================================ */
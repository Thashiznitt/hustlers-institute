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

interface EmotionLog {
  id: string;
  testerName: string;
  color: string;
  emotion: string;
  notes: string;
}

export default function Card35Workspace() {
  const [logs, setLogs] = useState<EmotionLog[]>([]);
  const [testerName, setTesterName] = useState("");
  const [color, setColor] = useState("#facc15");
  const [emotion, setEmotion] = useState("Trust");
  const [notes, setNotes] = useState("");

  const emotions = ["Trust", "Excitement", "Calm", "Frustration", "Anxiety"];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_collage");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.logs) {
          setLogs(p.logs);
          return;
        }
      } catch (e) {
        console.error("Failed to load collage state", e);
      }
    }
    setLogs([
      { id: "1", testerName: "Alice", color: "#3b82f6", emotion: "Trust", notes: "Felt very secure when using the clean blue branding layout." },
      { id: "2", testerName: "Bob", color: "#ef4444", emotion: "Frustration", notes: "Found the intense red checkout warning buttons anxious." }
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_collage", JSON.stringify({ logs }));
  }, [logs]);

  const addLog = () => {
    if (testerName.trim()) {
      const newLog = {
        id: Date.now().toString(),
        testerName: testerName.trim(),
        color,
        emotion,
        notes: notes.trim() || "N/A"
      };
      setLogs([...logs, newLog]);
      setTesterName("");
      setNotes("");
    }
  };

  const deleteLog = (id: string) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  const emotionCounts = logs.reduce((acc, l) => {
    acc[l.emotion] = (acc[l.emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const maxVal = Math.max(...emotions.map(e => emotionCounts[e] || 0), 1);

  return (
    <div className="space-y-6">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ BRAND COLOR & EMOTION LOGGER
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 border-2 border-black p-4 bg-slate-50 space-y-4">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase block">Log Brand Tester Response</span>
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Tester Name</Label>
            <Input
              value={testerName}
              onChange={e => setTesterName(e.target.value)}
              placeholder="e.g. John Doe"
              className="rounded-none h-8 text-xs mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Brand Color</Label>
              <div className="flex gap-2 mt-1">
                <input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="w-8 h-8 p-0 border border-black cursor-pointer bg-transparent"
                />
                <Input
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="rounded-none h-8 text-xs flex-1 font-mono"
                />
              </div>
            </div>
            <div>
              <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Logged Emotion</Label>
              <SovereignSelect
                value={emotion}
                onChange={e => setEmotion(e.target.value)}
                className="w-full h-8 rounded-none text-xs px-2 mt-1 font-mono font-bold focus:outline-none"
              >
                {emotions.map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </SovereignSelect>
            </div>
          </div>
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Tester Notes</Label>
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="What details did they mention about this color palette choice?"
              rows={2}
              className="rounded-none text-xs mt-1 resize-none"
            />
          </div>
          <Button onClick={addLog} className="w-full bg-[#facc15] hover:bg-yellow-500 text-black border border-black rounded-none font-black uppercase text-[10px] h-9 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-3.5 h-3.5 mr-1" /> Log Tester Input
          </Button>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-black p-4 bg-white text-left font-mono">
            <span className="text-[9px] font-mono font-black text-slate-400 uppercase block mb-3">📊 Aggregated Sentiment Counts</span>
            <div className="space-y-2">
              {emotions.map(e => {
                const cnt = emotionCounts[e] || 0;
                const pct = (cnt / maxVal) * 100;
                return (
                  <div key={e} className="flex items-center gap-2 text-xs">
                    <span className="w-24 font-bold">{e}</span>
                    <div className="flex-1 bg-slate-100 border border-black h-4 relative">
                      <div 
                        className="h-full bg-black transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-4 text-right font-black">{cnt}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 max-h-[220px] overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-4">No tester inputs recorded.</p>
            ) : (
              logs.map(log => (
                <div key={log.id} className="border-2 border-black p-3 bg-white flex items-start justify-between gap-3 text-left">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border border-black" style={{ backgroundColor: log.color }} />
                      <span className="font-bold text-xs">{log.testerName}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 border border-black bg-slate-50 uppercase font-black">{log.emotion}</span>
                    </div>
                    <p className="text-[11px] text-slate-650 font-medium font-sans leading-relaxed">&ldquo;{log.notes}&rdquo;</p>
                  </div>
                  <button onClick={() => deleteLog(log.id)} className="text-slate-450 hover:text-red-500 cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 36: STYLE BOARDS (TYPOGRAPHY & CANVAS GRID)
   ============================================================================ */
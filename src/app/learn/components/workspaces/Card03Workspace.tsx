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

interface DiaryLog {
  id: number;
  time: string;
  trigger: string;
  mood: string;
  emoji: string;
  notes: string;
}

export default function Card03Workspace() {
  const [logs, setLogs] = useState<DiaryLog[]>([]);
  const [trigger, setTrigger] = useState("");
  const [mood, setMood] = useState("Frustrated");
  const [notes, setNotes] = useState("");

  const moodEmojis: Record<string, string> = {
    "Frustrated": "😡",
    "Worried": "😟",
    "OK": "😐",
    "Pleased": "😊",
    "Highly Relieved": "🤩"
  };

  // Load state on mount
  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_culture-probe");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.diaryLogs) {
          setLogs(p.diaryLogs);
          return;
        }
      } catch (e) {
        console.error("Failed to load diary logs", e);
      }
    }
    // Default logs if nothing saved
    setLogs([
      { id: 1, time: "09:45 AM", trigger: "Paying Supplier via mobile agent", mood: "Frustrated", emoji: "😡", notes: "SMS code timed out twice, merchant had to check ledger manually" },
      { id: 2, time: "01:15 PM", trigger: "Client Invoice created on Whatsapp", mood: "Worried", emoji: "😟", notes: "No clear proof of invoice delivered, customer hasn't read receipt yet" },
      { id: 3, time: "04:30 PM", trigger: "Confirming client transaction cash-out", mood: "Pleased", emoji: "😊", notes: "Instant transfer worked well after third attempt" },
    ]);
  }, []);

  // Save state on change
  useEffect(() => {
    if (logs.length > 0) {
      const key = "hi_card_inputs_culture-probe";
      const data = { diaryLogs: logs };
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [logs]);

  const addLog = () => {
    if (trigger.trim()) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const updated = [
        ...logs,
        {
          id: Date.now(),
          time: timeStr,
          trigger: trigger.trim(),
          mood,
          emoji: moodEmojis[mood],
          notes: notes.trim() || "N/A"
        }
      ];
      setLogs(updated);
      setTrigger("");
      setNotes("");
    }
  };

  const deleteLog = (id: number) => {
    const updated = logs.filter(l => l.id !== id);
    setLogs(updated);
    localStorage.setItem("hi_card_inputs_culture-probe", JSON.stringify({ diaryLogs: updated }));
  };

  const moodCounts = logs.reduce((acc, log) => {
    acc[log.mood] = (acc[log.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const moodList = ["Frustrated", "Worried", "OK", "Pleased", "Highly Relieved"];
  const maxCount = Math.max(...moodList.map(m => moodCounts[m] || 0), 1);

  return (
    <div className="space-y-6">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ DAILY DIARY OBSERVATION LOGS
      </h5>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Logger Form */}
        <div className="lg:col-span-5 space-y-4 border-2 border-black p-4 bg-slate-50 relative">
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-700">Trigger Activity</Label>
            <Input 
              value={trigger} 
              onChange={e => setTrigger(e.target.value)} 
              className="rounded-none mt-1 text-xs h-9"
              placeholder="e.g. paying checkout fees"
            />
          </div>
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-700 block mb-1">Emotion State</Label>
            <div className="flex gap-1">
              {Object.keys(moodEmojis).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`flex-1 py-1 text-center border border-black text-xs font-bold transition-all cursor-pointer ${
                    mood === m ? "bg-black text-white" : "bg-white text-black hover:bg-slate-100"
                  }`}
                  title={m}
                >
                  <span className="block text-sm">{moodEmojis[m]}</span>
                  <span className="text-[7px] font-mono leading-none block mt-0.5">{m.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-700">Observation Notes</Label>
            <Textarea 
              value={notes} 
              onChange={e => setNotes(e.target.value)} 
              className="rounded-none mt-1 text-xs resize-none"
              rows={2}
              placeholder="Coping strategies or complaints..."
            />
          </div>
          <Button onClick={addLog} className="w-full bg-rose-400 hover:bg-rose-500 border border-black rounded-none text-black font-black uppercase text-[10px] h-9 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
            <Plus className="w-3.5 h-3.5 mr-1 text-black" /> Save Log Entry
          </Button>
        </div>

        {/* List & Graph */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-black p-4 bg-slate-50">
            <span className="text-[9px] font-mono font-black text-slate-500 uppercase block mb-3">📊 Trigger Mood Analytics</span>
            <div className="space-y-2.5 text-left">
              {moodList.map(m => {
                const count = moodCounts[m] || 0;
                const percentage = (count / maxCount) * 100;
                return (
                  <div key={m} className="flex items-center gap-2 text-[10px]">
                    <span className="w-20 font-bold font-mono text-slate-650 flex items-center gap-1">
                      <span>{moodEmojis[m]}</span>
                      <span>{m}</span>
                    </span>
                    <div className="flex-1 bg-slate-200 border border-slate-300 h-4 relative">
                      <div 
                        className={`h-full border-r border-black transition-all duration-500 ${
                          m === "Frustrated" ? "bg-rose-400" :
                          m === "Worried" ? "bg-orange-400" :
                          m === "OK" ? "bg-amber-300" :
                          m === "Pleased" ? "bg-cyan-300" : "bg-emerald-400"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-4 font-black font-mono text-black text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-left">No events logged.</p>
            ) : (
              logs.map(log => (
                <div key={log.id} className="border border-slate-250 p-2.5 bg-white flex items-start justify-between gap-2 text-xs text-left">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{log.emoji}</span>
                      <span className="font-extrabold uppercase font-mono text-[8px] text-slate-400">{log.time}</span>
                      <Badge className="bg-slate-100 text-slate-700 border border-slate-300 font-mono rounded-none text-[8px] py-0">{log.mood}</Badge>
                    </div>
                    <h6 className="font-bold text-slate-900 text-[11px]">Trigger: {log.trigger}</h6>
                    <p className="text-slate-650 text-[10px] leading-relaxed italic">&ldquo;{log.notes}&rdquo;</p>
                  </div>
                  <button onClick={() => deleteLog(log.id)} className="text-slate-400 hover:text-rose-600 shrink-0 cursor-pointer">
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

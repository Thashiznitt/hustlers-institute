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

export default function Card42Workspace() {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [drawnIndex, setDrawnIndex] = useState<number>(0);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const defaultPrompts = [
    "Tell me about a time you tried to pay for something and it failed. What did you do next?",
    "What is a daily task you do that feels completely unnecessary?",
    "How do you keep track of your cash flows? What's the worst mistake you've made doing it?",
    "If you had to pay a developer $1000 of your own money to build one thing for you, what would it be?",
    "Tell me about a time a business completely surprised you in a good way.",
    "Describe the absolute worst customer service experience you've had in the last 6 months."
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_conversation-starters");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.prompts && p.prompts.length > 0) {
          setPrompts(p.prompts);
          setDrawnIndex(p.drawnIndex !== undefined ? p.drawnIndex : 0);
          return;
        }
      } catch (e) {
        console.error("Failed to load conversation starters state", e);
      }
    }
    setPrompts(defaultPrompts);
    setDrawnIndex(0);
  }, []);

  useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem("hi_card_inputs_conversation-starters", JSON.stringify({ prompts, drawnIndex }));
    }
  }, [prompts, drawnIndex]);

  const drawCard = () => {
    setIsFlipped(true);
    setTimeout(() => {
      setDrawnIndex((drawnIndex + 1) % prompts.length);
      setIsFlipped(false);
    }, 250);
  };

  const addCustomPrompt = () => {
    if (customPrompt.trim()) {
      const updated = [...prompts, customPrompt.trim()];
      setPrompts(updated);
      setCustomPrompt("");
      setDrawnIndex(updated.length - 1);
    }
  };

  const deletePrompt = (idx: number) => {
    if (prompts.length <= 1) return;
    const updated = prompts.filter((_, i) => i !== idx);
    setPrompts(updated);
    setDrawnIndex(prev => (prev >= updated.length ? 0 : prev));
  };

  const activePrompt = prompts[drawnIndex] || prompts[0];

  return (
    <div className="space-y-6">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ DIGITAL CONVERSATION STARTER DECKS
      </h5>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-6 flex flex-col items-center space-y-4">
          <span className="text-[10px] font-mono font-black text-slate-400 uppercase">Draw & Empathize</span>
          
          <div 
            onClick={drawCard}
            className={`w-[260px] h-[340px] border-4 border-black bg-[#fffbeb] p-6 flex flex-col justify-between cursor-pointer select-none transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:scale-95 ${
              isFlipped ? "opacity-50 scale-95" : ""
            }`}
          >
            <div className="flex justify-between items-start border-b-2 border-black pb-1">
              <span className="font-mono text-xs font-black text-rose-500">📓 PROMPT</span>
              <span className="font-mono text-[10px] font-bold text-slate-500">#{drawnIndex + 1}</span>
            </div>
            
            <p className="font-bold font-sans text-sm text-slate-900 leading-relaxed italic text-left my-auto">
              &ldquo;{activePrompt}&rdquo;
            </p>

            <div className="border-t border-dashed border-black pt-2 flex items-center justify-between text-[8px] font-mono font-black text-slate-400 uppercase">
              <span>Sovereign Millionaires</span>
              <span>Click to Draw Next</span>
            </div>
          </div>

          <Button onClick={drawCard} className="bg-black hover:bg-slate-900 border-2 border-black rounded-none text-white font-black uppercase text-[10px] h-9 px-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Draw Next Prompt
          </Button>
        </div>

        <div className="lg:col-span-6 space-y-4 text-left">
          <div className="border-2 border-black p-4 bg-slate-50 space-y-3">
            <span className="text-[10px] font-mono font-black text-slate-700 uppercase block">Add Custom Prompt Card</span>
            <div className="flex gap-2">
              <Input
                value={customPrompt}
                onChange={e => setCustomPrompt(e.target.value)}
                placeholder="Ask open-ended question..."
                className="rounded-none h-8 text-xs flex-1"
                onKeyDown={e => e.key === "Enter" && addCustomPrompt()}
              />
              <Button onClick={addCustomPrompt} className="bg-black hover:bg-slate-900 border-2 border-black rounded-none h-8 px-2.5">
                <Plus className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>

          <div className="border-2 border-black p-4 bg-white space-y-3">
            <span className="text-[9px] font-mono font-black text-slate-400 uppercase block border-b border-slate-100 pb-1">Prompt Cards Deck Manifest ({prompts.length})</span>
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto font-sans text-xs">
              {prompts.map((q, idx) => (
                <div key={idx} className="flex justify-between items-center gap-2 border-b border-slate-100 pb-1.5">
                  <span className={`flex-1 leading-normal ${drawnIndex === idx ? "font-bold text-black" : "text-slate-600"}`}>
                    {idx + 1}. {q}
                  </span>
                  {prompts.length > 1 && (
                    <button onClick={() => deletePrompt(idx)} className="text-slate-400 hover:text-red-500 cursor-pointer shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 44: PICK TOP 5 (FEATURE PRIORITY DECK)
   ============================================================================ */
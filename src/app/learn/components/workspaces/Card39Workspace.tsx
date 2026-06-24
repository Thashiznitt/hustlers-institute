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

interface QuadrantData {
  good: string[];
  criticism: string[];
  questions: string[];
  ideas: string[];
}

export default function Card39Workspace() {
  const [data, setData] = useState<QuadrantData>({
    good: [],
    criticism: [],
    questions: [],
    ideas: []
  });
  const [inputs, setInputs] = useState<Record<keyof QuadrantData, string>>({
    good: "",
    criticism: "",
    questions: "",
    ideas: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_feedback-grid");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.feedback) {
          setData(p.feedback);
          return;
        }
      } catch (e) {
        console.error("Failed to load feedback grid state", e);
      }
    }
    setData({
      good: ["Quick card billing authorization flows", "Friendly localized messages"],
      criticism: ["No explicit manual callback check if connection drops", "SMS receipts sometimes timeout"],
      questions: ["Are offline backup channels fully protected by SLAs?", "How long is the local auth cache valid?"],
      ideas: ["Add Mpesa transaction code copy triggers", "Allow custom CSV transaction downloads"]
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_feedback-grid", JSON.stringify({ feedback: data }));
  }, [data]);

  const addItem = (quad: keyof QuadrantData) => {
    const val = inputs[quad].trim();
    if (val) {
      setData({
        ...data,
        [quad]: [...data[quad], val]
      });
      setInputs({
        ...inputs,
        [quad]: ""
      });
    }
  };

  const removeItem = (quad: keyof QuadrantData, idx: number) => {
    setData({
      ...data,
      [quad]: data[quad].filter((_, i) => i !== idx)
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, quad: keyof QuadrantData) => {
    if (e.key === "Enter") {
      addItem(quad);
    }
  };

  return (
    <div className="space-y-6">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ DIGITAL 2X2 FEEDBACK QUADRANT
      </h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-2 border-black p-4 bg-emerald-50 text-left space-y-3">
          <h6 className="font-mono text-xs font-black uppercase text-emerald-950 flex items-center gap-1.5 border-b border-emerald-300 pb-1.5">
            👍 GOOD STUFF (Liked)
          </h6>
          <div className="flex gap-2">
            <Input
              value={inputs.good}
              onChange={e => setInputs({ ...inputs, good: e.target.value })}
              onKeyDown={e => handleKeyDown(e, "good")}
              placeholder="Add positive observation..."
              className="rounded-none h-8 text-xs flex-1"
            />
            <Button onClick={() => addItem("good")} className="bg-black hover:bg-slate-900 border-2 border-black rounded-none h-8 px-2.5">
              <Plus className="w-4 h-4 text-white" />
            </Button>
          </div>
          <ul className="space-y-1.5 max-h-40 overflow-y-auto pt-1 font-sans">
            {data.good.map((item, idx) => (
              <li key={idx} className="flex justify-between items-start gap-2 text-xs font-medium text-emerald-900 border-b border-emerald-100 pb-1">
                <span>• {item}</span>
                <button onClick={() => removeItem("good", idx)} className="text-emerald-700 hover:text-red-650 cursor-pointer shrink-0 mt-0.5">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-2 border-black p-4 bg-rose-50 text-left space-y-3">
          <h6 className="font-mono text-xs font-black uppercase text-rose-950 flex items-center gap-1.5 border-b border-rose-300 pb-1.5">
            👎 CRITICISMS (Pains)
          </h6>
          <div className="flex gap-2">
            <Input
              value={inputs.criticism}
              onChange={e => setInputs({ ...inputs, criticism: e.target.value })}
              onKeyDown={e => handleKeyDown(e, "criticism")}
              placeholder="Add friction or complaint..."
              className="rounded-none h-8 text-xs flex-1"
            />
            <Button onClick={() => addItem("criticism")} className="bg-black hover:bg-slate-900 border-2 border-black rounded-none h-8 px-2.5">
              <Plus className="w-4 h-4 text-white" />
            </Button>
          </div>
          <ul className="space-y-1.5 max-h-40 overflow-y-auto pt-1 font-sans">
            {data.criticism.map((item, idx) => (
              <li key={idx} className="flex justify-between items-start gap-2 text-xs font-medium text-rose-900 border-b border-rose-100 pb-1">
                <span>• {item}</span>
                <button onClick={() => removeItem("criticism", idx)} className="text-rose-700 hover:text-red-650 cursor-pointer shrink-0 mt-0.5">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-2 border-black p-4 bg-cyan-50 text-left space-y-3">
          <h6 className="font-mono text-xs font-black uppercase text-cyan-950 flex items-center gap-1.5 border-b border-cyan-300 pb-1.5">
            ❓ QUESTIONS (Queries)
          </h6>
          <div className="flex gap-2">
            <Input
              value={inputs.questions}
              onChange={e => setInputs({ ...inputs, questions: e.target.value })}
              onKeyDown={e => handleKeyDown(e, "questions")}
              placeholder="Add user confusion..."
              className="rounded-none h-8 text-xs flex-1"
            />
            <Button onClick={() => addItem("questions")} className="bg-black hover:bg-slate-900 border-2 border-black rounded-none h-8 px-2.5">
              <Plus className="w-4 h-4 text-white" />
            </Button>
          </div>
          <ul className="space-y-1.5 max-h-40 overflow-y-auto pt-1 font-sans">
            {data.questions.map((item, idx) => (
              <li key={idx} className="flex justify-between items-start gap-2 text-xs font-medium text-cyan-900 border-b border-cyan-100 pb-1">
                <span>• {item}</span>
                <button onClick={() => removeItem("questions", idx)} className="text-cyan-700 hover:text-red-650 cursor-pointer shrink-0 mt-0.5">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-2 border-black p-4 bg-amber-50 text-left space-y-3">
          <h6 className="font-mono text-xs font-black uppercase text-amber-950 flex items-center gap-1.5 border-b border-amber-300 pb-1.5">
            💡 NEW IDEAS (Suggestions)
          </h6>
          <div className="flex gap-2">
            <Input
              value={inputs.ideas}
              onChange={e => setInputs({ ...inputs, ideas: e.target.value })}
              onKeyDown={e => handleKeyDown(e, "ideas")}
              placeholder="Add feature request..."
              className="rounded-none h-8 text-xs flex-1"
            />
            <Button onClick={() => addItem("ideas")} className="bg-black hover:bg-slate-900 border-2 border-black rounded-none h-8 px-2.5">
              <Plus className="w-4 h-4 text-white" />
            </Button>
          </div>
          <ul className="space-y-1.5 max-h-40 overflow-y-auto pt-1 font-sans">
            {data.ideas.map((item, idx) => (
              <li key={idx} className="flex justify-between items-start gap-2 text-xs font-medium text-amber-900 border-b border-amber-100 pb-1">
                <span>• {item}</span>
                <button onClick={() => removeItem("ideas", idx)} className="text-amber-700 hover:text-red-650 cursor-pointer shrink-0 mt-0.5">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 41: CUSTOMER CHANNELS MAP (TOUCHPOINT PATHWAY)
   ============================================================================ */
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
import { useNicheCardContent } from "../../hooks/useNicheCardContent";
import NicheTailorBadge from "../NicheTailorBadge";

export default function Card01Workspace() {
  const niche = useNicheCardContent("interviews");
  const [chatTarget, setChatTarget] = useState("");
  const [chatProblem, setChatProblem] = useState("");
  const [chatQuestions, setChatQuestions] = useState<string[]>([
    "Tell me about the last time you tried to sync trainer schedules with client bookings.",
    "How do you handle schedule conflicts when they happen in the middle of a busy week?",
    "What is the hardest part about using multiple chat programs to handle customer requests?",
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [copied, setCopied] = useState(false);

  // Load state on mount
  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_interviews");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.chatTarget) setChatTarget(p.chatTarget);
        if (p.chatProblem) setChatProblem(p.chatProblem);
        if (p.chatQuestions) setChatQuestions(p.chatQuestions);
      } catch (e) {
        console.error("Failed to load interview inputs", e);
      }
    }
  }, []);

  // Save state on changes
  useEffect(() => {
    const key = "hi_card_inputs_interviews";
    const data = { chatTarget, chatProblem, chatQuestions };
    localStorage.setItem(key, JSON.stringify(data));
  }, [chatTarget, chatProblem, chatQuestions]);

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setChatQuestions([...chatQuestions, newQuestion.trim()]);
      setNewQuestion("");
    }
  };

  const removeQuestion = (idx: number) => {
    setChatQuestions(chatQuestions.filter((_, i) => i !== idx));
  };

  const copyScript = () => {
    const text = `CUSTOMER CHATS INTERVIEW GUIDE
Target Audience: ${chatTarget}
Validated Pain Point: ${chatProblem}

Questions to Ask:
${chatQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <NicheTailorBadge status={niche.status} isTailored={niche.isTailored} ventureName={niche.ventureName} onRefresh={niche.refresh} />
      <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-2">
        <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider">
          🛠_ CHAT SCRIPT INTERACTIVE BUILDER
        </h5>
        <Button onClick={copyScript} className="bg-black hover:bg-slate-900 text-white rounded-none border border-black font-black uppercase text-[10px] px-3 h-8 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
          {copied ? <><Check className="w-3 h-3 mr-1" /> Copied</> : <><Copy className="w-3 h-3 mr-1" /> Copy Script</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Who are your customers?</Label>
            <Input
              value={chatTarget}
              onChange={e => setChatTarget(e.target.value)}
              placeholder={niche.placeholder("chatTarget")}
              className="rounded-none mt-1 h-9 text-xs placeholder:text-slate-400"
            />
          </div>
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-500">What problem do they have?</Label>
            <Input
              value={chatProblem}
              onChange={e => setChatProblem(e.target.value)}
              placeholder={niche.placeholder("chatProblem")}
              className="rounded-none mt-1 h-9 text-xs placeholder:text-slate-400"
            />
          </div>
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Add Interview Question</Label>
            <div className="flex gap-2 mt-1">
              <Input 
                value={newQuestion} 
                onChange={e => setNewQuestion(e.target.value)} 
                className="rounded-none h-9 text-xs flex-1"
                placeholder="Ask open ended questions..."
                onKeyDown={e => e.key === "Enter" && addQuestion()}
              />
              <Button onClick={addQuestion} className="bg-black hover:bg-slate-900 border-2 border-black rounded-none h-9 px-3 cursor-pointer">
                <Plus className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </div>

        {/* Notebook Preview */}
        <div className="bg-[#fffbeb] border-2 border-black p-5 relative shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div className="absolute left-2 top-4 bottom-4 flex flex-col justify-between w-2 pointer-events-none">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="w-3 h-3 bg-slate-400 border border-black rounded-full shadow-inner" />
            ))}
          </div>
          <div className="pl-6 space-y-3">
            <span className="text-[9px] font-bold text-rose-500 font-mono block">📓 INTERVIEW GUIDE SCRIPT</span>
            <div className="space-y-1 text-xs">
              <span className="font-extrabold uppercase font-mono text-[9px] text-slate-400">Context introduction</span>
              <p className="font-bold text-slate-900">
                "Hi! I am researching how {chatTarget || "[Target]"} struggle with {chatProblem || "[Problem]"} to build a simpler solution. May I ask you a few quick questions?"
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-extrabold uppercase font-mono text-[9px] text-slate-400 block">Question checklist</span>
              {chatQuestions.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No questions added yet.</p>
              ) : (
                <ul className="space-y-2 text-left">
                  {chatQuestions.map((q, idx) => (
                    <li key={idx} className="flex justify-between items-start group gap-2 text-xs text-slate-800 font-medium border-b border-slate-200 pb-1 leading-relaxed">
                      <span>{idx + 1}. {q}</span>
                      <button 
                        onClick={() => removeQuestion(idx)} 
                        className="opacity-65 hover:opacity-100 text-rose-600 shrink-0 ml-2 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

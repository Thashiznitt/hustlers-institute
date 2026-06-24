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

export default function Card38Workspace() {
  const [slides, setSlides] = useState<any[]>([]);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newBullets, setNewBullets] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newCategory, setNewCategory] = useState("Problem");
  const [playMode, setPlayMode] = useState(false);

  const defaultSlides = [
    { id: 1, category: "Title", title: "Sovereign Ledger App", bullets: "Instant ledger transaction tracking directly on client messaging apps. Zero internet-cost offline verification receipt workflows. Empowering African micro-merchants.", notes: "Introduce the name, team, and set the context. Explain the target market and the focus on messaging client integrations." },
    { id: 2, category: "Problem", title: "Micro-merchants lose money on fees and bad syncs", bullets: "Standard payment gateways charge high fees and fail under weak 3G connection limits. Manual bookkeeping is tedious, error-prone, and leads to customer billing disputes.", notes: "Present the core struggle. Highlight real observations from the diaries and empathy mapping exercises." },
    { id: 3, category: "Solution", title: "Direct messaging payment automation receipt logs", bullets: "Merchants trigger checkout links inside Whatsapp and customers get receipt logs via SMS. Transactions auto-populate database ledgers with zero manual entries required.", notes: "Demonstrate how our product directly addresses the customer pain points with simple UI screenshots." },
    { id: 4, category: "Market opportunity", title: "TAM SAM SOM", bullets: "TAM: 100 Million micro-businesses across Sub-Saharan Africa. SAM: 15 Million traders in East Africa using mobile payments. SOM: 50,000 retail merchants in capital cities during the first 12 months.", notes: "Highlight sizing and show that we have a highly targeted entry strategy." }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_pitch-deck");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.slides && parsed.slides.length > 0) {
          setSlides(parsed.slides);
          setCurrentSlideIdx(parsed.currentSlideIdx !== undefined ? parsed.currentSlideIdx : 0);
          return;
        }
      } catch(e) {}
    }
    setSlides(defaultSlides);
    setCurrentSlideIdx(0);
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      localStorage.setItem("hi_card_inputs_pitch-deck", JSON.stringify({ slides, currentSlideIdx }));
    }
  }, [slides, currentSlideIdx]);

  const updateCurrentSlide = (field: string, val: string) => {
    const updated = [...slides];
    updated[currentSlideIdx] = {
      ...updated[currentSlideIdx],
      [field]: val
    };
    setSlides(updated);
  };

  const addSlide = () => {
    const nextId = Date.now();
    const newSlide = {
      id: nextId,
      category: "General",
      title: "New Slide Title",
      bullets: "First key point. Second key point.",
      notes: "Presenter notes for this slide."
    };
    const updated = [...slides, newSlide];
    setSlides(updated);
    setCurrentSlideIdx(updated.length - 1);
  };

  const deleteSlide = (idx: number) => {
    if (slides.length <= 1) return;
    const updated = slides.filter((_, i) => i !== idx);
    setSlides(updated);
    setCurrentSlideIdx(prev => (prev >= updated.length ? 0 : prev));
  };

  const currentSlide = slides[currentSlideIdx] || defaultSlides[0];

  if (playMode) {
    return (
      <div className="fixed inset-0 z-50 bg-black text-white p-12 flex flex-col justify-between select-none">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <span className="font-mono text-xs uppercase font-extrabold tracking-widest text-amber-400">
            📺 Sovereign Slide Deck Player (Slide {currentSlideIdx + 1} of {slides.length})
          </span>
          <Button onClick={() => setPlayMode(false)} className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 font-black uppercase text-[10px] h-8 px-4 rounded-none">
            Exit Player
          </Button>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 my-auto">
          <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest block">{currentSlide.category}</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-white font-heading leading-tight border-b-4 border-white pb-6 max-w-2xl mx-auto">
            {currentSlide.title}
          </h2>
          <div className="space-y-4 max-w-xl mx-auto text-left text-zinc-300 font-sans text-lg md:text-xl font-medium leading-relaxed">
            {currentSlide.bullets.split(".").filter((b: string) => b.trim()).map((b: string, i: number) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-amber-400 shrink-0 mt-1">✦</span>
                <span>{b.trim()}.</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-zinc-800 pt-4">
          <div className="flex gap-2">
            <Button
              disabled={currentSlideIdx === 0}
              onClick={() => setCurrentSlideIdx(currentSlideIdx - 1)}
              className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-none border border-zinc-700 font-black uppercase text-xs h-9 px-4 disabled:opacity-50"
            >
              ◀ Previous
            </Button>
            <Button
              disabled={currentSlideIdx === slides.length - 1}
              onClick={() => setCurrentSlideIdx(currentSlideIdx + 1)}
              className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-none border border-zinc-700 font-black uppercase text-xs h-9 px-4 disabled:opacity-50"
            >
              Next ▶
            </Button>
          </div>
          <span className="font-mono text-zinc-500 text-xs">Click buttons to navigate slides</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-2">
        <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider">
          🛠_ INTERACTIVE BUSINESS SLIDE DECK BUILDER
        </h5>
        <Button onClick={() => setPlayMode(true)} className="bg-amber-400 hover:bg-amber-500 text-black border-2 border-black rounded-none font-black uppercase text-[10px] px-3 h-8 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
          ▶ Play Slideshow
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Slide index and adding/removing */}
        <div className="lg:col-span-3 border-2 border-black p-3 bg-slate-50 space-y-2">
          <span className="text-[9px] font-mono font-black text-slate-450 uppercase block border-b border-slate-200 pb-1.5">Slide deck cards ({slides.length})</span>
          <div className="space-y-1.5 max-h-[220px] overflow-y-auto">
            {slides.map((s, idx) => (
              <div
                key={s.id || idx}
                onClick={() => setCurrentSlideIdx(idx)}
                className={`p-2 border border-black cursor-pointer transition-all flex items-center justify-between text-xs rounded-none ${
                  currentSlideIdx === idx ? "bg-amber-400 text-black font-bold shadow-none" : "bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="truncate pr-2">
                  <span className="font-mono text-[9px] font-black text-slate-400 mr-1.5">#{idx + 1}</span>
                  <span className="uppercase text-[10px] tracking-wide font-black">{s.title.substring(0, 16) || "Untitled"}</span>
                </div>
                {slides.length > 1 && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      deleteSlide(idx);
                    }}
                    className="text-slate-400 hover:text-red-500 cursor-pointer shrink-0 ml-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <Button onClick={addSlide} className="w-full bg-black hover:bg-slate-900 border border-black rounded-none text-white font-black uppercase text-[9px] h-8 mt-2">
            <Plus className="w-3 h-3 mr-1" /> Add Slide Card
          </Button>
        </div>

        {/* Center: Slide Visual Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border-4 border-black bg-white aspect-[16/9] w-full p-4 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative select-none">
            <div className="flex justify-between items-center border-b border-slate-200 pb-1">
              <span className="font-mono text-[8px] font-black text-amber-500 uppercase tracking-widest">{currentSlide.category}</span>
              <span className="font-mono text-[8px] font-bold text-slate-400">SLIDE #{currentSlideIdx + 1} / {slides.length}</span>
            </div>

            <div className="my-auto py-2 text-center">
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 leading-tight mb-2 max-w-[90%] mx-auto">{currentSlide.title}</h4>
              <div className="space-y-1 text-[8.5px] font-medium leading-relaxed text-slate-600 text-left max-w-[90%] mx-auto">
                {currentSlide.bullets.split(".").filter((b: string) => b.trim()).map((b: string, i: number) => (
                  <div key={i} className="flex gap-1.5 items-start">
                    <span className="text-amber-500 text-[8px] shrink-0 mt-0.5">✦</span>
                    <span>{b.trim()}.</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-dashed border-slate-200 pt-1.5 flex justify-between text-[7px] font-mono font-black text-slate-400 uppercase leading-none">
              <span>Sovereign Product Builder</span>
              <span>Slide Preview</span>
            </div>
          </div>

          <div className="border-2 border-black p-3.5 bg-slate-50 space-y-1">
            <span className="text-[9px] font-mono font-black text-slate-500 uppercase block">🎙️ Presenter Script / Notes</span>
            <p className="text-[10px] italic font-medium leading-normal text-slate-600 font-sans">&ldquo;{currentSlide.notes || "No slide notes written yet."}&rdquo;</p>
          </div>
        </div>

        {/* Right: Slide Editor Fields */}
        <div className="lg:col-span-4 border-2 border-black p-4 bg-white space-y-3">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase block border-b border-slate-100 pb-1.5">Configure Slide #{currentSlideIdx + 1}</span>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-400 block mb-1">Slide Category</Label>
            <SovereignSelect value={currentSlide.category} onChange={e => updateCurrentSlide("category", e.target.value)} className="w-full rounded-none p-1.5 text-xs focus-visible:outline-none">
              <option>Title</option>
              <option>Problem</option>
              <option>Solution</option>
              <option>Demo</option>
              <option>Market opportunity</option>
              <option>Business model</option>
              <option>Go-to-market</option>
              <option>Traction</option>
              <option>Team</option>
              <option>Financial ask</option>
            </SovereignSelect>
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-400 block mb-1">Slide Title</Label>
            <Input value={currentSlide.title} onChange={e => updateCurrentSlide("title", e.target.value)} className="rounded-none text-xs h-8" />
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-400 block mb-1">Slide Bullet points (Separate by period)</Label>
            <Textarea value={currentSlide.bullets} onChange={e => updateCurrentSlide("bullets", e.target.value)} rows={3} className="rounded-none text-xs resize-none" placeholder="Point one. Point two." />
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-400 block mb-1">Presenter Script Notes</Label>
            <Textarea value={currentSlide.notes} onChange={e => updateCurrentSlide("notes", e.target.value)} rows={2} className="rounded-none text-xs resize-none" placeholder="Notes for presenting..." />
          </div>
        </div>
      </div>
    </div>
  );
}
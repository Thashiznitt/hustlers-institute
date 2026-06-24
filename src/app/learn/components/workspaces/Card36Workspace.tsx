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

interface MoodCard {
  id: string;
  imgUrl: string;
  title: string;
  desc: string;
  font: string;
}

export default function Card36Workspace() {
  const [cards, setCards] = useState<MoodCard[]>([]);
  const [imgUrl, setImgUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [font, setFont] = useState("Inter");

  const fonts = [
    { name: "Inter", stack: "var(--font-sans), system-ui, sans-serif" },
    { name: "Playfair Display", stack: "Georgia, serif" },
    { name: "Brutalist Mono", stack: "Courier New, monospace" },
    { name: "Outfit", stack: "Impact, sans-serif" }
  ];

  const placeholders = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=400&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80"
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_mood-board");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.cards) {
          setCards(p.cards);
          return;
        }
      } catch (e) {
        console.error("Failed to load mood board", e);
      }
    }
    setCards([
      { id: "1", imgUrl: placeholders[0], title: "Sunny Coastline", desc: "Warm yellow brand vibes with soft shadows", font: "Inter" },
      { id: "2", imgUrl: placeholders[1], title: "Premium Dark", desc: "Sleek obsidian gradients for high end look", font: "Playfair Display" },
      { id: "3", imgUrl: placeholders[2], title: "Neo Brutalism Grid", desc: "Heavy black card grids and monospace text", font: "Brutalist Mono" }
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_mood-board", JSON.stringify({ cards }));
  }, [cards]);

  const addCard = () => {
    if (title.trim()) {
      const targetImg = imgUrl.trim() || placeholders[Math.floor(Math.random() * placeholders.length)];
      const newCard = {
        id: Date.now().toString(),
        imgUrl: targetImg,
        title: title.trim(),
        desc: desc.trim() || "N/A",
        font
      };
      setCards([...cards, newCard]);
      setTitle("");
      setDesc("");
      setImgUrl("");
    }
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ BRAND STYLE BOARD CANVAS
      </h5>

      <div className="border-2 border-black p-4 bg-slate-50 space-y-4 text-left">
        <span className="text-[10px] font-mono font-black text-slate-700 uppercase block">Add Card to Style Board</span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Title</Label>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Neon Accent"
              className="rounded-none h-8 text-xs mt-1"
            />
          </div>
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Image URL</Label>
            <Input
              value={imgUrl}
              onChange={e => setImgUrl(e.target.value)}
              placeholder="Leave blank for random"
              className="rounded-none h-8 text-xs mt-1"
            />
          </div>
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Font Selection</Label>
            <SovereignSelect
              value={font}
              onChange={e => setFont(e.target.value)}
              className="w-full h-8 rounded-none text-xs px-2 mt-1 font-mono font-bold focus:outline-none"
            >
              {fonts.map(f => (
                <option key={f.name} value={f.name}>{f.name}</option>
              ))}
            </SovereignSelect>
          </div>
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Description</Label>
            <Input
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Short visual note"
              className="rounded-none h-8 text-xs mt-1"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={addCard} className="bg-black hover:bg-slate-900 border-2 border-black rounded-none font-black uppercase text-[10px] h-8 px-4 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Canvas Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.length === 0 ? (
          <p className="col-span-full text-xs text-slate-400 italic text-center py-8">Your style board is empty.</p>
        ) : (
          cards.map(c => {
            const fontObj = fonts.find(f => f.name === c.font) || fonts[0];
            return (
              <div 
                key={c.id} 
                className="border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="h-32 border-b border-black overflow-hidden relative bg-slate-100">
                    <img 
                      src={c.imgUrl} 
                      alt={c.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-left space-y-1.5">
                    <h6 
                      className="font-bold text-xs uppercase leading-tight text-slate-900"
                      style={{ fontFamily: fontObj.stack }}
                    >
                      {c.title}
                    </h6>
                    <p 
                      className="text-[10px] text-slate-650 leading-relaxed font-medium"
                      style={{ fontFamily: fontObj.stack }}
                    >
                      {c.desc}
                    </p>
                  </div>
                </div>
                <div className="p-2.5 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                  <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">Font: {c.font}</span>
                  <button 
                    onClick={() => deleteCard(c.id)} 
                    className="text-slate-400 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 37: TEAM ROADMAP (SVG MILESTONE ROUTE)
   ============================================================================ */
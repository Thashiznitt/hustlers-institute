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

interface Touchpoint {
  id: string;
  title: string;
  channel: string;
  details: string;
}

export default function Card41Workspace() {
  const [touchpoints, setTouchpoints] = useState<Touchpoint[]>([]);
  const [title, setTitle] = useState("");
  const [channel, setChannel] = useState("Digital");
  const [details, setDetails] = useState("");

  const channels = ["Digital", "Offline", "Physical", "Hybrid"];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_experience-journey");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.touchpoints && p.touchpoints.length > 0) {
          setTouchpoints(p.touchpoints);
          return;
        }
      } catch (e) {
        console.error("Failed to load experience channel map state", e);
      }
    }
    setTouchpoints([
      { id: "1", title: "Customer scans QR code at counter", channel: "Physical", details: "Opens checkout page on browser instantly" },
      { id: "2", title: "Fill details & click pay via Mpesa", channel: "Digital", details: "Sends STK push trigger request to phone" },
      { id: "3", title: "Receive automated SMS transaction receipt", channel: "Hybrid", details: "Customer gets instant transaction ledger log link" }
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_experience-journey", JSON.stringify({ touchpoints }));
  }, [touchpoints]);

  const addTouchpoint = () => {
    if (title.trim()) {
      const newT = {
        id: Date.now().toString(),
        title: title.trim(),
        channel,
        details: details.trim() || "N/A"
      };
      setTouchpoints([...touchpoints, newT]);
      setTitle("");
      setDetails("");
    }
  };

  const deleteTouchpoint = (id: string) => {
    setTouchpoints(touchpoints.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ CUSTOMER TOUCHPOINT CHANNELS FLOW
      </h5>

      <div className="border-2 border-black p-4 bg-slate-50 text-left select-none overflow-x-auto">
        <span className="text-[9px] font-mono font-black text-slate-400 uppercase block mb-3">📍 Sequential Channel Flow</span>
        <div className="flex items-center gap-3 py-4 min-w-[600px] flex-nowrap">
          {touchpoints.map((t, idx) => (
            <React.Fragment key={t.id}>
              {idx > 0 && (
                <div className="text-black font-bold font-mono text-base shrink-0 select-none">
                  ➜
                </div>
              )}
              <div className="border-2 border-black p-3 bg-white w-48 shrink-0 relative flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <div className="flex justify-between items-start gap-1">
                    <span className={`text-[8px] font-mono px-1.5 py-0.2 border border-black font-bold uppercase rounded-none ${
                      t.channel === "Digital" ? "bg-cyan-100 text-cyan-800" :
                      t.channel === "Offline" ? "bg-amber-100 text-amber-800" :
                      t.channel === "Physical" ? "bg-emerald-100 text-emerald-800" :
                      "bg-purple-100 text-purple-800"
                    }`}>
                      {t.channel}
                    </span>
                    <button onClick={() => deleteTouchpoint(t.id)} className="text-slate-450 hover:text-red-500 cursor-pointer shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h6 className="font-bold text-[11px] text-slate-905 mt-2 leading-tight uppercase font-mono">{t.title}</h6>
                  <p className="text-[10px] text-slate-500 mt-1 italic leading-relaxed">&ldquo;{t.details}&rdquo;</p>
                </div>
                <div className="text-[8px] font-mono font-black text-slate-400 text-right mt-2">
                  Step {idx + 1}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="border-2 border-black p-4 bg-white text-left space-y-4">
        <span className="text-[10px] font-mono font-black text-slate-700 uppercase block border-b border-slate-100 pb-1.5">Add Channel Touchpoint</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Touchpoint Title</Label>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Scans checkout barcode"
              className="rounded-none h-8 text-xs mt-1"
            />
          </div>
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Channel Type</Label>
            <SovereignSelect
              value={channel}
              onChange={e => setChannel(e.target.value)}
              className="w-full h-8 rounded-none text-xs px-2 mt-1 font-mono font-bold focus:outline-none"
            >
              {channels.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </SovereignSelect>
          </div>
          <div>
            <Label className="text-[10px] font-mono font-black uppercase text-slate-500">Details / Actions</Label>
            <Input
              value={details}
              onChange={e => setDetails(e.target.value)}
              placeholder="What happens at this step?"
              className="rounded-none h-8 text-xs mt-1"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={addTouchpoint} className="bg-black hover:bg-slate-900 border-2 border-black rounded-none text-white font-black uppercase text-[10px] h-8 px-4 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Pathway Node
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 42: CONVERSATION CARDS (STARTER DECKS)
   ============================================================================ */
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

export default function Card09Workspace() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [ring, setRing] = useState("core");
  const [details, setDetails] = useState("");

  const defaultNodes = [
    { id: 1, name: "Venture Partners", ring: "core", details: "Write application code, deploy frontend" },
    { id: 2, name: "Freelance Trainers", ring: "direct", details: "Teach fitness clients, request bookings" },
    { id: 3, name: "Telecom Providers", ring: "indirect", details: "Approve USSD codes, host SMS API gateway" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_stakeholder-maps");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.nodes) {
          setNodes(parsed.nodes);
          return;
        }
      } catch(e) {}
    }
    setNodes(defaultNodes);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_stakeholder-maps", JSON.stringify({ nodes }));
  }, [nodes]);

  const addNode = () => {
    if (name.trim()) {
      setNodes([...nodes, { id: Date.now(), name, ring, details: details || "N/A" }]);
      setName("");
      setDetails("");
    }
  };

  return (
    <div className="space-y-6 text-left">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ PARTNER STAKEHOLDER WORKSPACE MAP
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 border-2 border-black p-4 bg-slate-50 space-y-3">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase">Add Stakeholder Partner</span>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Stakeholder Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Stripe checkout Gateway" className="rounded-none text-xs mt-1 h-8" />
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500 block mb-1">Influence Ring / Category</Label>
            <div className="flex gap-1">
              {["core", "direct", "indirect"].map(rType => (
                <button key={rType} type="button" onClick={() => setRing(rType)} className={`flex-1 py-1 border border-black text-[9px] font-black uppercase transition-all rounded-none ${ring === rType ? "bg-black text-white" : "bg-white text-black hover:bg-slate-100"}`}>
                  {rType}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Value Flow details (Provide/Receive)</Label>
            <Textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="What do they provide or receive?" rows={2} className="rounded-none text-xs mt-1 resize-none" />
          </div>
          <Button onClick={addNode} className="w-full bg-black hover:bg-slate-900 border border-black rounded-none text-white font-black uppercase text-[10px] h-8 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Stakeholder
          </Button>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-black p-4 bg-white relative flex flex-col items-center justify-center min-h-[220px]">
            <span className="text-[9px] font-mono font-black text-slate-400 uppercase absolute top-2 left-2">Circular Map Blueprint</span>
            
            <div className="w-[180px] h-[180px] border-2 border-black rounded-full flex items-center justify-center relative bg-slate-50">
              <div className="w-[120px] h-[120px] border border-dashed border-black rounded-full flex items-center justify-center relative bg-slate-100">
                <div className="w-[60px] h-[60px] border border-black rounded-full flex items-center justify-center bg-black text-white text-[8px] font-black uppercase font-mono text-center">
                  Core
                </div>
              </div>
              
              {nodes.map((n, idx) => {
                const angle = (idx * 360) / nodes.length;
                const distance = n.ring === "core" ? 25 : n.ring === "direct" ? 60 : 85;
                const x = 90 + distance * Math.cos((angle * Math.PI) / 180) - 15;
                const y = 90 + distance * Math.sin((angle * Math.PI) / 180) - 15;
                return (
                  <div
                    key={n.id}
                    className={`absolute w-8 h-8 rounded-full border border-black flex items-center justify-center text-[8px] font-black uppercase font-mono shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-help ${
                      n.ring === "core" ? "bg-amber-300" : n.ring === "direct" ? "bg-emerald-300" : "bg-sky-300"
                    }`}
                    style={{ left: `${x}px`, top: `${y}px` }}
                    title={`${n.name}: ${n.details}`}
                  >
                    {n.name.substring(0, 3)}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {nodes.map((n, idx) => (
              <div key={n.id} className="border border-slate-200 p-2 bg-white flex justify-between items-center text-xs">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 truncate">{n.name}</span>
                    <Badge className={`border border-black rounded-none text-[8px] font-mono py-0 ${n.ring === "core" ? "bg-amber-300 text-black" : n.ring === "direct" ? "bg-emerald-300 text-black" : "bg-sky-300 text-black"}`}>{n.ring}</Badge>
                  </div>
                  <p className="text-slate-500 italic text-[10px] mt-0.5 truncate">{n.details}</p>
                </div>
                <button onClick={() => setNodes(nodes.filter(item => item.id !== n.id))} className="text-slate-400 hover:text-red-500 cursor-pointer ml-2">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 10: USING CUSTOMER WORDS (semantic-analysis)
   ============================================================================ */
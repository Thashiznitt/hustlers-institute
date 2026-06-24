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

export default function Card11Workspace() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Frontend client");
  const [description, setDescription] = useState("");

  const defaultNodes = [
    { id: 1, name: "Web App Workspace", type: "Frontend client", description: "Renders brutalist dashboard with Tailwind and charts" },
    { id: 2, name: "Transactional backend Gateway", type: "Server/API API", description: "Verifies user sessions and writes ledger entries to SQL db" },
    { id: 3, name: "PostgreSQL Database ledger", type: "SQL Database DB", description: "Stores serialized transaction ledger rows securely" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_system-map");
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
    localStorage.setItem("hi_card_inputs_system-map", JSON.stringify({ nodes }));
  }, [nodes]);

  const addNode = () => {
    if (name.trim()) {
      setNodes([...nodes, { id: Date.now(), name, type, description }]);
      setName("");
      setDescription("");
    }
  };

  return (
    <div className="space-y-6 text-left">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ SYSTEM DATA ARCHITECTURE FLOW MAP
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 border border-slate-200 p-4 bg-slate-50 space-y-3 rounded-none">
          <span className="text-[10px] font-mono font-black text-slate-750 uppercase">Add Component</span>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Component Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Web App UI" className="mt-1" />
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500 block mb-1">Node Type</Label>
            <SovereignSelect value={type} onChange={e => setType(e.target.value)} className="mt-1">
              <option>Frontend client</option>
              <option>Server/API API</option>
              <option>SQL Database DB</option>
              <option>Third-party SDK Integration</option>
            </SovereignSelect>
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Description / Data Flow</Label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What does this component process?" rows={2} className="mt-1" />
          </div>
          <Button onClick={addNode} className="w-full bg-black hover:bg-slate-900 border border-black rounded-none text-white font-black uppercase text-[10px] h-8 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Component Node
          </Button>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-black p-4 bg-[#f8fafc] min-h-[220px] flex flex-col justify-center relative">
            <span className="text-[9px] font-mono font-black text-slate-400 uppercase absolute top-2 left-2">Flow Graph Blueprint</span>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center py-6">
              {nodes.map((n, idx) => (
                <React.Fragment key={n.id}>
                  <div className="border-2 border-black p-3 bg-white w-36 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-[7.5px] font-mono font-black uppercase text-rose-500 block leading-none mb-1">{n.type}</span>
                    <span className="font-bold text-[11px] block leading-tight text-slate-900">{n.name}</span>
                  </div>
                  {idx < nodes.length - 1 && (
                    <div className="font-mono text-lg font-black text-slate-400 select-none md:rotate-0 rotate-90 my-1 md:my-0">
                      ➔
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {nodes.map(n => (
              <div key={n.id} className="border border-slate-200 p-2 bg-white flex justify-between items-center text-xs">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 truncate">{n.name}</span>
                    <Badge className="bg-slate-100 text-slate-700 border border-slate-300 font-mono rounded-none text-[8.5px] py-0">{n.type}</Badge>
                  </div>
                  <p className="text-slate-500 italic text-[10px] mt-0.5 truncate">{n.description}</p>
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
   CARD 12: CUSTOMER FEELINGS MAP (empathy-map)
   ============================================================================ */
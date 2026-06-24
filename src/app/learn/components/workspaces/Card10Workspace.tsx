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

export default function Card10Workspace() {
  const [items, setItems] = useState<any[]>([]);
  const [customer, setCustomer] = useState("");
  const [technical, setTechnical] = useState("");
  const [brand, setBrand] = useState("");
  const [query, setQuery] = useState("");

  const defaultItems = [
    { id: 1, customer: "Float balance", technical: "Escrow account balance in ledger", brand: "Available Account Wallet" },
    { id: 2, customer: "Confirm cash out", technical: "Triggering transactional payout API", brand: "Approve transfer" },
    { id: 3, customer: "Receipt print offline", technical: "Queue transaction metadata to SMS hook", brand: "Whatsapp receipts" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_semantic-analysis");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.items) {
          setItems(parsed.items);
          return;
        }
      } catch(e) {}
    }
    setItems(defaultItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_semantic-analysis", JSON.stringify({ items }));
  }, [items]);

  const addItem = () => {
    if (customer.trim() && technical.trim() && brand.trim()) {
      setItems([...items, { id: Date.now(), customer, technical, brand }]);
      setCustomer("");
      setTechnical("");
      setBrand("");
    }
  };

  const filtered = items.filter(i => 
    i.customer.toLowerCase().includes(query.toLowerCase()) ||
    i.technical.toLowerCase().includes(query.toLowerCase()) ||
    i.brand.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ CUSTOMER WORDS TRANSLATION GLOSSARY
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 border-2 border-black p-4 bg-slate-50 space-y-3">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase">Add Glossary Term</span>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Confusing Customer Term</Label>
            <Input value={customer} onChange={e => setCustomer(e.target.value)} placeholder="e.g. float balance" className="rounded-none text-xs mt-1 h-8" />
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Technical Backend Speak</Label>
            <Input value={technical} onChange={e => setTechnical(e.target.value)} placeholder="e.g. escrow ledger schema" className="rounded-none text-xs mt-1 h-8" />
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Branding Alternative Copy</Label>
            <Input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. My wallet balance" className="rounded-none text-xs mt-1 h-8" />
          </div>
          <Button onClick={addItem} className="w-full bg-black hover:bg-slate-900 border border-black rounded-none text-white font-black uppercase text-[10px] h-8 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Glossary Entry
          </Button>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="relative">
            <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search glossary term..." className="pl-9 rounded-none text-xs h-9" />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No matches found.</p>
            ) : (
              filtered.map(i => (
                <div key={i.id} className="border-2 border-black p-3 bg-white space-y-2 text-xs">
                  <div className="flex justify-between items-start border-b border-dashed border-slate-200 pb-1.5">
                    <span className="font-mono text-[8px] font-extrabold uppercase text-slate-400">Translation ID: #{i.id}</span>
                    <button onClick={() => setItems(items.filter(item => item.id !== i.id))} className="text-slate-400 hover:text-red-500 cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[8px] font-mono text-slate-400 block uppercase font-bold">Struggle speak</span>
                      <span className="font-bold text-slate-900 italic">&ldquo;{i.customer}&rdquo;</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-slate-400 block uppercase font-bold">Tech talk</span>
                      <span className="text-slate-600 font-mono text-[10px] break-all">{i.technical}</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-slate-400 block uppercase font-bold">Alternative copy</span>
                      <span className="font-bold text-emerald-600">&ldquo;{i.brand}&rdquo;</span>
                    </div>
                  </div>
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
   CARD 11: HOW THINGS WORK MAP (system-map)
   ============================================================================ */
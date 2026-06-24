"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Check, 
  AlertTriangle, 
  DollarSign, 
  Trophy, 
  ShieldAlert 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SovereignInput as Input } from "@/components/ui/SovereignInput";
import { Label } from "@/components/ui/label";
import { SovereignTextarea as Textarea } from "@/components/ui/SovereignTextarea";

interface Competitor {
  id: number;
  name: string;
  offering: string;
  strengths: string;
  weaknesses: string;
  pricing: string;
  advantage: string;
}

export default function Card46Workspace() {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [name, setName] = useState("");
  const [offering, setOffering] = useState("");
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [pricing, setPricing] = useState("");
  const [advantage, setAdvantage] = useState("");

  const defaultCompetitors: Competitor[] = [
    { 
      id: 1, 
      name: "Standard Cash Ledgers", 
      offering: "Manual paper notebook logging",
      strengths: "Zero technology needed, 100% reliable, zero upfront cost", 
      weaknesses: "Easy to lose, no automatic totals, no data insights, hard to scale", 
      pricing: "Free (cost of paper)", 
      advantage: "We offer instant calculation, automatic backups, and WhatsApp receipt sharing." 
    },
    { 
      id: 2, 
      name: "Generic Accounting Apps", 
      offering: "Desktop & cloud accounting suites",
      strengths: "Extremely robust reports, tax calculations, professional tools", 
      weaknesses: "Too complex for casual merchants, high learning curve, requires constant high-speed internet", 
      pricing: "Subscription ($15 - $50/month)", 
      advantage: "We are mobile-first, designed specifically for micro-merchants, work offline, and cost a fraction of the price." 
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_competitive-analysis");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.competitors) {
          setCompetitors(parsed.competitors);
          return;
        }
      } catch(e) {}
    }
    setCompetitors(defaultCompetitors);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_competitive-analysis", JSON.stringify({ competitors }));
    window.dispatchEvent(new Event("storage"));
  }, [competitors]);

  useEffect(() => {
    const handleClear = () => {
      setCompetitors(defaultCompetitors);
    };
    window.addEventListener("hi_clear_card_competitive-analysis", handleClear);
    return () => {
      window.removeEventListener("hi_clear_card_competitive-analysis", handleClear);
    };
  }, []);

  const addCompetitor = () => {
    if (name.trim()) {
      setCompetitors([
        ...competitors, 
        { 
          id: Date.now(), 
          name, 
          offering: offering || "N/A", 
          strengths: strengths || "N/A", 
          weaknesses: weaknesses || "N/A", 
          pricing: pricing || "N/A", 
          advantage: advantage || "N/A" 
        }
      ]);
      setName("");
      setOffering("");
      setStrengths("");
      setWeaknesses("");
      setPricing("");
      setAdvantage("");
    }
  };

  return (
    <div className="space-y-6 text-left">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ COMPETITIVE ANALYSIS MATRIX
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form panel */}
        <div className="lg:col-span-5 border-2 border-black p-4 bg-slate-50 space-y-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase block border-b border-black pb-1.5 mb-2">Add Competitor Profile</span>
          
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Competitor Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. QuickBooks, Ledger Books" className="rounded-none text-xs mt-1 h-9" />
          </div>

          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Core Offering</Label>
            <Input value={offering} onChange={e => setOffering(e.target.value)} placeholder="e.g. Desktop spreadsheet tool" className="rounded-none text-xs mt-1 h-9" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Pricing Model</Label>
              <Input value={pricing} onChange={e => setPricing(e.target.value)} placeholder="e.g. $10/month" className="rounded-none text-xs mt-1 h-9" />
            </div>
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Key Strengths</Label>
              <Input value={strengths} onChange={e => setStrengths(e.target.value)} placeholder="e.g. Robust offline, free" className="rounded-none text-xs mt-1 h-9" />
            </div>
          </div>

          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Key Weaknesses</Label>
            <Textarea value={weaknesses} onChange={e => setWeaknesses(e.target.value)} placeholder="What are their main limitations?" rows={2} className="rounded-none text-xs mt-1 resize-none" />
          </div>

          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Our Winning Advantage</Label>
            <Textarea value={advantage} onChange={e => setAdvantage(e.target.value)} placeholder="How do we beat them / stand out?" rows={2} className="rounded-none text-xs mt-1 resize-none" />
          </div>

          <Button onClick={addCompetitor} className="w-full bg-black hover:bg-slate-900 border-2 border-black rounded-none text-white font-black uppercase text-[10px] h-9 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
            <Plus className="w-4 h-4 mr-1 text-white" /> Log Competitor
          </Button>
        </div>

        {/* Comparison grid panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className="overflow-x-auto border-2 border-black bg-white p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-[9px] font-mono font-black text-slate-400 uppercase block mb-3">Comparison Matrix ({competitors.length} competitors)</span>
            
            {competitors.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">No competitors logged. Add them using the form.</p>
            ) : (
              <div className="flex gap-4 min-w-[500px] pb-2">
                {competitors.map(c => (
                  <div key={c.id} className="w-[240px] border-2 border-black bg-slate-50 p-3.5 flex flex-col justify-between shrink-0 relative shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    <div>
                      <div className="flex justify-between items-center border-b border-black pb-1.5 mb-2.5">
                        <span className="font-bold text-slate-900 text-xs uppercase tracking-wide truncate pr-2">{c.name}</span>
                        <button onClick={() => setCompetitors(competitors.filter(item => item.id !== c.id))} className="text-slate-400 hover:text-red-500 cursor-pointer shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>

                      <div className="space-y-2.5 text-[10px] text-slate-700 font-mono">
                        <div>
                          <span className="text-[8px] font-black uppercase text-slate-400 block mb-0.5">Core Offering</span>
                          <span className="font-sans font-medium text-slate-800 leading-tight block">{c.offering}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-black uppercase text-slate-400 block mb-0.5">Pricing model</span>
                          <div className="flex items-center gap-1 font-sans font-bold text-slate-900">
                            <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                            <span>{c.pricing}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-[8px] font-black uppercase text-slate-400 block mb-0.5">Strengths</span>
                            <span className="font-sans text-emerald-700 font-medium leading-tight block">{c.strengths}</span>
                          </div>
                          <div>
                            <span className="text-[8px] font-black uppercase text-slate-400 block mb-0.5">Weaknesses</span>
                            <span className="font-sans text-rose-700 font-medium leading-tight block">{c.weaknesses}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t-2 border-black pt-2.5 mt-3.5 bg-amber-100/60 p-2 border border-black rounded-none">
                      <div className="text-[8px] font-mono font-black uppercase text-amber-600 tracking-wider flex items-center gap-1 mb-1">
                        <Trophy className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                        <span>Winning Advantage</span>
                      </div>
                      <p className="text-[10.5px] font-sans font-semibold text-slate-800 leading-tight italic">
                        &ldquo;{c.advantage}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

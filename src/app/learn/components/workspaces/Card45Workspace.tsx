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

export default function Card45Workspace() {
  const [budget, setBudget] = useState(250);
  const [impressions, setImpressions] = useState(15000);
  const [ctr, setCtr] = useState(2.2);
  const [leadConv, setLeadConv] = useState(12.5);
  const [saleConv, setSaleConv] = useState(3.5);
  const [ltv, setLtv] = useState(120);

  // Load state on mount
  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_marketing-funnel");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.funnelBudget !== undefined) setBudget(p.funnelBudget);
        if (p.funnelImpressions !== undefined) setImpressions(p.funnelImpressions);
        if (p.funnelCtr !== undefined) setCtr(p.funnelCtr);
        if (p.funnelLeadConv !== undefined) setLeadConv(p.funnelLeadConv);
        if (p.funnelSaleConv !== undefined) setSaleConv(p.funnelSaleConv);
        if (p.funnelLtv !== undefined) setLtv(p.funnelLtv);
      } catch (e) {
        console.error("Failed to load funnel inputs", e);
      }
    }
  }, []);

  // Save state on change
  useEffect(() => {
    const key = "hi_card_inputs_marketing-funnel";
    const data = {
      funnelBudget: budget,
      funnelImpressions: impressions,
      funnelCtr: ctr,
      funnelLeadConv: leadConv,
      funnelSaleConv: saleConv,
      funnelLtv: ltv
    };
    localStorage.setItem(key, JSON.stringify(data));
  }, [budget, impressions, ctr, leadConv, saleConv, ltv]);

  const clicks = Math.round(impressions * (ctr / 100));
  const leads = Math.round(clicks * (leadConv / 100));
  const paidCustomers = Math.round(leads * (saleConv / 100));
  const cac = paidCustomers > 0 ? parseFloat((budget / paidCustomers).toFixed(2)) : 0;
  const revenue = paidCustomers * ltv;
  const netProfit = revenue - budget;
  const roas = budget > 0 ? parseFloat((revenue / budget).toFixed(1)) : 0;
  const roi = budget > 0 ? Math.round((netProfit / budget) * 100) : 0;

  return (
    <div className="space-y-6">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ FUNNEL CONVERSION ROI CALCULATOR
      </h5>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inputs */}
        <div className="lg:col-span-5 space-y-4 border-2 border-black p-4 bg-slate-50 text-[11px] text-left">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-700">Ad Budget ($)</Label>
              <Input 
                type="number"
                value={budget} 
                onChange={e => setBudget(Math.max(Number(e.target.value), 0))} 
                className="rounded-none mt-1 text-xs h-9"
              />
            </div>
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-700">Impressions</Label>
              <Input 
                type="number"
                value={impressions} 
                onChange={e => setImpressions(Math.max(Number(e.target.value), 0))} 
                className="rounded-none mt-1 text-xs h-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1">
            <div>
              <Label className="text-[8px] font-mono font-black uppercase text-slate-700">CTR %</Label>
              <Input 
                type="number"
                step="0.1"
                value={ctr} 
                onChange={e => setCtr(Math.max(Number(e.target.value), 0))} 
                className="rounded-none mt-1 text-[11px] h-8 px-1"
              />
            </div>
            <div>
              <Label className="text-[8px] font-mono font-black uppercase text-slate-700">Lead %</Label>
              <Input 
                type="number"
                step="0.1"
                value={leadConv} 
                onChange={e => setLeadConv(Math.max(Number(e.target.value), 0))} 
                className="rounded-none mt-1 text-[11px] h-8 px-1"
              />
            </div>
            <div>
              <Label className="text-[8px] font-mono font-black uppercase text-slate-700">Sale %</Label>
              <Input 
                type="number"
                step="0.1"
                value={saleConv} 
                onChange={e => setSaleConv(Math.max(Number(e.target.value), 0))} 
                className="rounded-none mt-1 text-[11px] h-8 px-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-700">Average Customer Lifetime Value (LTV $)</Label>
            <Input 
              type="number"
              value={ltv} 
              onChange={e => setLtv(Math.max(Number(e.target.value), 0))} 
              className="rounded-none mt-1 text-xs h-9"
            />
          </div>
        </div>

        {/* Visual outputs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-black p-4 bg-[#f8fafc] text-[10px] font-mono text-left">
            <span className="text-[9px] font-mono font-black text-slate-500 uppercase block mb-3">🎯 Funnel Visualizer</span>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-20 text-[9px] font-bold text-slate-550">1. VIEWS</span>
                <div className="flex-1 flex justify-center bg-slate-900 border border-black text-white p-0.5 text-[9px] font-bold">
                  {impressions.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-20 text-[9px] font-bold text-slate-550">2. CLICKS ({ctr}%)</span>
                <div className="flex-1 flex justify-center bg-indigo-500 border border-black text-white p-0.5 text-[9px] font-bold max-w-[80%] mx-auto">
                  {clicks.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-20 text-[9px] font-bold text-slate-550">3. LEADS ({leadConv}%)</span>
                <div className="flex-1 flex justify-center bg-purple-500 border border-black text-white p-0.5 text-[9px] font-bold max-w-[60%] mx-auto">
                  {leads.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-20 text-[9px] font-bold text-slate-550">4. SALES ({saleConv}%)</span>
                <div className="flex-1 flex justify-center bg-emerald-400 border border-black text-black p-0.5 text-[9px] font-bold max-w-[40%] mx-auto">
                  {paidCustomers.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="border border-black p-2 bg-white text-center">
              <span className="text-[8px] font-mono font-bold text-slate-400 block uppercase">CAC</span>
              <span className="text-sm font-black text-slate-900 font-mono">${cac}</span>
            </div>
            <div className="border border-black p-2 bg-white text-center">
              <span className="text-[8px] font-mono font-bold text-slate-400 block uppercase">LTV:CAC</span>
              <span className={`text-sm font-black font-mono ${cac > 0 && ltv / Number(cac) >= 3 ? "text-emerald-600" : "text-rose-600"}`}>
                {cac > 0 ? (ltv / Number(cac)).toFixed(1) : "0"}:1
              </span>
            </div>
            <div className="border border-black p-2 bg-white text-center">
              <span className="text-[8px] font-mono font-bold text-slate-400 block uppercase">ROAS</span>
              <span className="text-sm font-black text-slate-900 font-mono">{roas}x</span>
            </div>
            <div className={`border border-black p-2 text-center ${roi >= 100 ? "bg-emerald-100" : "bg-rose-100"}`}>
              <span className="text-[8px] font-mono font-bold text-slate-700 block uppercase">Net Profit</span>
              <span className="text-sm font-black text-slate-900 font-mono">${netProfit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 33: MOCK TOOLS (PHONE LAYOUT SIMULATOR)
   ============================================================================ */
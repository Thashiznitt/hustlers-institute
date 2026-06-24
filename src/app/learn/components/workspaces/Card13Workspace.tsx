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

interface BlueprintCell {
  frontstage: string;
  backstage: string;
  systems: string;
  policy: string;
}

export default function Card13Workspace() {
  const [blueprint, setBlueprint] = useState<Record<string, BlueprintCell>>({
    order: { frontstage: "", backstage: "", systems: "", policy: "" },
    prepare: { frontstage: "", backstage: "", systems: "", policy: "" },
    delivery: { frontstage: "", backstage: "", systems: "", policy: "" }
  });

  const defaultCoffeeExample: Record<string, BlueprintCell> = {
    order: {
      frontstage: "Customer enters shop, orders double espresso, taps credit card",
      backstage: "Cashier greets customer, inputs drink size in POS, hands ticket",
      systems: "Terminal authorizes bank API; transaction logged in local SQL DB",
      policy: "Must support dual offline checkout if bank gateway times out"
    },
    prepare: {
      frontstage: "Customer waits near pickup bar smelling coffee aroma",
      backstage: "Barista grinds espresso beans, tamps, extracts shot into cup",
      systems: "Machine extracts shot tracking water pressure and temperature",
      policy: "Sanitary code requires washing barista station every 2 hours"
    },
    delivery: {
      frontstage: "Customer receives cup, adds sugar, takes a hot sip",
      backstage: "Barista announces customer name, cleans counter area",
      systems: "Loyalty database awards points to card profile",
      policy: "Order handover SLA must complete within 120 seconds"
    }
  };

  // Load state on mount
  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_journey-map");
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.blueprintData) {
          setBlueprint(p.blueprintData);
          return;
        }
      } catch (e) {
        console.error("Failed to load blueprint inputs", e);
      }
    }
    setBlueprint(defaultCoffeeExample);
  }, []);

  // Save state on change
  useEffect(() => {
    const key = "hi_card_inputs_journey-map";
    const data = { blueprintData: blueprint };
    localStorage.setItem(key, JSON.stringify(data));
  }, [blueprint]);

  const loadCoffeeExample = () => {
    setBlueprint(defaultCoffeeExample);
  };

  const updateCell = (stage: string, layer: keyof BlueprintCell, val: string) => {
    setBlueprint({
      ...blueprint,
      [stage]: {
        ...blueprint[stage],
        [layer]: val
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-2">
        <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider">
          🛠_ SERVICE LAYERS WORKSPACE MATRIX
        </h5>
        <Button 
          onClick={loadCoffeeExample} 
          variant="outline" 
          className="border border-black bg-[#f8fafc] text-black hover:bg-slate-100 rounded-none font-mono font-extrabold uppercase text-[10px] h-8 gap-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
        >
          <Coffee className="w-3.5 h-3.5 text-amber-700 fill-amber-300" />
          Load Buying Coffee Example
        </Button>
      </div>

      <div className="overflow-x-auto border-2 border-black">
        <table className="w-full text-left min-w-[650px] border-collapse bg-white">
          <thead>
            <tr className="bg-black text-white text-[9px] font-mono font-extrabold uppercase tracking-widest">
              <th className="p-2 border-r border-slate-700">Service Layers</th>
              <th className="p-2 border-r border-slate-700 text-center w-1/3">Stage 1: Order & Pay (Entry)</th>
              <th className="p-2 border-r border-slate-700 text-center w-1/3">Stage 2: Brew & Prepare (Delivery)</th>
              <th className="p-2 text-center w-1/3">Stage 3: Handover (Exit)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black text-[11px] font-medium text-slate-700">
            {/* Frontstage */}
            <tr className="align-top">
              <td className="p-2 bg-rose-50/70 border-r border-black font-mono font-bold text-rose-900 select-none">
                <span>👤 Frontstage</span>
              </td>
              <td className="p-1.5 border-r border-slate-300">
                <Textarea 
                  value={blueprint.order.frontstage} 
                  onChange={e => updateCell("order", "frontstage", e.target.value)}
                  className="w-full h-20 p-1 border border-slate-200 resize-none focus-visible:outline-none focus-visible:border-black text-[10px]"
                />
              </td>
              <td className="p-1.5 border-r border-slate-300">
                <Textarea 
                  value={blueprint.prepare.frontstage} 
                  onChange={e => updateCell("prepare", "frontstage", e.target.value)}
                  className="w-full h-20 p-1 border border-slate-200 resize-none focus-visible:outline-none focus-visible:border-black text-[10px]"
                />
              </td>
              <td className="p-1.5">
                <Textarea 
                  value={blueprint.delivery.frontstage} 
                  onChange={e => updateCell("delivery", "frontstage", e.target.value)}
                  className="w-full h-20 p-1 border border-slate-200 resize-none focus-visible:outline-none focus-visible:border-black text-[10px]"
                />
              </td>
            </tr>

            {/* Backstage */}
            <tr className="align-top">
              <td className="p-2 bg-amber-50/70 border-r border-black font-mono font-bold text-amber-900 select-none">
                <span>🧑‍🍳 Backstage</span>
              </td>
              <td className="p-1.5 border-r border-slate-300">
                <Textarea 
                  value={blueprint.order.backstage} 
                  onChange={e => updateCell("order", "backstage", e.target.value)}
                  className="w-full h-20 p-1 border border-slate-200 resize-none focus-visible:outline-none focus-visible:border-black text-[10px]"
                />
              </td>
              <td className="p-1.5 border-r border-slate-300">
                <Textarea 
                  value={blueprint.prepare.backstage} 
                  onChange={e => updateCell("prepare", "backstage", e.target.value)}
                  className="w-full h-20 p-1 border border-slate-200 resize-none focus-visible:outline-none focus-visible:border-black text-[10px]"
                />
              </td>
              <td className="p-1.5">
                <Textarea 
                  value={blueprint.delivery.backstage} 
                  onChange={e => updateCell("delivery", "backstage", e.target.value)}
                  className="w-full h-20 p-1 border border-slate-200 resize-none focus-visible:outline-none focus-visible:border-black text-[10px]"
                />
              </td>
            </tr>

            {/* Systems */}
            <tr className="align-top">
              <td className="p-2 bg-cyan-50/70 border-r border-black font-mono font-bold text-cyan-900 select-none">
                <span>💻 Systems</span>
              </td>
              <td className="p-1.5 border-r border-slate-300">
                <Textarea 
                  value={blueprint.order.systems} 
                  onChange={e => updateCell("order", "systems", e.target.value)}
                  className="w-full h-20 p-1 border border-slate-200 resize-none focus-visible:outline-none focus-visible:border-black text-[10px]"
                />
              </td>
              <td className="p-1.5 border-r border-slate-300">
                <Textarea 
                  value={blueprint.prepare.systems} 
                  onChange={e => updateCell("prepare", "systems", e.target.value)}
                  className="w-full h-20 p-1 border border-slate-200 resize-none focus-visible:outline-none focus-visible:border-black text-[10px]"
                />
              </td>
              <td className="p-1.5">
                <Textarea 
                  value={blueprint.delivery.systems} 
                  onChange={e => updateCell("delivery", "systems", e.target.value)}
                  className="w-full h-20 p-1 border border-slate-200 resize-none focus-visible:outline-none focus-visible:border-black text-[10px]"
                />
              </td>
            </tr>

            {/* Policy */}
            <tr className="align-top">
              <td className="p-2 bg-emerald-50/70 border-r border-black font-mono font-bold text-emerald-900 select-none">
                <span>⚖️ Policy & SLA</span>
              </td>
              <td className="p-1.5 border-r border-slate-300">
                <Textarea 
                  value={blueprint.order.policy} 
                  onChange={e => updateCell("order", "policy", e.target.value)}
                  className="w-full h-20 p-1 border border-slate-200 resize-none focus-visible:outline-none focus-visible:border-black text-[10px]"
                />
              </td>
              <td className="p-1.5 border-r border-slate-300">
                <Textarea 
                  value={blueprint.prepare.policy} 
                  onChange={e => updateCell("prepare", "policy", e.target.value)}
                  className="w-full h-20 p-1 border border-slate-200 resize-none focus-visible:outline-none focus-visible:border-black text-[10px]"
                />
              </td>
              <td className="p-1.5">
                <Textarea 
                  value={blueprint.delivery.policy} 
                  onChange={e => updateCell("delivery", "policy", e.target.value)}
                  className="w-full h-20 p-1 border border-slate-200 resize-none focus-visible:outline-none focus-visible:border-black text-[10px]"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

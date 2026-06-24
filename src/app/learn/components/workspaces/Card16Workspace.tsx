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

export default function Card16Workspace() {
  const [roles, setRoles] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [rank, setRank] = useState("1");
  const [permission, setPermission] = useState("Full Read/Write Admin");
  const [scope, setScope] = useState("");

  const defaultRoles = [
    { id: 1, title: "Operations Director Manager", rank: "1", permission: "Full Read/Write Admin", scope: "Assign staff dashboards, view total transaction ledger reports, edit invoices" },
    { id: 2, title: "Stall checkout Cashier", rank: "2", permission: "Register sales ledger Only", scope: "Trigger merchant checkout links, print local receipts, log cash payments" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("hi_card_inputs_org-charts");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.roles) {
          setRoles(parsed.roles);
          return;
        }
      } catch(e) {}
    }
    setRoles(defaultRoles);
  }, []);

  useEffect(() => {
    localStorage.setItem("hi_card_inputs_org-charts", JSON.stringify({ roles }));
  }, [roles]);

  const addRole = () => {
    if (title.trim()) {
      setRoles([...roles, { id: Date.now(), title, rank, permission, scope }]);
      setTitle("");
      setScope("");
    }
  };

  return (
    <div className="space-y-6 text-left">
      <h5 className="font-mono text-xs uppercase font-extrabold text-slate-700 tracking-wider border-b border-dashed border-slate-200 pb-2">
        🛠_ ORG HIERARCHICAL ACCESS PLANNER
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 border-2 border-black p-4 bg-slate-50 space-y-3">
          <span className="text-[10px] font-mono font-black text-slate-700 uppercase">Add Team Role node</span>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Role Title</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Sales checkout Agent" className="rounded-none text-xs mt-1 h-8" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Tier / Rank</Label>
              <SovereignSelect value={rank} onChange={e => setRank(e.target.value)} className="w-full rounded-none p-1.5 text-xs focus-visible:outline-none">
                <option value="1">Tier 1: Admin</option>
                <option value="2">Tier 2: Manager</option>
                <option value="3">Tier 3: Operator</option>
              </SovereignSelect>
            </div>
            <div>
              <Label className="text-[9px] font-mono font-black uppercase text-slate-500">System Permission</Label>
              <Input value={permission} onChange={e => setPermission(e.target.value)} placeholder="Write access" className="rounded-none text-xs mt-1 h-8" />
            </div>
          </div>
          <div>
            <Label className="text-[9px] font-mono font-black uppercase text-slate-500">Scope of Work & Tasks</Label>
            <Textarea value={scope} onChange={e => setScope(e.target.value)} placeholder="What tasks do they execute in the dashboard?" rows={2} className="rounded-none text-xs mt-1 resize-none" />
          </div>
          <Button onClick={addRole} className="w-full bg-black hover:bg-slate-900 border border-black rounded-none text-white font-black uppercase text-[10px] h-8 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Role Node
          </Button>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-black p-4 bg-white min-h-[220px] flex flex-col justify-center relative">
            <span className="text-[9px] font-mono font-black text-slate-400 uppercase absolute top-2 left-2">Org hierarchy Hierarchy</span>
            
            <div className="space-y-4 py-4 text-xs">
              {["1", "2", "3"].map(tierNum => {
                const tierRoles = roles.filter(r => r.rank === tierNum);
                if (tierRoles.length === 0) return null;
                return (
                  <div key={tierNum} className="border border-dashed border-slate-300 p-2.5 bg-slate-50/50">
                    <span className="font-mono text-[8px] font-black uppercase text-slate-400 block mb-2">
                      Tier {tierNum === "1" ? "Admin level" : tierNum === "2" ? "Management level" : "Operator level"}
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {tierRoles.map(r => (
                        <div key={r.id} className="border border-black p-2 bg-white flex items-center justify-between gap-3 text-xs w-[180px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 truncate block leading-tight">{r.title}</span>
                            <span className="text-[7.5px] font-mono text-slate-400 block truncate leading-none mt-1">{r.permission}</span>
                          </div>
                          <button onClick={() => setRoles(roles.filter(item => item.id !== r.id))} className="text-slate-400 hover:text-red-500 cursor-pointer shrink-0">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   CARD 17: FINDING PATTERNS (themes)
   ============================================================================ */
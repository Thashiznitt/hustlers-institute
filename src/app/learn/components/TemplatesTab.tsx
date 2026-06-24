"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cardsList } from "@/components/DesignCardsExplorer";
import BrandName from "@/components/BrandName";
import CardWorkspaces from "./CardWorkspaces";
import BrandingBlueprintWorkbench from "./BrandingBlueprintWorkbench";

export default function TemplatesTab() {
  const [activeSubTab, setActiveSubTab] = useState<"workspaces" | "branding" | "documents">("workspaces");

  const searchParams = useSearchParams();
  const cardParam = searchParams ? searchParams.get("card") : null;

  // Deep-linking: check query parameter reactively
  useEffect(() => {
    if (cardParam) {
      setActiveSubTab("workspaces");
    }
  }, [cardParam]);

  return (
    <div className="w-full pb-12 font-sans space-y-6">
      <div className="mb-6 text-left">
        <h2 className="font-heading text-2xl font-extrabold text-slate-900 mb-1 uppercase tracking-wider flex items-center gap-2">
          <span>Templates & Workspaces</span>
          <span className="text-[10px] bg-slate-900 text-white px-2.5 py-1 rounded-none font-mono font-bold uppercase tracking-widest leading-none">
            Sovereign Edition
          </span>
        </h2>
        <p className="text-slate-500 text-sm">Interactive workbook tools and document blueprints for your venture creation lifecycle.</p>
      </div>

      {/* Sub navigation tabs */}
      <div className="flex flex-wrap gap-2 border-b border-black pb-4">
        <button
          onClick={() => setActiveSubTab("workspaces")}
          className={`px-4 py-2.5 text-xs font-mono font-black uppercase border-2 border-black transition-all cursor-pointer ${
            activeSubTab === "workspaces"
              ? "bg-slate-900 text-white shadow-none translate-x-[2px] translate-y-[2px]"
              : "bg-white text-slate-800 hover:bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          🛠️ Card Workspaces
        </button>
        <button
          onClick={() => setActiveSubTab("branding")}
          className={`px-4 py-2.5 text-xs font-mono font-black uppercase border-2 border-black transition-all cursor-pointer ${
            activeSubTab === "branding"
              ? "bg-slate-900 text-white shadow-none translate-x-[2px] translate-y-[2px]"
              : "bg-white text-slate-800 hover:bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          🌐 Branding Blueprint
        </button>
        <button
          onClick={() => setActiveSubTab("documents")}
          className={`px-4 py-2.5 text-xs font-mono font-black uppercase border-2 border-black transition-all cursor-pointer ${
            activeSubTab === "documents"
              ? "bg-slate-900 text-white shadow-none translate-x-[2px] translate-y-[2px]"
              : "bg-white text-slate-800 hover:bg-slate-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          📂 Documents & Curriculum
        </button>
      </div>

      {/* Tab content */}
      {activeSubTab === "workspaces" && (
        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-slate-50">
          <CardContent className="p-6">
            <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-black flex items-center gap-2 mb-4 border-b border-black pb-3 font-mono text-left">
              🛠️ Interactive Design Card Workspaces
            </h3>
            <p className="text-xs text-slate-500 mb-5 text-left">
              Select an interactive toolkit workbook worksheet to map customer chats, triggers, blueprints, or conversion funnels:
            </p>
            <CardWorkspaces />
          </CardContent>
        </Card>
      )}

      {activeSubTab === "branding" && (
        <Card className="border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-slate-50">
          <CardContent className="p-6">
            <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-black flex items-center gap-2 mb-4 border-b border-black pb-3 font-mono text-left">
              🌐 Sovereign Master Branding Blueprint
            </h3>
            <p className="text-xs text-slate-500 mb-5 text-left">
              Select and configure your primary platforms to build a cohesive brand toolkit stack:
            </p>
            <BrandingBlueprintWorkbench />
          </CardContent>
        </Card>
      )}

      {activeSubTab === "documents" && (
        <div className="space-y-6">
          <Card className="border border-slate-200 rounded-none shadow-none">
            <CardContent className="p-6">
              <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-bold flex items-center gap-2 mb-4 border-b border-slate-100 pb-3 font-mono text-left">
                Document Blueprints
              </h3>
              <p className="text-xs text-slate-500 mb-5 text-left">Explore design workbook cards and business blueprints to structure and launch your independent venture:</p>
              <div className="space-y-3">
                {[
                  { title: "Sovereign Client Proposal", size: "142 KB", desc: "Retainer client contract proposal with standard terms." },
                  { title: "LLC Setup Cheat Sheet", size: "88 KB", desc: "Simple checklist for local business registration." },
                  { title: "Sprint Log Ledger", size: "115 KB", desc: "Task tracking sheet for developers and designers." }
                ].map((doc, idx) => (
                  <div key={idx} className="border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row justify-between sm:items-center rounded-none gap-3 text-left">
                    <div>
                      <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-slate-400 block">
                        <BrandName className="text-[8px] font-bold" /> Framework Blueprint
                      </span>
                      <h6 className="font-bold text-slate-900 text-sm mt-0.5">{doc.title}</h6>
                      <p className="text-xs text-slate-500 mt-1">{doc.desc}</p>
                    </div>
                    <Badge className="bg-slate-100 text-slate-600 border border-slate-250 text-xs self-start shrink-0 rounded-none font-mono font-bold">{doc.size}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 rounded-none shadow-none">
            <CardContent className="p-6">
              <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-bold flex items-center gap-2 mb-4 border-b border-slate-100 pb-3 font-mono text-left">
                All {cardsList.length} Design Cards Workbook Curriculum
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cardsList.map((card) => (
                  <div key={card.id} className="border border-slate-200 rounded-none p-3 bg-slate-50 flex flex-col justify-between min-h-[140px] text-left">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-extrabold text-slate-450">{card.num}</span>
                        <span className="text-xs font-bold text-slate-900 uppercase font-mono">{card.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-655 mt-1 leading-relaxed">{card.frontDesc}</p>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-150/65 font-mono">
                      <Badge className="text-[10px] bg-[#eae3d7] text-[#5c5346] font-mono tracking-wider font-bold rounded-none border border-amber-250/20">{card.stage}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


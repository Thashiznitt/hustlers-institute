"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cardsList } from "@/components/DesignCardsExplorer";

export default function TemplatesTab() {
  return (
    <div className="w-full pb-12">
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-extrabold text-slate-900 mb-1">Templates</h2>
        <p className="text-slate-500 text-sm">Document blueprints and workbook templates for your venture.</p>
      </div>

      <Card className="border border-slate-100 rounded-2xl shadow-sm mb-6">
        <CardContent className="p-6">
          <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-bold flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            Document Blueprints
          </h3>
          <p className="text-xs text-slate-500 mb-5">Explore design workbook cards and business blueprints to structure and launch your independent venture:</p>
          <div className="space-y-3">
            {[
              { title: "Venture Services Proposal", size: "142 KB", desc: "Retainer client contract proposal with standard terms." },
              { title: "LLC Setup Cheat Sheet", size: "88 KB", desc: "Simple checklist for local business registration." },
              { title: "Sprint Log Ledger", size: "115 KB", desc: "Task tracking sheet for developers and designers." }
            ].map((doc, idx) => (
              <div key={idx} className="border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row justify-between sm:items-center rounded-xl gap-3">
                <div>
                  <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-slate-400 block">Reference Document</span>
                  <h6 className="font-bold text-slate-900 text-sm mt-0.5">{doc.title}</h6>
                  <p className="text-xs text-slate-500 mt-1">{doc.desc}</p>
                </div>
                <Badge className="bg-slate-100 text-slate-500 border-0 text-xs self-start shrink-0">{doc.size}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-slate-100 rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-bold flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            All 44 Design Cards Workbook Curriculum
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cardsList.map((card) => (
              <div key={card.id} className="border border-slate-200 rounded-xl p-3 bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-extrabold text-slate-400">{card.num}</span>
                  <span className="text-xs font-bold text-slate-900">{card.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{card.frontDesc}</p>
                <Badge className="mt-2 text-[10px] bg-slate-100 text-slate-500 border-0">{card.stage}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

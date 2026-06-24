"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PriorWorkCalloutProps {
  currentLessonId: string;
}

interface Dependency {
  lessonId: string;
  title: string;
  type: string;
}

function getDependencies(lessonId: string): Dependency[] {
  const parts = lessonId.split(".");
  if (parts.length !== 2) return [];
  const phase = parts[0];
  const num = parseInt(parts[1]);

  if (num === 2) {
    let title = "Problem Research Canvas";
    if (phase === "4") title = "Market Pricing Canvas";
    if (phase === "5") title = "Awareness & Network Canvas";
    return [{ lessonId: `${phase}.1`, title, type: "research-canvas" }];
  }
  if (num === 3) {
    let title = "Top Ranked Insight";
    if (phase === "4") title = "Positioning Matrix";
    if (phase === "5") title = "Growth & Feedback Loops";
    return [{ lessonId: `${phase}.2`, title, type: "insight-ranking" }];
  }
  if (num === 4) {
    let title = "Idea Statement";
    if (phase === "4") title = "Revenue Proposal Sheet";
    if (phase === "5") title = "Talent & Squadding Brief";
    return [{ lessonId: `${phase}.3`, title, type: "idea-statement" }];
  }
  if (num === 5) {
    let title = "Idea Statement";
    if (phase === "4") title = "Revenue Proposal Sheet";
    if (phase === "5") title = "Talent & Squadding Brief";
    return [
      { lessonId: `${phase}.3`, title, type: "idea-statement" },
      { lessonId: `${phase}.4`, title: "Idea Validation Niche Builder", type: "niche-builder" }
    ];
  }
  if (num === 6) {
    let title = "Prototype Sketch Log";
    if (phase === "4") title = "Offer Sheet Log";
    if (phase === "5") title = "Launch Kit Log";
    return [{ lessonId: `${phase}.5`, title, type: "sketch-log" }];
  }
  if (num === 7) {
    let title = "User Observations Log";
    if (phase === "4") title = "Prospect Objection Log";
    if (phase === "5") title = "Soft Launch Test Log";
    
    let ideaTitle = "Idea Statement";
    if (phase === "4") ideaTitle = "Revenue Proposal Sheet";
    if (phase === "5") ideaTitle = "Talent & Squadding Brief";
    return [
      { lessonId: `${phase}.6`, title, type: "observation-log" },
      { lessonId: `${phase}.3`, title: ideaTitle, type: "idea-statement" }
    ];
  }
  return [];
}

export default function PriorWorkCallout({ currentLessonId }: PriorWorkCalloutProps) {
  const [dependencies, setDependencies] = useState<Dependency[]>([]);
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const [loadedData, setLoadedData] = useState<Record<string, any>>({});

  useEffect(() => {
    const deps = getDependencies(currentLessonId);
    setDependencies(deps);

    // Read stored data for each dependency
    const data: Record<string, any> = {};
    deps.forEach((dep) => {
      if (dep.type === "niche-builder") {
        const vn = localStorage.getItem("hi_venture_name") || "Unnamed Venture";
        const vi = localStorage.getItem("hi_venture_industry") || "Unselected Industry";
        const vt = localStorage.getItem("hi_venture_type") || "";
        const fieldsRaw = localStorage.getItem("hi_niche_builder_fields");
        const aiRaw = localStorage.getItem("hi_niche_ai_data");

        let fields = {};
        let ai = {};
        if (fieldsRaw) {
          try { fields = JSON.parse(fieldsRaw); } catch {}
        }
        if (aiRaw) {
          try { ai = JSON.parse(aiRaw); } catch {}
        }

        data[dep.lessonId] = { name: vn, industry: vi, type: vt, fields, ai };
      } else {
        const raw = localStorage.getItem(`hi_exercise_${dep.lessonId}`);
        if (raw) {
          try {
            data[dep.lessonId] = JSON.parse(raw);
          } catch {
            data[dep.lessonId] = raw; // raw string fallback
          }
        }
      }
    });
    setLoadedData(data);
  }, [currentLessonId]);

  const toggleOpen = (lessonId: string) => {
    setOpenStates((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }));
  };

  const renderContent = (dep: Dependency) => {
    const data = loadedData[dep.lessonId];
    if (!data) {
      return (
        <p className="text-xs text-slate-400 italic">
          No work recorded for Lesson {dep.lessonId} yet.
        </p>
      );
    }

    switch (dep.type) {
      case "research-canvas":
        {
          const isPhase5 = data.consumerAwareness !== undefined;
          const isPhase4 = data.landscapePricing !== undefined;
          const isPhase3 = data.competitor1Name !== undefined || data.trustBrands !== undefined;
          
          if (isPhase5) {
            return (
              <div className="space-y-2 text-xs text-left">
                {data.consumerAwareness && <div><span className="font-bold text-slate-900 font-mono block">Consumer Awareness:</span><p className="text-slate-700">{data.consumerAwareness}</p></div>}
                {data.warmContacts && <div className="border-t border-slate-100 pt-1.5 mt-1.5"><span className="font-bold text-slate-900 font-mono block">Warm Network Contacts:</span><p className="text-slate-700">{data.warmContacts}</p></div>}
                {data.influenceMap && <div className="border-t border-slate-100 pt-1.5 mt-1.5"><span className="font-bold text-slate-900 font-mono block">Influence Map:</span><p className="text-slate-700">{data.influenceMap}</p></div>}
              </div>
            );
          }
          if (isPhase4) {
            return (
              <div className="space-y-2 text-xs text-left">
                {data.landscapePricing && <div><span className="font-bold text-slate-900 font-mono block">Landscape Pricing:</span><p className="text-slate-700">{data.landscapePricing}</p></div>}
                {data.clientExpectations && <div className="border-t border-slate-100 pt-1.5 mt-1.5"><span className="font-bold text-slate-900 font-mono block">Target Client Expectations:</span><p className="text-slate-700">{data.clientExpectations}</p></div>}
                {data.marketTiers && <div className="border-t border-slate-100 pt-1.5 mt-1.5"><span className="font-bold text-slate-900 font-mono block">Market Tiers:</span><p className="text-slate-700">{data.marketTiers}</p></div>}
              </div>
            );
          }
          if (isPhase3) {
            return (
              <div className="space-y-2 text-xs text-left">
                <span className="font-bold text-slate-900 font-mono block">Competitor Audit:</span>
                <ul className="list-disc pl-4 text-slate-660 space-y-1">
                  {data.competitor1Name && <li>{data.competitor1Name} ({data.competitor1Weakness || "no weakness logged"})</li>}
                  {data.competitor2Name && <li>{data.competitor2Name} ({data.competitor2Weakness || "no weakness logged"})</li>}
                  {data.competitor3Name && <li>{data.competitor3Name} ({data.competitor3Weakness || "no weakness logged"})</li>}
                </ul>
                {data.valueFlowGap && (
                  <div className="border-t border-slate-100 pt-1.5 mt-1.5">
                    <span className="font-bold text-amber-700 font-mono block">Value Flow Gap:</span>
                    <p className="text-slate-900 font-semibold">{data.valueFlowGap}</p>
                  </div>
                )}
              </div>
            );
          }
          return (
            <div className="space-y-1.5 text-xs text-slate-650">
              {data.what && <div><span className="font-bold text-slate-900 font-mono">What:</span> {data.what}</div>}
              {data.who && <div><span className="font-bold text-slate-900 font-mono">Who:</span> {data.who}</div>}
              {data.where && <div><span className="font-bold text-slate-900 font-mono">Where:</span> {data.where}</div>}
              {data.when && <div><span className="font-bold text-slate-900 font-mono">When:</span> {data.when}</div>}
              {data.how && <div><span className="font-bold text-slate-900 font-mono">How:</span> {data.how}</div>}
            </div>
          );
        }
      case "insight-ranking":
        {
          const isPhase5 = data.feedbackLoops !== undefined || data.growthMetrics !== undefined;
          const isPhase4 = data.positioningTier !== undefined || data.positioningStatement !== undefined;
          const isPhase3 = data.usp !== undefined || data.headline !== undefined;
          const isPersona = data.name !== undefined || data.pointOfView !== undefined;
          
          if (isPhase5) {
            return (
              <div className="space-y-2 text-xs text-left">
                {data.feedbackLoops && <div><span className="font-bold text-slate-900 font-mono block">Feedback Loops:</span><p className="text-slate-700">{data.feedbackLoops}</p></div>}
                {data.growthMetrics && <div className="border-t border-slate-100 pt-1.5 mt-1.5"><span className="font-bold text-slate-900 font-mono block">Growth Metrics:</span><p className="text-slate-750 font-semibold">{data.growthMetrics}</p></div>}
                {data.growthStrategy && <div className="border-t border-slate-100 pt-1.5 mt-1.5"><span className="font-bold text-slate-900 font-mono block">Growth Strategy (First 30 days):</span><p className="text-slate-700">{data.growthStrategy}</p></div>}
              </div>
            );
          }
          if (isPhase4) {
            return (
              <div className="space-y-2 text-xs text-left">
                {data.positioningTier && <div><span className="font-bold text-slate-900 font-mono block">Positioning Tier:</span><p className="text-slate-700">{data.positioningTier}</p></div>}
                {data.positioningStatement && <div className="border-t border-slate-100 pt-1.5 mt-1.5"><span className="font-bold text-slate-900 font-mono block">Positioning Statement:</span><p className="text-slate-750 font-semibold">{data.positioningStatement}</p></div>}
                {data.defensibilityReasons && <div className="border-t border-slate-100 pt-1.5 mt-1.5"><span className="font-bold text-slate-900 font-mono block">Defensibility Reasons:</span><p className="text-slate-700">{data.defensibilityReasons}</p></div>}
              </div>
            );
          }
          if (isPhase3) {
            return (
              <div className="space-y-2 text-xs text-left">
                {data.usp && (
                  <div>
                    <span className="font-bold text-slate-900 font-mono block">USP:</span>
                    <p className="text-slate-800 font-semibold">{data.usp}</p>
                  </div>
                )}
                {data.rtb && (
                  <div className="border-t border-slate-100 pt-1.5 mt-1.5">
                    <span className="font-bold text-amber-700 font-mono block">Reason to Believe:</span>
                    <p className="text-slate-700 italic">{data.rtb}</p>
                  </div>
                )}
                {data.headline && (
                  <div className="border-t border-slate-100 pt-1.5 mt-1.5">
                    <span className="font-bold text-slate-900 font-mono block">UX Headline:</span>
                    <p className="text-slate-700">{data.headline}</p>
                  </div>
                )}
              </div>
            );
          }
          if (isPersona) {
            return (
              <div className="space-y-2 text-xs text-left">
                {data.name && (
                  <div>
                    <span className="font-bold text-slate-900 font-mono block">User Persona:</span>
                    <p className="text-slate-700 italic font-semibold">{data.name}</p>
                  </div>
                )}
                {data.pointOfView && (
                  <div className="border-t border-slate-105 pt-1.5 mt-1.5">
                    <span className="font-bold text-amber-700 font-mono block">Problem POV:</span>
                    <p className="text-slate-900 font-semibold">&ldquo;{data.pointOfView}&rdquo;</p>
                  </div>
                )}
              </div>
            );
          }
          return (
            <div className="space-y-2 text-xs">
              {data.insights && Array.isArray(data.insights) && (
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 font-mono">Captured Observations:</span>
                  <ul className="list-disc pl-4 text-slate-555 space-y-0.5">
                    {data.insights.filter(Boolean).map((ins: string, idx: number) => (
                      <li key={idx}>{ins}</li>
                    ))}
                  </ul>
                </div>
              )}
              {data.top && (
                <div className="border-t border-slate-100 pt-1.5 mt-1.5">
                  <span className="font-bold text-amber-700 font-mono block">Selected Priority Insight:</span>
                  <p className="text-slate-900 font-semibold">{data.top}</p>
                </div>
              )}
            </div>
          );
        }
      case "idea-statement":
        {
          const isPhase5 = data.rolesNeeded !== undefined || data.talentBrief !== undefined;
          const isPhase4 = data.revenueModel !== undefined || data.proposalPrice !== undefined;
          const isPhase3 = data.feature1 !== undefined || data.deliverable1 !== undefined;
          const isPhase2 = data.coreFeature !== undefined || data.outcome !== undefined;
          
          if (isPhase5) {
            return (
              <div className="space-y-2 text-xs text-left">
                {data.rolesNeeded && <div><span className="font-bold text-slate-900 font-mono block">Roles Needed (Now vs 90 days):</span><p className="text-slate-700">{data.rolesNeeded}</p></div>}
                {data.potentialCollaborators && <div className="border-t border-slate-100 pt-1.5 mt-1.5"><span className="font-bold text-slate-900 font-mono block">Potential Collaborators:</span><p className="text-slate-700">{data.potentialCollaborators}</p></div>}
                {data.talentBrief && <div className="border-t border-slate-100 pt-1.5 mt-1.5"><span className="font-bold text-slate-900 font-mono block">Talent Brief:</span><p className="text-slate-700">{data.talentBrief}</p></div>}
              </div>
            );
          }
          if (isPhase4) {
            return (
              <div className="space-y-2 text-xs text-left">
                {data.revenueModel && <div><span className="font-bold text-slate-900 font-mono block">Revenue Model:</span><p className="text-slate-700 font-semibold">{data.revenueModel}</p></div>}
                {data.proposalDeliverables && <div className="border-t border-slate-100 pt-1.5 mt-1.5"><span className="font-bold text-slate-900 font-mono block">Proposal Deliverables:</span><p className="text-slate-700">{data.proposalDeliverables}</p></div>}
                {data.proposalPrice && <div className="border-t border-slate-100 pt-1.5 mt-1.5"><span className="font-bold text-slate-900 font-mono block">Proposal Price:</span><p className="text-emerald-700 font-bold">{data.proposalPrice}</p></div>}
                {data.clientRequirements && <div className="border-t border-slate-100 pt-1.5 mt-1.5"><span className="font-bold text-slate-900 font-mono block">Client Requirements:</span><p className="text-slate-700">{data.clientRequirements}</p></div>}
              </div>
            );
          }
          if (isPhase3) {
            return (
              <div className="space-y-2 text-xs text-left">
                <span className="font-bold text-slate-900 font-mono block">Core Deliverables:</span>
                <ul className="list-disc pl-4 text-slate-650 space-y-0.5 mb-2">
                  {data.deliverable1 && <li>{data.deliverable1}</li>}
                  {data.deliverable2 && <li>{data.deliverable2}</li>}
                  {data.deliverable3 && <li>{data.deliverable3}</li>}
                </ul>
                <div className="border-t border-slate-100 pt-1.5">
                  <span className="font-bold text-emerald-700 font-mono block">Features &amp; Benefits:</span>
                  <ul className="list-disc pl-4 text-slate-600 space-y-0.5">
                    {data.feature1 && <li>{data.feature1} &rarr; {data.benefit1}</li>}
                    {data.feature2 && <li>{data.feature2} &rarr; {data.benefit2}</li>}
                    {data.feature3 && <li>{data.feature3} &rarr; {data.benefit3}</li>}
                  </ul>
                </div>
              </div>
            );
          }
          if (isPhase2) {
            return (
              <div className="space-y-2 text-xs text-left">
                {data.outcome && (
                  <div>
                    <span className="font-bold text-slate-900 font-mono block">Desired Outcome:</span>
                    <p className="text-slate-700 italic font-semibold">{data.outcome}</p>
                  </div>
                )}
                {data.coreFeature && (
                  <div className="border-t border-slate-105 pt-1.5 mt-1.5">
                    <span className="font-bold text-emerald-700 font-mono block">Core Launch Feature:</span>
                    <p className="text-slate-900 font-semibold">{data.coreFeature}</p>
                  </div>
                )}
              </div>
            );
          }
          return (
            <div className="space-y-2">
              {data.ideas && Array.isArray(data.ideas) ? (
                data.ideas.filter((idea: any) => idea.what || idea.who || idea.insight).map((idea: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs text-slate-700 leading-relaxed font-semibold">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">Improvement {idx + 1}</span>
                    &ldquo;We improve <span className="text-amber-700">{idea.what || "___"}</span> for <span className="text-violet-750">{idea.who || "___"}</span> because <span className="text-emerald-750">{idea.insight || "___"}</span>.&rdquo;
                  </div>
                ))
              ) : (
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs text-slate-700 leading-relaxed font-semibold">
                  &ldquo;We improve <span className="text-amber-700">{data.what || "___"}</span> for <span className="text-violet-750">{data.who || "___"}</span> because <span className="text-emerald-750">{data.insight || "___"}</span>.&rdquo;
                </div>
              )}
            </div>
          );
        }
      case "niche-builder":
        return (
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-[10px] text-slate-400 block font-mono font-bold uppercase">Venture Name</span><span className="font-bold text-slate-900">{data.name}</span></div>
              <div><span className="text-[10px] text-slate-400 block font-mono font-bold uppercase">Vertical Industry</span><span className="font-bold text-slate-900">{data.industry}</span></div>
            </div>
            {data.ai?.nicheSummary && (
              <div className="border-t border-slate-100 pt-1.5">
                <span className="text-[10px] text-amber-700 block font-mono font-bold uppercase">Niche Summary</span>
                <p className="text-slate-700 italic font-medium">&ldquo;{data.ai.nicheSummary}&rdquo;</p>
              </div>
            )}
          </div>
        );
      case "sketch-log":
        return (
          <div className="text-xs text-slate-650 whitespace-pre-wrap leading-relaxed">
            {typeof data === "string" ? data : JSON.stringify(data)}
          </div>
        );
      case "observation-log":
        return (
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 block font-mono font-bold uppercase">Logged Observations</span>
            <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
              {Array.isArray(data) ? (
                data.filter(Boolean).map((obs: string, idx: number) => (
                  <li key={idx} className="leading-relaxed">&ldquo;{obs}&rdquo;</li>
                ))
              ) : (
                <li>{String(data)}</li>
              )}
            </ul>
          </div>
        );
      default:
        return <p className="text-xs text-slate-500">{JSON.stringify(data)}</p>;
    }
  };

  if (dependencies.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
        Carry Forward Context
      </div>
      <div className="flex flex-col gap-2">
        {dependencies.map((dep) => {
          const isOpen = !!openStates[dep.lessonId];
          const hasData = !!loadedData[dep.lessonId];

          return (
            <Card key={dep.lessonId} className={`border rounded-xl transition-all shadow-none ${hasData ? "border-slate-200" : "border-dashed border-slate-200 bg-slate-50/30 opacity-75"}`}>
              <CardContent className="p-3">
                <button
                  type="button"
                  onClick={() => toggleOpen(dep.lessonId)}
                  className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      Lesson {dep.lessonId}: {dep.title}
                    </span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {isOpen && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    {renderContent(dep)}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

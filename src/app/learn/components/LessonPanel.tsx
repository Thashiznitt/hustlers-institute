"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SovereignInput as Input, SovereignInput } from "@/components/ui/SovereignInput";
import { SovereignTextarea as Textarea, SovereignTextarea } from "@/components/ui/SovereignTextarea";
import { SovereignSelect } from "@/components/ui/SovereignSelect";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BrutalistDialog } from "./BrutalistDialog";
import { industryDefaults } from "../data/cards-map";
import { CheckCircle2, ChevronRight, ChevronLeft, Sparkles, RefreshCw, Play, Pause, Volume2, Maximize2, Video, Film, X, Lock } from "lucide-react";
import { Phase, Lesson, DTStage, lessonHeroImages, phasesData } from "../data/phases";
import { CardData, cardsList } from "@/components/DesignCardsExplorer";
import { XP_PER_LESSON } from "../hooks/useLearnProgress";
import { useVentureProfile } from "../hooks/useVentureProfile";
import NicheAdaptation from "./NicheAdaptation";
import PriorWorkCallout from "./PriorWorkCallout";
import PitchSimulation from "./PitchSimulation";
import VennDiagram from "./VennDiagram";

interface LessonPanelProps {
  phase: Phase;
  lesson: Lesson;
  phaseIdx: number;
  lessonIdx: number;
  isCompleted: boolean;
  onComplete: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  onCardClick: (card: CardData) => void;
}

function renderTakeaway(text: string, onCardClick: (card: CardData) => void): React.ReactNode {
  // Match the entire parenthetical card reference: e.g., " (use Card 01: ...)" or " (Card 01: ...)"
  const regex = /\s*\(\s*(use\s+)?(Card\s+(\d+):\s+([^)]+))\s*\)/gi;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  const localRegex = new RegExp(regex);
  const cardButtons: React.ReactNode[] = [];

  while ((match = localRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    const cardNum = parseInt(match[3]);

    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    const card = cardsList.find(c => parseInt(c.num) === cardNum);
    if (card) {
      cardButtons.push(
        <button
          key={matchIndex}
          onClick={(e) => {
            e.stopPropagation();
            onCardClick(card);
          }}
          className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-850 border border-amber-250/60 px-3 py-1 rounded-none text-[10px] font-bold transition-all cursor-pointer active:scale-95 shadow-sm mt-2 self-start"
        >
          <Sparkles className="w-2.5 h-2.5 text-amber-600 fill-amber-300" />
          Card {card.num}: {card.title}
        </button>
      );
    }
    lastIndex = localRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <div className="flex flex-col w-full">
      <span>{parts.length > 0 ? <>{parts}</> : text}</span>
      {cardButtons.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {cardButtons}
        </div>
      )}
    </div>
  );
}

const phaseColors = ["sky", "violet", "rose", "amber", "emerald"];

const dtStageConfig: Record<DTStage, { label: string; emoji: string; badge: string }> = {
  empathize: { label: "Empathize", emoji: "", badge: "bg-amber-100 text-amber-700" },
  define:    { label: "Define",    emoji: "", badge: "bg-violet-100 text-violet-700" },
  ideate:    { label: "Ideate",    emoji: "", badge: "bg-emerald-100 text-emerald-700" },
  validate:  { label: "Validate",  emoji: "", badge: "bg-pink-100 text-pink-700" },
  prototype: { label: "Prototype", emoji: "", badge: "bg-sky-100 text-sky-700" },
  test:      { label: "Test",      emoji: "", badge: "bg-orange-100 text-orange-700" },
  learn:     { label: "Learn",     emoji: "", badge: "bg-teal-100 text-teal-700" },
};

// ─── Inline Exercise Components ───────────────────────────────────────────────

function saveExercise(lessonId: string, data: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`hi_exercise_${lessonId}`, JSON.stringify(data));
  window.dispatchEvent(new Event("storage"));
}

function loadExercise<T>(lessonId: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`hi_exercise_${lessonId}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}

function ResearchCanvas({ lessonId }: { lessonId: string }) {
  const isPhase2 = lessonId.startsWith("2.");
  const isPhase3 = lessonId.startsWith("3.");
  const isPhase4 = lessonId.startsWith("4.");
  const isPhase5 = lessonId.startsWith("5.");
  
  // Phase 1 fields
  const [fields, setFields] = useState({ what: "", who: "", where: "", when: "", how: "" });
  
  // Phase 2 fields
  const [p2Fields, setP2Fields] = useState({ 
    powerUsers: "", 
    casualUsers: "", 
    churnedUsers: "", 
    triggers: "", 
    barriers: "", 
    habits: "", 
    statedActualGap: "" 
  });

  // Phase 3 fields
  const [p3Fields, setP3Fields] = useState({
    competitor1Name: "",
    competitor1Weakness: "",
    competitor1Pricing: "",
    competitor2Name: "",
    competitor2Weakness: "",
    competitor2Pricing: "",
    competitor3Name: "",
    competitor3Weakness: "",
    competitor3Pricing: "",
    valueFlowGap: "",
    trustBrands: ""
  });

  // Phase 4 fields
  const [p4Fields, setP4Fields] = useState({
    landscapePricing: "",
    clientExpectations: "",
    marketTiers: ""
  });

  // Phase 5 fields
  const [p5Fields, setP5Fields] = useState({
    consumerAwareness: "",
    warmContacts: "",
    influenceMap: ""
  });
  
  const [ventureIndustry, setVentureIndustry] = useState("");
  const [ventureType, setVentureType] = useState("");
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      if (isPhase5) {
        setP5Fields(loadExercise(lessonId, {
          consumerAwareness: "",
          warmContacts: "",
          influenceMap: ""
        }));
      } else if (isPhase4) {
        setP4Fields(loadExercise(lessonId, {
          landscapePricing: "",
          clientExpectations: "",
          marketTiers: ""
        }));
      } else if (isPhase3) {
        setP3Fields(loadExercise(lessonId, {
          competitor1Name: "",
          competitor1Weakness: "",
          competitor1Pricing: "",
          competitor2Name: "",
          competitor2Weakness: "",
          competitor2Pricing: "",
          competitor3Name: "",
          competitor3Weakness: "",
          competitor3Pricing: "",
          valueFlowGap: "",
          trustBrands: ""
        }));
      } else if (isPhase2) {
        setP2Fields(loadExercise(lessonId, { 
          powerUsers: "", 
          casualUsers: "", 
          churnedUsers: "", 
          triggers: "", 
          barriers: "", 
          habits: "", 
          statedActualGap: "" 
        }));
      } else {
        setFields(loadExercise(lessonId, { what: "", who: "", where: "", when: "", how: "" }));
        if (lessonId === "1.1") {
          setVentureIndustry(localStorage.getItem("hi_venture_industry") || "");
          setVentureType(localStorage.getItem("hi_venture_type") || "");
        }
      }
      loaded.current = true;
    }
  }, [lessonId, isPhase2, isPhase3, isPhase4, isPhase5]);

  const update = (key: string, val: string) => {
    const next = { ...fields, [key]: val };
    setFields(next);
    saveExercise(lessonId, next);
  };

  const updateP2 = (key: string, val: string) => {
    const next = { ...p2Fields, [key]: val };
    setP2Fields(next);
    saveExercise(lessonId, next);
  };

  const updateP3 = (key: string, val: string) => {
    const next = { ...p3Fields, [key]: val };
    setP3Fields(next);
    saveExercise(lessonId, next);
  };

  const updateP4 = (key: string, val: string) => {
    const next = { ...p4Fields, [key]: val };
    setP4Fields(next);
    saveExercise(lessonId, next);
  };

  const updateP5 = (key: string, val: string) => {
    const next = { ...p5Fields, [key]: val };
    setP5Fields(next);
    saveExercise(lessonId, next);
  };

  const updateVentureIndustry = (val: string) => {
    setVentureIndustry(val);
    localStorage.setItem("hi_venture_industry", val);
    if (!ventureType) {
      const d = industryDefaults[val] || "";
      setVentureType(d);
      localStorage.setItem("hi_venture_type", d);
    }
    window.dispatchEvent(new Event("storage"));
  };

  const updateVentureType = (val: string) => {
    setVentureType(val);
    localStorage.setItem("hi_venture_type", val);
    window.dispatchEvent(new Event("storage"));
  };

  if (isPhase5) {
    return (
      <div className="flex flex-col gap-4 text-left">
        <p className="text-xs text-slate-500 leading-relaxed text-left">
          Map how people in your target market discover solutions, and identify your warm network connections to kickstart awareness.
        </p>

        <div className="space-y-4">
          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Consumer Awareness (How do they find businesses like yours?)</Label>
            <Textarea
              value={p5Fields.consumerAwareness}
              onChange={e => updateP5("consumerAwareness", e.target.value)}
              rows={2}
              className="text-sm resize-none"
              placeholder="Word of mouth, search engines, social media, or local directories..."
            />
          </div>

          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Warm Network Contacts (List potential clients or connectors)</Label>
            <Textarea
              value={p5Fields.warmContacts}
              onChange={e => updateP5("warmContacts", e.target.value)}
              rows={2}
              className="text-sm resize-none"
              placeholder="List names and how they are connected to your space..."
            />
          </div>

          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Influence Map (Who influences their buying decisions?)</Label>
            <Textarea
              value={p5Fields.influenceMap}
              onChange={e => updateP5("influenceMap", e.target.value)}
              rows={2}
              className="text-sm resize-none"
              placeholder="What organizations, platforms, or trusted experts guide their spending?"
            />
          </div>
        </div>
      </div>
    );
  }

  if (isPhase4) {
    return (
      <div className="flex flex-col gap-4 text-left">
        <p className="text-xs text-slate-500 leading-relaxed text-left">
          Research pricing and tiers in your market. Understand what target clients expect to pay and where the gap exists.
        </p>

        <div className="space-y-4">
          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Landscape Pricing (What do competitors charge?)</Label>
            <Textarea
              value={p4Fields.landscapePricing}
              onChange={e => updateP4("landscapePricing", e.target.value)}
              rows={2}
              className="text-sm resize-none"
              placeholder="e.g. Low end is 50 dollars per project, agencies charge 1000 dollars monthly retainer..."
            />
          </div>

          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Target Client Expectations (What is too cheap or too expensive?)</Label>
            <Textarea
              value={p4Fields.clientExpectations}
              onChange={e => updateP4("clientExpectations", e.target.value)}
              rows={2}
              className="text-sm resize-none"
              placeholder="What feels worth every penny and what feels like too much for them?"
            />
          </div>

          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Market Tiers (Low end, mid range, and premium structures)</Label>
            <Textarea
              value={p4Fields.marketTiers}
              onChange={e => updateP4("marketTiers", e.target.value)}
              rows={2}
              className="text-sm resize-none"
              placeholder="Map where the biggest unmet need lives and why..."
            />
          </div>
        </div>
      </div>
    );
  }

  if (isPhase3) {
    return (
      <div className="flex flex-col gap-4 text-left">
        <p className="text-xs text-slate-500 leading-relaxed text-left">
          Analyze competitors and gaps in the market. Look for where existing solutions break and map trusted brands.
        </p>

        <div className="space-y-4">
          <div className="border-b border-slate-100 pb-3 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Competitor Audit (Card 05 & 06)</span>
            
            {[1, 2, 3].map((num) => {
              const nameKey = `competitor${num}Name` as keyof typeof p3Fields;
              const weaknessKey = `competitor${num}Weakness` as keyof typeof p3Fields;
              const pricingKey = `competitor${num}Pricing` as keyof typeof p3Fields;

              return (
                <div key={num} className="bg-slate-50 rounded-none p-3 border border-slate-200 flex flex-col gap-3 mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Competitor {num}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 block">Name</Label>
                      <Input
                        value={p3Fields[nameKey]}
                        onChange={e => updateP3(nameKey, e.target.value)}
                        className="h-9 text-xs"
                        placeholder="e.g. Local Gig App..."
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 block">Weaknesses & Friction</Label>
                      <Input
                        value={p3Fields[weaknessKey]}
                        onChange={e => updateP3(weaknessKey, e.target.value)}
                        className="h-9 text-xs"
                        placeholder="Why do users complain?"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 block">Pricing & Tier</Label>
                      <Input
                        value={p3Fields[pricingKey]}
                        onChange={e => updateP3(pricingKey, e.target.value)}
                        className="h-9 text-xs"
                        placeholder="How much do they charge?"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-b border-slate-100 pb-3 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Value Flow Gap (Card 11)</span>
            <div>
              <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">How value flows and where the gap exists</Label>
              <Textarea
                value={p3Fields.valueFlowGap}
                onChange={e => updateP3("valueFlowGap", e.target.value)}
                rows={2}
                className="text-sm resize-none"
                placeholder="Where does the current service loop break down for users?"
              />
            </div>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Trust Landscape</span>
            <div>
              <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">What other brands does your persona trust, and why?</Label>
              <Textarea
                value={p3Fields.trustBrands}
                onChange={e => updateP3("trustBrands", e.target.value)}
                rows={2}
                className="text-sm resize-none"
                placeholder="What apps or services do they use daily and love?"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isPhase2) {
    return (
      <div className="flex flex-col gap-4 text-left">
        <p className="text-xs text-slate-500 leading-relaxed text-left">
          This canvas captures your <strong>behavioral research and user segmentation</strong>. Map habits, routines, triggers, and barriers for your user groups.
        </p>
        
        <div className="space-y-4">
          <div className="border-b border-slate-100 pb-3 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">User Segmentation</span>
            <div className="flex flex-col gap-3">
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Power Users</Label>
                <Textarea
                  value={p2Fields.powerUsers}
                  onChange={e => updateP2("powerUsers", e.target.value)}
                  rows={2}
                  className="text-sm resize-none"
                  placeholder="Describe users who face this problem daily (for example: freelance designers who invoice constantly)..."
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Casual Users</Label>
                <Textarea
                  value={p2Fields.casualUsers}
                  onChange={e => updateP2("casualUsers", e.target.value)}
                  rows={2}
                  className="text-sm resize-none"
                  placeholder="Describe users who only face this issue occasionally (for example: students doing occasional gigs)..."
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Churned Users</Label>
                <Textarea
                  value={p2Fields.churnedUsers}
                  onChange={e => updateP2("churnedUsers", e.target.value)}
                  rows={2}
                  className="text-sm resize-none"
                  placeholder="Describe users who gave up on solving this problem and what they did instead..."
                />
              </div>
            </div>
          </div>

          <div className="border-b border-slate-100 pb-3 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Habits and Routines</span>
            <div className="flex flex-col gap-3">
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Behavior Triggers</Label>
                <Textarea
                  value={p2Fields.triggers}
                  onChange={e => updateP2("triggers", e.target.value)}
                  rows={2}
                  className="text-sm resize-none"
                  placeholder="What specific event, time, or emotion triggers the user to seek a solution?"
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Friction Barriers</Label>
                <Textarea
                  value={p2Fields.barriers}
                  onChange={e => updateP2("barriers", e.target.value)}
                  rows={2}
                  className="text-sm resize-none"
                  placeholder="What gets in their way when trying to resolve the pain?"
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Daily Habits</Label>
                <Textarea
                  value={p2Fields.habits}
                  onChange={e => updateP2("habits", e.target.value)}
                  rows={2}
                  className="text-sm resize-none"
                  placeholder="What daily tasks or routines does your primary user perform?"
                />
              </div>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Behavioral Gaps</span>
            <div>
              <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Stated versus Actual Gap</Label>
              <Textarea
                value={p2Fields.statedActualGap}
                onChange={e => updateP2("statedActualGap", e.target.value)}
                rows={2}
                className="text-sm resize-none"
                placeholder="What is the gap between what users say they do and what their actual habits show?"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-500 leading-relaxed text-left">
        This canvas captures your <strong>general research</strong> about problems you've observed, which is separate from the Idea Validation Niche Builder you'll use in lesson X.4.
      </p>
      {lessonId === "1.1" && (
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 mb-2">
          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">What Industry? (Vertical)</Label>
            <SovereignSelect value={ventureIndustry} onChange={(e) => updateVentureIndustry(e.target.value)}>
              <option value="" disabled>Select industry vertical...</option>
              {Object.keys(industryDefaults).map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </SovereignSelect>
          </div>
          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Describe the Business</Label>
            <p className="text-[11px] text-slate-500 mb-1.5">Note: Make sure to choose a business or space that you are genuinely interested in.</p>
            <SovereignTextarea
              value={ventureType}
              onChange={e => updateVentureType(e.target.value)}
              rows={3}
              placeholder="What does your venture offer? (e.g. bookings, delivery, custom orders)"
            />
          </div>
        </div>
      )}
      {[
        { key: "what", label: "What is the problem?" },
        { key: "who",  label: "Who is affected?" },
        { key: "where",label: "Where does it happen?" },
        { key: "when", label: "When does it happen?" },
        { key: "how",  label: "How is it breaking down?" },
      ].map(({ key, label }) => (
        <div key={key} className="text-left">
          <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-750 mb-1.5 block">{label}</Label>
          <SovereignTextarea
            value={fields[key as keyof typeof fields]}
            onChange={e => update(key, e.target.value)}
            rows={3}
            placeholder="Write your observation here..."
          />
        </div>
      ))}
    </div>
  );
}

function InsightRanking({ lessonId }: { lessonId: string }) {
  const isPhase2 = lessonId.startsWith("2.");
  const isPhase3 = lessonId.startsWith("3.");
  const isPhase4 = lessonId.startsWith("4.");
  const isPhase5 = lessonId.startsWith("5.");
  
  // Phase 1 states
  const [insights, setInsights] = useState(["", "", ""]);
  const [top, setTop] = useState("");
  
  // Phase 2 states (Persona Builder)
  const [persona, setPersona] = useState({
    name: "",
    routine: "",
    goal: "",
    fear: "",
    pointOfView: "",
    feelings: ""
  });

  // Phase 3 states (USP & Copy)
  const [p3Brand, setP3Brand] = useState({
    usp: "",
    rtb: "",
    headline: "",
    cta: "",
    promise: ""
  });

  // Phase 4 states (Positioning)
  const [p4Positioning, setP4Positioning] = useState({
    positioningTier: "",
    positioningStatement: "",
    defensibilityReasons: ""
  });

  // Phase 5 states (Feedback & Growth)
  const [p5Growth, setP5Growth] = useState({
    feedbackLoops: "",
    growthMetrics: "",
    growthStrategy: ""
  });
  
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      if (isPhase5) {
        setP5Growth(loadExercise(lessonId, {
          feedbackLoops: "",
          growthMetrics: "",
          growthStrategy: ""
        }));
      } else if (isPhase4) {
        setP4Positioning(loadExercise(lessonId, {
          positioningTier: "",
          positioningStatement: "",
          defensibilityReasons: ""
        }));
      } else if (isPhase3) {
        setP3Brand(loadExercise(lessonId, {
          usp: "",
          rtb: "",
          headline: "",
          cta: "",
          promise: ""
        }));
      } else if (isPhase2) {
        setPersona(loadExercise(lessonId, {
          name: "",
          routine: "",
          goal: "",
          fear: "",
          pointOfView: "",
          feelings: ""
        }));
      } else {
        const saved = loadExercise<{ insights: string[]; top: string }>(lessonId, { insights: ["", "", ""], top: "" });
        setInsights(saved.insights);
        setTop(saved.top);
      }
      loaded.current = true;
    }
  }, [lessonId, isPhase2, isPhase3, isPhase4, isPhase5]);

  const updateInsight = (i: number, val: string) => {
    const next = insights.map((v, idx) => idx === i ? val : v);
    setInsights(next);
    saveExercise(lessonId, { insights: next, top });
  };

  const updateTop = (val: string) => {
    setTop(val);
    saveExercise(lessonId, { insights, top: val });
  };

  const updatePersona = (key: string, val: string) => {
    const next = { ...persona, [key]: val };
    setPersona(next);
    saveExercise(lessonId, next);
  };

  const updateP3Brand = (key: string, val: string) => {
    const next = { ...p3Brand, [key]: val };
    setP3Brand(next);
    saveExercise(lessonId, next);
  };

  const updateP4Positioning = (key: string, val: string) => {
    const next = { ...p4Positioning, [key]: val };
    setP4Positioning(next);
    saveExercise(lessonId, next);
  };

  const updateP5Growth = (key: string, val: string) => {
    const next = { ...p5Growth, [key]: val };
    setP5Growth(next);
    saveExercise(lessonId, next);
  };

  if (isPhase5) {
    return (
      <div className="flex flex-col gap-4 text-left">
        <p className="text-xs text-slate-500 leading-relaxed text-left">
          Set up post launch feedback loops, choose key growth metrics, and outline your growth strategy.
        </p>

        <div className="space-y-4">
          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Feedback Loops (How will you collect feedback after launch?)</Label>
            <Textarea
              value={p5Growth.feedbackLoops}
              onChange={e => updateP5Growth("feedbackLoops", e.target.value)}
              rows={2}
              className="text-sm resize-none"
              placeholder="e.g. Weekly WhatsApp check ins, post delivery email survey..."
            />
          </div>

          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Growth Metrics (Identify 3 metrics you will track)</Label>
            <Input
              value={p5Growth.growthMetrics}
              onChange={e => updateP5Growth("growthMetrics", e.target.value)}
              className="h-10 text-sm"
              placeholder="e.g. Active clients, inbound referrals, monthly revenue..."
            />
          </div>

          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Growth Strategy (First 30 days channel steps)</Label>
            <Textarea
              value={p5Growth.growthStrategy}
              onChange={e => updateP5Growth("growthStrategy", e.target.value)}
              rows={2}
              className="text-sm font-semibold resize-none"
              placeholder="One specific action per growth channel with dates and names..."
            />
          </div>
        </div>
      </div>
    );
  }

  if (isPhase4) {
    return (
      <div className="flex flex-col gap-4 text-left">
        <p className="text-xs text-slate-500 leading-relaxed text-left">
          Define your pricing tier, positioning statement, and defensibility logic to carve out your market space.
        </p>

        <div className="space-y-4">
          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Positioning Tier (Low end, Mid range, or Premium)</Label>
            <Input
              value={p4Positioning.positioningTier}
              onChange={e => updateP4Positioning("positioningTier", e.target.value)}
              className="h-10 text-sm"
              placeholder="e.g. Premium high trust service..."
            />
          </div>

          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Positioning Statement</Label>
            <Textarea
              value={p4Positioning.positioningStatement}
              onChange={e => updateP4Positioning("positioningStatement", e.target.value)}
              rows={2}
              className="text-sm font-semibold resize-none"
              placeholder="For [who], [product] is the [what] that [core benefit], unlike [alternatives]..."
            />
          </div>

          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Defensibility (Why can they not easily copy you?)</Label>
            <Textarea
              value={p4Positioning.defensibilityReasons}
              onChange={e => updateP4Positioning("defensibilityReasons", e.target.value)}
              rows={2}
              className="text-sm resize-none"
              placeholder="List 2 reasons a competitor cannot easily duplicate this within 6 months..."
            />
          </div>
        </div>
      </div>
    );
  }

  if (isPhase3) {
    return (
      <div className="flex flex-col gap-4 text-left">
        <p className="text-xs text-slate-500 leading-relaxed text-left">
          Craft your Unique Selling Proposition (USP), Reason to Believe (RTB), and initial user interface writing.
        </p>

        <div className="space-y-4">
          <div className="border-b border-slate-100 pb-3 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Brand Proposition (Card 10 & 13)</span>
            <div className="flex flex-col gap-3">
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Unique Selling Proposition (USP)</Label>
                <Textarea
                  value={p3Brand.usp}
                  onChange={e => updateP3Brand("usp", e.target.value)}
                  rows={2}
                  className="text-sm font-semibold resize-none"
                  placeholder="The one sentence explaining why your product is different from every other option..."
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Reason to Believe (RTB)</Label>
                <Textarea
                  value={p3Brand.rtb}
                  onChange={e => updateP3Brand("rtb", e.target.value)}
                  rows={2}
                  className="text-sm resize-none"
                  placeholder="Concrete proof that your USP is true (such as a number, a guarantee, or key standards)..."
                />
              </div>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">UX Writing (Card 15)</span>
            <div className="flex flex-col gap-3">
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Headline Copy</Label>
                <Input
                  value={p3Brand.headline}
                  onChange={e => updateP3Brand("headline", e.target.value)}
                  className="h-10 text-sm"
                  placeholder="e.g. Invoicing built for freelance designers who hate admin..."
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">CTA Button Copy</Label>
                <Input
                  value={p3Brand.cta}
                  onChange={e => updateP3Brand("cta", e.target.value)}
                  className="h-10 text-sm"
                  placeholder="e.g. Send my invoice, Start booking..."
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Emotional Promise</Label>
                <Textarea
                  value={p3Brand.promise}
                  onChange={e => updateP3Brand("promise", e.target.value)}
                  rows={2}
                  className="text-sm resize-none"
                  placeholder="How does reading this brand promise make your persona feel?"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isPhase2) {
    return (
      <div className="flex flex-col gap-4 text-left">
        <p className="text-xs text-slate-500 leading-relaxed text-left">
          Build your primary user persona. Connect their demographics, daily tasks, goals, and emotional frustrations into one clear profile.
        </p>
        
        <div className="space-y-4">
          <div className="border-b border-slate-100 pb-3 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Profile & Routine (Card 15)</span>
            <div className="flex flex-col gap-3">
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Name & Demographics</Label>
                <Input
                  value={persona.name}
                  onChange={e => updatePersona("name", e.target.value)}
                  className="h-10 text-sm"
                  placeholder="e.g. Maria, 32, freelance graphic designer..."
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Daily Routine</Label>
                <Textarea
                  value={persona.routine}
                  onChange={e => updatePersona("routine", e.target.value)}
                  rows={2}
                  className="text-sm resize-none"
                  placeholder="What does their typical day look like? What tasks do they focus on?"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-slate-100 pb-3 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Goals & Pain Points (Card 14)</span>
            <div className="flex flex-col gap-3">
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Core Goal</Label>
                <Textarea
                  value={persona.goal}
                  onChange={e => updatePersona("goal", e.target.value)}
                  rows={2}
                  className="text-sm resize-none"
                  placeholder="What is their primary objective or desired outcome?"
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Core Fear or Pain</Label>
                <Textarea
                  value={persona.fear}
                  onChange={e => updatePersona("fear", e.target.value)}
                  rows={2}
                  className="text-sm resize-none"
                  placeholder="What are they most afraid of or struggling with in their work?"
                />
              </div>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Feelings & Perspective (Card 12)</span>
            <div className="flex flex-col gap-3">
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Problem from Their Point of View</Label>
                <Textarea
                  value={persona.pointOfView}
                  onChange={e => updatePersona("pointOfView", e.target.value)}
                  rows={2}
                  className="text-sm font-semibold resize-none"
                  placeholder="State the problem in their own words (for example: 'I struggle to find time to chase invoices')..."
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Emotional Experience & Feelings</Label>
                <Textarea
                  value={persona.feelings}
                  onChange={e => updatePersona("feelings", e.target.value)}
                  rows={2}
                  className="text-sm resize-none"
                  placeholder="How does this problem make them feel? (e.g. anxious about cashflow, frustrated with admin)..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-500">Write 3 insights from your research, then pick the one you'll act on.</p>
      {insights.map((v, i) => (
        <div key={i}>
          <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-750 mb-1.5 block">Insight {i + 1}</Label>
          <Textarea
            value={v}
            onChange={e => updateInsight(i, e.target.value)}
            rows={3}
            className="text-sm resize-none"
            placeholder="Observation or pattern from your research..."
          />
        </div>
      ))}
      <div className="border-t border-slate-100 pt-3">
        <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-900 mb-1.5 block">Your #1 Insight, which is the one you will act on</Label>
        <Textarea
          value={top}
          onChange={e => updateTop(e.target.value)}
          rows={3}
          className="text-sm font-semibold resize-none"
          placeholder="The single most important thing you discovered..."
        />
      </div>
    </div>
  );
}

function IdeaStatement({ lessonId }: { lessonId: string }) {
  const isPhase2 = lessonId.startsWith("2.");
  const isPhase3 = lessonId.startsWith("3.");
  const isPhase4 = lessonId.startsWith("4.");
  const isPhase5 = lessonId.startsWith("5.");
  
  // Phase 1 states
  const [ideas, setIdeas] = useState<Array<{ what: string; who: string; insight: string }>>([
    { what: "", who: "", insight: "" },
    { what: "", who: "", insight: "" },
    { what: "", who: "", insight: "" }
  ]);

  // Phase 2 states
  const [p2Idea, setP2Idea] = useState({
    outcome: "",
    failureFear: "",
    featuresList: "",
    coreFeature: "",
    rationale: ""
  });

  // Phase 3 states
  const [p3Product, setP3Product] = useState({
    feature1: "",
    benefit1: "",
    feature2: "",
    benefit2: "",
    feature3: "",
    benefit3: "",
    deliverable1: "",
    deliverable2: "",
    deliverable3: "",
    aiStack: "",
    socialChannels: ""
  });

  // Phase 4 states (Offer & Model)
  const [p4Offer, setP4Offer] = useState({
    revenueModel: "",
    proposalDeliverables: "",
    proposalPrice: "",
    clientRequirements: ""
  });

  // Phase 5 states (Talent & Organization)
  const [p5Talent, setP5Talent] = useState({
    rolesNeeded: "",
    potentialCollaborators: "",
    talentBrief: ""
  });

  const [personaName, setPersonaName] = useState("");
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      if (isPhase5) {
        setP5Talent(loadExercise(lessonId, {
          rolesNeeded: "",
          potentialCollaborators: "",
          talentBrief: ""
        }));
      } else if (isPhase4) {
        setP4Offer(loadExercise(lessonId, {
          revenueModel: "",
          proposalDeliverables: "",
          proposalPrice: "",
          clientRequirements: ""
        }));
      } else if (isPhase3) {
        setP3Product(loadExercise(lessonId, {
          feature1: "",
          benefit1: "",
          feature2: "",
          benefit2: "",
          feature3: "",
          benefit3: "",
          deliverable1: "",
          deliverable2: "",
          deliverable3: "",
          aiStack: "",
          socialChannels: ""
        }));
      } else if (isPhase2) {
        setP2Idea(loadExercise(lessonId, {
          outcome: "",
          failureFear: "",
          featuresList: "",
          coreFeature: "",
          rationale: ""
        }));

        if (typeof window !== "undefined") {
          const raw = localStorage.getItem("hi_exercise_2.2");
          if (raw) {
            try {
              const data = JSON.parse(raw);
              if (data.name) {
                setPersonaName(data.name);
              }
            } catch {}
          }
        }
      } else {
        const saved = loadExercise<{ ideas?: Array<{ what: string; who: string; insight: string }> }>(lessonId, {});
        let initialIdeas = saved.ideas || [
          { what: "", who: "", insight: "" },
          { what: "", who: "", insight: "" },
          { what: "", who: "", insight: "" }
        ];
        while (initialIdeas.length < 3) {
          initialIdeas.push({ what: "", who: "", insight: "" });
        }

        // Pre-populate empty insights using the 3 insights logged in Lesson 1.2
        if (typeof window !== "undefined") {
          const l12Raw = localStorage.getItem("hi_exercise_1.2");
          if (l12Raw) {
            try {
              const l12Data = JSON.parse(l12Raw);
              if (l12Data.insights && Array.isArray(l12Data.insights)) {
                initialIdeas = initialIdeas.map((idea, idx) => {
                  const l12Insight = l12Data.insights[idx] || "";
                  return {
                    ...idea,
                    insight: idea.insight || l12Insight
                  };
                });
              }
            } catch (err) {
              // ignore silently
            }
          }
        }
        setIdeas(initialIdeas);
      }
      loaded.current = true;
    }
  }, [lessonId, isPhase2, isPhase3, isPhase4, isPhase5]);

  const save = (updatedIdeas: Array<{ what: string; who: string; insight: string }>) => {
    saveExercise(lessonId, { ideas: updatedIdeas });
  };

  const updateIdea = (idx: number, field: "what" | "who" | "insight", val: string) => {
    const next = ideas.map((idea, i) => {
      if (i === idx) {
        return { ...idea, [field]: val };
      }
      return idea;
    });
    setIdeas(next);
    save(next);
  };

  const updateP2Idea = (key: string, val: string) => {
    const next = { ...p2Idea, [key]: val };
    setP2Idea(next);
    saveExercise(lessonId, next);
  };

  const updateP3Product = (key: string, val: string) => {
    const next = { ...p3Product, [key]: val };
    setP3Product(next);
    saveExercise(lessonId, next);
  };

  const updateP4Offer = (key: string, val: string) => {
    const next = { ...p4Offer, [key]: val };
    setP4Offer(next);
    saveExercise(lessonId, next);
  };

  const updateP5Talent = (key: string, val: string) => {
    const next = { ...p5Talent, [key]: val };
    setP5Talent(next);
    saveExercise(lessonId, next);
  };

  if (isPhase5) {
    return (
      <div className="flex flex-col gap-4 text-left">
        <p className="text-xs text-slate-500 leading-relaxed">
          Map what roles you need to delegate now versus the next 90 days, identify prospective collaborators, and write a talent brief.
        </p>

        <div className="space-y-4">
          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Roles Needed (Now vs next 90 days)</Label>
            <Input
              value={p5Talent.rolesNeeded}
              onChange={e => updateP5Talent("rolesNeeded", e.target.value)}
              className="h-10 text-sm"
              placeholder="e.g. Handle sales myself, need freelance developer in 60 days..."
            />
          </div>

          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Potential Collaborators (Who can help you build?)</Label>
            <Input
              value={p5Talent.potentialCollaborators}
              onChange={e => updateP5Talent("potentialCollaborators", e.target.value)}
              className="h-10 text-sm"
              placeholder="Names of designers, developers, or contacts in your circle..."
            />
          </div>

          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Talent Brief (Deliverable, timeline, and key skills)</Label>
            <Textarea
              value={p5Talent.talentBrief}
              onChange={e => updateP5Talent("talentBrief", e.target.value)}
              rows={2}
              className="text-sm resize-none"
              placeholder="Brief description of what is expected, when, and the required skillset..."
            />
          </div>
        </div>
      </div>
    );
  }

  if (isPhase4) {
    return (
      <div className="flex flex-col gap-4 text-left">
        <p className="text-xs text-slate-500 leading-relaxed">
          Select your revenue model, define the scope of your proposal, list client prerequisites, and set your price.
        </p>

        <div className="space-y-4">
          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Revenue Model (Retainer, Per project, or Subscription)</Label>
            <Input
              value={p4Offer.revenueModel}
              onChange={e => updateP4Offer("revenueModel", e.target.value)}
              className="h-10 text-sm"
              placeholder="e.g. Monthly retainer..."
            />
          </div>

          <div>
            <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Proposal Deliverables (What do you deliver?)</Label>
            <Textarea
              value={p4Offer.proposalDeliverables}
              onChange={e => updateP4Offer("proposalDeliverables", e.target.value)}
              rows={2}
              className="text-sm resize-none"
              placeholder="State what is included in the project scope..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 block">Proposal Price</Label>
              <Input
                value={p4Offer.proposalPrice}
                onChange={e => updateP4Offer("proposalPrice", e.target.value)}
                className="h-9 text-xs"
                placeholder="e.g. 500 dollars per month..."
              />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 block">Client Requirements</Label>
              <Input
                value={p4Offer.clientRequirements}
                onChange={e => updateP4Offer("clientRequirements", e.target.value)}
                className="h-9 text-xs"
                placeholder="What must the client provide to start?"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isPhase3) {
    return (
      <div className="flex flex-col gap-4 text-left">
        <p className="text-xs text-slate-500 leading-relaxed">
          Define features, benefits, and core deliverables. Outline what AI tools and channels will accelerate your build.
        </p>

        <div className="space-y-4">
          <div className="border-b border-slate-100 pb-3 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Features and Benefits (Card 25)</span>
            {[1, 2, 3].map((num) => {
              const featKey = `feature${num}` as keyof typeof p3Product;
              const benKey = `benefit${num}` as keyof typeof p3Product;
              return (
                <div key={num} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 block">Feature {num} (What it does)</Label>
                    <Input
                      value={p3Product[featKey]}
                      onChange={e => updateP3Product(featKey, e.target.value)}
                      className="h-9 text-xs"
                      placeholder="e.g. Automated payment chasing..."
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 block">Benefit {num} (What they gain)</Label>
                    <Input
                      value={p3Product[benKey]}
                      onChange={e => updateP3Product(benKey, e.target.value)}
                      className="h-9 text-xs"
                      placeholder="e.g. Get paid faster without awkward chats..."
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-b border-slate-100 pb-3 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Product Deliverables (Card 24)</span>
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((num) => {
                const delKey = `deliverable${num}` as keyof typeof p3Product;
                return (
                  <div key={num}>
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 block">Deliverable {num}</Label>
                    <Input
                      value={p3Product[delKey]}
                      onChange={e => updateP3Product(delKey, e.target.value)}
                      className="h-9 text-xs"
                      placeholder="Concrete, tangible thing the customer receives..."
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Tech Stack & Channels (Card 27)</span>
            <div className="flex flex-col gap-3">
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">AI Stack</Label>
                <Input
                  value={p3Product.aiStack}
                  onChange={e => updateP3Product("aiStack", e.target.value)}
                  className="h-10 text-sm"
                  placeholder="What AI tools will accelerate your build?"
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">Social Channels</Label>
                <Input
                  value={p3Product.socialChannels}
                  onChange={e => updateP3Product("socialChannels", e.target.value)}
                  className="h-10 text-sm"
                  placeholder="Which two social channels does your persona use?"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 font-sans">
      <p className="text-xs text-slate-500 font-medium">
        Complete your 3 Idea Statements. These become the foundation for your Niche Builder in the next lesson.
      </p>
      
      <div className="space-y-6">
        {ideas.map((idea, idx) => (
          <div 
            key={idx} 
            className="bg-white border border-slate-200 rounded-none p-5 md:p-6 flex flex-col gap-5 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[11px] font-mono font-bold tracking-widest text-slate-400">
                IMPROVEMENT {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-[9px] bg-slate-900 text-white font-mono uppercase px-2.5 py-1 rounded-none tracking-wider font-extrabold">
                Idea Statement
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  1. The Action / What
                </label>
                <Input 
                  value={idea.what} 
                  onChange={e => updateIdea(idx, "what", e.target.value)} 
                  className="h-10 text-sm transition-all font-semibold" 
                  placeholder="e.g. client payment flow" 
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  2. Target Audience / Who
                </label>
                <Input 
                  value={idea.who} 
                  onChange={e => updateIdea(idx, "who", e.target.value)} 
                  className="h-10 text-sm transition-all font-semibold" 
                  placeholder="e.g. independent designers" 
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  3. Key Insight / Because
                </label>
                <Input 
                  value={idea.insight} 
                  onChange={e => updateIdea(idx, "insight", e.target.value)} 
                  className="h-10 text-sm transition-all font-semibold" 
                  placeholder="e.g. they hate chasing payments and lose hours to follow-up admin" 
                />
              </div>
            </div>

            {/* Dynamic sentence preview */}
            <div className="bg-[#fbfaf7] border border-amber-200/50 rounded-none p-4 font-sans text-slate-800 text-xs md:text-sm text-left leading-relaxed flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-amber-700 font-bold text-[10px] uppercase tracking-wider font-mono bg-amber-100/50 border border-amber-250/20 px-2 py-0.5 rounded-none shrink-0">
                Preview Statement
              </span>
              <p className="font-medium text-slate-700 italic">
                "We improve{" "}
                <span className={`underline underline-offset-4 decoration-2 decoration-amber-500/30 font-bold not-italic px-1 ${idea.what ? "text-slate-950" : "text-slate-400 italic font-normal"}`}>
                  {idea.what || "what improvement?"}
                </span>{" "}
                for{" "}
                <span className={`underline underline-offset-4 decoration-2 decoration-amber-500/30 font-bold not-italic px-1 ${idea.who ? "text-slate-950" : "text-slate-400 italic font-normal"}`}>
                  {idea.who || "who?"}
                </span>{" "}
                because{" "}
                <span className={`underline underline-offset-4 decoration-2 decoration-amber-500/30 font-bold not-italic px-1 ${idea.insight ? "text-slate-950" : "text-slate-400 italic font-normal"}`}>
                  {idea.insight || "the insight..."}
                </span>
                ."
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InlineNicheBuilder({ lessonId }: { lessonId: string }) {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [what, setWhat] = useState("");
  const [who, setWho] = useState("");
  const [where, setWhere] = useState("");
  const [when, setWhen] = useState("");
  const [how, setHow] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [alignmentScore, setAlignmentScore] = useState<number | null>(null);
  const [alignmentFeedback, setAlignmentFeedback] = useState("");
  
  // Venn Diagram scores state
  const [feasibilityScore, setFeasibilityScore] = useState<number>(75);
  const [desirabilityScore, setDesirabilityScore] = useState<number>(80);
  const [viabilityScore, setViabilityScore] = useState<number>(75);
  const [improvementTips, setImprovementTips] = useState<string[]>([]);

  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true;
      const vn = localStorage.getItem("hi_venture_name");
      const vi = localStorage.getItem("hi_venture_industry");
      const nf = localStorage.getItem("hi_niche_builder_fields");
      const ai = localStorage.getItem("hi_niche_ai_data");
      if (vn) setName(vn);
      if (vi) setIndustry(vi);
      if (nf) {
        const p = JSON.parse(nf);
        setWhat(p.what || ""); setWho(p.who || "");
        setWhere(p.where || ""); setWhen(p.when || ""); setHow(p.how || "");
      }
      if (ai) {
        const p = JSON.parse(ai);
        setSummary(p.nicheSummary || "");
        setAlignmentScore(p.alignmentScore !== undefined ? p.alignmentScore : null);
        setAlignmentFeedback(p.alignmentFeedback || "");

        let fScore = p.feasibilityScore;
        let dScore = p.desirabilityScore;
        let vScore = p.viabilityScore;
        let tips = p.improvementTips || [];

        if (fScore === undefined || dScore === undefined || vScore === undefined) {
          // Fallback calculations using local storage inputs
          const targetWhat = p.what || "";
          const targetWho = p.who || "";
          const targetHow = p.how || "";
          const targetWhere = p.where || "";

          const base = p.alignmentScore !== undefined ? p.alignmentScore : 85;
          let d = base;
          let f = base - 3;
          let v = base - 5;
          
          if (targetWho.length > 15) d += 5;
          if (targetWhat.length > 20) d += 3;
          if (targetHow.length > 20) v += 6;
          if (targetWhere.length > 15) f += 4;

          fScore = Math.min(Math.max(f, 50), 98);
          dScore = Math.min(Math.max(d, 50), 98);
          vScore = Math.min(Math.max(v, 50), 98);

          tips = [];
          if (dScore < 85) {
            tips.push(`Desirability: Talk to 5 more people matching "${targetWho || "your customers"}" to prove that they are actively trying to solve "${targetWhat || "the problem"}" right now.`);
          }
          if (fScore < 85) {
            tips.push(`Feasibility: Simplify the tech stack and MVP flow at "${targetWhere || "the location"}" to launch without complex features.`);
          }
          if (vScore < 85) {
            tips.push(`Viability: Establish higher pricing tiers and reduce initial transaction costs to reach your break-even goal faster.`);
          }
        }

        setFeasibilityScore(fScore);
        setDesirabilityScore(dScore);
        setViabilityScore(vScore);
        setImprovementTips(tips);
      }
    }
  }, []);

  const persist = (field: string, val: string) => {
    const fields = { what, who, where, when, how, [field]: val };
    localStorage.setItem("hi_niche_builder_fields", JSON.stringify(fields));
  };

  const handleBrainstorm = async () => {
    setLoading(true);
    try {
      const exercise11 = JSON.parse(localStorage.getItem("hi_exercise_1.1") || "null");
      const exercise12 = JSON.parse(localStorage.getItem("hi_exercise_1.2") || "null");
      const exercise13 = JSON.parse(localStorage.getItem("hi_exercise_1.3") || "null");
      const exercise21 = JSON.parse(localStorage.getItem("hi_exercise_2.1") || "null");
      const exercise22 = JSON.parse(localStorage.getItem("hi_exercise_2.2") || "null");
      const exercise23 = JSON.parse(localStorage.getItem("hi_exercise_2.3") || "null");
      const exercise31 = JSON.parse(localStorage.getItem("hi_exercise_3.1") || "null");
      const exercise32 = JSON.parse(localStorage.getItem("hi_exercise_3.2") || "null");
      const exercise33 = JSON.parse(localStorage.getItem("hi_exercise_3.3") || "null");
      const exercise41 = JSON.parse(localStorage.getItem("hi_exercise_4.1") || "null");
      const exercise42 = JSON.parse(localStorage.getItem("hi_exercise_4.2") || "null");
      const exercise43 = JSON.parse(localStorage.getItem("hi_exercise_4.3") || "null");
      const exercise51 = JSON.parse(localStorage.getItem("hi_exercise_5.1") || "null");
      const exercise52 = JSON.parse(localStorage.getItem("hi_exercise_5.2") || "null");
      const exercise53 = JSON.parse(localStorage.getItem("hi_exercise_5.3") || "null");
      const cardNotes = JSON.parse(localStorage.getItem("hi_card_notes") || "{}");

      const res = await fetch("/api/niche-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          industry, 
          whatProblem: what, 
          whoAffected: who, 
          whereHappening: where, 
          whenHappening: when, 
          howHappening: how,
          cardNotes,
          exercise11,
          exercise12,
          exercise13,
          exercise21,
          exercise22,
          exercise23,
          exercise31,
          exercise32,
          exercise33,
          exercise41,
          exercise42,
          exercise43,
          exercise51,
          exercise52,
          exercise53
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSummary(data.nicheSummary || "");
        setAlignmentScore(data.alignmentScore !== undefined ? data.alignmentScore : null);
        setAlignmentFeedback(data.alignmentFeedback || "");

        const fScore = data.feasibilityScore !== undefined ? data.feasibilityScore : 80;
        const dScore = data.desirabilityScore !== undefined ? data.desirabilityScore : 82;
        const vScore = data.viabilityScore !== undefined ? data.viabilityScore : 78;
        const tips = data.improvementTips || [];

        setFeasibilityScore(fScore);
        setDesirabilityScore(dScore);
        setViabilityScore(vScore);
        setImprovementTips(tips);

        localStorage.setItem("hi_niche_ai_data", JSON.stringify({ 
          nicheSummary: data.nicheSummary, 
          customApplications: data.customApplications, 
          boardroomReport: data.boardroomReport,
          alignmentScore: data.alignmentScore,
          alignmentFeedback: data.alignmentFeedback,
          feasibilityScore: fScore,
          desirabilityScore: dScore,
          viabilityScore: vScore,
          improvementTips: tips
        }));
      }
    } catch { /* network error, silently ignore */ }
    setLoading(false);
  };

  const isPhase3 = lessonId.startsWith("3.");
  const isPhase4 = lessonId.startsWith("4.");
  const isPhase5 = lessonId.startsWith("5.");

  const fieldsConfig = isPhase5 ? [
    { key: "what", label: "What is the launch plan?", val: what, set: setWhat },
    { key: "who",  label: "Who is on the team?", val: who,  set: setWho },
    { key: "where",label: "Where are feedback loops?", val: where,set: setWhere },
    { key: "when", label: "When is launch day?", val: when, set: setWhen },
    { key: "how",  label: "How will you scale?", val: how,  set: setHow },
  ] : isPhase4 ? [
    { key: "what", label: "What is the pricing tier?", val: what, set: setWhat },
    { key: "who",  label: "What is the revenue model?", val: who,  set: setWho },
    { key: "where",label: "Where is the price defensible?", val: where,set: setWhere },
    { key: "when", label: "When do clients pay?", val: when, set: setWhen },
    { key: "how",  label: "How does it break even?", val: how,  set: setHow },
  ] : isPhase3 ? [
    { key: "what", label: "What is the product?", val: what, set: setWhat },
    { key: "who",  label: "What does it deliver?", val: who,  set: setWho },
    { key: "where",label: "Where does it deliver value?", val: where,set: setWhere },
    { key: "when", label: "When does it deliver value?", val: when, set: setWhen },
    { key: "how",  label: "Why choose it over alternatives?", val: how,  set: setHow },
  ] : [
    { key: "what", label: "What is the problem?", val: what, set: setWhat },
    { key: "who",  label: "Who is affected?",     val: who,  set: setWho },
    { key: "where",label: "Where?",               val: where,set: setWhere },
    { key: "when", label: "When?",                val: when, set: setWhen },
    { key: "how",  label: "How is it broken?",    val: how,  set: setHow },
  ];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-slate-500">This is your <strong>Idea Validation</strong> Niche Builder. Enter your idea from the previous lesson and run LEO to stress-test it. Your answers save automatically.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <div>
            <Label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1 block">Brand / Venture Name</Label>
            <Input value={name} onChange={e => { setName(e.target.value); localStorage.setItem("hi_venture_name", e.target.value); }} placeholder="Name your venture" className="h-10 text-sm placeholder:text-slate-400" />
          </div>
          <div>
            <Label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-1 block">Industry</Label>
            <Input value={industry} onChange={e => { setIndustry(e.target.value); localStorage.setItem("hi_venture_industry", e.target.value); }} placeholder="Your industry" className="h-10 text-sm placeholder:text-slate-400" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {fieldsConfig.map(({ key, label, val, set }) => (
            <div key={key}>
              <Label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 mb-0.5 block">{label}</Label>
              <Textarea value={val} onChange={e => { set(e.target.value); persist(key, e.target.value); }} rows={2} className="text-xs resize-none placeholder:text-slate-400" placeholder={label} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleBrainstorm} disabled={loading} size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-none gap-2 text-xs font-bold">
          {loading ? <><RefreshCw className="w-3 h-3 animate-spin" />Brainstorming...</> : <><Sparkles className="w-3 h-3" />Brainstorm with LEO</>}
        </Button>
      </div>
      {summary && (
        <div className="flex flex-col gap-4 text-left">
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-purple-100 rounded-none p-5 shadow-sm relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between gap-4 relative z-10">
              <div className="space-y-1 text-left">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-purple-100 text-purple-800 text-[9px] font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-purple-600 fill-purple-300 animate-pulse" />
                  LEO Coherence Analysis
                </span>
                <h4 className="text-xs font-bold text-slate-800">
                  Venture Niche Alignment
                </h4>
                <p className="text-[11px] text-slate-600 max-w-md leading-relaxed">
                  {alignmentFeedback || "Your inputs are successfully mapped across your previous lessons. Leo has evaluated the flow of your ideas."}
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-purple-100 p-3 rounded-none shadow-inner shrink-0 text-center">
                <span className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                  {alignmentScore || 85}%
                </span>
                <span className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400 font-mono block">
                  Score
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-none p-4">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600 fill-amber-300" /> LEO Niche Summary
            </p>
            <p className="text-amber-900 text-xs font-bold italic leading-relaxed">&ldquo;{summary}&rdquo;</p>
          </div>

          <VennDiagram
            feasibilityScore={feasibilityScore}
            desirabilityScore={desirabilityScore}
            viabilityScore={viabilityScore}
            improvementTips={improvementTips}
          />
        </div>
      )}
    </div>
  );
}

function SketchLog({ lessonId }: { lessonId: string }) {
  const [text, setText] = useState("");
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      setText(loadExercise<string>(lessonId, ""));
      loaded.current = true;
    }
  }, [lessonId]);

  const isPhase4 = lessonId.startsWith("4.");
  const isPhase5 = lessonId.startsWith("5.");

  const description = isPhase5
    ? "Describe your launch kit: write one launch social post speaking directly to your persona, list your launch day checklist tasks, and write your referral message template."
    : isPhase4
    ? "Describe your one page offer sheet: list the core pricing tiers, included deliverables, and key client requirements or terms."
    : "Describe your prototype or sketch: what steps or screens does it have, what is the core user action, and what result does the user get? Remember that your prototype can be based on screens, a user journey, a system, or a service process.";

  const placeholder = isPhase5
    ? "Social Post: ...\nLaunch Day Checklist: ...\nReferral Template: ..."
    : isPhase4
    ? "Tier 1: price and scope...\nTier 2: price and scope...\nKey client requirement: ...\nTerms: ..."
    : "Step 1: ... to Step 2: ... to Step 3: result ...";

  const exampleText = isPhase5
    ? "Social Post: Struggling to find clean meal prep in Nairobi? We deliver chef cooked meals right to your office at noon daily. Try our weekly trial package!\n\nLaunch Day Checklist: Post on launch channels, message 10 warm contacts, collect first day client feedback.\n\nReferral Template: Hey, I just launched my meal delivery service. If you know anyone looking for healthy office lunches, could you forward them this link?"
    : isPhase4
    ? "Tier 1: 500 dollars per month, covers basic custom support and weekly email updates.\nTier 2: 1200 dollars per month, covers unlimited support and dedicated developer channels.\n\nKey client requirement: Client must provide brand assets and raw content files.\n\nTerms: Retainer payment due upfront monthly, 30 day cancellation notice."
    : "Step 1: User visits landing page and taps start booking.\nStep 2: User selects slot and enters phone number.\nStep 3: User gets booking confirmation via text notification.";

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-slate-500 text-left">{description}</p>
      <Textarea
        value={text}
        onChange={e => { setText(e.target.value); saveExercise(lessonId, e.target.value); }}
        rows={4}
        className="text-sm resize-none"
        placeholder={placeholder}
      />
      
      {/* Example Box */}
      <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-none text-left">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-450 block mb-2">
          💡 Realistic Example:
        </span>
        <pre className="text-xs text-slate-600 font-sans whitespace-pre-wrap leading-relaxed">
          {exampleText}
        </pre>
        <button
          type="button"
          onClick={() => { setText(exampleText); saveExercise(lessonId, exampleText); }}
          className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 hover:text-black hover:underline cursor-pointer"
        >
          ✨ Click to use this example
        </button>
      </div>
    </div>
  );
}

function ObservationLog({ lessonId }: { lessonId: string }) {
  const [obs, setObs] = useState(["", "", ""]);
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      setObs(loadExercise<string[]>(lessonId, ["", "", ""]));
      loaded.current = true;
    }
  }, [lessonId]);

  const update = (i: number, val: string) => {
    const next = obs.map((v, idx) => idx === i ? val : v);
    setObs(next);
    saveExercise(lessonId, next);
  };

  const isPhase4 = lessonId.startsWith("4.");
  const isPhase5 = lessonId.startsWith("5.");

  const description = isPhase5
    ? "Log 3 raw observations from your soft launch, capturing warm client responses, messages opened, or conversion metrics."
    : isPhase4
    ? "Log 3 raw observations from showing your offer sheet to a real prospect, focusing on their pricing objections or reactions."
    : "Log 3 raw observations, capturing exactly what you saw or heard instead of your interpretation.";

  const placeholders = isPhase5
    ? [
        "e.g. Three out of ten warm contacts replied within the first hour.",
        "e.g. One user asked if they could forward the message to a partner.",
        "e.g. Two contacts requested a call to discuss the pricing sheet."
      ]
    : isPhase4
    ? [
        "e.g. They asked if the monthly retainer could be split into two payments.",
        "e.g. They hesitated when reading the scope limits in Tier 1.",
        "e.g. They said the price felt very reasonable compared to an agency."
      ]
    : [
        'e.g. "She tapped the back button twice before finding the checkout button."',
        'e.g. "She tapped the back button twice before finding the checkout button."',
        'e.g. "She tapped the back button twice before finding the checkout button."'
      ];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-500">{description}</p>
      {obs.map((v, i) => (
        <div key={i}>
          <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-750 mb-1.5 block">Observation {i + 1}</Label>
          <Textarea
            value={v}
            onChange={e => update(i, e.target.value)}
            rows={3}
            className="text-sm resize-none"
            placeholder={placeholders[i] || placeholders[0]}
          />
        </div>
      ))}
    </div>
  );
}

function MetricsLog({ lessonId }: { lessonId: string }) {
  const [changed, setChanged] = useState("");
  const [metric, setMetric] = useState("");
  const [nextStep, setNextStep] = useState("");
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      const saved = loadExercise<{ changed: string; metric: string; nextStep: string }>(lessonId, { changed: "", metric: "", nextStep: "" });
      setChanged(saved.changed); setMetric(saved.metric); setNextStep(saved.nextStep);
      loaded.current = true;
    }
  }, [lessonId]);

  const save = (c: string, m: string, n: string) => saveExercise(lessonId, { changed: c, metric: m, nextStep: n });

  const isPhase4 = lessonId.startsWith("4.");
  const isPhase5 = lessonId.startsWith("5.");

  const labels = isPhase5
    ? {
        changed: "Growth Metrics evaluation from your soft launch",
        metric: "Your 90 day growth plan (3 actions and 3 metrics)",
        nextStep: "The single milestone you will celebrate first",
        changedPlaceholder: "How many contacts did you message and what was the response rate?",
        metricPlaceholder: "e.g. Action 1: post twice weekly. Metric 1: 5 new referrals...",
        nextStepPlaceholder: "e.g. Reaching my first 1000 dollars in recurring revenue..."
      }
    : isPhase4
    ? {
        changed: "What changed in your offer based on prospect objections?",
        metric: "Your final break even monthly revenue target",
        nextStep: "The number one adjustment to make to your pricing or scope next",
        changedPlaceholder: "What feedback surprised you about the pricing or scope?",
        metricPlaceholder: "e.g. 1500 dollars per month, requiring 3 active clients...",
        nextStepPlaceholder: "One specific adjustment to improve pricing validation..."
      }
    : {
        changed: "What changed from your original assumption?",
        metric: "The key metric you'll track going forward",
        nextStep: "The #1 thing to do differently in the next phase",
        changedPlaceholder: "What surprised you? What was different from what you expected?",
        metricPlaceholder: "e.g. Task completion rate, day 7 return rate, willingness to pay...",
        nextStepPlaceholder: "One specific action or change..."
      };

  const suggestions = isPhase5
    ? [
        { label: "Warm Response Rate", desc: "Percentage of messaged connections who replied." },
        { label: "Referral Velocity", desc: "Number of inbound client referrals received monthly." },
        { label: "Organic Social Reach", desc: "Growth rate of awareness on launch channels." },
        { label: "Retention Rate", desc: "Percentage of early clients renewing their contracts." }
      ]
    : isPhase4
    ? [
        { label: "LTV to CAC Ratio", desc: "Lifetime value compared to cost to acquire a client." },
        { label: "Break Even Volume", desc: "Number of clients needed to cover basic monthly operations." },
        { label: "Average Contract Value", desc: "Average transaction amount per client project." },
        { label: "Payment Collection Rate", desc: "Percentage of invoices settled within terms." }
      ]
    : [
        { label: "Willingness to Pay", desc: "Conversion rate on mock checkout or preorders." },
        { label: "Task Completion Rate", desc: "Percentage of users who finish the core action." },
        { label: "Day 7 Return Rate", desc: "Percentage of active users returning after a week." },
        { label: "Customer Effort Score", desc: "Rating of how easy it is to solve their problem." }
      ];

  return (
    <div className="flex flex-col gap-3 text-left">
      <div>
        <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-750 mb-1.5 block">{labels.changed}</Label>
        <Textarea value={changed} onChange={e => { setChanged(e.target.value); save(e.target.value, metric, nextStep); }} rows={3} className="text-sm resize-none" placeholder={labels.changedPlaceholder} />
      </div>
      <div>
        <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-750 mb-1.5 block">{labels.metric}</Label>
        <Input value={metric} onChange={e => { setMetric(e.target.value); save(changed, e.target.value, nextStep); }} className="h-10 text-sm" placeholder={labels.metricPlaceholder} />
        
        {/* Popular Metrics Suggestions */}
        <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-none">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-450 block mb-2">
            💡 Popular Metrics to Track:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
            {suggestions.map((sug, idx) => (
              <button 
                key={idx}
                type="button" 
                onClick={() => { setMetric(sug.label); save(changed, sug.label, nextStep); }} 
                className="text-left hover:text-[#000000] hover:bg-slate-100 p-1.5 rounded-none transition-all cursor-pointer font-medium"
              >
                <strong>{sug.label}:</strong> {sug.desc}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Label className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-750 mb-1.5 block">{labels.nextStep}</Label>
        <Input value={nextStep} onChange={e => { setNextStep(e.target.value); save(changed, metric, e.target.value); }} className="h-10 text-sm" placeholder={labels.nextStepPlaceholder} />
      </div>
    </div>
  );
}

function getExerciseTitle(lessonId: string, exerciseType: string): string {
  const isPhase5 = lessonId.startsWith("5.");
  const isPhase4 = lessonId.startsWith("4.");
  const isPhase3 = lessonId.startsWith("3.");
  const isPhase2 = lessonId.startsWith("2.");

  if (exerciseType === "research-canvas") {
    if (isPhase5) return "Awareness & Network Canvas";
    if (isPhase4) return "Market Pricing Canvas";
    if (isPhase3) return "Competitor Audit & Trust Landscape";
    if (isPhase2) return "User Research & Segmentation Canvas";
    return "Problem Research Canvas";
  }
  if (exerciseType === "insight-ranking") {
    if (isPhase5) return "Growth & Feedback Loops";
    if (isPhase4) return "Positioning Matrix";
    if (isPhase3) return "USP & UX Brand Writing";
    if (isPhase2) return "User Persona Profile";
    return "Insight Ranking";
  }
  if (exerciseType === "idea-statement") {
    if (isPhase5) return "Talent & Squadding Brief";
    if (isPhase4) return "Revenue Proposal Sheet";
    if (isPhase3) return "Features, Benefits & Deliverables";
    if (isPhase2) return "Desired Outcome & Core Feature";
    return "Idea Statement";
  }
  if (exerciseType === "niche-builder") {
    return "Idea Validation Niche Builder";
  }
  if (exerciseType === "sketch-log") {
    if (isPhase5) return "Launch Kit Log";
    if (isPhase4) return "Offer Sheet Log";
    if (isPhase3) return "Clickable Prototype Log";
    return "Prototype Log";
  }
  if (exerciseType === "observation-log") {
    if (isPhase5) return "Soft Launch Test Log";
    if (isPhase4) return "Prospect Objection Log";
    if (isPhase3) return "Usability Observation Log";
    return "Observation Log";
  }
  if (exerciseType === "metrics-log") {
    if (isPhase5) return "Graduation Learning Log";
    if (isPhase4) return "Revenue Readiness Log";
    if (isPhase3) return "Learning Log";
    return "Learning Log";
  }
  return "Exercise";
}

function getLessonVideoExplanation(lessonId: string): string[] {
  const phase = lessonId.split(".")[0];
  
  if (phase === "1") {
    return [
      "Understand what problem actually needs solving",
      "Find pain points by looking at current manual solutions",
      "Locate where the target user runs into frustration",
      "Draft a clear problem statement that guides your solution"
    ];
  }
  if (phase === "2") {
    return [
      "Identify the core target audience and daily habits",
      "Discover key triggers that drive user action",
      "Pinpoint main barriers stopping them from changing habits",
      "Differentiate between power users and casual users"
    ];
  }
  if (phase === "3") {
    return [
      "Analyze competitors to find the trust brand gaps",
      "Find weaknesses in current market pricing structures",
      "Audit features and deliverables of top alternatives",
      "Locate the primary value flow gap you can fill"
    ];
  }
  if (phase === "4") {
    return [
      "Define pricing tiers based on client expectations",
      "Compare different revenue models for maximum sustainability",
      "Select high end and mid range options for positioning",
      "Outline terms and client requirements upfront"
    ];
  }
  if (phase === "5") {
    return [
      "Build a launch checklist for the soft launch day",
      "Identify warm contacts and design templates for them",
      "Create direct social posts speaking to your persona",
      "Track customer feedback loops to iterate fast"
    ];
  }
  return [
    "Explore the main objectives of this design lesson",
    "Identify key exercises to build your venture profile",
    "Review industry examples to see successful patterns"
  ];
}

function getLessonVideoSummary(lessonId: string): string[] {
  const phase = lessonId.split(".")[0];
  
  if (phase === "1") {
    return [
      "You have mapped out the core problem area successfully",
      "You identified real situations where the pain point occurs",
      "You located where and when the user feels the friction",
      "Next steps will involve defining the target user profile"
    ];
  }
  if (phase === "2") {
    return [
      "You defined the user persona and their daily habits",
      "You mapped out the triggers and barriers to behavior change",
      "You identified the gap between stated and actual behavior",
      "Next steps will guide you through auditing your competition"
    ];
  }
  if (phase === "3") {
    return [
      "You completed a thorough audit of active competitors",
      "You identified their key weaknesses and pricing strategy",
      "You found the primary value flow gap to establish your USP",
      "Next steps will focus on defining your pricing structure"
    ];
  }
  if (phase === "4") {
    return [
      "You structured your pricing tiers and terms clearly",
      "You defined client expectations and market positioning",
      "You set up a sustainable revenue proposal framework",
      "Next steps will take you through the launch plan details"
    ];
  }
  if (phase === "5") {
    return [
      "You completed the launch kit and network strategy maps",
      "You defined your key growth metrics and talent squads",
      "You set up warm loops and soft launch checklist items",
      "You are now ready to scale your validated product venture"
    ];
  }
  return [
    "You completed all core action points for this lesson",
    "You aligned your venture profile with design card methods",
    "You are ready to advance to the next step of the program"
  ];
}

interface LessonVideoPlayerProps {
  lessonId: string;
  title: string;
  heroImage: string | undefined;
  onPlay?: () => void;
  onEnded?: () => void;
  duration?: number;
}

function LessonVideoPlayer({ lessonId, title, heroImage, onPlay, onEnded, duration = 15 }: LessonVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (isPlaying && onPlay) {
      onPlay();
    }
  }, [isPlaying, onPlay]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            setProgress(100);
            if (onEnded) onEnded();
            return duration;
          }
          const next = prev + 1;
          setProgress((next / duration) * 100);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onEnded, duration]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  const handleProgressChange = (val: number) => {
    setProgress(val);
    setTimeElapsed(Math.round((val / 100) * duration));
  };

  return (
    <div className={`relative bg-slate-950 rounded-none overflow-hidden shadow-inner aspect-video flex flex-col group ${isFullscreen ? "fixed inset-0 z-50 w-screen h-screen" : "w-full"}`}>
      <div className="flex-1 relative flex items-center justify-center bg-slate-950">
        {heroImage && !isPlaying && (
          <img src={heroImage} alt="Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 filter blur-[1px]" />
        )}
        
        {isPlaying ? (
          <div className="flex items-center gap-1.5 z-10 h-16">
            {[...Array(12)].map((_, i) => {
              const heights = [24, 40, 16, 32, 48, 20, 36, 12, 28, 44, 18, 30];
              const delays = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s", "0.6s", "0.7s", "0.8s", "0.9s", "1s", "1.1s"];
              return (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-violet-500 to-fuchsia-400 rounded-full animate-pulse"
                  style={{
                    height: `${heights[i % heights.length]}px`,
                    animationDelay: delays[i % delays.length],
                    animationDuration: "1s"
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center z-10">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/30 backdrop-blur-md shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer duration-300"
            >
              <Play className="w-8 h-8 fill-white ml-1 text-white" />
            </button>
          </div>
        )}

        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <span className="text-xs font-bold font-mono text-purple-300 uppercase tracking-widest">{lessonId} Tutorial</span>
          <span className="text-xs font-bold truncate max-w-[200px]">{title}</span>
        </div>
      </div>

      <div className="bg-slate-900/95 border-t border-slate-800 p-3 flex flex-col gap-2 relative z-20">
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => handleProgressChange(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-slate-800 rounded-none appearance-none cursor-pointer accent-violet-500"
          />
        </div>

        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-400 hover:fill-white text-slate-400" /> : <Play className="w-4 h-4 fill-slate-400 hover:fill-white text-slate-400" />}
            </button>
            
            <span className="font-mono text-[10px] text-slate-400">
              {formatTime(timeElapsed)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 group/vol">
              <Volume2 className="w-4 h-4 text-slate-400 hover:text-white" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-12 h-1 bg-slate-800 rounded-none appearance-none cursor-pointer accent-slate-400 group-hover/vol:w-16 transition-all duration-200"
              />
            </div>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LessonPanel({
  phase, lesson, phaseIdx, lessonIdx,
  isCompleted, onComplete, onNext, onPrev,
  hasNext, hasPrev, onCardClick
}: LessonPanelProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const heroImage = lessonHeroImages[lesson.id];
  const color = phaseColors[phaseIdx];
  const stage = dtStageConfig[lesson.dtStage];

  const { profile } = useVentureProfile();

  const [showExplVideoModal, setShowExplVideoModal] = useState(false);
  const [showSummVideoModal, setShowSummVideoModal] = useState(false);
  const [showNextLessonVideoModal, setShowNextLessonVideoModal] = useState(false);
  const [hasWatchedExpl, setHasWatchedExpl] = useState(false);
  const [summaryVideoFinished, setSummaryVideoFinished] = useState(false);
  const [nextLessonVideoFinished, setNextLessonVideoFinished] = useState(false);
  const [clickedNotes, setClickedNotes] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const watched = localStorage.getItem(`hi_expl_video_watched_${lesson.id}`);
      setHasWatchedExpl(watched === "true");
    }
    setClickedNotes({ 0: true }); // first note is read/open by default
    setExpandedStep(0);
  }, [lesson.id]);

  const handleMarkExplWatched = () => {
    setHasWatchedExpl(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(`hi_expl_video_watched_${lesson.id}`, "true");
    }
  };

  useEffect(() => {
    setSummaryVideoFinished(false);
    setNextLessonVideoFinished(false);
  }, [lesson.id]);

  const handleNextLessonTrigger = () => {
    if (!hasNext) {
      onNext();
      return;
    }
    setNextLessonVideoFinished(false);
    setShowNextLessonVideoModal(true);
  };

  const handleProceedToNextLesson = () => {
    setShowNextLessonVideoModal(false);
    onNext();
  };

  const handleNoteClick = (idx: number) => {
    setExpandedStep(expandedStep === idx ? null : idx);
    setClickedNotes(prev => ({ ...prev, [idx]: true }));
  };

  const allNotesClicked = lesson.points.every((_, i) => clickedNotes[i]);

  const colorMap: Record<string, { badge: string; accent: string; step: string; stepActive: string }> = {
    sky:     { badge: "bg-sky-100 text-sky-700",     accent: "border-sky-400",     step: "bg-sky-50 border-sky-100",     stepActive: "bg-sky-500 text-white border-sky-500" },
    violet:  { badge: "bg-violet-100 text-violet-700", accent: "border-violet-450", step: "bg-violet-50 border-violet-100", stepActive: "bg-violet-500 text-white border-violet-500" },
    rose:    { badge: "bg-rose-100 text-rose-700",   accent: "border-rose-450",   step: "bg-rose-50 border-rose-100",   stepActive: "bg-rose-500 text-white border-rose-500" },
    amber:   { badge: "bg-amber-100 text-amber-700", accent: "border-amber-450",  step: "bg-amber-50 border-amber-100", stepActive: "bg-amber-500 text-white border-amber-500" },
    emerald: { badge: "bg-emerald-100 text-emerald-700", accent: "border-emerald-450", step: "bg-emerald-50 border-emerald-100", stepActive: "bg-emerald-500 text-white border-emerald-500" }
  };
  const c = colorMap[color] || colorMap.sky;

  return (
    <div className="w-full pb-12">
      {/* 2-Column Grid on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column: Hero, Summary, Coach, Prior Work, Exercise, Nav */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Hero image */}
          {heroImage && (
            <div className="rounded-none overflow-hidden h-44 relative border border-slate-200">
              <img src={heroImage} alt={lesson.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${c.badge} text-[10px] font-bold uppercase tracking-wider border-0 rounded-none`}>
                    Phase {phase.num} · {lesson.id}
                  </Badge>
                  <Badge className={`${stage.badge} text-[10px] font-bold uppercase tracking-wider border-0 rounded-none`}>
                    {stage.emoji ? `${stage.emoji} ` : ""}{stage.label}
                  </Badge>
                </div>
                <h1 className="text-white font-heading font-bold text-2xl md:text-3xl tracking-tight leading-tight">
                  {lesson.title}
                </h1>
              </div>
            </div>
          )}

          {/* Summary card */}
          <Card className={`border border-slate-200 border-l-4 ${c.accent} shadow-none bg-[#faf9f6] rounded-none overflow-hidden`}>
            <CardContent className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Core Focus
                </span>
              </div>
              <p className="text-slate-800 text-[15px] md:text-[16px] leading-relaxed font-semibold italic pl-1">
                &ldquo;{lesson.summary}&rdquo;
              </p>
            </CardContent>
          </Card>

          {/* Video Explanation Placeholder */}
          <div 
            onClick={() => setShowExplVideoModal(true)}
            className="relative cursor-pointer group rounded-none overflow-hidden border border-slate-200 shadow-none transition-all duration-300 hover:scale-[1.005] bg-slate-950 aspect-video md:aspect-[21/9] flex flex-col justify-end p-5"
          >
            {heroImage && (
              <img 
                src={heroImage} 
                alt="Lesson Video Thumbnail" 
                className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-55 transition-opacity duration-300"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
              <div className="space-y-1.5 text-left">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-white/10 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-wider border border-white/20">
                  <Film className="w-2.5 h-2.5 text-purple-300" />
                  Lesson Video
                </span>
                <h3 className="text-white font-bold text-sm md:text-base leading-tight tracking-tight">
                  Watch the detailed lesson breakdown video
                </h3>
                <p className="text-[11px] text-slate-350 max-w-md font-medium leading-normal">
                  Learn how to master this exercise with a short walkthrough
                </p>
              </div>
              
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-none bg-white text-slate-900 group-hover:bg-slate-100 shadow-none border border-black transition-colors duration-300 self-end md:self-center">
                <Play className="w-5 h-5 fill-slate-900 ml-0.5 text-slate-900" />
              </div>
            </div>
          </div>

          {/* AI coach vertical adaptation */}
          {lesson.id !== "1.1" && <NicheAdaptation lesson={lesson} profile={profile} onCardClick={onCardClick} />}

          <div className="block lg:hidden flex flex-col gap-3">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <span>Lesson Notes</span>
            </h2>
            {lesson.points.map((point, i) => {
              const isExpanded = expandedStep === i;
              const isClicked = clickedNotes[i];
              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleNoteClick(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleNoteClick(i);
                    }
                  }}
                  className={`w-full text-left rounded-none border-2 p-4 transition-all cursor-pointer ${isExpanded ? c.step + " " + c.accent : "bg-white border-slate-100 hover:border-slate-200"}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-7 h-7 shrink-0 rounded-none flex items-center justify-center text-xs font-extrabold mt-0.5 ${isExpanded ? c.stepActive : isClicked ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                      {isClicked ? "✓" : i + 1}
                    </span>
                    <div className="text-sm text-slate-700 leading-relaxed font-semibold">
                      {renderTakeaway(point, onCardClick)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prior work carry-forward context */}
          <PriorWorkCallout currentLessonId={lesson.id} />

          {/* Inline Exercise */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[15px] md:text-[17px] font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <span>{getExerciseTitle(lesson.id, lesson.exerciseType)}</span>
            </h2>
            <Card className="border border-slate-200 rounded-none shadow-none relative overflow-hidden">
              <CardContent className="p-5">
                {lesson.exerciseType === "research-canvas"  && <ResearchCanvas   key={lesson.id} lessonId={lesson.id} />}
                {lesson.exerciseType === "insight-ranking"  && <InsightRanking   key={lesson.id} lessonId={lesson.id} />}
                {lesson.exerciseType === "idea-statement"   && <IdeaStatement    key={lesson.id} lessonId={lesson.id} />}
                {lesson.exerciseType === "niche-builder"    && (
                  lesson.id === "4.4" ? (
                    <PitchSimulation key={lesson.id} lessonId={lesson.id} onComplete={onComplete} />
                  ) : (
                    <InlineNicheBuilder key={lesson.id} lessonId={lesson.id} />
                  )
                )}
                {lesson.exerciseType === "sketch-log"       && <SketchLog        key={lesson.id} lessonId={lesson.id} />}
                {lesson.exerciseType === "observation-log"  && <ObservationLog   key={lesson.id} lessonId={lesson.id} />}
                {lesson.exerciseType === "metrics-log"      && <MetricsLog       key={lesson.id} lessonId={lesson.id} />}
              </CardContent>

              {/* Glassmorphic Lock Overlay */}
              {!hasWatchedExpl && !isCompleted && (
                <div className="absolute inset-0 bg-slate-50/75 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center transition-all duration-300">
                  <div className="w-12 h-12 rounded-none bg-slate-900 text-white flex items-center justify-center shadow-none mb-4 animate-bounce">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-sm md:text-base mb-2">
                    Exercise Locked
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">
                    Watch the lesson explanation video above to unlock this exercise and start editing your venture details
                  </p>
                  <Button 
                    onClick={() => setShowExplVideoModal(true)}
                    className="bg-violet-650 hover:bg-violet-550 text-white font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-none flex items-center gap-2 shadow-none cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Watch Overview Video
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Navigation + Mark complete */}
          <div className="flex items-center gap-3 pt-2">
            {hasPrev && (
              <Button variant="outline" size="lg" onClick={onPrev} className="rounded-none border-slate-200 text-slate-600 hover:text-slate-900 h-11 px-3 flex items-center justify-center">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}

            <div className="flex-1">
              {isCompleted ? (
                <Button onClick={handleNextLessonTrigger} disabled={!hasNext} size="lg" className="w-full rounded-none bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-11 text-sm md:text-base gap-2 shadow-none active:scale-[0.99] transition-all">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{hasNext ? "Next Lesson →" : "Phase Complete"}</span>
                </Button>
              ) : (
                <Button
                  onClick={() => setShowSummVideoModal(true)}
                  size="lg"
                  className="w-full rounded-none bg-slate-900 hover:bg-slate-800 text-white font-bold gap-2 h-11 text-sm md:text-base shadow-none active:scale-[0.99] transition-all"
                >
                  <span>Mark Complete</span>
                  <span className="bg-white/20 rounded-none px-2 py-0.5 text-xs font-extrabold">+{XP_PER_LESSON} XP</span>
                </Button>
              )}
            </div>

            {hasNext && isCompleted && (
              <Button variant="outline" size="lg" onClick={handleNextLessonTrigger} className="rounded-none border-slate-200 text-slate-600 hover:text-slate-900 h-11 px-3 flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Right Column: Actions Column (visible only on desktop) */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-0 space-y-4">
            <Card className="border border-slate-200/80 shadow-none bg-white rounded-none overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-5 py-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  Actions
                </h3>
              </div>
              <CardContent className="p-5 flex flex-col gap-4">
                {lesson.points.map((point, i) => {
                  const isExpanded = expandedStep === i;
                  return (
                    <div
                      key={i}
                      role="button"
                      tabIndex={0}
                      onClick={() => setExpandedStep(isExpanded ? null : i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setExpandedStep(isExpanded ? null : i);
                        }
                      }}
                      className={`w-full text-left rounded-none border p-3.5 transition-all cursor-pointer hover:border-slate-350 relative group flex items-start gap-3 ${
                        isExpanded 
                          ? `${c.step} ${c.accent} shadow-none scale-[1.01]` 
                          : "bg-slate-50/50 border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`w-6 h-6 shrink-0 rounded-none flex items-center justify-center text-[10px] font-extrabold ${
                        isExpanded ? c.stepActive : "bg-white border border-slate-200 text-slate-500"
                      }`}>
                        {i + 1}
                      </span>
                      <div className="text-[13px] text-slate-700 leading-relaxed font-semibold flex-1">
                        {renderTakeaway(point, onCardClick)}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog Modals */}
      <BrutalistDialog open={showExplVideoModal} onOpenChange={setShowExplVideoModal} showCloseButton={false} className="w-full max-w-md md:!max-w-3xl lg:!max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Side: Video Player */}
          <div className="md:col-span-7 bg-slate-950 p-6 flex flex-col justify-center min-h-[300px] border-b md:border-b-0 md:border-r border-slate-100">
            <DialogHeader className="mb-4 text-white text-left">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none bg-violet-500/10 text-violet-400 text-[9px] font-black uppercase tracking-wider border border-violet-500/20 mb-2 self-start font-mono">
                <Film className="w-2.5 h-2.5 text-violet-400" />
                Lesson Explanation Video
              </span>
              <DialogTitle className="text-lg font-heading text-white uppercase tracking-widest font-black flex items-center gap-2">
                Lesson overview tutorial
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400">
                Watch this overview to unlock the lesson inputs and templates
              </DialogDescription>
            </DialogHeader>

            <LessonVideoPlayer 
              lessonId={lesson.id} 
              title={lesson.title} 
              heroImage={heroImage}
              onPlay={handleMarkExplWatched}
              onEnded={handleMarkExplWatched}
              duration={15}
            />
          </div>

          {/* Right Side: Details & Lesson Notes */}
          <div className="md:col-span-5 p-6 flex flex-col justify-between bg-slate-50/50">
            <div className="space-y-4 text-left">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                What this lesson covers
              </h4>
              <ul className="space-y-3">
                {getLessonVideoExplanation(lesson.id).map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-650 flex items-start gap-2.5 leading-relaxed">
                    <span className="text-violet-500 font-black mt-0.5 text-sm">*</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-150">
              <Button 
                disabled={!hasWatchedExpl}
                onClick={() => setShowExplVideoModal(false)}
                className={`w-full font-bold text-xs uppercase tracking-widest py-3 rounded-none transition-all duration-300 shadow-none ${
                  hasWatchedExpl 
                    ? "bg-slate-900 hover:bg-slate-850 text-white hover:scale-[1.01]" 
                    : "bg-slate-200 text-slate-450 cursor-not-allowed border border-slate-350"
                }`}
              >
                {hasWatchedExpl ? "Close Video" : "Play video to unlock lesson"}
              </Button>
            </div>
          </div>
        </div>
      </BrutalistDialog>

      <BrutalistDialog open={showSummVideoModal} onOpenChange={setShowSummVideoModal} showCloseButton={false} className="w-full max-w-md md:!max-w-3xl lg:!max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Side: Video Player */}
          <div className="md:col-span-7 bg-slate-950 p-6 flex flex-col justify-center min-h-[300px] border-b md:border-b-0 md:border-r border-slate-100">
            <DialogHeader className="mb-4 text-white text-left">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-wider border border-emerald-500/20 mb-2 self-start font-mono">
                <Sparkles className="w-2.5 h-2.5 text-emerald-400 fill-emerald-400/20" />
                Lesson Summary Video
              </span>
              <DialogTitle className="text-lg font-heading text-white uppercase tracking-widest font-black flex items-center gap-2">
                Complete your lesson
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400">
                Watch this brief summary to unlock completion and collect points
              </DialogDescription>
            </DialogHeader>

            <LessonVideoPlayer 
              lessonId={lesson.id} 
              title={lesson.title} 
              heroImage={heroImage}
              onPlay={() => {}}
              onEnded={() => setSummaryVideoFinished(true)}
              duration={15}
            />
          </div>

          {/* Right Side: Details & Lesson Notes */}
          <div className="md:col-span-5 p-6 flex flex-col justify-between bg-slate-50/50">
            <div className="space-y-4 text-left">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Key lesson takeaways
              </h4>
              <ul className="space-y-3">
                {getLessonVideoSummary(lesson.id).map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-650 flex items-start gap-2.5 leading-relaxed">
                    <span className="text-emerald-500 font-black mt-0.5 text-sm">*</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-150 flex flex-col gap-2">
              <Button 
                disabled={!summaryVideoFinished}
                onClick={() => {
                  setShowSummVideoModal(false);
                  onComplete();
                }}
                className={`w-full font-bold text-xs uppercase tracking-widest py-3 rounded-none transition-all duration-300 ${
                  summaryVideoFinished 
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-none shadow-emerald-600/10 hover:scale-[1.01]" 
                    : "bg-slate-200 text-slate-450 cursor-not-allowed border border-slate-350"
                }`}
              >
                {summaryVideoFinished ? "Collect points and continue" : "Watch summary to unlock"}
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setShowSummVideoModal(false)}
                className="w-full text-xs font-bold text-slate-550 hover:text-slate-900"
              >
                Back to Lesson
              </Button>
            </div>
          </div>
        </div>
      </BrutalistDialog>

      {/* NEXT LESSON TRANSITION MODAL */}
      <BrutalistDialog open={showNextLessonVideoModal} onOpenChange={setShowNextLessonVideoModal} showCloseButton={false} className="w-full max-w-md md:!max-w-3xl lg:!max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Side: Video Player */}
          <div className="md:col-span-7 bg-slate-950 p-6 flex flex-col justify-center min-h-[300px] border-b md:border-b-0 md:border-r border-slate-100">
            <DialogHeader className="mb-4 text-white text-left">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none bg-emerald-500/10 text-emerald-450 text-[9px] font-black uppercase tracking-wider border border-emerald-500/20 mb-2 self-start font-mono">
                <Film className="w-2.5 h-2.5 text-emerald-450" />
                Lesson Transition Video
              </span>
              <DialogTitle className="text-lg font-heading text-white uppercase tracking-widest font-black flex items-center gap-2">
                Transition to Next Lesson
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400">
                Watch this brief breakdown of learnings and expectations before proceeding
              </DialogDescription>
            </DialogHeader>

            <LessonVideoPlayer 
              lessonId={lesson.id} 
              title={lesson.title} 
              heroImage={heroImage}
              onPlay={() => {}}
              onEnded={() => setNextLessonVideoFinished(true)}
              duration={15}
            />
          </div>

          {/* Right Side: Details & Lesson Notes */}
          <div className="md:col-span-5 p-6 flex flex-col justify-between bg-slate-50/50">
            <div className="space-y-4 text-left">
              <div>
                <h4 className="text-[10px] font-extrabold text-slate-450 uppercase tracking-widest mb-2 font-mono">
                  Learnings Summary
                </h4>
                <ul className="space-y-2">
                  {getLessonVideoSummary(lesson.id).map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-650 flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-500 font-black mt-0.5 text-sm">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {(() => {
                const nextPhaseIdx = lessonIdx < 6 ? phaseIdx : phaseIdx + 1;
                const nextLessonIdx = lessonIdx < 6 ? lessonIdx + 1 : 0;
                const nextPhase = phasesData[nextPhaseIdx];
                const nextLesson = nextPhase?.lessons[nextLessonIdx];

                if (!nextLesson) return null;
                return (
                  <div className="border-t border-slate-200/80 pt-4 mt-2">
                    <h4 className="text-[10px] font-extrabold text-slate-450 uppercase tracking-widest mb-2 font-mono flex items-center gap-1.5">
                      <span className="bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded text-[8px] font-bold font-sans">UP NEXT</span>
                      <span>Lesson {nextLesson.id}</span>
                    </h4>
                    <h5 className="text-xs font-bold text-slate-900 leading-tight">{nextLesson.title}</h5>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">{nextLesson.summary}</p>
                  </div>
                );
              })()}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-150 flex flex-col gap-2">
              <Button 
                disabled={!nextLessonVideoFinished}
                onClick={handleProceedToNextLesson}
                className={`w-full font-bold text-xs uppercase tracking-widest py-3 rounded-none transition-all duration-300 ${
                  nextLessonVideoFinished 
                    ? "bg-slate-900 hover:bg-slate-800 text-white shadow-none hover:scale-[1.01]" 
                    : "bg-slate-200 text-slate-450 cursor-not-allowed border border-slate-350"
                }`}
              >
                {nextLessonVideoFinished ? "Proceed to Next Lesson" : "Watch summary to unlock"}
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setShowNextLessonVideoModal(false)}
                className="w-full text-xs font-bold text-slate-550 hover:text-slate-900"
              >
                Back to Lesson
              </Button>
            </div>
          </div>
        </div>
      </BrutalistDialog>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { VentureProfile } from "../hooks/useVentureProfile";
import { Lesson } from "../data/phases";
import { CardData, cardsList } from "@/components/DesignCardsExplorer";

interface NicheAdaptationProps {
  lesson: Lesson;
  profile: VentureProfile;
  onCardClick: (card: CardData) => void;
}

interface AIResponse {
  intro: string;
  steps: string[];
  example: string;
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
          onClick={() => onCardClick(card)}
          className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-850 border border-amber-250/60 px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer active:scale-95 shadow-sm mt-2 self-start"
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

export default function NicheAdaptation({ lesson, profile, onCardClick }: NicheAdaptationProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exampleOpen, setExampleOpen] = useState(false);

  const hasNiche = (!!profile.industry && (!!profile.type || !!profile.fiveWs.what)) || (!!profile.name && !!profile.industry && !!profile.fiveWs.what);

  useEffect(() => {
    if (!hasNiche) {
      setData(null);
      return;
    }

    const cacheKey = `hi_ai_adaptation_${lesson.id}_${profile.industry.replace(/\s+/g, "_")}_${profile.name.replace(/\s+/g, "_")}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      try {
        setData(JSON.parse(cached));
        setError(null);
        return;
      } catch {
        // clear corrupted cache
        localStorage.removeItem(cacheKey);
      }
    }

    // If not cached, fetch from backend
    const fetchAdaptation = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/lesson-ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lesson: {
              id: lesson.id,
              title: lesson.title,
              dtStage: lesson.dtStage,
              points: lesson.points,
            },
            venture: {
              name: profile.name,
              industry: profile.industry,
              fiveWs: profile.fiveWs,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const resData = await response.json();
        if (resData.success) {
          const formatted: AIResponse = {
            intro: resData.intro,
            steps: resData.steps,
            example: resData.example,
          };
          setData(formatted);
          localStorage.setItem(cacheKey, JSON.stringify(formatted));
        } else {
          throw new Error(resData.error || "Failed to adapt lesson");
        }
      } catch (e: any) {
        console.error("NicheAdaptation AI load error:", e);
        setError(e.message || "Failed to load AI personalization");
      } finally {
        setLoading(false);
      }
    };

    fetchAdaptation();
  }, [lesson.id, profile.name, profile.industry, profile.fiveWs, hasNiche]);

  if (!hasNiche) {
    return (
      <Card className="border border-dashed border-slate-200 bg-slate-50/50 rounded-2xl">
        <CardContent className="p-5 text-center space-y-2">
          <Sparkles className="w-5 h-5 text-slate-400 mx-auto" />
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">AI Coach Guidance Locked</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            LEO can write custom lesson steps tailored specifically for your venture. Complete the Setup in Lesson 1.1 or the Niche Builder to unlock personalized coaching.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="border border-slate-100 bg-white rounded-2xl shadow-sm space-y-4 p-5">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-amber-500 animate-spin" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">LEO is adapting this lesson...</span>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </Card>
    );
  }

  if (error || !data) {
    return null; // Silent fallback (the student still sees standard lessons takeaways)
  }

  return (
    <Card className="border border-amber-200/60 bg-gradient-to-br from-amber-50/60 via-violet-50/30 to-transparent rounded-2xl shadow-sm overflow-hidden">
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest leading-none">Leo's AI Coach</h4>
              <span className="text-[10px] font-medium text-slate-500">Personalized for {profile.name || "your venture"}</span>
            </div>
          </div>
          <Badge className="bg-amber-100 text-amber-700 border-0 text-[10px] uppercase font-bold tracking-wider">
            AI Customized
          </Badge>
        </div>

        {/* Intro */}
        <div className="text-xs font-medium text-slate-700 leading-relaxed italic border-l-2 border-amber-300 pl-3">
          {renderTakeaway(data.intro, onCardClick)}
        </div>

        {/* Steps */}
        <div className="space-y-2.5">
          <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Action Plan</h5>
          <div className="grid grid-cols-1 gap-2">
            {data.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-white/70 border border-slate-100 p-3 rounded-xl">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="text-xs text-slate-650 leading-relaxed font-medium flex-1">
                  {renderTakeaway(step, onCardClick)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Worked Example */}
        <div className="border-t border-slate-100/80 pt-3">
          <button
            type="button"
            onClick={() => setExampleOpen(!exampleOpen)}
            className="w-full flex items-center justify-between text-left text-xs font-bold text-amber-800 hover:text-amber-900 transition-colors py-1 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> View Leo's Worked Example
            </span>
            {exampleOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {exampleOpen && (
            <div className="mt-3 bg-white/50 border border-amber-100 rounded-xl p-3.5 text-xs text-slate-600 leading-relaxed font-serif">
              {renderTakeaway(data.example, onCardClick)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

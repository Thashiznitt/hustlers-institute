"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLearnProgress } from "../hooks/useLearnProgress";
import { phasesData } from "../data/phases";
import { Flame, CheckCircle2 } from "lucide-react";

interface DashboardTabProps {
  onResumeLearning: () => void;
}

export default function DashboardTab({ onResumeLearning }: DashboardTabProps) {
  const progress = useLearnProgress();

  return (
    <div className="w-full pb-12 space-y-6 font-sans">
      {/* Header banner */}
      <div className="rounded-none bg-slate-950 text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Candidate Workspace</span>
          <h2 className="text-xl md:text-3xl font-heading text-white tracking-widest uppercase font-bold mt-1">Learning Progress Hub</h2>
          <p className="text-xs text-slate-350 max-w-2xl leading-relaxed mt-2 font-medium">Track your progress through the 5 phases of client acquisition, value packaging, and syndicate growth.</p>
        </div>
        <div className="flex items-center gap-4 shrink-0 bg-slate-900 p-4 rounded-none border border-slate-800 w-full md:w-auto">
          <div className="w-12 h-12 rounded-none border-2 border-slate-700 flex items-center justify-center font-mono text-sm font-bold text-white shrink-0">
            {Math.round(progress.totalProgress)}%
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold tracking-wider">Overall Progress</span>
            <span className="text-xs text-slate-300 mt-0.5 block font-mono">{progress.lessonsDone} / 35 Lessons</span>
          </div>
        </div>
      </div>

      {/* XP + Streak stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-amber-250 bg-amber-50/50 rounded-none shadow-none">
          <CardContent className="p-5 text-center">
            <div className="text-2xl font-black text-amber-800 font-mono">{progress.xpTotal} XP</div>
            <div className="text-[10px] text-amber-700 font-bold uppercase tracking-widest mt-1 font-mono">Total Earned</div>
          </CardContent>
        </Card>
        <Card className="border border-orange-250 bg-orange-50/50 rounded-none shadow-none">
          <CardContent className="p-5 text-center">
            <div className="text-2xl font-black text-orange-800 flex items-center justify-center gap-1.5 font-mono">
              <Flame className="w-5 h-5 text-orange-600 fill-orange-400/20" />
              <span>{progress.streakDays}</span>
            </div>
            <div className="text-[10px] text-orange-700 font-bold uppercase tracking-widest mt-1 font-mono">Day Streak</div>
          </CardContent>
        </Card>
        <Card className="border border-emerald-250 bg-emerald-50/50 rounded-none shadow-none">
          <CardContent className="p-5 text-center">
            <div className="text-2xl font-black text-emerald-800 font-mono">{progress.assessmentsDone} / 5</div>
            <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest mt-1 font-mono">Phases Done</div>
          </CardContent>
        </Card>
      </div>

      {/* Phase progress list */}
      <Card className="border border-slate-200 rounded-none shadow-none">
        <CardContent className="p-6">
          <h3 className="font-heading text-slate-900 text-sm uppercase tracking-widest font-bold mb-4 border-b border-slate-100 pb-3 font-mono">Phase Milestones</h3>
          <div className="space-y-5">
            {phasesData.map((phase, pIdx) => {
              const lessonsDone = phase.lessons.filter(l => progress.completedLessons[l.id]).length;
              const assessed = !!progress.completedAssessments[phase.id];
              const totalForPhase = phase.lessons.length;
              const pct = Math.round((lessonsDone / totalForPhase) * 100);
              return (
                <div key={phase.id} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700 uppercase font-mono">{phase.title.split(":")[0]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {assessed && (
                        <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-250 text-[9px] flex items-center gap-1 font-mono uppercase tracking-widest rounded-none">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Done
                        </Badge>
                      )}
                      <span className="text-xs text-slate-500 font-mono">{lessonsDone} / {totalForPhase}</span>
                    </div>
                  </div>
                  <Progress value={pct} className="h-2 rounded-none bg-slate-100" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resume button */}
      <div className="text-center pt-2">
        <Button onClick={onResumeLearning} className="bg-black hover:bg-[#1a1a1a] text-white font-bold rounded-none uppercase tracking-widest text-xs h-11 px-8 border border-black shadow-none transition-all active:scale-[0.99]">
          Resume Learning →
        </Button>
      </div>
    </div>
  );
}

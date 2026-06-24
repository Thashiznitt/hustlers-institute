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
    <div className="w-full pb-12 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Candidate Workspace</span>
          <h2 className="text-xl md:text-3xl font-heading text-white tracking-widest uppercase font-bold mt-1">Learning Progress Hub</h2>
          <p className="text-xs text-slate-300 font-sans max-w-2xl leading-relaxed mt-2">Track your progress through the 5 phases of client acquisition, value packaging, and syndicate growth.</p>
        </div>
        <div className="flex items-center gap-4 shrink-0 bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="w-12 h-12 rounded-full border-4 border-slate-600 flex items-center justify-center font-mono text-sm font-bold text-white">
            {Math.round(progress.totalProgress)}%
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold tracking-wider">Overall Progress</span>
            <span className="text-xs text-slate-200 mt-0.5 block">{progress.lessonsDone} of 35 Lessons</span>
          </div>
        </div>
      </div>

      {/* XP + Streak stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border border-amber-100 bg-amber-50 rounded-2xl">
          <CardContent className="p-5 text-center">
            <div className="text-2xl font-extrabold text-amber-600">{progress.xpTotal} XP</div>
            <div className="text-xs text-amber-700 font-bold uppercase tracking-wide mt-1">Total Earned</div>
          </CardContent>
        </Card>
        <Card className="border border-orange-100 bg-orange-50 rounded-2xl">
          <CardContent className="p-5 text-center">
            <div className="text-2xl font-extrabold text-orange-600 flex items-center justify-center gap-1.5">
              <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
              <span>{progress.streakDays}</span>
            </div>
            <div className="text-xs text-orange-700 font-bold uppercase tracking-wide mt-1">Day Streak</div>
          </CardContent>
        </Card>
        <Card className="border border-emerald-100 bg-emerald-50 rounded-2xl">
          <CardContent className="p-5 text-center">
            <div className="text-2xl font-extrabold text-emerald-600">{progress.assessmentsDone}/5</div>
            <div className="text-xs text-emerald-700 font-bold uppercase tracking-wide mt-1">Phases Done</div>
          </CardContent>
        </Card>
      </div>

      {/* Phase progress list */}
      <Card className="border border-slate-100 rounded-2xl shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-heading text-slate-900 text-sm uppercase tracking-widest font-bold mb-4 border-b border-slate-100 pb-3">Phase Milestones</h3>
          <div className="space-y-4">
            {phasesData.map((phase, pIdx) => {
              const lessonsDone = phase.lessons.filter(l => progress.completedLessons[l.id]).length;
              const assessed = !!progress.completedAssessments[phase.id];
              const totalForPhase = phase.lessons.length;
              const pct = Math.round((lessonsDone / totalForPhase) * 100);
              return (
                <div key={phase.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700">{phase.title.split(":")[0]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {assessed && (
                        <Badge className="bg-emerald-100 text-emerald-700 border-0 text-[10px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Done
                        </Badge>
                      )}
                      <span className="text-xs text-slate-500 font-mono">{lessonsDone}/{totalForPhase}</span>
                    </div>
                  </div>
                  <Progress value={pct} className="h-2 rounded-full" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resume button */}
      <div className="text-center">
        <Button onClick={onResumeLearning} className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl px-8 py-3">
          Resume Learning →
        </Button>
      </div>
    </div>
  );
}

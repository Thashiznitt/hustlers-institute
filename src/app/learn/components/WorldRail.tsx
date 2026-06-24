"use client";

import { 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  Check, 
  Play, 
  Circle, 
  BarChart3, 
  FlaskConical, 
  Layers, 
  Sparkles, 
  FileText 
} from "lucide-react";
import { phasesData } from "../data/phases";

const phaseIcons = [
  Sparkles, // Phase 1: Discover
  FileText,  // Phase 2: Habits
  FlaskConical, // Phase 3: Build
  Layers, // Phase 4: Money
  CheckCircle2 // Phase 5: Launch
];


interface WorldRailProps {
  activePhaseIndex: number;
  activeLessonIndex: number;
  activeView: string;
  completedAssessments: Record<string, boolean>;
  completedLessons: Record<string, boolean>;
  isLessonLocked: (phaseIdx: number, lessonIdx: number) => boolean;
  onSelectPhase: (phaseIdx: number, lessonIdx: number) => void;
  onSelectSandbox: () => void;
  onSelectVault: () => void;
  onSelectNiche: () => void;
  onSelectTemplates: () => void;
  onSelectDashboard: () => void;
}

export default function WorldRail({
  activePhaseIndex,
  activeLessonIndex,
  activeView,
  completedAssessments,
  completedLessons,
  isLessonLocked,
  onSelectPhase,
  onSelectSandbox,
  onSelectVault,
  onSelectNiche,
  onSelectTemplates,
  onSelectDashboard,
}: WorldRailProps) {
  // Mobile timeline logic
  const activePhase = phasesData[activePhaseIndex] || phasesData[0];

  return (
    <>
      {/* DESKTOP SIDEBAR RAIL */}
      <aside className="w-[240px] shrink-0 hidden md:flex flex-col gap-2 py-6 px-4 border-r border-slate-150/70 bg-white overflow-y-auto h-[calc(100vh-56px)] sticky top-14">
        {/* Journey Header */}
        <div className="px-1.5 mb-4 text-left">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">Syndicate Path</h3>
          <div className="h-[2px] bg-slate-100 mt-1.5 w-6 rounded-full" />
        </div>

        <div className="flex flex-col gap-2.5">
          {phasesData.map((phase, phaseIdx) => {
            const isDone = !!completedAssessments[phase.id];
            const isActive = activeView === "course" && phaseIdx === activePhaseIndex;
            const isFirstLessonLocked = isLessonLocked(phaseIdx, 0);
            const PhaseIcon = phaseIcons[phaseIdx] || Sparkles;

            return (
              <div key={phase.id} className="flex flex-col">
                {/* Phase button (designed as a card) */}
                <button
                  onClick={() => !isFirstLessonLocked && onSelectPhase(phaseIdx, 0)}
                  disabled={isFirstLessonLocked}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left border transition-all duration-300 text-sm font-bold cursor-pointer relative group ${
                    isActive
                      ? "bg-slate-900 text-white border-slate-950 shadow-md shadow-slate-900/10 scale-[1.02]"
                      : isDone
                      ? "bg-emerald-50/40 border-emerald-100/70 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-200"
                      : isFirstLessonLocked
                      ? "bg-slate-50/30 border-slate-100 text-slate-400 cursor-not-allowed opacity-60"
                      : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50/50 hover:border-slate-200 hover:text-slate-900 shadow-sm"
                  }`}
                >
                  {/* Left Active indicator bar */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-amber-400 rounded-r-md animate-pulse" />
                  )}

                  {/* Status Indicator Circle */}
                  <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDone 
                      ? "bg-emerald-100/80 text-emerald-600" 
                      : isFirstLessonLocked 
                      ? "bg-slate-100 text-slate-400" 
                      : isActive 
                      ? "bg-white/10 text-white ring-1 ring-white/20" 
                      : "bg-slate-50 text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-800"
                  } ${isActive && !isDone ? "animate-pulse" : ""}`}>
                    {isDone ? (
                      <Check className="w-4 h-4" />
                    ) : isFirstLessonLocked ? (
                      <Lock className="w-3.5 h-3.5" />
                    ) : (
                      <PhaseIcon className="w-4 h-4" />
                    )}
                  </span>

                  {/* Text details */}
                  <div className="min-w-0 flex-1 pr-1">
                    <div className={`text-[11px] font-extrabold uppercase tracking-wide leading-tight ${isActive ? "text-white" : "text-slate-800"}`}>
                      Phase {phase.num}
                    </div>
                    <div className={`text-[10px] font-medium truncate leading-tight mt-0.5 ${isActive ? "text-slate-300" : "text-slate-450"}`}>
                      {phase.title.split(":")[1]?.trim() || ""}
                    </div>
                  </div>

                  {/* Small right indicator when hover */}
                  {!isFirstLessonLocked && !isActive && (
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all absolute right-2 text-slate-400" />
                  )}
                </button>

                {/* Lesson sub-nodes, show when phase is active */}
                {isActive && (
                  <div className="ml-5 pl-3.5 border-l border-slate-200 flex flex-col gap-1.5 mt-2 mb-2">
                    {phase.lessons.map((lesson, lIdx) => {
                      const lessonDone = !!completedLessons[lesson.id];
                      const lessonLocked = isLessonLocked(phaseIdx, lIdx);
                      const lessonActive = lIdx === activeLessonIndex;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => !lessonLocked && onSelectPhase(phaseIdx, lIdx)}
                          disabled={lessonLocked}
                          className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 text-left w-full cursor-pointer relative group ${
                            lessonActive
                              ? "bg-slate-900 text-white shadow-sm scale-[1.01]"
                              : lessonDone
                              ? "text-emerald-600 hover:bg-emerald-50/50"
                              : lessonLocked
                              ? "text-slate-400 cursor-not-allowed"
                              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/50"
                          }`}
                        >
                          <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                            {lessonDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            ) : lessonLocked ? (
                              <Lock className="w-3 h-3 text-slate-400" />
                            ) : lessonActive ? (
                              <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
                            ) : (
                              <Circle className="w-3 h-3 text-slate-300" />
                            )}
                          </span>
                          <span className="truncate flex-1 font-semibold">{lesson.id} · {lesson.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Workspace Utilities Header */}
        <div className="px-1.5 mt-6 mb-3 text-left">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">Workspace</h3>
          <div className="h-[2px] bg-slate-100 mt-1.5 w-6 rounded-full" />
        </div>

        <div className="flex flex-col gap-1.5">
          {/* Dashboard */}
          <button
            onClick={onSelectDashboard}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-left border transition-all duration-200 cursor-pointer group ${
              activeView === "dashboard"
                ? "bg-slate-900 text-white border-slate-950 shadow-sm"
                : "text-slate-600 bg-white border-transparent hover:bg-slate-50 hover:text-slate-900 hover:border-slate-200/50"
            }`}
          >
            <span className={`w-7 h-7 shrink-0 rounded-lg transition-colors flex items-center justify-center ${activeView === "dashboard" ? "bg-white/10" : "bg-slate-50"}`}>
              <BarChart3 className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] font-extrabold uppercase tracking-wide">Dashboard</div>
              <div className="text-[9px] font-medium opacity-60">Your progress</div>
            </div>
          </button>

          {/* Playground */}
          <button
            onClick={onSelectSandbox}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-left border transition-all duration-200 cursor-pointer group ${
              activeView === "sandbox"
                ? "bg-slate-900 text-white border-slate-950 shadow-sm"
                : "text-slate-600 bg-white border-transparent hover:bg-slate-50 hover:text-slate-900 hover:border-slate-200/50"
            }`}
          >
            <span className={`w-7 h-7 shrink-0 rounded-lg transition-colors flex items-center justify-center ${activeView === "sandbox" ? "bg-white/10" : "bg-slate-50"}`}>
              <FlaskConical className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] font-extrabold uppercase tracking-wide">Playground</div>
              <div className="text-[9px] font-medium opacity-60">5 sandboxes</div>
            </div>
          </button>

          {/* Card Vault */}
          <button
            onClick={onSelectVault}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-left border transition-all duration-200 cursor-pointer group ${
              activeView === "vault"
                ? "bg-slate-900 text-white border-slate-950 shadow-sm"
                : "text-slate-600 bg-white border-transparent hover:bg-slate-50 hover:text-slate-900 hover:border-slate-200/50"
            }`}
          >
            <span className={`w-7 h-7 shrink-0 rounded-lg transition-colors flex items-center justify-center ${activeView === "vault" ? "bg-white/10" : "bg-slate-50"}`}>
              <Layers className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] font-extrabold uppercase tracking-wide">Card Vault</div>
              <div className="text-[9px] font-medium opacity-60">44 design cards</div>
            </div>
          </button>

          {/* Niche Builder */}
          <button
            onClick={onSelectNiche}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-left border transition-all duration-200 cursor-pointer group ${
              activeView === "niche"
                ? "bg-slate-900 text-white border-slate-950 shadow-sm"
                : "text-slate-655 bg-white border-transparent hover:bg-slate-50 hover:text-slate-900 hover:border-slate-200/50"
            }`}
          >
            <span className={`w-7 h-7 shrink-0 rounded-lg transition-colors flex items-center justify-center ${activeView === "niche" ? "bg-white/10" : "bg-slate-50"}`}>
              <Sparkles className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] font-extrabold uppercase tracking-wide">Niche Builder</div>
              <div className="text-[9px] font-medium opacity-60">AI brainstorm</div>
            </div>
          </button>

          {/* Templates */}
          <button
            onClick={onSelectTemplates}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-left border transition-all duration-200 cursor-pointer group ${
              activeView === "templates"
                ? "bg-slate-900 text-white border-slate-950 shadow-sm"
                : "text-slate-655 bg-white border-transparent hover:bg-slate-50 hover:text-slate-900 hover:border-slate-200/50"
            }`}
          >
            <span className={`w-7 h-7 shrink-0 rounded-lg transition-colors flex items-center justify-center ${activeView === "templates" ? "bg-white/10" : "bg-slate-50"}`}>
              <FileText className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] font-extrabold uppercase tracking-wide">Templates</div>
              <div className="text-[9px] font-medium opacity-60">Docs & blueprints</div>
            </div>
          </button>
        </div>
      </aside>

      {/* MOBILE TIMELINE RAIL */}
      <div className="md:hidden w-full bg-white border-b border-slate-100 sticky top-14 z-30 px-3 py-2 flex flex-col gap-2">
        {/* Main View Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "course", label: "Course", action: () => onSelectPhase(activePhaseIndex, activeLessonIndex) },
            { id: "dashboard", label: "Progress", action: onSelectDashboard },
            { id: "sandbox", label: "Playground", action: onSelectSandbox },
            { id: "vault", label: "Vault", action: onSelectVault },
            { id: "niche", label: "✨ Niche", action: onSelectNiche },
            { id: "templates", label: "Blueprints", action: onSelectTemplates }
          ].map((tab) => {
            const isTabActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={tab.action}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border cursor-pointer transition-all ${
                  isTabActive
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-600 border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Phase/Lesson Sub-bar (Only when on course view) */}
        {activeView === "course" && (
          <div className="flex flex-col gap-1.5 pt-1.5 border-t border-slate-50">
            {/* Phase Selector Row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {phasesData.map((phase, phaseIdx) => {
                const isDone = !!completedAssessments[phase.id];
                const isActive = phaseIdx === activePhaseIndex;
                const isFirstLocked = isLessonLocked(phaseIdx, 0);

                return (
                  <button
                    key={phase.id}
                    onClick={() => !isFirstLocked && onSelectPhase(phaseIdx, 0)}
                    disabled={isFirstLocked}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0 cursor-pointer border ${
                      isActive
                        ? "bg-slate-800 text-white border-slate-800"
                        : isDone
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : isFirstLocked
                        ? "text-slate-355 bg-slate-50 border-slate-100 cursor-not-allowed"
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      {isDone ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : isFirstLocked ? (
                        <Lock className="w-2.5 h-2.5 text-slate-400" />
                      ) : (
                        (() => {
                          const IconComp = phaseIcons[phaseIdx];
                          return <IconComp className="w-3 h-3" />;
                        })()
                      )}
                    </span>
                    <span>P{phase.num}</span>
                  </button>
                );
              })}
            </div>

            {/* Lesson Selector Row */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1.5 scrollbar-none border-t border-slate-50">
              <span className="text-[9px] uppercase font-mono font-bold text-slate-400 shrink-0 mr-1">Lessons:</span>
              {activePhase.lessons.map((lesson, lIdx) => {
                const lessonDone = !!completedLessons[lesson.id];
                const lessonLocked = isLessonLocked(activePhaseIndex, lIdx);
                const lessonActive = lIdx === activeLessonIndex;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => !lessonLocked && onSelectPhase(activePhaseIndex, lIdx)}
                    disabled={lessonLocked}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 cursor-pointer border ${
                      lessonActive
                        ? "bg-slate-900 text-white border-slate-900"
                        : lessonDone
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : lessonLocked
                        ? "bg-slate-100 text-slate-350 border-slate-200 cursor-not-allowed"
                        : "bg-white text-slate-600 border-slate-200"
                    }`}
                    title={lesson.title}
                  >
                    {lessonLocked ? <Lock className="w-2 h-2 text-slate-400" /> : lesson.id.split(".")[1]}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

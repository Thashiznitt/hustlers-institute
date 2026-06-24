import React, { useState, useEffect } from "react";
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
import { cardsList } from "@/components/DesignCardsExplorer";

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
  isMobileDrawer?: boolean;
  onLinkClick?: () => void;
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
  isMobileDrawer = false,
  onLinkClick,
}: WorldRailProps) {
  const [firstName, setFirstName] = useState<string>("Builder");

  useEffect(() => {
    const loadName = () => {
      const stored = localStorage.getItem("hi_user_firstname");
      setFirstName(stored || "Builder");
    };
    loadName();
    window.addEventListener("storage", loadName);
    return () => window.removeEventListener("storage", loadName);
  }, []);

  const sidebarContent = (
    <>
      {/* Journey Header */}
      <div className="px-1.5 mb-4 text-left flex items-center justify-between">
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-450 font-mono">Syndicate Path</h3>
          <div className="h-[2px] bg-slate-200 mt-1.5 w-6 rounded-none" />
        </div>
        <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest">
          Hi, {firstName}!
        </span>
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
                onClick={() => {
                  if (!isFirstLessonLocked) {
                    onSelectPhase(phaseIdx, 0);
                    onLinkClick?.();
                  }
                }}
                disabled={isFirstLessonLocked}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-none text-left border transition-all duration-300 text-sm font-bold cursor-pointer relative group ${
                  isActive
                    ? "bg-slate-950 text-white border-slate-950 shadow-none"
                    : isDone
                    ? "bg-emerald-50/40 border-emerald-250 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-350"
                    : isFirstLessonLocked
                    ? "bg-slate-50/30 border-slate-100 text-slate-400 cursor-not-allowed opacity-60"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50/50 hover:border-slate-355 hover:text-slate-905"
                }`}
              >
                {/* Left Active indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 rounded-none animate-pulse" />
                )}

                {/* Status Indicator Circle */}
                <span className={`w-8 h-8 shrink-0 rounded-none flex items-center justify-center transition-all duration-300 ${
                  isDone 
                    ? "bg-emerald-100/80 text-emerald-650" 
                    : isFirstLessonLocked 
                    ? "bg-slate-105 text-slate-400" 
                    : isActive 
                    ? "bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/20" 
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
                  <div className={`text-[11px] font-bold font-mono uppercase tracking-widest leading-tight ${isActive ? "text-white" : "text-slate-800"}`}>
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
                <div className="ml-5 pl-3.5 border-l border-slate-205 flex flex-col gap-1.5 mt-2 mb-2">
                  {phase.lessons.map((lesson, lIdx) => {
                    const lessonDone = !!completedLessons[lesson.id];
                    const lessonLocked = isLessonLocked(phaseIdx, lIdx);
                    const lessonActive = lIdx === activeLessonIndex;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          if (!lessonLocked) {
                            onSelectPhase(phaseIdx, lIdx);
                            onLinkClick?.();
                          }
                        }}
                        disabled={lessonLocked}
                        className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-none text-xs font-bold transition-all duration-200 text-left w-full cursor-pointer relative group ${
                          lessonActive
                            ? "bg-slate-950 text-white shadow-none scale-[1.01]"
                            : lessonDone
                            ? "text-emerald-800 hover:bg-emerald-50/50"
                            : lessonLocked
                            ? "text-slate-400 cursor-not-allowed"
                            : "text-slate-500 hover:text-slate-905 hover:bg-slate-50/50"
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
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-450 font-mono">Workspace</h3>
        <div className="h-[2px] bg-slate-200 mt-1.5 w-6 rounded-none" />
      </div>

      <div className="flex flex-col gap-1.5">
        {/* Dashboard */}
        <button
          onClick={() => {
            onSelectDashboard();
            onLinkClick?.();
          }}
          className={`flex items-center gap-3 px-3 py-2 rounded-none text-sm font-bold text-left border transition-all duration-200 cursor-pointer group ${
            activeView === "dashboard"
              ? "bg-slate-950 text-white border-slate-950 shadow-none"
              : "text-slate-655 bg-white border-transparent hover:bg-slate-50 hover:text-slate-905 hover:border-slate-205/50"
          }`}
        >
          <span className={`w-7 h-7 shrink-0 rounded-none transition-colors flex items-center justify-center ${activeView === "dashboard" ? "bg-white/10" : "bg-slate-50"}`}>
            <BarChart3 className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-bold font-mono uppercase tracking-widest">Dashboard</div>
            <div className="text-[9px] font-medium opacity-60">Your progress</div>
          </div>
        </button>

        {/* Playground */}
        <button
          onClick={() => {
            onSelectSandbox();
            onLinkClick?.();
          }}
          className={`flex items-center gap-3 px-3 py-2 rounded-none text-sm font-bold text-left border transition-all duration-200 cursor-pointer group ${
            activeView === "sandbox"
              ? "bg-slate-950 text-white border-slate-950 shadow-none"
              : "text-slate-655 bg-white border-transparent hover:bg-slate-50 hover:text-slate-905 hover:border-slate-205/50"
          }`}
        >
          <span className={`w-7 h-7 shrink-0 rounded-none transition-colors flex items-center justify-center ${activeView === "sandbox" ? "bg-white/10" : "bg-slate-50"}`}>
            <FlaskConical className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-bold font-mono uppercase tracking-widest">Playground</div>
            <div className="text-[9px] font-medium opacity-60">5 sandboxes</div>
          </div>
        </button>

        {/* Card Vault */}
        <button
          onClick={() => {
            onSelectVault();
            onLinkClick?.();
          }}
          className={`flex items-center gap-3 px-3 py-2 rounded-none text-sm font-bold text-left border transition-all duration-200 cursor-pointer group ${
            activeView === "vault"
              ? "bg-slate-950 text-white border-slate-950 shadow-none"
              : "text-slate-655 bg-white border-transparent hover:bg-slate-50 hover:text-slate-905 hover:border-slate-205/50"
          }`}
        >
          <span className={`w-7 h-7 shrink-0 rounded-none transition-colors flex items-center justify-center ${activeView === "vault" ? "bg-white/10" : "bg-slate-50"}`}>
            <Layers className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-bold font-mono uppercase tracking-widest">Card Vault</div>
            <div className="text-[9px] font-medium opacity-60">{cardsList.length} design cards</div>
          </div>
        </button>

        {/* Niche Builder */}
        <button
          onClick={() => {
            onSelectNiche();
            onLinkClick?.();
          }}
          className={`flex items-center gap-3 px-3 py-2 rounded-none text-sm font-bold text-left border transition-all duration-200 cursor-pointer group ${
            activeView === "niche"
              ? "bg-slate-950 text-white border-slate-950 shadow-none"
              : "text-slate-655 bg-white border-transparent hover:bg-slate-50 hover:text-slate-905 hover:border-slate-205/50"
          }`}
        >
          <span className={`w-7 h-7 shrink-0 rounded-none transition-colors flex items-center justify-center ${activeView === "niche" ? "bg-white/10" : "bg-slate-50"}`}>
            <Sparkles className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-bold font-mono uppercase tracking-widest">Niche Builder</div>
            <div className="text-[9px] font-medium opacity-60">LEO brainstorm</div>
          </div>
        </button>

        {/* Templates */}
        <button
          onClick={() => {
            onSelectTemplates();
            onLinkClick?.();
          }}
          className={`flex items-center gap-3 px-3 py-2 rounded-none text-sm font-bold text-left border transition-all duration-200 cursor-pointer group ${
            activeView === "templates"
              ? "bg-slate-950 text-white border-slate-950 shadow-none"
              : "text-slate-655 bg-white border-transparent hover:bg-slate-50 hover:text-slate-905 hover:border-slate-205/50"
          }`}
        >
          <span className={`w-7 h-7 shrink-0 rounded-none transition-colors flex items-center justify-center ${activeView === "templates" ? "bg-white/10" : "bg-slate-50"}`}>
            <FileText className="w-4 h-4 text-slate-700 group-hover:scale-110 transition-transform" />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-bold font-mono uppercase tracking-widest">Templates</div>
            <div className="text-[9px] font-medium opacity-60">Docs & blueprints</div>
          </div>
        </button>
      </div>
    </>
  );

  if (isMobileDrawer) {
    return (
      <div className="w-full flex flex-col gap-2 py-6 px-4 bg-white overflow-y-auto h-full text-left">
        {sidebarContent}
      </div>
    );
  }

  return (
    <aside className="w-[240px] shrink-0 hidden md:flex flex-col gap-2 py-6 px-4 border-r border-slate-200 bg-white overflow-y-auto h-[calc(100vh-56px)] sticky top-14">
      {sidebarContent}
    </aside>
  );
}

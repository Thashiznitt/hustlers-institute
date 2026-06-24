"use client";

import { Progress } from "@/components/ui/progress";
import { Zap, Flame, BookOpen, LayoutGrid } from "lucide-react";
import Link from "next/link";

interface XPHeaderProps {
  xpTotal: number;
  streakDays: number;
  totalProgress: number;
  onOpenCardVault: () => void;
  activeView: string;
}

export default function XPHeader({ xpTotal, streakDays, totalProgress, onOpenCardVault, activeView }: XPHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="flex items-center gap-3 px-4 md:px-8 h-14">
        {/* Brand */}
        <Link href="/" className="font-heading font-extrabold text-slate-900 text-sm tracking-widest uppercase shrink-0 hidden sm:block">
          Sovereign
        </Link>

        <div className="flex-1 flex items-center gap-2 min-w-0">
          {/* Progress bar */}
          <div className="flex-1 max-w-xs hidden sm:block">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-mono uppercase tracking-widest">
              <span>Course Progress</span>
              <span>{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-1.5 bg-slate-100 [&>div]:bg-slate-950 rounded-none" />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-[#eae3d7] text-[#5c5346] px-3.5 py-1.5 rounded-none text-xs font-mono uppercase tracking-widest font-bold">
            <Flame className={`w-3.5 h-3.5 ${streakDays > 1 ? "animate-bounce" : ""}`} />
            <span>{streakDays} day{streakDays !== 1 ? "s" : ""}</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5 bg-slate-950 text-white px-3.5 py-1.5 rounded-none text-xs font-mono uppercase tracking-widest font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{xpTotal} XP</span>
          </div>

          {/* Card Vault toggle */}
          <button
            onClick={onOpenCardVault}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-heading uppercase tracking-widest font-bold border transition-all rounded-none cursor-pointer ${
              activeView === "vault"
                ? "bg-slate-950 text-white border-slate-950"
                : "bg-white text-slate-900 border-slate-950 hover:bg-[#faf9f6]"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Card Vault</span>
          </button>
        </div>
      </div>
    </header>
  );
}

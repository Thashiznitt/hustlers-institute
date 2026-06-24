"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Menu, Zap, Flame } from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import BrandName from "@/components/BrandName";
import { cn } from "@/lib/utils";

const getProgressColorClass = (progress: number) => {
  if (progress < 25) return "[&>div]:bg-red-500";
  if (progress < 50) return "[&>div]:bg-amber-500";
  if (progress < 75) return "[&>div]:bg-yellow-400";
  return "[&>div]:bg-emerald-500";
};

interface HeaderProps {
  onResetProgress?: () => void;
  onResetSentinel?: () => void;
  xpTotal?: number;
  streakDays?: number;
  totalProgress?: number;
  onOpenCardVault?: () => void;
  activeView?: string;
  onMenuToggle?: () => void;
  onOpenHelpTour?: () => void;
}

export default function Header({ 
  onResetProgress, 
  onResetSentinel,
  xpTotal,
  streakDays,
  totalProgress,
  onOpenCardVault,
  activeView,
  onMenuToggle,
  onOpenHelpTour,
}: HeaderProps) {
  const pathname = usePathname();
  const isLearn = pathname ? pathname.startsWith("/learn") : false;
  const isDashboard = pathname === "/dashboard";
  const isHome = !isLearn && !isDashboard;

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

  return (
    <header className="border-b border-neutral-900 bg-black/95 backdrop-blur-md sticky top-0 z-50">
      <div className={`w-full py-5 flex items-center justify-between ${
        isLearn 
          ? "pl-[22px] pr-[32px]" 
          : "px-6 md:px-16 lg:px-24"
      }`}>
        
        {/* Logo and title */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img src="/icon.png" alt="Sovereign Millionaires Logo" className="w-8 h-8 object-contain" />
            <div className="flex flex-col">
              <BrandName className="text-white tracking-widest text-sm md:text-base uppercase font-bold" showIcon={false} />
              {isDashboard && (
                <span className="text-xs uppercase font-mono text-slate-500 font-semibold tracking-wider -mt-0.5">
                  Business Health Dashboard
                </span>
              )}
            </div>
          </Link>
          {/* Learning Portal title removed */}
        </div>

        {/* Navigation / Actions */}
        {isHome && (
          <>
            <nav className="hidden md:flex items-center gap-8 text-sm uppercase font-heading tracking-widest text-slate-450 font-bold">
              <a href="/#narrative" className="text-slate-400 hover:text-white transition-colors">Narrative</a>
              <a href="/#curriculum" className="text-slate-400 hover:text-white transition-colors">Blueprints</a>
              <a href="/#toolkit" className="text-slate-400 hover:text-white transition-colors">Toolkit</a>
              <a href="/#calculator" className="text-slate-400 hover:text-white transition-colors">Leverage</a>
              <a href="/#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</a>
              <Link href="/login" className="text-white hover:text-slate-200 font-black transition-colors flex items-center gap-1">
                Enter Foundry <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </nav>
            <div>
              <Link 
                href="/login" 
                className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-heading text-xs uppercase tracking-widest py-2.5 px-5 rounded-none flex items-center gap-1 transition-all font-bold"
              >
                Enter Foundry <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </>
        )}

        {isLearn && (
          <div className="flex items-center gap-3 flex-1 justify-end md:flex-initial">
            {/* Desktop progress bar */}
            {totalProgress !== undefined && (
              <div className="flex-1 max-w-xs hidden xl:block mr-4 text-left">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-mono uppercase tracking-widest">
                  <span>Course Progress</span>
                  <span>{totalProgress}%</span>
                </div>
                <Progress value={totalProgress} className={cn("h-1.5 bg-slate-800 rounded-none border border-slate-700", getProgressColorClass(totalProgress || 0))} />
              </div>
            )}

            {isLearn && onOpenHelpTour && (
              <button 
                onClick={onOpenHelpTour}
                className="bg-transparent border border-slate-700 hover:border-white text-slate-400 hover:text-white text-xs font-mono font-bold w-7 h-7 flex items-center justify-center rounded-none cursor-pointer transition-all shrink-0 mr-2"
                title="Replay Onboarding Tour"
              >
                ?
              </button>
            )}

            {/* Desktop Metrics */}
            <div className="hidden md:flex items-center gap-2">
              <span className="hidden lg:inline text-[10px] text-slate-400 font-mono uppercase tracking-widest font-black mr-2">
                Hi, {firstName}!
              </span>
              {streakDays !== undefined && (
                <div className="flex items-center gap-1.5 bg-[#eae3d7] text-[#5c5346] px-3.5 py-1.5 rounded-none text-xs font-mono uppercase tracking-widest font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{streakDays} day{streakDays !== 1 ? "s" : ""}</span>
                </div>
              )}

              {xpTotal !== undefined && (
                <div className="flex items-center gap-1.5 bg-white text-black px-3.5 py-1.5 rounded-none text-xs font-mono uppercase tracking-widest font-bold">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{xpTotal} XP</span>
                </div>
              )}

              <a 
                href="/api/auth/logout" 
                onClick={() => {
                  localStorage.removeItem("hi_user_firstname");
                }}
                className="text-xs uppercase font-heading tracking-widest text-red-500 hover:text-red-400 transition-colors font-bold ml-2"
              >
                Logout
              </a>
            </div>

            {/* Mobile Hamburger Menu Button */}
            {onMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="md:hidden flex items-center justify-center p-2 text-white border border-neutral-800 hover:bg-white/10 transition-colors rounded-none cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
        )}

        {isDashboard && (
          <div className="flex items-center gap-4">
            <Link 
              href="/learn" 
              className="text-xs uppercase font-heading tracking-widest text-slate-400 hover:text-white transition-colors font-bold flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" /> Return to Course
            </Link>
            {onResetSentinel && (
              <button 
                onClick={onResetSentinel}
                className="text-xs uppercase font-heading tracking-widest text-red-400 hover:text-red-300 transition-colors font-bold border border-red-950/80 py-1.5 px-3 hover:bg-red-950/30"
              >
                Reset Sentinel
              </button>
            )}
          </div>
        )}

      </div>
    </header>
  );
}

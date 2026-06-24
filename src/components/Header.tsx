"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Menu, Zap, Flame, LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";

interface HeaderProps {
  onResetProgress?: () => void;
  onResetSentinel?: () => void;
  xpTotal?: number;
  streakDays?: number;
  totalProgress?: number;
  onOpenCardVault?: () => void;
  activeView?: string;
  onMenuToggle?: () => void;
}

export default function Header({ 
  onResetProgress, 
  onResetSentinel,
  xpTotal,
  streakDays,
  totalProgress,
  onOpenCardVault,
  activeView,
  onMenuToggle
}: HeaderProps) {
  const pathname = usePathname();
  const isLearn = pathname ? pathname.startsWith("/learn") : false;
  const isDashboard = pathname === "/dashboard";
  const isHome = !isLearn && !isDashboard;

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
            <img src="/smlogo.png" alt="Sovereign Millionaires Logo" className="w-8 h-8 object-contain" />
            <div className="flex flex-col">
              <span className="font-heading text-white tracking-widest text-sm md:text-base uppercase font-bold">
                Sovereign Millionaires
              </span>
              {isDashboard && (
                <span className="text-xs uppercase font-mono text-slate-500 font-semibold tracking-wider -mt-0.5">
                  Business Health Dashboard
                </span>
              )}
            </div>
          </Link>
          {isLearn && (
            <>
              <span className="text-neutral-700 font-sans font-medium text-sm">/</span>
              <span className="text-slate-350 font-sans font-bold text-sm tracking-wider uppercase">Learning Portal</span>
            </>
          )}
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
              <Link href="/learn" className="text-white hover:text-slate-200 font-black transition-colors flex items-center gap-1">
                Enter Foundry <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                Master Hub <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </nav>
            <div>
              <Link 
                href="/learn" 
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
                <Progress value={totalProgress} className="h-1.5 bg-slate-800 [&>div]:bg-white rounded-none border border-slate-700" />
              </div>
            )}

            {/* Desktop Metrics */}
            <div className="hidden md:flex items-center gap-2">
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

              {onOpenCardVault && activeView && (
                <button
                  onClick={onOpenCardVault}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-heading uppercase tracking-widest font-bold border transition-all rounded-none cursor-pointer ${
                    activeView === "vault"
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-white hover:bg-white/10"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Card Vault</span>
                </button>
              )}

              <Link 
                href="/" 
                className="text-xs uppercase font-heading tracking-widest text-slate-455 hover:text-white transition-colors font-bold ml-2"
              >
                Landing
              </Link>
              <Link 
                href="/dashboard" 
                className="text-xs uppercase font-heading tracking-widest text-slate-455 hover:text-white transition-colors font-bold flex items-center gap-0.5"
              >
                Master Hub <ArrowUpRight className="w-3 h-3" />
              </Link>
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

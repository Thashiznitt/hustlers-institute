"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onResetProgress?: () => void;
  onResetSentinel?: () => void;
}

export default function Header({ onResetProgress, onResetSentinel }: HeaderProps) {
  const pathname = usePathname();
  const isLearn = pathname === "/learn";
  const isDashboard = pathname === "/dashboard";
  const isHome = !isLearn && !isDashboard;

  return (
    <header className="border-b border-neutral-900 bg-black/95 backdrop-blur-md sticky top-0 z-50">
      <div className="w-full px-6 md:px-16 lg:px-24 py-5 flex items-center justify-between">
        
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
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-xs uppercase font-heading tracking-widest text-slate-400 hover:text-white transition-colors font-bold"
            >
              Back to Landing
            </Link>
            <Link 
              href="/dashboard" 
              className="text-xs uppercase font-heading tracking-widest text-slate-400 hover:text-white transition-colors font-bold flex items-center gap-0.5"
            >
              Dashboard <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            {onResetProgress && (
              <button 
                onClick={onResetProgress}
                className="text-xs uppercase font-heading tracking-widest text-red-400 hover:text-red-300 transition-colors font-bold border border-red-950/80 py-1.5 px-3 hover:bg-red-950/30"
              >
                Reset Progress
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

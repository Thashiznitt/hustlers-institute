"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Zap, Sparkles, BookOpen, Trophy, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

interface WelcomeWalkthroughModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WelcomeWalkthroughModal({ open, onClose }: WelcomeWalkthroughModalProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (open) {
      setStep(0);
    }
  }, [open]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      localStorage.setItem("hi_welcome_walkthrough_seen", "true");
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const stepsContent = [
    // Step 1: Intro
    {
      title: "Welcome to the Foundry",
      badge: "THE ROAD TO SOVEREIGN FREEDOM",
      content: (
        <div className="space-y-4">
          <div className="w-14 h-14 bg-[#faf9f6] border border-slate-200 text-black flex items-center justify-center rounded-none mx-auto">
            <Sparkles className="w-6 h-6 text-amber-500 fill-amber-300" />
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-sans font-medium text-center">
            Welcome, candidate. The Foundry is your training center to bypass the corporate matrix and forge your own product stack.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed font-sans text-center">
            You will utilize our **44 methodology cards** to chats with customers, synthesize findings, outline simple tech stacks, price services, and run operations.
          </p>
        </div>
      )
    },
    // Step 2: The 5 Phases
    {
      title: "The 5-Phase Road Map",
      badge: "METHODICAL PROGRESSION",
      content: (
        <div className="space-y-3">
          <p className="text-xs text-slate-500 font-sans leading-relaxed text-center mb-1">
            Your road map to becoming a sovereign millionaire is divided into 5 focused developmental phases:
          </p>
          <div className="space-y-2 text-left font-sans text-xs">
            {[
              { num: "1", title: "Research & Brand Setup", desc: "Isolate a highly profitable service vertical." },
              { num: "2", title: "Needs & Habits", desc: "Map power users, routines, and stated vs actual gaps." },
              { num: "3", title: "Simple App Setup", desc: "Select no-code/code stacks and build visual mocks." },
              { num: "4", title: "Pricing & Monetization", desc: "Set high-value tiers and project unit economics." },
              { num: "5", title: "Syndicate Growth", desc: "Deploy WhatsApp referrals and user feedback loops." }
            ].map((p) => (
              <div key={p.num} className="flex gap-3 bg-[#faf9f6] border border-slate-100 p-2.5 rounded-none items-center">
                <span className="w-6 h-6 bg-black text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                  0{p.num}
                </span>
                <div>
                  <h4 className="font-bold text-slate-905">{p.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Step 3: Workstation Layout
    {
      title: "Interactive Workstation",
      badge: "WORKSPACE BLUEPRINTS",
      content: (
        <div className="space-y-4">
          <div className="w-14 h-14 bg-[#faf9f6] border border-slate-200 text-black flex items-center justify-center rounded-none mx-auto">
            <BookOpen className="w-6 h-6 text-slate-800" />
          </div>
          <p className="text-xs text-slate-650 leading-relaxed font-sans text-center">
            Your workspace is optimized into three major components:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left font-sans text-xs">
            <div className="border border-slate-200 p-3 bg-[#faf9f6]">
              <h5 className="font-bold text-slate-905 uppercase tracking-wide text-[10px] mb-1">1. Lesson Canvas</h5>
              <p className="text-slate-500 text-[10px] leading-relaxed">Read guides, fill in interactive exercise canvases, and mark them complete to earn XP.</p>
            </div>
            <div className="border border-slate-200 p-3 bg-[#faf9f6]">
              <h5 className="font-bold text-slate-905 uppercase tracking-wide text-[10px] mb-1">2. Guide Cards Tray</h5>
              <p className="text-slate-500 text-[10px] leading-relaxed">Flip any of the 44 methodology cards to copy guidelines and save observations.</p>
            </div>
            <div className="border border-slate-200 p-3 bg-[#faf9f6]">
              <h5 className="font-bold text-slate-905 uppercase tracking-wide text-[10px] mb-1">3. Sandbox & Templates</h5>
              <p className="text-slate-500 text-[10px] leading-relaxed">Access visual builders, pitch timers, calendars, and screen simulators.</p>
            </div>
            <div className="border border-slate-200 p-3 bg-[#faf9f6]">
              <h5 className="font-bold text-slate-905 uppercase tracking-wide text-[10px] mb-1">4. HCD Summary Notes</h5>
              <p className="text-slate-500 text-[10px] leading-relaxed">Log observations directly under each card to compile in your final PDF export.</p>
            </div>
          </div>
        </div>
      )
    },
    // Step 4: Master Hub
    {
      title: "Graduation & Master Hub",
      badge: "THE ULTIMATE DESTINATION",
      content: (
        <div className="space-y-4">
          <div className="w-14 h-14 bg-[#faf9f6] border border-slate-200 text-black flex items-center justify-center rounded-none mx-auto">
            <Trophy className="w-6 h-6 text-amber-500 animate-bounce" />
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-sans font-medium text-center">
            Your Ultimate Goal: Unlocking the Master Hub (Millionaire Hub)
          </p>
          <p className="text-xs text-slate-500 leading-relaxed font-sans text-center">
            Lessons 1.1 through 1.3 are free trials. Completing the full course curriculum unlocks access to the active **Master Hub** where you will track live cash flows, calibrate business health parameters, and sync data feeds with your boardroom AI Coach, LEO.
          </p>
        </div>
      )
    }
  ];

  const current = stepsContent[step];

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { localStorage.setItem("hi_welcome_walkthrough_seen", "true"); onClose(); } }}>
      <DialogContent className="max-w-lg border border-slate-200 shadow-sm rounded-none p-0 overflow-hidden bg-white text-slate-800 font-sans">
        
        {/* Status Bar */}
        <div className="w-full bg-[#eae3d7] text-[#5c5346] py-2 px-6 text-center text-[10px] tracking-widest uppercase font-mono font-bold border-b border-slate-200">
          <span>Candidate Onboarding</span>
          <span className="text-[#c7baa4] mx-3">•</span>
          <span>{current.badge}</span>
        </div>

        {/* Content Box */}
        <div className="p-8 space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono block">
              Step {step + 1} of 4
            </span>
            <h3 className="text-xl font-heading text-slate-905 uppercase tracking-widest font-black">
              {current.title}
            </h3>
          </div>

          <div className="min-h-[220px] flex flex-col justify-center py-2">
            {current.content}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 py-1">
            {[0, 1, 2, 3].map((idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === step ? "bg-black w-4" : "bg-slate-200"
                }`}
              />
            ))}
          </div>

          {/* Actions Button */}
          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="bg-transparent border border-black text-black hover:bg-slate-50 font-heading text-[10px] uppercase tracking-widest font-bold py-3.5 px-6 rounded-none flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-black hover:bg-slate-900 text-white font-heading text-[10px] uppercase tracking-widest font-bold py-3.5 px-6 rounded-none flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {step < 3 ? (
                <>
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </>
              ) : (
                "Begin Your Journey &rarr;"
              )}
            </button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}

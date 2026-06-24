"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CardData, cardsList } from "@/components/DesignCardsExplorer";
import DesignCard from "@/components/DesignCard";
import DesignCardsExplorer from "@/components/DesignCardsExplorer";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BrutalistDialog } from "./components/BrutalistDialog";
import { Sparkles, LayoutGrid } from "lucide-react";

import { phasesData } from "./data/phases";
import { useLearnProgress } from "./hooks/useLearnProgress";

import Header from "@/components/Header";
import WorldRail from "./components/WorldRail";
import LessonPanel from "./components/LessonPanel";
import CardTray from "./components/CardTray";
import CelebrationOverlay from "./components/CelebrationOverlay";

import SandboxTab from "./components/SandboxTab";
import NicheBuilderTab from "./components/NicheBuilderTab";
import TemplatesTab from "./components/TemplatesTab";
import DashboardTab from "./components/DashboardTab";
import WelcomeWalkthroughModal from "./components/WelcomeWalkthroughModal";
import PaywallCallout from "./components/PaywallCallout";

function LearnPageContent() {
  const progress = useLearnProgress();
  const [authLoading, setAuthLoading] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showUnlockSuccess, setShowUnlockSuccess] = useState(false);

  // Active view
  const [activeView, setActiveView] = useState<"course" | "sandbox" | "vault" | "niche" | "templates" | "dashboard">("course");

  const searchParams = useSearchParams();
  const tabParam = searchParams ? searchParams.get("tab") : null;

  // Session verification on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`/api/auth/session?t=${Date.now()}`, { cache: "no-store" });
        const data = await res.json();
        if (!data.authenticated) {
          window.location.href = "/login";
          return;
        }
        if (!data.user.isOnboarded) {
          window.location.href = "/onboarding";
          return;
        }

        setUserProfile(data.user);

        // Auto show welcome walkthrough modal if never seen
        const hasSeenWalkthrough = localStorage.getItem("hi_welcome_walkthrough_seen");
        if (!hasSeenWalkthrough) {
          setShowWelcomeModal(true);
        }

        const unlockedVal = localStorage.getItem("hi_sovereign_pro_unlocked");
        if (unlockedVal === "true") {
          setIsUnlocked(true);
        }

        setAuthLoading(false);
      } catch (e) {
        console.error("Auth verify failed", e);
        window.location.href = "/login";
      }
    }
    checkAuth();
  }, []);

  // Deep-linking: check query parameter reactively
  useEffect(() => {
    if (tabParam && ["course", "sandbox", "vault", "niche", "templates", "dashboard"].includes(tabParam)) {
      setActiveView(tabParam as any);
    }
  }, [tabParam]);

  // Card reference modal
  const [selectedReferenceCard, setSelectedReferenceCard] = useState<CardData | null>(null);
  const [showCardReferenceModal, setShowCardReferenceModal] = useState(false);

  // Celebration overlay
  const [celebration, setCelebration] = useState<{ type: "lesson" | "phase" | "course"; xp: number; title: string } | null>(null);

  // Celebration overlay close
  const handleCelebrationClose = () => {
    setCelebration(null);
    handleNext();
  };

  // Mobile card drawer state
  const [showMobileCardTray, setShowMobileCardTray] = useState(false);

  // Mobile navigation drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation
  const activePhase = phasesData[progress.activePhaseIndex] || phasesData[0];
  const activeLesson = activePhase.lessons[progress.activeLessonIndex] || null;

  const handleNext = () => {
    const { activePhaseIndex, activeLessonIndex } = progress;
    if (activeLessonIndex < 6) {
      progress.navigateTo(activePhaseIndex, activeLessonIndex + 1);
    } else if (activePhaseIndex < phasesData.length - 1) {
      progress.navigateTo(activePhaseIndex + 1, 0);
    }
  };

  const handlePrev = () => {
    const { activePhaseIndex, activeLessonIndex } = progress;
    if (activeLessonIndex > 0) {
      progress.navigateTo(activePhaseIndex, activeLessonIndex - 1);
    } else if (activePhaseIndex > 0) {
      progress.navigateTo(activePhaseIndex - 1, 6);
    }
  };

  const handleLessonComplete = () => {
    if (!activeLesson) return;
    const xp = progress.markLessonComplete(activeLesson.id);
    const isLastLesson = progress.activeLessonIndex === 6;
    const isLastPhase = progress.activePhaseIndex === phasesData.length - 1;

    if (isLastLesson) {
      const phaseXp = progress.submitAssessment(activePhase.id);
      const totalXp = (xp || 0) + phaseXp;
      if (isLastPhase) {
        setCelebration({ type: "course", xp: totalXp || 500, title: "Curriculum Complete" });
      } else {
        setCelebration({ type: "phase", xp: totalXp || 100, title: activePhase.title.split(":")[1]?.trim() || activePhase.title });
      }
    } else if (xp > 0) {
      setCelebration({ type: "lesson", xp, title: activeLesson.title });
    } else {
      handleNext();
    }
  };

  // Paywall check: Free trial is limited to Phase 1 (index 0) lessons 1.1-1.3 (indices 0, 1, 2)
  const isLessonLockedByPaywall = !isUnlocked && (progress.activePhaseIndex > 0 || progress.activeLessonIndex > 2);

  if (authLoading || !progress.hydrated) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center font-mono text-xs text-slate-500">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-none border-4 border-slate-200 border-t-slate-900 animate-spin" />
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Loading course progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-50 text-slate-800 flex flex-col">
      {/* HEADER */}
      <Header
        xpTotal={progress.xpTotal}
        streakDays={progress.streakDays}
        totalProgress={progress.totalProgress}
        onOpenCardVault={() => setActiveView("vault")}
        activeView={activeView}
        onMenuToggle={() => setIsMobileMenuOpen(true)}
        onOpenHelpTour={() => setShowWelcomeModal(true)}
      />

      {/* 3-COLUMN RESPONSIVE LAYOUT */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {/* LEFT WORLD RAIL */}
        <WorldRail
          activePhaseIndex={progress.activePhaseIndex}
          activeLessonIndex={progress.activeLessonIndex}
          activeView={activeView}
          completedAssessments={progress.completedAssessments}
          completedLessons={progress.completedLessons}
          isLessonLocked={progress.isLessonLocked}
          onSelectPhase={(phaseIdx, lessonIdx) => {
            progress.navigateTo(phaseIdx, lessonIdx);
            setActiveView("course");
          }}
          onSelectSandbox={() => setActiveView("sandbox")}
          onSelectVault={() => setActiveView("vault")}
          onSelectNiche={() => setActiveView("niche")}
          onSelectTemplates={() => setActiveView("templates")}
          onSelectDashboard={() => setActiveView("dashboard")}
        />

        {/* CENTER CONTENT */}
        <main className="flex-1 min-w-0 overflow-y-auto px-4 md:px-8 py-6 md:py-8">
          {/* COURSE VIEW */}
          {activeView === "course" && activeLesson && (
            isLessonLockedByPaywall ? (
              <div className="w-full pb-12 pt-6">
                <PaywallCallout onUnlock={() => {
                  localStorage.setItem("hi_sovereign_pro_unlocked", "true");
                  setIsUnlocked(true);
                  setShowUnlockSuccess(true);
                }} />
              </div>
            ) : (
              <LessonPanel
                phase={activePhase}
                lesson={activeLesson}
                phaseIdx={progress.activePhaseIndex}
                lessonIdx={progress.activeLessonIndex}
                isCompleted={!!progress.completedLessons[activeLesson.id]}
                onComplete={handleLessonComplete}
                onNext={handleNext}
                onPrev={handlePrev}
                hasNext={progress.activeLessonIndex < 6 || progress.activePhaseIndex < phasesData.length - 1}
                hasPrev={progress.activeLessonIndex > 0 || progress.activePhaseIndex > 0}
                onCardClick={(card) => { setSelectedReferenceCard(card); setShowCardReferenceModal(true); }}
              />
            )
          )}

          {/* PLAYGROUND / SANDBOX VIEW */}
          {activeView === "sandbox" && <SandboxTab />}

          {/* CARD VAULT VIEW */}
          {activeView === "vault" && (
            <div className="w-full pb-12">
              <div className="mb-6">
                <h2 className="font-heading text-2xl font-extrabold text-slate-900 mb-1">Card Vault</h2>
                <p className="text-slate-500 text-sm">All {cardsList.length} design methodology cards. Flip any card to learn how to apply it.</p>
              </div>
              <DesignCardsExplorer showAll unlockAll />
            </div>
          )}

          {/* NICHE BUILDER VIEW */}
          {activeView === "niche" && <NicheBuilderTab />}

          {/* TEMPLATES VIEW */}
          {activeView === "templates" && <TemplatesTab />}

          {/* DASHBOARD VIEW */}
          {activeView === "dashboard" && (
            <DashboardTab onResumeLearning={() => setActiveView("course")} />
          )}
        </main>
      </div>

      {/* FLOATING ACTION BUTTON (FAB) FOR CARD DRAWER */}
      {activeView === "course" && activeLesson && (
        <button
          onClick={() => setShowMobileCardTray(true)}
          className="fixed bottom-6 right-6 z-30 shadow-lg bg-slate-900 hover:bg-slate-850 text-white rounded-full p-4 flex items-center justify-center border border-slate-700 transition-all cursor-pointer active:scale-95"
          title="View Lesson Cards"
        >
          <LayoutGrid className="w-5 h-5 animate-pulse" />
        </button>
      )}

      <BrutalistDialog open={showMobileCardTray} onOpenChange={setShowMobileCardTray} className="!max-w-md md:!max-w-3xl lg:!max-w-5xl">
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-sm font-heading uppercase tracking-widest font-black flex items-center gap-2 text-slate-900 font-mono">
              Lesson Cards
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400 font-medium">
              Flip cards to learn how to use these methodologies in your project.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-6 py-2">
            <CardTray
              lessonId={activeLesson?.id || ""}
              onOpenVault={() => { setShowMobileCardTray(false); setActiveView("vault"); }}
              onLockedClick={(card) => { setSelectedReferenceCard(card); setShowCardReferenceModal(true); }}
              isMobile
            />
          </div>
          <div className="flex justify-end mt-4 pt-4 border-t border-slate-100">
            <Button variant="outline" onClick={() => setShowMobileCardTray(false)} className="rounded-none border-slate-200 text-xs font-bold">Close</Button>
          </div>
        </div>
      </BrutalistDialog>

      {/* CELEBRATION OVERLAY */}
      {celebration && (
        <CelebrationOverlay
          open={!!celebration}
          onClose={handleCelebrationClose}
          type={celebration.type}
          xpEarned={celebration.xp}
          title={celebration.title}
        />
      )}

      {/* WELCOME WALKTHROUGH OVERLAY */}
      <WelcomeWalkthroughModal
        open={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />

      <BrutalistDialog open={showCardReferenceModal} onOpenChange={setShowCardReferenceModal} className="max-w-md">
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xs font-heading text-slate-900 uppercase tracking-widest font-black flex items-center gap-1.5 font-mono">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-300" /> Card {selectedReferenceCard?.num}
            </DialogTitle>
            <DialogDescription className="text-[10px] text-slate-400 font-medium">Design Cards Workbook Preview</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-2">
            {selectedReferenceCard ? (
              <div className="w-full max-w-[320px] transition-transform duration-300 hover:scale-105">
                <DesignCard card={selectedReferenceCard} />
              </div>
            ) : <p className="text-xs text-slate-400 italic">No card selected</p>}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
            <button onClick={() => setShowCardReferenceModal(false)} className="bg-black hover:bg-[#1a1a1a] text-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-none cursor-pointer">Close</button>
          </div>
        </div>
      </BrutalistDialog>

      {/* MOBILE NAVIGATION DRAWER */}
      <BrutalistDialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} className="!top-0 !left-0 !translate-x-0 !translate-y-0 h-screen w-[280px] max-w-[80vw]">
        <WorldRail
          activePhaseIndex={progress.activePhaseIndex}
          activeLessonIndex={progress.activeLessonIndex}
          activeView={activeView}
          completedAssessments={progress.completedAssessments}
          completedLessons={progress.completedLessons}
          isLessonLocked={progress.isLessonLocked}
          onSelectPhase={(phaseIdx, lessonIdx) => {
            progress.navigateTo(phaseIdx, lessonIdx);
            setActiveView("course");
            setIsMobileMenuOpen(false);
          }}
          onSelectSandbox={() => {
            setActiveView("sandbox");
            setIsMobileMenuOpen(false);
          }}
          onSelectVault={() => {
            setActiveView("vault");
            setIsMobileMenuOpen(false);
          }}
          onSelectNiche={() => {
            setActiveView("niche");
            setIsMobileMenuOpen(false);
          }}
          onSelectTemplates={() => {
            setActiveView("templates");
            setIsMobileMenuOpen(false);
          }}
          onSelectDashboard={() => {
            setActiveView("dashboard");
            setIsMobileMenuOpen(false);
          }}
          isMobileDrawer
          onLinkClick={() => setIsMobileMenuOpen(false)}
        />
      </BrutalistDialog>

      {/* SOVEREIGN PRO UNLOCKED SUCCESS DIALOG */}
      <BrutalistDialog open={showUnlockSuccess} onOpenChange={setShowUnlockSuccess} className="max-w-xl">
        <div className="p-8 md:p-10 bg-[#faf9f6] text-left space-y-6 font-sans">
          <div className="w-16 h-16 bg-slate-950 border border-slate-900 text-amber-400 flex items-center justify-center rounded-none shadow-sm">
            <Sparkles className="w-8 h-8 fill-amber-400 text-amber-400" />
          </div>

          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 font-mono block">
              ACCESS ENGAGED • IDENTITY VERIFIED
            </span>
            <h2 className="text-2xl md:text-3xl font-heading text-slate-950 uppercase tracking-wider font-extrabold">
              Welcome to Freedom
            </h2>
            <p className="text-slate-500 font-mono text-[11px] uppercase tracking-widest">
              Initiating Sovereign Millionaire Protocol
            </p>
          </div>

          <div className="border-t border-b border-slate-200 py-6 space-y-4 font-sans text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            <p>
              Your credential upgrade has been verified. The paywall restriction is lifted. You now hold full access to the complete 5-Phase, 35-lesson blueprint, interactive sandbox spaces, and syndicate tools.
            </p>
            <p>
              Remember: <strong className="text-slate-950">A Sovereign Millionaire does not rent their time.</strong> You build systems, assets, and leverage. Your old corporate ceiling has been permanently dismantled.
            </p>
            <p className="font-mono text-xs text-amber-600 font-bold uppercase tracking-wider">
              Status: UNRESTRICTED SYSTEM ACCESS ACTIVE
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowUnlockSuccess(false)}
              className="w-full bg-[#000000] hover:bg-[#1a1a1a] text-white font-heading text-xs uppercase tracking-widest font-bold py-4 text-center rounded-none shadow-sm transition-all h-12 cursor-pointer flex items-center justify-center gap-2"
            >
              Enter the Foundry
            </button>
          </div>
        </div>
      </BrutalistDialog>
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 font-mono">
          <div className="w-10 h-10 rounded-none border-4 border-slate-200 border-t-slate-900 animate-spin" />
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Loading course progress...</p>
        </div>
      </div>
    }>
      <LearnPageContent />
    </Suspense>
  );
}

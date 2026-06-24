"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight, X, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourStep {
  title: string;
  selector: string;
  placement: "left" | "right" | "top" | "bottom" | "center";
  description: string;
}

interface FeatureTourProps {
  open: boolean;
  onClose: () => void;
}

export default function FeatureTour({ open, onClose }: FeatureTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [cardCoords, setCardCoords] = useState<React.CSSProperties>({});

  const tourSteps = useMemo<TourStep[]>(() => [
    {
      title: "1. The Syndicate Path",
      selector: '[data-tour="phases-navigation"]',
      placement: "right",
      description: "This is your road map. Progress sequentially through Phase 1 to Phase 5. Clicking any phase shows its lessons and allows navigation."
    },
    {
      title: "2. Workspace Utilities",
      selector: '[data-tour="workspace-utilities"]',
      placement: "right",
      description: "Access your dashboard metrics, run sandboxes in the Playground, explore methodology cards, brainstorm with LEO, and customize templates."
    },
    {
      title: "3. Lesson Content Canvas",
      selector: '[data-tour="main-content"]',
      placement: "left",
      description: "Your primary worksheet desk. Read materials, watch overview/summary videos, enter project data logs, and verify lessons to graduate."
    }
  ], []);

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const step = tourSteps[currentStep];
      const el = document.querySelector(step.selector);

      if (!el || window.innerWidth < 768) {
        // Center card at bottom on mobile or if target element is missing
        setTargetRect(null);
        setCardCoords({
          position: "fixed",
          bottom: "32px",
          left: "24px",
          right: "24px",
          maxWidth: "calc(100% - 48px)",
          margin: "0 auto",
        });
        return;
      }

      const rect = el.getBoundingClientRect();
      setTargetRect(rect);

      // Desktop layout positioning
      const spaceRight = window.innerWidth - rect.right;
      const spaceBottom = window.innerHeight - rect.bottom;
      const spaceLeft = rect.left;

      const coords: React.CSSProperties = {
        position: "fixed",
        width: "320px",
      };

      if (step.placement === "right" && spaceRight > 350) {
        coords.left = `${rect.right + 24}px`;
        coords.top = `${rect.top + (rect.height / 2) - 100}px`;
      } else if (step.placement === "left" && spaceLeft > 350) {
        coords.right = `${(window.innerWidth - rect.left) + 24}px`;
        coords.top = `${rect.top + (rect.height / 2) - 100}px`;
      } else if (step.placement === "bottom" && spaceBottom > 240) {
        coords.left = `${rect.left + (rect.width / 2) - 160}px`;
        coords.top = `${rect.bottom + 24}px`;
      } else {
        // Fallback: Default center offset layout
        coords.left = `${rect.left + (rect.width / 2) - 160}px`;
        coords.top = rect.top > 300 ? `${rect.top - 220}px` : `${rect.bottom + 24}px`;
      }

      // Constrain inside viewport limits
      if (coords.left) {
        const leftNum = parseInt(coords.left as string);
        coords.left = `${Math.max(24, Math.min(window.innerWidth - 344, leftNum))}px`;
      }
      if (coords.top) {
        const topNum = parseInt(coords.top as string);
        coords.top = `${Math.max(24, Math.min(window.innerHeight - 250, topNum))}px`;
      }

      setCardCoords(coords);
    };

    updatePosition();
    // Use timeout to ensure DOM shifts settle
    const t = setTimeout(updatePosition, 100);

    window.addEventListener("resize", updatePosition);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updatePosition);
    };
  }, [currentStep, open, tourSteps]);

  if (!open) return null;

  const current = tourSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("hi_feature_tour_seen", "true");
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("hi_feature_tour_seen", "true");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      
      {/* Four-Panel Spotlight Backdrop */}
      {targetRect ? (
        <>
          {/* Top Panel */}
          <div 
            className="fixed bg-slate-950/65 backdrop-blur-[1.5px] pointer-events-auto transition-all duration-300"
            style={{ top: 0, left: 0, right: 0, height: `${targetRect.top}px` }}
          />
          {/* Bottom Panel */}
          <div 
            className="fixed bg-slate-950/65 backdrop-blur-[1.5px] pointer-events-auto transition-all duration-300"
            style={{ top: `${targetRect.bottom}px`, left: 0, right: 0, bottom: 0 }}
          />
          {/* Left Panel */}
          <div 
            className="fixed bg-slate-950/65 backdrop-blur-[1.5px] pointer-events-auto transition-all duration-300"
            style={{ top: `${targetRect.top}px`, left: 0, width: `${targetRect.left}px`, height: `${targetRect.height}px` }}
          />
          {/* Right Panel */}
          <div 
            className="fixed bg-slate-950/65 backdrop-blur-[1.5px] pointer-events-auto transition-all duration-300"
            style={{ top: `${targetRect.top}px`, left: `${targetRect.right}px`, right: 0, height: `${targetRect.height}px` }}
          />
          
          {/* Golden Dashed Highlight Spotlight Border */}
          <div 
            className="fixed border-2 border-dashed border-amber-400 pointer-events-none transition-all duration-300 animate-pulse"
            style={{
              top: `${targetRect.top - 6}px`,
              left: `${targetRect.left - 6}px`,
              width: `${targetRect.width + 12}px`,
              height: `${targetRect.height + 12}px`,
            }}
          />
        </>
      ) : (
        /* Full Backdrop for mobile / center target */
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-[1.5px] pointer-events-auto" />
      )}

      {/* Detail Popover Card */}
      <div 
        className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none text-left space-y-4 pointer-events-auto transition-all duration-300"
        style={cardCoords}
      >
        {/* Card Header */}
        <div className="flex justify-between items-start border-b border-dashed border-slate-200 pb-3">
          <div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono block">
              Step {currentStep + 1} of {tourSteps.length}
            </span>
            <h4 className="font-heading text-sm font-black text-slate-905 uppercase tracking-wider mt-0.5">
              {current.title}
            </h4>
          </div>
          <button 
            onClick={handleSkip}
            className="text-slate-400 hover:text-slate-900 transition-colors pointer-events-auto p-0.5"
            title="Skip Tour"
          >
            <X className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
          {current.description}
        </p>

        {/* Footer controls */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <button
            onClick={handleSkip}
            className="text-[10px] text-slate-400 hover:text-slate-900 uppercase font-mono tracking-widest font-bold"
          >
            Skip Tour
          </button>
          
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleBack}
                className="bg-white hover:bg-slate-50 border border-black rounded-none text-[10px] uppercase tracking-widest font-mono font-bold py-1 px-3 h-8 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleNext}
              className="bg-black hover:bg-slate-900 text-white rounded-none border border-black text-[10px] uppercase tracking-widest font-mono font-bold py-1 px-3 h-8 flex items-center gap-1 cursor-pointer"
            >
              {currentStep < tourSteps.length - 1 ? (
                <>
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  Done <CheckCircle2 className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

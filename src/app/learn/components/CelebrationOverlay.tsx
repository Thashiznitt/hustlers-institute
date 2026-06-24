"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Trophy, Star } from "lucide-react";

interface CelebrationOverlayProps {
  open: boolean;
  onClose: () => void;
  type: "lesson" | "phase" | "course";
  xpEarned: number;
  title: string;
}

export default function CelebrationOverlay({ open, onClose, type, xpEarned, title }: CelebrationOverlayProps) {
  useEffect(() => {
    if (!open) return;

    if (type === "lesson") {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } else {
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.5 } });
      setTimeout(() => {
        confetti({ particleCount: 120, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 120, angle: 120, spread: 55, origin: { x: 1 } });
      }, 200);
    }
  }, [open, type]);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-sm text-center border border-slate-250 shadow-none rounded-none overflow-hidden p-0">
        <div className={`p-8 flex flex-col items-center gap-4 ${
          type === "course"
            ? "bg-slate-950 border-b-2 border-amber-400"
            : type === "phase" 
            ? "bg-gradient-to-b from-amber-400 to-orange-500" 
            : "bg-gradient-to-b from-slate-900 to-slate-950"
        }`}>
          <div className="text-white p-3 bg-white/10 rounded-none border border-white/20 mb-2">
            {type === "course" ? (
              <Trophy className="w-12 h-12 text-amber-400 animate-bounce" />
            ) : type === "phase" ? (
              <Trophy className="w-12 h-12 text-white" />
            ) : (
              <Star className="w-12 h-12 text-white fill-white" />
            )}
          </div>
          <h2 className="font-heading text-xl md:text-2xl font-extrabold text-white tracking-widest uppercase">
            {type === "course" ? "Sovereign Freedom" : type === "phase" ? "Phase Complete" : "Lesson Done"}
          </h2>
          <p className="text-white/90 text-xs font-mono uppercase tracking-widest">{title}</p>
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-none px-5 py-2 font-mono">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-white font-extrabold text-sm">+{xpEarned} XP</span>
          </div>
        </div>
        <div className="p-6 bg-white border-t border-slate-200 space-y-4 text-left">
          {type === "course" ? (
            <>
              <p className="text-xs text-slate-655 leading-relaxed font-sans font-medium">
                Welcome to sovereign freedom! You have completed the entire Sovereign Millionaires curriculum. You are now fully equipped to build, validate, and launch your business.
              </p>
              <p className="text-xs text-slate-655 leading-relaxed font-sans font-medium">
                It's time to take action. Go to the <strong>Millionaires Hub</strong> to track your live business health metrics, monitor leverage, and manage operations.
              </p>
              <Button
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
                className="w-full bg-amber-450 hover:bg-amber-500 text-black font-mono font-bold rounded-none py-3.5 text-xs font-heading uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Go to Millionaires Hub
              </Button>
            </>
          ) : (
            <Button
              onClick={onClose}
              className="w-full bg-slate-950 hover:bg-slate-850 text-white font-bold rounded-none py-3.5 text-xs font-heading uppercase tracking-widest border border-slate-950"
            >
              {type === "phase" ? "Continue to Next Phase" : "Next Lesson"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

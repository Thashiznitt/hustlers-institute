"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Trophy, Star } from "lucide-react";

interface CelebrationOverlayProps {
  open: boolean;
  onClose: () => void;
  type: "lesson" | "phase";
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
      <DialogContent className="max-w-sm text-center border-0 shadow-2xl rounded-lg overflow-hidden p-0">
        <div className={`p-8 flex flex-col items-center gap-4 ${type === "phase" ? "bg-gradient-to-b from-amber-400 to-orange-400" : "bg-gradient-to-b from-emerald-400 to-teal-500"}`}>
          <div className="text-white p-3 bg-white/20 rounded-full mb-2">
            {type === "phase" ? <Trophy className="w-12 h-12 text-white" /> : <Star className="w-12 h-12 text-white fill-white" />}
          </div>
          <h2 className="font-heading text-2xl font-extrabold text-white tracking-wide">
            {type === "phase" ? "Phase Complete!" : "Lesson Done!"}
          </h2>
          <p className="text-white/90 text-sm font-medium">{title}</p>
          <div className="flex items-center gap-2 bg-white/20 rounded-full px-5 py-2">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-white font-extrabold text-lg">+{xpEarned} XP</span>
          </div>
        </div>
        <div className="p-6 bg-white">
          <Button
            onClick={onClose}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg py-3 text-sm tracking-wide"
          >
            {type === "phase" ? "Continue to Next Phase" : "Next Lesson"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React, { useState } from "react";
import { Lock, RotateCw, Check, Plus, Eye } from "lucide-react";
import Link from "next/link";
import { CardData } from "./DesignCardsExplorer";
import BrandName from "./BrandName";

interface DesignCardProps {
  card: CardData;
  isLocked?: boolean;
  onAddToAgenda?: (card: CardData, e: React.MouseEvent) => void;
  onLockedClick?: (card: CardData) => void;
  // Controlled flip state
  flipped?: boolean;
  onFlipToggle?: (flipped: boolean) => void;
  isAuthenticated?: boolean;
}

const imageMap: Record<string, string> = {
  "Research": "/phase_research.png",
  "Synthesis": "/phase_synthesis.png",
  "Ideation": "/phase_ideation.png",
  "Prototyping": "/phase_prototyping.png",
};

export default function DesignCard({
  card,
  isLocked = false,
  onAddToAgenda,
  onLockedClick,
  flipped: controlledFlipped,
  onFlipToggle,
  isAuthenticated = true,
}: DesignCardProps) {
  const [localFlipped, setLocalFlipped] = useState(false);
  const isFlipped = controlledFlipped !== undefined ? controlledFlipped : localFlipped;

  const handleFlip = () => {
    if (isLocked) {
      if (onLockedClick) {
        onLockedClick(card);
      }
      return;
    }

    if (onFlipToggle) {
      onFlipToggle(!isFlipped);
    } else {
      setLocalFlipped(!isFlipped);
    }
  };

  const stageName = card.stage || "Research";
  const imageSrc = imageMap[stageName] || "/phase_research.png";

  return (
    <div
      className="h-[480px] w-full [perspective:1000px] cursor-pointer group select-none"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full rounded-none transition-transform duration-700 [transform-style:preserve-3d] shadow-none ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full rounded-none bg-white border-2 border-black p-6 flex flex-col [backface-visibility:hidden] overflow-hidden hover:bg-slate-50 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {/* Top bar */}
          <div className="flex justify-between items-start">
            <div className="text-left">
              <span className="text-[10px] text-[#000000] uppercase tracking-widest font-mono font-bold block mb-0.5">
                {stageName} PHASE
              </span>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                {card.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isLocked && <Lock className="w-3.5 h-3.5 text-[#000000]/65 shrink-0" />}
              <span className="text-3xl font-heading text-slate-250 select-none font-bold">
                {card.num.padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Card Image */}
          <div className="aspect-[16/10] w-full overflow-hidden border-2 border-black rounded-none my-4 bg-slate-50 shrink-0 relative">
            <img
              src={imageSrc}
              alt={card.title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
            {isLocked && (
              <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] flex items-center justify-center">
                <div className="bg-white border-2 border-black text-[#000000] px-3 py-1.5 text-[10px] uppercase tracking-widest font-mono font-bold flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> Locked
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-center text-left">
            <h3 className="text-sm font-heading text-slate-900 uppercase mb-1 leading-tight tracking-widest font-bold">
              {card.title}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed font-sans font-medium line-clamp-3">
              {card.frontDesc}
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100 font-sans mt-auto">
            <span className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-medium">
              <Eye className="w-3.5 h-3.5 text-[#000000]" /> Click to flip & explore
            </span>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full rounded-none bg-white border-2 border-[#000000] p-5 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 shrink-0">
            <h4 className="font-heading text-slate-900 text-xs uppercase tracking-widest font-bold">
              {card.title} Sandbox
            </h4>
            <button
              onClick={() => {
                if (onFlipToggle) {
                  onFlipToggle(false);
                } else {
                  setLocalFlipped(false);
                }
              }}
              className="text-slate-400 hover:text-slate-950 transition-colors"
              title="Flip Back"
            >
              <RotateCw className="w-4 h-4 text-[#000000]" />
            </button>
          </div>

          {/* Details */}
          <div className="text-xs text-slate-655 space-y-2.5 my-3 font-sans font-medium text-left flex-1">
            <p className="leading-relaxed">
              <strong className="text-slate-900 uppercase font-heading text-[10px] tracking-widest block font-bold mb-1">
                Objective:
              </strong>
              {card.objective}
            </p>
            <div>
              <strong className="text-slate-900 uppercase font-heading text-[10px] tracking-widest block font-bold mb-1">
                Field Deployment:
              </strong>
              <ol className="list-decimal pl-4 space-y-1 text-slate-500 leading-snug mb-3">
                {card.deployment.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Interactive Workbook Link */}
            <div className="pt-2.5 border-t border-slate-200">
              <Link
                href={
                  isAuthenticated
                    ? `/learn?tab=templates&card=${card.id}`
                    : `/login?redirect=${encodeURIComponent(`/learn?tab=templates&card=${card.id}`)}`
                }
                className="w-full bg-black hover:bg-slate-800 text-white font-mono text-[10px] rounded-none border-2 border-black font-black uppercase tracking-wider py-2 text-center block cursor-pointer transition-colors"
              >
                Open Interactive Workbook
              </Link>
            </div>
          </div>

          {/* Card Back Branded Watermark */}
          <div className="flex justify-between items-center mt-auto pt-2 border-t border-slate-100/60 font-mono text-[9px] uppercase text-slate-400 shrink-0">
            <span>Card {card.num.padStart(2, "0")}</span>
            <BrandName className="text-[8px] tracking-widest font-bold font-cormorant-sc" />
          </div>
        </div>
      </div>
    </div>
  );
}

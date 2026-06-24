"use client";

import React from "react";
import { Sparkles, RefreshCw } from "lucide-react";

interface NicheTailorBadgeProps {
  status: "idle" | "loading" | "ready" | "error";
  isTailored: boolean;
  ventureName?: string;
  onRefresh: () => void;
}

/**
 * Tiny status chip shown at the top of an interactive workspace to signal that
 * its hints/examples have been tailored to the picked niche by Leo. Hidden when
 * no niche is set (status "idle").
 */
export default function NicheTailorBadge({ status, isTailored, ventureName, onRefresh }: NicheTailorBadgeProps) {
  if (status === "idle") return null;

  return (
    <div className="flex items-center justify-between gap-2 mb-3 px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-none">
      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800">
        <Sparkles className={`w-3 h-3 text-amber-600 fill-amber-300 ${status === "loading" ? "animate-pulse" : ""}`} />
        {status === "loading" && "Leo is tailoring this to your niche…"}
        {status === "ready" && isTailored && `Tailored to ${ventureName || "your venture"}`}
        {status === "error" && "Showing generic hints (tap to retry)"}
      </span>
      {status !== "loading" && (
        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase text-amber-700 hover:text-amber-900 cursor-pointer"
          title="Re-tailor to your current niche"
        >
          <RefreshCw className="w-2.5 h-2.5" />
          Refresh
        </button>
      )}
    </div>
  );
}

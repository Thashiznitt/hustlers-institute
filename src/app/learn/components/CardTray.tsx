"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, ChevronRight } from "lucide-react";
import DesignCard from "@/components/DesignCard";
import { cardsList, CardData } from "@/components/DesignCardsExplorer";
import { suggestedCardsMap } from "../data/cards-map";

interface CardTrayProps {
  lessonId: string;
  onOpenVault: () => void;
  onLockedClick?: (card: CardData) => void;
  isMobile?: boolean;
}

export default function CardTray({ lessonId, onOpenVault, onLockedClick, isMobile = false }: CardTrayProps) {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const suggestedIds = suggestedCardsMap[lessonId] || [];
  const cards = suggestedIds
    .map(id => cardsList.find(c => c.id === id))
    .filter(Boolean) as CardData[];

  const displayCards = cards;

  if (displayCards.length === 0) return null;

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 py-2 w-full">
        <p className="text-[11px] text-slate-500 leading-relaxed">
          These cards are your tools for this lesson. Flip them to learn how to apply each one.
        </p>

        <div className="flex flex-wrap gap-6 items-center justify-center">
          {displayCards.map(card => (
            <div key={card.id} className="w-full max-w-[340px] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg rounded-xl">
              <DesignCard
                card={card}
                isLocked={card.isLocked}
                onLockedClick={onLockedClick}
                flipped={flippedCardId === card.id}
                onFlipToggle={(flipped) => setFlippedCardId(flipped ? card.id : null)}
              />
            </div>
          ))}
        </div>

        <Button
          onClick={onOpenVault}
          variant="outline"
          className="w-full rounded-xl border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 text-xs font-bold gap-2 mt-2 cursor-pointer"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          Open Card Vault
        </Button>
      </div>
    );
  }

  return (
    <aside className="w-[220px] shrink-0 hidden xl:flex flex-col gap-4 py-6 px-3 border-l border-slate-100 bg-white h-[calc(100vh-56px)] sticky top-14 overflow-y-auto">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Lesson Cards</p>
        <button
          onClick={onOpenVault}
          className="text-[10px] text-slate-500 hover:text-slate-900 flex items-center gap-0.5 font-bold uppercase tracking-wider cursor-pointer"
        >
          All <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <p className="text-[11px] text-slate-500 leading-relaxed -mt-2">
        These cards are your tools for this lesson. Flip them to learn how to apply each one.
      </p>

      <div className="flex flex-col gap-4">
        {displayCards.map(card => (
          <div key={card.id} className="scale-[0.85] origin-top -mx-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg rounded-xl">
            <DesignCard
              card={card}
              isLocked={card.isLocked}
              onLockedClick={onLockedClick}
              flipped={flippedCardId === card.id}
              onFlipToggle={(flipped) => setFlippedCardId(flipped ? card.id : null)}
            />
          </div>
        ))}
      </div>

      <Button
        onClick={onOpenVault}
        variant="outline"
        className="w-full rounded-xl border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 text-xs font-bold gap-2 cursor-pointer mt-auto"
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        Open Card Vault
      </Button>
    </aside>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useVentureProfile } from "./useVentureProfile";
import { getCardFields } from "../data/card-field-manifests";
import { cardsList } from "@/components/DesignCardsExplorer";

export interface NicheFieldContent {
  placeholder: string;
  example: string;
}

export interface NicheCardContent {
  intro: string;
  fields: Record<string, NicheFieldContent>;
}

type Status = "idle" | "loading" | "ready" | "error";

interface CacheEntry {
  sig: string;
  content: NicheCardContent;
}

function cacheKey(cardId: string) {
  return `hi_card_ctx_${cardId}`;
}

function readCache(cardId: string): CacheEntry | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(cacheKey(cardId));
    return raw ? (JSON.parse(raw) as CacheEntry) : null;
  } catch {
    return null;
  }
}

/**
 * Lazily fetches + caches Leo's niche-adapted content for an interactive card
 * workspace. Adaptation is keyed by the niche signature, so it regenerates only
 * when the picked niche changes. When no niche is set, no manifest exists, or a
 * fetch fails, `content` is null and callers fall back to generic placeholders.
 *
 * Usage in a workspace:
 *   const { placeholder } = useNicheCardContent("interviews");
 *   <Input placeholder={placeholder("chatTarget")} />
 */
export function useNicheCardContent(cardId: string) {
  const { profile, hasVertical, nicheSignature } = useVentureProfile();
  const [content, setContent] = useState<NicheCardContent | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const fetchingFor = useRef<string>("");

  const fields = getCardFields(cardId);
  const card = cardsList.find(c => c.id === cardId);

  const fetchContent = useCallback(async (force = false) => {
    if (!fields || !card || !hasVertical || !nicheSignature) return;

    // Serve fresh cache unless forced
    if (!force) {
      const cached = readCache(cardId);
      if (cached && cached.sig === nicheSignature) {
        setContent(cached.content);
        setStatus("ready");
        return;
      }
    }

    // Avoid duplicate in-flight requests for the same signature
    const token = `${cardId}:${nicheSignature}`;
    if (fetchingFor.current === token && !force) return;
    fetchingFor.current = token;

    setStatus("loading");
    try {
      const res = await fetch("/api/card-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          card: { id: card.id, num: card.num, title: card.title, objective: card.objective, deployment: card.deployment },
          venture: { name: profile.name, industry: profile.industry, type: profile.type, fiveWs: profile.fiveWs },
          fields: fields.map(f => ({ key: f.key, label: f.label, fallback: f.fallback })),
        }),
      });
      const data = await res.json();
      if (data && data.fields) {
        const next: NicheCardContent = { intro: data.intro || "", fields: data.fields };
        setContent(next);
        setStatus("ready");
        try {
          localStorage.setItem(cacheKey(cardId), JSON.stringify({ sig: nicheSignature, content: next } as CacheEntry));
        } catch { /* quota — non-fatal */ }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }, [cardId, card, fields, hasVertical, nicheSignature, profile]);

  // Lazy: fetch when the workspace mounts (or niche changes), only if adaptable.
  useEffect(() => {
    if (!fields || !hasVertical || !nicheSignature) {
      setContent(null);
      setStatus("idle");
      return;
    }
    fetchContent(false);
  }, [fields, hasVertical, nicheSignature, fetchContent]);

  /** Returns the niche-aware placeholder for a field, or its generic fallback. */
  const placeholder = useCallback(
    (fieldKey: string): string => {
      const adapted = content?.fields?.[fieldKey]?.placeholder;
      if (adapted) return adapted;
      const manifest = fields?.find(f => f.key === fieldKey);
      return manifest?.fallback || "";
    },
    [content, fields]
  );

  const example = useCallback(
    (fieldKey: string): string => content?.fields?.[fieldKey]?.example || "",
    [content]
  );

  return {
    content,
    status,
    intro: content?.intro || "",
    isTailored: status === "ready" && !!content,
    ventureName: profile.name,
    placeholder,
    example,
    refresh: () => fetchContent(true),
  };
}

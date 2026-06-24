"use client";

import { useState, useEffect, useCallback } from "react";

export interface FiveWs {
  what: string;
  who: string;
  where: string;
  when: string;
  how: string;
}

export interface VentureProfile {
  name: string;
  industry: string;
  type: string;
  fiveWs: FiveWs;
  nicheSummary: string;
}

const EMPTY_WS: FiveWs = { what: "", who: "", where: "", when: "", how: "" };

function readProfile(): VentureProfile {
  if (typeof window === "undefined") {
    return { name: "", industry: "", type: "", fiveWs: EMPTY_WS, nicheSummary: "" };
  }
  let fiveWs = EMPTY_WS;
  try {
    const raw = localStorage.getItem("hi_niche_builder_fields");
    if (raw) {
      const p = JSON.parse(raw);
      fiveWs = { what: p.what || "", who: p.who || "", where: p.where || "", when: p.when || "", how: p.how || "" };
    }
  } catch { /* ignore malformed */ }

  // Fallback to Lesson 1.1 inputs if Niche Builder is not yet configured
  if (!fiveWs.what && !fiveWs.who && !fiveWs.where && !fiveWs.when && !fiveWs.how) {
    try {
      const raw11 = localStorage.getItem("hi_exercise_1.1");
      if (raw11) {
        const p = JSON.parse(raw11);
        fiveWs = {
          what: p.what || "",
          who: p.who || "",
          where: p.where || "",
          when: p.when || "",
          how: p.how || ""
        };
      }
    } catch { /* ignore malformed */ }
  }

  let nicheSummary = "";
  try {
    const ai = localStorage.getItem("hi_niche_ai_data");
    if (ai) nicheSummary = JSON.parse(ai).nicheSummary || "";
  } catch { /* ignore */ }

  return {
    name: localStorage.getItem("hi_venture_name") || "",
    industry: localStorage.getItem("hi_venture_industry") || "",
    type: localStorage.getItem("hi_venture_type") || "",
    fiveWs,
    nicheSummary,
  };
}

/**
 * Reads a saved inline exercise (keyed `hi_exercise_<lessonId>`) so a later
 * lesson can carry forward what the student produced earlier.
 */
export function readExercise<T>(lessonId: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`hi_exercise_${lessonId}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Single source of truth for the student's chosen vertical (industry) and
 * venture details. The vertical is selected at the Niche Builder and every
 * lesson adapts to it. Re-reads on mount, on tab focus, and on cross-tab
 * storage events so edits made in one view show up in another.
 */
export function useVentureProfile() {
  const [profile, setProfile] = useState<VentureProfile>(() => ({
    name: "", industry: "", type: "", fiveWs: EMPTY_WS, nicheSummary: "",
  }));

  const reload = useCallback(() => setProfile(readProfile()), []);

  useEffect(() => {
    reload();
    const onFocus = () => reload();
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key.startsWith("hi_")) reload();
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onStorage);
    };
  }, [reload]);

  const hasVertical = (!!profile.industry && (!!profile.type || !!profile.fiveWs.what)) || (!!profile.name && !!profile.industry && !!profile.fiveWs.what);

  return { profile, hasVertical, reload, readExercise };
}

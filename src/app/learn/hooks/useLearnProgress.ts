"use client";

import { useState, useEffect, useCallback } from "react";
import { phasesData } from "../data/phases";

export const XP_PER_LESSON = 25;
export const XP_PER_ASSESSMENT = 100;
export const XP_STREAK_BONUS = 10;

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function useLearnProgress() {
  const [xpTotal, setXpTotal] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [completedAssessments, setCompletedAssessments] = useState<Record<string, boolean>>({});
  const [unlockedCardIds, setUnlockedCardIds] = useState<string[]>([]);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setXpTotal(load("hi_xp_total", 0));
    setStreakDays(load("hi_streak_days", 0));
    setCompletedLessons(load("hi_completed_lessons", {}));
    setCompletedAssessments(load("hi_completed_assessments", {}));
    setUnlockedCardIds(load("hi_unlocked_cards", []));
    setActivePhaseIndex(load("hi_active_phase_idx", 0));
    setActiveLessonIndex(load("hi_active_lesson_idx", 0));
    setHydrated(true);
  }, []);

  const awardXP = useCallback((amount: number) => {
    setXpTotal(prev => {
      const next = prev + amount;
      save("hi_xp_total", next);
      return next;
    });
  }, []);

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    const lastDate = typeof window !== "undefined" ? localStorage.getItem("hi_streak_last_date") : null;
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (lastDate === today) return 0; // already counted today

    let bonus = 0;
    setStreakDays(prev => {
      let next: number;
      if (lastDate === yesterday) {
        next = prev + 1;
        bonus = XP_STREAK_BONUS;
      } else {
        next = 1;
      }
      save("hi_streak_days", next);
      localStorage.setItem("hi_streak_last_date", today);
      return next;
    });
    return bonus;
  }, []);

  const isLessonLocked = useCallback((phaseIdx: number, lessonIdx: number): boolean => {
    if (process.env.NODE_ENV === "development") return false;
    if (phaseIdx === 0 && lessonIdx === 0) return false;

    if (lessonIdx === 0) {
      // First lesson of a phase, need all lessons of previous phase done
      const prevPhase = phasesData[phaseIdx - 1];
      return !prevPhase.lessons.every(l => !!completedLessons[l.id]);
    }

    // Otherwise need previous lesson done
    const prevLesson = phasesData[phaseIdx].lessons[lessonIdx - 1];
    return !completedLessons[prevLesson.id];
  }, [completedLessons]);

  const isAssessmentUnlocked = useCallback((phaseIdx: number): boolean => {
    if (process.env.NODE_ENV === "development") return true;
    const phase = phasesData[phaseIdx];
    return phase.lessons.every(l => !!completedLessons[l.id]);
  }, [completedLessons]);

  const markLessonComplete = useCallback((lessonId: string): number => {
    if (completedLessons[lessonId]) return 0;

    const updated = { ...completedLessons, [lessonId]: true };
    setCompletedLessons(updated);
    save("hi_completed_lessons", updated);

    awardXP(XP_PER_LESSON);
    const streakBonus = updateStreak();
    if (streakBonus) awardXP(streakBonus);

    return XP_PER_LESSON + streakBonus;
  }, [completedLessons, awardXP, updateStreak]);

  const submitAssessment = useCallback((phaseId: string, newCardIds: string[] = []): number => {
    if (completedAssessments[phaseId]) return 0;

    const updated = { ...completedAssessments, [phaseId]: true };
    setCompletedAssessments(updated);
    save("hi_completed_assessments", updated);

    // Auto-complete all lessons in phase
    const phaseData = phasesData.find(p => p.id === phaseId);
    if (phaseData) {
      const updatedLessons = { ...completedLessons };
      phaseData.lessons.forEach(l => { updatedLessons[l.id] = true; });
      setCompletedLessons(updatedLessons);
      save("hi_completed_lessons", updatedLessons);
    }

    // Unlock new cards
    if (newCardIds.length > 0) {
      setUnlockedCardIds(prev => {
        const next = Array.from(new Set([...prev, ...newCardIds]));
        save("hi_unlocked_cards", next);
        return next;
      });
    }

    awardXP(XP_PER_ASSESSMENT);
    return XP_PER_ASSESSMENT;
  }, [completedAssessments, completedLessons, awardXP]);

  const navigateTo = useCallback((phaseIdx: number, lessonIdx: number) => {
    setActivePhaseIndex(phaseIdx);
    setActiveLessonIndex(lessonIdx);
    save("hi_active_phase_idx", phaseIdx);
    save("hi_active_lesson_idx", lessonIdx);
  }, []);

  const resetProgress = useCallback(() => {
    setXpTotal(0);
    setStreakDays(0);
    setCompletedLessons({});
    setCompletedAssessments({});
    setUnlockedCardIds([]);
    setActivePhaseIndex(0);
    setActiveLessonIndex(0);
    const keys = [
      "hi_xp_total", "hi_streak_days", "hi_streak_last_date",
      "hi_unlocked_cards", "hi_active_phase_idx", "hi_active_lesson_idx",
      "hi_completed_lessons", "hi_completed_assessments"
    ];
    keys.forEach(k => localStorage.removeItem(k));
  }, []);

  const lessonsDone = Object.values(completedLessons).filter(Boolean).length;
  const assessmentsDone = Object.values(completedAssessments).filter(Boolean).length;
  const totalProgress = Math.round((lessonsDone / 35) * 100);
  const isGraduated = lessonsDone >= 35;

  return {
    hydrated,
    xpTotal,
    streakDays,
    completedLessons,
    completedAssessments,
    unlockedCardIds,
    activePhaseIndex,
    activeLessonIndex,
    lessonsDone,
    assessmentsDone,
    totalProgress,
    isGraduated,
    awardXP,
    markLessonComplete,
    submitAssessment,
    isLessonLocked,
    isAssessmentUnlocked,
    navigateTo,
    resetProgress,
  };
}

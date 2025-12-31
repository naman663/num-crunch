import { useMemo, useState } from "react";

// Keep track of game stats to show users
export type GameStats = {
    correct: number;
    incorrect: number;
    currentStreak: number;
    bestStreak: number;
};

// Initial stats
const initialStats: GameStats = {
    correct: 0,
    incorrect: 0,
    currentStreak: 0,
    bestStreak: 0,
};

export function useGameStats() {
    const [stats, setStats] = useState<GameStats>(initialStats);

    const total = stats.correct + stats.incorrect;

    // Calculate accuracy from 0 to 100%
    const accuracy = useMemo(() => {
    if (total === 0) return 0;
    return stats.correct / total; 
    }, [stats.correct, total]);

    // Keep track of streak / correct answers
    function recordCorrect() {
    setStats((prev) => {
      const nextStreak = prev.currentStreak + 1;
      return {
        ...prev,
        correct: prev.correct + 1,
        currentStreak: nextStreak,
        bestStreak: Math.max(prev.bestStreak, nextStreak),
      };
    });
  }

  // Reset streak and tile up incorrect answers
  function recordIncorrect() {
    setStats((prev) => ({
      ...prev,
      incorrect: prev.incorrect + 1,
      currentStreak: 0,
    }));
  }

  function resetStats() {
    setStats(initialStats);
  }

  return {
    stats,
    total,
    accuracy,
    recordCorrect,
    recordIncorrect,
    resetStats,
  };

}
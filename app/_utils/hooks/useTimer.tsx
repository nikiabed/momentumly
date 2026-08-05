import { ActiveTimer } from "@/app/todo/_common";
import { useState } from "react";

export const useTimer = () => {
  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null);

  const startTimer = (todoId: string, currentSeconds: number) => {
    setActiveTimer({
      todoId,
      startedAt: Date.now(),
      accumulatedSeconds: currentSeconds,
      status: "running",
    });
  };

  const pauseTimer = () => {
    setActiveTimer((prev: ActiveTimer | null) => {
      if (!prev) return null;

      const elapsed = Math.floor((Date.now() - prev.startedAt) / 1000);

      return {
        ...prev,
        accumulatedSeconds: prev.accumulatedSeconds + elapsed,
        status: "paused",
      };
    });
  };

  const resumeTimer = () => {
    setActiveTimer((prev: ActiveTimer | null) =>
      prev
        ? {
            ...prev,
            startedAt: Date.now(),
            status: "running",
          }
        : null,
    );
  };

  const resetTimer = () => {
    setActiveTimer(null);
  };

  return { activeTimer, setActiveTimer, startTimer, pauseTimer, resumeTimer, resetTimer };
};

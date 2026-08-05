"use client";

import { createContext, useEffect, useMemo, useState } from "react";

export const TimerContext = createContext<TimerContextType | null>(null);
type TimerContextType = {
  now: number;
  activeTimer: ActiveTimer | null;
  startTimer: (todoId: string, currentSeconds?: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  elapsedSeconds: (todoId: string, tracked?: number) => number;
};

export type TimerStatus = "running" | "paused";

export type ActiveTimer = {
  todoId: string;
  startedAt: number;
  accumulatedSeconds: number;
  status: TimerStatus;
};

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null);

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const startTimer = (todoId: string, currentSeconds = 0) => {
    setActiveTimer((prev) => {
      if (prev && prev.todoId === todoId) {
        return {
          ...prev,
          startedAt: Date.now(),
          status: "running",
        };
      }

      return {
        todoId,
        startedAt: Date.now(),
        accumulatedSeconds: currentSeconds,
        status: "running",
      };
    });
  };

  const pauseTimer = () => {
    setActiveTimer((prev) => {
      if (!prev) return null;

      const elapsed =
        prev.accumulatedSeconds +
        Math.floor((Date.now() - prev.startedAt) / 1000);

      return {
        ...prev,
        accumulatedSeconds: elapsed,
        status: "paused",
      };
    });
  };

  const resumeTimer = () => {
    setActiveTimer((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        startedAt: Date.now(),
        status: "running",
      };
    });
  };

  const resetTimer = () => {
    setActiveTimer(null);
  };

  const elapsedSeconds = (todoId: string, tracked = 0) => {
    if (!activeTimer) return tracked;

    if (activeTimer.todoId !== todoId) {
      return tracked;
    }

    if (activeTimer.status === "paused") {
      return activeTimer.accumulatedSeconds;
    }

    return (
      activeTimer.accumulatedSeconds +
      Math.floor((now - activeTimer.startedAt) / 1000)
    );
  };

  const value = useMemo(
    () => ({
      now,
      activeTimer,
      startTimer,
      pauseTimer,
      resumeTimer,
      resetTimer,
      elapsedSeconds,
    }),
    [now, activeTimer],
  );

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};

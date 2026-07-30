"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Refresh2 } from "iconsax-reactjs";
import { PauseOverlay } from "./PauseOverlay";
import { useTodoContext } from "@/app/_utils";

type TodoTimerProps = {
  todoId: string;
  trackedTimeSeconds?: number;
};

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const TodoTimer = ({
  todoId,
  trackedTimeSeconds = 0,
}: TodoTimerProps) => {
  const [isPaused, setIsPaused] = useState(false);

  const {
    activeTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    saveTrackedTime,
    saveTodoTimeEntry,
  } = useTodoContext();

  const isThisTodo = activeTimer?.todoId === todoId;

  const isRunning = isThisTodo && activeTimer.status === "running";

  const elapsedSeconds = isThisTodo
    ? activeTimer.elapsedSeconds
    : trackedTimeSeconds;

  const elapsedRef = useRef(elapsedSeconds);

  useEffect(() => {
    elapsedRef.current = elapsedSeconds;
  }, [elapsedSeconds]);

  const saveDailyEntry = async (seconds: number) => {
    if (seconds <= 0) return;

    const today = new Date().toISOString().slice(0, 10);

    await saveTodoTimeEntry?.(todoId, today, seconds);
  };

  // Autosave
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const seconds = elapsedRef.current;

      saveTrackedTime?.(todoId, seconds);
      saveDailyEntry(seconds);
    }, 30_000);

    return () => clearInterval(interval);
  }, [isRunning, todoId]);

  // وقتی tab مخفی می‌شود
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isRunning) {
        const seconds = elapsedRef.current;

        saveTrackedTime?.(todoId, seconds);
        saveDailyEntry(seconds);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isRunning, todoId]);

  const handleStart = () => {
    startTimer(todoId, trackedTimeSeconds);
  };

  const handlePause = () => {
    pauseTimer();

    setIsPaused(true);

    saveTrackedTime?.(todoId, elapsedSeconds);

    saveDailyEntry(elapsedSeconds);
  };

  const handlePauseFinish = () => {
    setIsPaused(false);
    resumeTimer();
  };

  const handleReset = () => {
    resetTimer();

    setIsPaused(false);

    saveTrackedTime?.(todoId, 0);
  };

  return (
    <>
      <div
        className="flex items-center gap-1.5 transition-all duration-300"
        data-todo-id={todoId}
      >
        {!isThisTodo && elapsedSeconds === 0 ? (
          <button
            type="button"
            onClick={handleStart}
            className="group flex cursor-pointer items-center gap-1.5 rounded-full py-1 pl-1 pr-2 text-xs transition-all duration-200 hover:text-rose-500"
          >
            <Play
              size={16}
              className="text-gray-800 transition-transform duration-200 group-hover:scale-125"
            />
          </button>
        ) : (
          <div
            className="flex items-center gap-1 rounded-xl bg-white/70 px-4 py-1 shadow-sm"
            style={{
              border: "1px solid #d1d5dc",
            }}
          >
            <button
              type="button"
              onClick={isRunning ? handlePause : handleStart}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-rose-500 transition-all hover:bg-rose-50"
            >
              {isRunning ? <Pause size={13} /> : <Play size={13} />}
            </button>

            <span className="min-w-10.5 text-center text-xs font-medium tabular-nums text-rose-500">
              {formatTime(elapsedSeconds)}
            </span>

            <button
              type="button"
              onClick={handleReset}
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-black/25 transition-all hover:bg-black/5 hover:text-black/50"
            >
              <Refresh2 size={12} />
            </button>
          </div>
        )}
      </div>

      {isPaused && <PauseOverlay onFinish={handlePauseFinish} />}
    </>
  );
};

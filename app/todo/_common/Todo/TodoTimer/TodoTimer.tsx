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
  const [elapsedSeconds, setElapsedSeconds] = useState(trackedTimeSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const elapsedRef = useRef(trackedTimeSeconds);

  const { saveTrackedTime, saveTodoTimeEntry } = useTodoContext();

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    elapsedRef.current = elapsedSeconds;
  }, [elapsedSeconds]);

  useEffect(() => {
    if (!isRunning) return;

    const autosaveInterval = setInterval(() => {
      saveTrackedTime?.(todoId, elapsedRef.current);
      saveDailyEntry(elapsedRef.current);
    }, 30_000);

    return () => clearInterval(autosaveInterval);
  }, [isRunning, todoId, saveTrackedTime]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isRunning) {
        saveTrackedTime?.(todoId, elapsedRef.current);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isRunning, todoId, saveTrackedTime]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
    saveTrackedTime?.(todoId, elapsedSeconds);
    saveDailyEntry(elapsedSeconds);
  };

  const handlePauseFinish = () => {
    setIsPaused(false);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setElapsedSeconds(0);
    elapsedRef.current = 0;
    saveTrackedTime?.(todoId, 0);
  };

  const saveDailyEntry = async (seconds: number) => {
    if (seconds <= 0) return;
    const today = new Date().toISOString().slice(0, 10);
    await saveTodoTimeEntry?.(todoId, today, seconds);
  };

  return (
    <>
      <div
        className="flex items-center gap-1.5 transition-all duration-300"
        data-todo-id={todoId}
      >
        {!isRunning && elapsedSeconds === 0 ? (
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
            style={{ border: "1px solid #d1d5dc" }}
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

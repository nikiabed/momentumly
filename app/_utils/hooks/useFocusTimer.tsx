"use client";

import { toast } from "sonner";
import { useTimer } from "./useTimer";
import { useTodoContext } from "./useTodoContext";
import { useState } from "react";

export const useFocusTimer = (props?: {
  todoId?: string;
  trackedTimeSeconds?: number;
}) => {
  const {
    activeTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    elapsedSeconds,
    getElapsedSeconds,
  } = useTimer();

  const todoId = props?.todoId ?? activeTimer?.todoId;
  const trackedTimeSeconds = props?.trackedTimeSeconds ?? 0;

  if (!todoId) {
    throw new Error("todoId is required for useFocusTimer");
  }
  if (!todoId) {
    return {
      activeTimer,
      isPaused: false,
      handleStart: () => {},
      handlePause: () => {},
      handleStop: () => {},
      handlePauseFinish: () => {},
      handleReset: () => {},
    };
  }
  const { saveTrackedTime, saveTodoTimeEntry } = useTodoContext();
  const [isPaused, setIsPaused] = useState(false);
  const seconds = elapsedSeconds(todoId, trackedTimeSeconds);

  const saveDailyEntry = async (seconds: number) => {
    if (seconds <= 0) return;

    const today = new Date().toISOString().slice(0, 10);

    await saveTodoTimeEntry?.(todoId, today, seconds);
  };

  const handleStart = () => {
    console.log("START PROP", trackedTimeSeconds);
    startTimer(todoId, trackedTimeSeconds);
  };

  const handlePause = async () => {
    pauseTimer();

    setIsPaused(true);

    await saveTrackedTime?.(todoId, seconds);

    await saveDailyEntry(seconds);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours} ساعت و ${minutes} دقیقه`;
    }

    if (minutes > 0) {
      return `${minutes} دقیقه`;
    }

    return `${secs} ثانیه`;
  };

  const handleStop = async () => {
    const finalSeconds = getElapsedSeconds(todoId, trackedTimeSeconds);
    pauseTimer();
    await saveTrackedTime?.(todoId, finalSeconds);
    await saveDailyEntry(finalSeconds);
    toast.success(` ${formatDuration(finalSeconds)} تمرکز کردی !`);

    resetTimer();
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

  return {
    activeTimer,
    handleStart,
    handlePause,
    handleStop,
    handlePauseFinish,
    handleReset,
    isPaused,
    resumeTimer,
    resetFocus: resetTimer,
  };
};

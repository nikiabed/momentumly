"use client";
import { useEffect, useState } from "react";
import { MusicPlay, Pause, Play, PlayCircle, Refresh2 } from "iconsax-reactjs";
type TodoTimerProps = { todoId: string };
const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
export const TodoTimer = ({ todoId }: TodoTimerProps) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);
  const handleStart = () => {
    setIsRunning(true);
  };
  const handlePause = () => {
    setIsRunning(false);
  };
  const handleReset = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
  };
  return (
    <div
      className="flex items-center gap-1.5 transition-all duration-300"
      data-todo-id={todoId}
    >
      {!isRunning && elapsedSeconds === 0 ? (
        <button
          type="button"
          onClick={handleStart}
          className=" group flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-black/45 hover:text-rose-500 hover:bg-rose-50 transition-all duration-200 "
        >
          <Play
            size={18}
            className="transition-transform duration-200 group-hover:scale-110 text-gray-800"
          />
        </button>
      ) : (
        <div className=" flex items-center gap-1 rounded-full bg-white/70 border border-rose-100 shadow-sm px-2 py-1 ">
          <button
            type="button"
            onClick={isRunning ? handlePause : handleStart}
            className=" flex items-center justify-center w-6 h-6 rounded-full text-rose-500 hover:bg-rose-50 transition-all "
          >
            {isRunning ? (
              <Pause size={13} variant="Bold" />
            ) : (
              <Play size={13} variant="Bold" />
            )}
          </button>
          <span className=" min-w-[42px] text-center text-xs tabular-nums font-medium text-rose-500 ">
            {formatTime(elapsedSeconds)}
          </span>
          <button
            type="button"
            onClick={handleReset}
            className=" flex items-center justify-center w-5 h-5 rounded-full text-black/25 hover:text-black/50 hover:bg-black/5 transition-all "
          >
            <Refresh2 size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

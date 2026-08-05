"use client";

import { Pause, Play, Stop } from "iconsax-reactjs";
import { useTimer } from "@/app/_utils";

export const FocusControls = () => {
  const { activeTimer, pauseTimer, resumeTimer, resetTimer } = useTimer();

  if (!activeTimer) return null;

  return (
    <div className="flex gap-2">
      {activeTimer.status === "running" ? (
        <button onClick={pauseTimer}>
          <Pause size={18} />
        </button>
      ) : (
        <button onClick={resumeTimer}>
          <Play size={18} />
        </button>
      )}

      <button onClick={resetTimer}>
        <Stop size={18} />
      </button>
    </div>
  );
};

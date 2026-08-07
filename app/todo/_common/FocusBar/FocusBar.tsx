"use client";

import { useTimer } from "@/app/_utils";
import { CurrentTask } from "./CurrentTask";
import { FocusTimer } from "./FocusTimer.tsx";
import { FocusControls } from "./FocusControls";

export const FocusBar = () => {
  const { activeTimer } = useTimer();
  if (!activeTimer) return null;

  return (
    <div
      className="
      fixed
      bottom-6
      left-1/2
      -translate-x-1/2
      z-50
      flex
      items-center
      gap-6
      rounded-3xl
      px-6
      py-4
      bg-background
      border
      border-border-gray
      shadow-2xl
    "
    >
      <CurrentTask />
      <FocusTimer />
      <FocusControls />
    </div>
  );
};

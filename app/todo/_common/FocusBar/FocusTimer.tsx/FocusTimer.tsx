"use client";

import { useEffect, useState } from "react";
import { useTimer } from "@/app/_utils";

const format = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;

  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export const FocusTimer = () => {
  const { activeTimer } = useTimer();

  const [, forceUpdate] = useState(0);

  useEffect(() => {
    if (!activeTimer || activeTimer.status !== "running") return;

    const id = setInterval(() => {
      forceUpdate((v) => v + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [activeTimer]);

  if (!activeTimer) return null;

  const elapsed =
    activeTimer.status === "running"
      ? activeTimer.accumulatedSeconds +
        Math.floor((Date.now() - activeTimer.startedAt) / 1000)
      : activeTimer.accumulatedSeconds;

  return (
    <div className="text-3xl font-light tabular-nums">{format(elapsed)}</div>
  );
};

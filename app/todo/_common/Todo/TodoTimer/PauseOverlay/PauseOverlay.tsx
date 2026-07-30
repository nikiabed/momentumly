"use client";

import { useEffect, useState } from "react";
import { Pause, Wind } from "iconsax-reactjs";

type PauseOverlayProps = {
  onFinish: () => void;
};

const pauseOptions = [
  { label: "۲ دقیقه", value: 2 },
  { label: "۵ دقیقه", value: 5 },
  { label: "۱۰ دقیقه", value: 10 },
  { label: "۱۵ دقیقه", value: 15 },
  { label: "بدون محدودیت", value: null },
];

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PauseOverlay = ({ onFinish }: PauseOverlayProps) => {
  const [duration, setDuration] = useState<number | null>(2);
  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [elapsedPauseSeconds, setElapsedPauseSeconds] = useState(0);

  useEffect(() => {
    if (duration === null) {
      setElapsedPauseSeconds(0);
      return;
    }
    setRemainingSeconds(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (duration === null || remainingSeconds <= 0) return;
    const timeout = setTimeout(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [duration, remainingSeconds]);

  useEffect(() => {
    if (duration !== null && remainingSeconds === 0) {
      onFinish();
    }
  }, [duration, remainingSeconds, onFinish]);

  useEffect(() => {
    if (duration !== null) return;

    const interval = setInterval(() => {
      setElapsedPauseSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const handleDurationChange = (value: number | null) => {
    setDuration(value);

    if (value === null) {
      setElapsedPauseSeconds(0);
    }
  };

  const isUnlimited = duration === null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md"
      style={{ zIndex: 999, background: "#00000066" }}
    >
      <div
        style={{ background: "rgba(255,254,254,0.95)" }}
        className="relative flex w-[min(90vw,430px)] flex-col items-center rounded-4xl px-8 py-10 text-center shadow-2xl"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-4xl">
          <div
            style={{
              background: "rgba(255, 228, 230, 0.5)",
            }}
            className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-pulse"
          />
        </div>

        <div className="relative flex flex-col items-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-400">
            <Wind size={28} />
          </div>

          <p className="mb-2 text-sm text-black/40">
            {isUnlimited ? "یه مکث بدون محدودیت" : "یه مکث کوتاه"}
          </p>

          <h2 className="mb-8 text-xl font-semibold text-gray-800">
            فعلاً هیچ کاری لازم نیست بکنی.
          </h2>

          <div className="mb-8 text-6xl font-light tracking-tight tabular-nums text-rose-400">
            {isUnlimited
              ? formatTime(elapsedPauseSeconds)
              : formatTime(remainingSeconds)}
          </div>

          <div className="relative flex flex-wrap justify-center gap-2">
            {pauseOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => handleDurationChange(option.value)}
                className={`cursor-pointer rounded-full px-4 py-2 text-xs transition-all ${
                  duration === option.value
                    ? "bg-rose-400 text-white shadow-sm"
                    : "bg-gray-100 text-gray-500 hover:bg-rose-50 hover:text-rose-500"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onFinish}
            className="mt-5 cursor-pointer rounded-full px-4 py-2 text-xs text-black/35 transition-all hover:bg-rose-50 hover:text-rose-500"
          >
            برگشت به کار
          </button>

          <div className="mt-8 flex items-center gap-2 text-xs text-black/30">
            <Pause size={13} />
            <span>
              {isUnlimited
                ? "هر وقت آماده بودی، برگرد به کار."
                : "وقتی تایمر تمام شود برمی‌گردیم."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

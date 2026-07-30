"use client";

import { useEffect, useState } from "react";
import { Pause, Wind } from "iconsax-reactjs";

type PauseOverlayProps = {
  onFinish: () => void;
};

const pauseOptions = [2, 5, 10, 15, 20];

const formatCountdown = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PauseOverlay = ({ onFinish }: PauseOverlayProps) => {
  const [duration, setDuration] = useState(2);
  const [remainingSeconds, setRemainingSeconds] = useState(120);

  useEffect(() => {
    setRemainingSeconds(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      onFinish();
      return;
    }

    const timeout = setTimeout(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [remainingSeconds, onFinish]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md"
      style={{ zIndex: "999", background: "#00000066" }}
    >
      <div
        style={{ background: "rgba(255,254,254,0.95)" }}
        className="relative flex  w-[min(90vw,430px)] flex-col items-center rounded-4xl  px-8 py-10 text-center shadow-2xl"
      >
        <div className="absolute inset-0 overflow-hidden rounded-4xl pointer-events-none">
          <div
            style={{
              background: "rgba(255, 228, 230, 0.5)",
            }}
            className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full  blur-3xl animate-pulse"
          />
        </div>

        <div className="relative  flex flex-col items-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-400">
            <Wind size={28} />
          </div>

          <p className="mb-2 text-sm text-black/40">یه مکث کوتاه</p>

          <h2 className="mb-8 text-xl font-semibold text-gray-800">
            فعلاً هیچ کاری لازم نیست بکنی.
          </h2>

          <div className="mb-8 text-6xl font-light tracking-tight tabular-nums text-rose-400">
            {formatCountdown(remainingSeconds)}
          </div>

          <div className="relative  flex flex-wrap justify-center gap-2">
            {pauseOptions.map((minutes) => (
              <button
                key={minutes}
                type="button"
                onClick={() => setDuration(minutes)}
                className={`cursor-pointer rounded-full px-4 py-2 text-xs transition-all ${
                  duration === minutes
                    ? "bg-rose-400 text-white shadow-sm"
                    : "bg-gray-100 text-gray-500 hover:bg-rose-50 hover:text-rose-500"
                }`}
              >
                {minutes} دقیقه
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
            <span>وقتی تایمر تمام شود برمی‌گردیم.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

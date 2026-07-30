"use client";

import { useEffect, useState } from "react";

type CoinAnimationProps = {
  amount: number;
  origin?: {
    x: number;
    y: number;
  };
  onComplete: () => void;
};

export const CoinAnimation = ({
  amount,
  origin,
  onComplete,
}: CoinAnimationProps) => {
  const [target, setTarget] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const counter = document.getElementById("global-coin-counter");

    if (!counter) {
      onComplete();
      return;
    }

    const rect = counter.getBoundingClientRect();

    setTarget({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }, [onComplete]);

  useEffect(() => {
    if (!target) return;

    const timeout = setTimeout(onComplete, 1400);

    return () => clearTimeout(timeout);
  }, [target, onComplete]);

  if (!target) return null;

  const startX = origin?.x ?? window.innerWidth / 2;
  const startY = origin?.y ?? window.innerHeight / 2;

  const deltaX = target.x - startX;
  const deltaY = target.y - startY;

  return (
    <div
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: startX,
        top: startY,
      }}
    >
      <div
        className="relative animate-coin-flight"
        style={
          {
            "--coin-x": `${deltaX}px`,
            "--coin-y": `${deltaY}px`,
          } as React.CSSProperties
        }
      >
        {/* مقدار جایزه */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-lg font-bold text-amber-500 animate-coin-amount">
          +{amount} 🪙
        </div>

        {/* سکه */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full text-5xl animate-coin-spin">
          🪙
        </div>
      </div>
    </div>
  );
};

"use client";

import { createContext, useCallback, useMemo, useRef, useState } from "react";
import { CoinFeedback, FeedbackContextType } from "./feedback.type";
import { CoinAnimation } from "./CoinAnimation";

export const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined,
);

export const FeedbackProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const completeSoundRef = useRef<HTMLAudioElement | null>(null);
  const [coinFeedback, setCoinFeedback] = useState<CoinFeedback | null>(null);

  const coinSoundRef = useRef<HTMLAudioElement | null>(null);

  const todoCompleted = useCallback(() => {
    const audio = completeSoundRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  const coinEarned = useCallback((amount: number) => {
    const audio = coinSoundRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    console.log("🪙 Coin earned:", amount);
    setCoinFeedback({
      id: Date.now(),
      amount,
      origin: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
    });
  }, []);

  const value = useMemo(
    () => ({
      todoCompleted,
      coinEarned,
    }),
    [todoCompleted, coinEarned],
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}

      <audio
        ref={completeSoundRef}
        src="/sounds/todo-complete.mp3"
        preload="auto"
      />

      <audio ref={coinSoundRef} src="/sounds/coin.mp3" preload="auto" />
      {coinFeedback && (
        <CoinAnimation
          key={coinFeedback.id}
          amount={coinFeedback.amount}
          origin={coinFeedback.origin}
          onComplete={() => setCoinFeedback(null)}
        />
      )}
    </FeedbackContext.Provider>
  );
};

import { useContext } from "react";
import { TimerContext } from "../ui/TimerProvider";

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used inside TimerProvider");
  }

  return context;
};

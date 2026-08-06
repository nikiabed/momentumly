import { useFocusTimer } from "@/app/_utils";
import { Pause, Play, Stop } from "iconsax-reactjs";

export const FocusControls = () => {
  const { activeTimer, handlePause, handleStop, handleStart } = useFocusTimer();

  if (!activeTimer) return null;

  return (
    <div>
      {activeTimer.status === "running" ? (
        <button onClick={handlePause}>
          <Pause />
        </button>
      ) : (
        <button onClick={handleStart}>
          <Play />
        </button>
      )}

      <button onClick={handleStop}>
        <Stop />
      </button>
    </div>
  );
};

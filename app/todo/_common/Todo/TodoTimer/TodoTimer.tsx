"use client";

import { Pause, Play, Refresh2, Stop } from "iconsax-reactjs";
import { PauseOverlay } from "./PauseOverlay";
import { useFocusTimer, useTimer } from "@/app/_utils";

type TodoTimerProps = {
  todoId: string;
  trackedTimeSeconds?: number;
};

export const TodoTimer = ({
  todoId,
  trackedTimeSeconds = 0,
}: TodoTimerProps) => {
  const { activeTimer, elapsedSeconds } = useTimer();

  const seconds = elapsedSeconds(todoId, trackedTimeSeconds);
  const isThisTodo = activeTimer?.todoId === todoId;
  const isRunning = isThisTodo && activeTimer?.status === "running";
  const {
    handleStart,
    handlePause,
    handleStop,
    handlePauseFinish,
    handleReset,
    isPaused,
  } = useFocusTimer({ todoId, trackedTimeSeconds });

  return (
    <>
      <div
        className="flex items-center gap-1.5 transition-all duration-300"
        data-todo-id={todoId}
      >
        {!isThisTodo && seconds === 0 ? (
          <button
            type="button"
            onClick={handleStart}
            className="
              group
              flex
              cursor-pointer
              items-center
              gap-1.5
              rounded-full
              py-1
              pl-1
              pr-2
              text-xs
              transition-all
              duration-200
              hover:text-rose-500
            "
          >
            <Play
              size={16}
              className="
                text-foreground
                transition-transform
                duration-200
                group-hover:scale-125
              "
            />
          </button>
        ) : (
          <div
            className="
              flex
              items-center
              gap-1
              rounded-xl
              bg-background/70
              px-4
              py-1
              shadow-sm
            "
            style={{
              border: "1px solid var(--border-gray)",
            }}
          >
            <div
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                text-rose-500
              "
            >
              {isRunning ? (
                <div className="flex gap-1">
                  <button onClick={handleStop}>
                    <Stop size={13} />
                  </button>

                  <button onClick={handlePause}>
                    <Pause size={13} />
                  </button>
                </div>
              ) : (
                <button onClick={handleStart}>
                  <Play size={13} />
                </button>
              )}
            </div>

            <span
              className="
    text-xs
    font-medium
    text-rose-500
    whitespace-nowrap
  "
            >
              در حال انجام
            </span>

            <button
              onClick={handleReset}
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                text-foreground
                hover:bg-foreground/5
              "
            >
              <Refresh2 size={12} />
            </button>
          </div>
        )}
      </div>

      {isPaused && <PauseOverlay onFinish={handlePauseFinish} />}
    </>
  );
};

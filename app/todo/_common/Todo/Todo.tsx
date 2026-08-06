"use client";

import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";
import { useMemo } from "react";
import { SidebarProps } from "../Sidebar";
import { AITaskBreaker } from "./AI";
import { FocusBar } from "../FocusBar";

export const Todo = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { uiBoard, searchText, activeBoard, systemBoards, activeTool } =
    useTodoContext();
  const active = useMemo(() => {
    if (searchText) {
      return systemBoards?.search;
    }

    if (activeBoard && systemBoards?.[activeBoard]) {
      return systemBoards[activeBoard];
    }

    return uiBoard?.find((b) => b.boardKey === activeBoard);
  }, [activeBoard, searchText, uiBoard, systemBoards]);

  if (!uiBoard?.length) {
    return (
      <div className="flex flex-col gap-8 px-16 py-5 animate-pulse">
        <div className="space-y-3">
          <div className="h-8 w-56 rounded-lg bg-foreground/10" />
          <div className="h-4 w-32 rounded bg-foreground/10" />
        </div>
        <div className="h-11 rounded-xl bg-foreground/10" />
        <div className="space-y-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-border-gray p-4"
            >
              <div className="h-5 w-5 rounded-full bg-foreground/10" />
              <div className="h-4 flex-1 rounded bg-foreground/10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {activeTool === "ai-breaker" ? (
        <AITaskBreaker />
      ) : (
        active && (
          <div>
            <Board
              item={active}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            <FocusBar />
          </div>
        )
      )}
    </>
  );
};

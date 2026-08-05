"use client";

import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";
import { useMemo } from "react";
import { SidebarProps } from "../Sidebar";
import { AITaskBreaker } from "./AI";

export const Todo = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { uiBoard, searchText, activeBoard, systemBoards, activeTool } =
    useTodoContext();
  console.log("activeTool", activeTool);

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
    return <div>Loading boards...</div>;
  }

  return (
    <>
      {activeTool === "ai-breaker" ? (
        <AITaskBreaker />
      ) : (
        active && (
          <Board
            item={active}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )
      )}
    </>
  );
};

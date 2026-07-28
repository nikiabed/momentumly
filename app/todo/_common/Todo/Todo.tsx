"use client";

import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";
import { useMemo } from "react";
import { SidebarProps } from "../Sidebar";

export const Todo = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { uiBoard, searchText, activeBoard, systemBoards } = useTodoContext();

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

  return active ? (
    <Board
      item={active}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />
  ) : null;
};

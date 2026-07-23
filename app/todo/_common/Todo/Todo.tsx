"use client";

import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";
import { useMemo } from "react";
import { BOARD_KEYS } from "@/app/_utils";

export const Todo = ({ sidebarOpen, setSidebarOpen }: any) => {
  const { loading, uiBoard, searchText, activeBoard, systemBoards } =
    useTodoContext();

  const active = useMemo(() => {
    if (searchText) {
      return systemBoards?.search;
    }
    if (activeBoard && systemBoards?.[activeBoard]) {
      return systemBoards[activeBoard];
    }
    return uiBoard?.find((b) => b.boardKey === activeBoard);
  }, [activeBoard, searchText, uiBoard]);

  if (!uiBoard?.length) {
    return <div>Loading boards...</div>;
  }

  if (loading)
    return (
      <div
        className={`bg-gray-300  overflow-y-auto h-screen w-full py-5`}
      ></div>
    );

  return active ? (
    <Board
      item={active}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />
  ) : null;
};

"use client";

import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";
import { useMemo } from "react";
import type { Board as BoardType } from "@/app/types";

export const Todo = ({ sidebarOpen, setSidebarOpen }: any) => {
  const { loading, uiBoard, searchText, activeBoard } = useTodoContext();

  console.log(uiBoard, activeBoard);

  const systemBoards: Record<string, BoardType> = {
    important: {
      _id: "important",
      title: "Important",
      boardKey: "important",
      icon: "Star1",
      color: "important",
      order: 2,
      editable: false,
      isEdit: false,
      filter: (todo: any) => todo.isImportant,
      theme: "fire",
      state: false,
    },
    search: {
      _id: "search",
      title: "Search",
      boardKey: "search",
      icon: "SearchNormal1",
      color: "search",
      editable: false,
      isEdit: false,
      order: 0,
      theme: "purple",
      filter: (todo: any) =>
        searchText &&
        todo.title.toLowerCase().includes(searchText.toLowerCase()),
      state: false,
    },
  };

  const active = useMemo(() => {
    if (searchText) return systemBoards.search;
    return uiBoard?.find((b) => b.boardKey === activeBoard) ?? uiBoard?.[0];
  }, [searchText, uiBoard, activeBoard]);

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

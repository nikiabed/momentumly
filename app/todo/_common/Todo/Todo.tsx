"use client";

import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";

export const Todo = ({ sidebarOpen, setSidebarOpen }: any) => {
  const { loading, uiBoard, searchText, activeBoard } = useTodoContext();
  const searchView = {
    _id: "search",
    title: "Search",
    boardKey: "search",
    icon: "SearchNormal1",
    color: "search",
    editable: false,
    isEdit: false,
    order: 0,
    theme: "purple",
  };
  const active = searchText
    ? searchView
    : uiBoard?.find((b) => b.boardKey === activeBoard);

  if (loading)
    return (
      <div
        className={`bg-gray-300  overflow-y-auto h-screen w-full py-5`}
      ></div>
    );

    console.log(sidebarOpen,"sidebar")
  return active ? (
    <Board
      item={active}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />
  ) : null;
};

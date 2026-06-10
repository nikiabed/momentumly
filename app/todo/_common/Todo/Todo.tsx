"use client";

import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";

export const Todo = () => {
  const {  loading, todo, boardList } = useTodoContext();
  const importantView = {
    _id: "important",
    title: "Important",
    boardKey: "important",
    icon: "Star1",
    color: "important",
    state: false,
    filter: (todo: any) => todo.isImportant,
  };
  const hasImportant = todo.some((t) => t.isImportant);
  const exists = boardList?.some((f) => f.title === "Important");
  const finalBoard = hasImportant && !exists ? [...boardList, importantView] : boardList;
  const activeBoard = finalBoard?.find((b) => b.state);

  if (loading)
    return (
      <div
        className={`bg-gray-300 overflow-hidden flex-4 h-screen w-full py-5`}
      ></div>
    );
  return activeBoard ? (
    <Board item={activeBoard} />
  ) : null;
};

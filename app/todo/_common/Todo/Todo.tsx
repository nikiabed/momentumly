"use client";

import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";

export const Todo = () => {
  const { focused, loading, todo } = useTodoContext();
  const importantView = {
    _id: "important",
    title: "Important",
    icon: "Star1",
    color: "important",
    state: false,
    filter: (todo: any) => todo.isImportant,
  };
  const hasImportant = todo.some((t) => t.isImportant);
  const finalFocused = hasImportant ? [...focused, importantView] : focused;
  const activeBoard = finalFocused?.find((item) => item.state);

  if (loading)
    return (
      <div
        className={`bg-gray-300 overflow-hidden flex-4 h-screen w-full py-5`}
      ></div>
    );
  return activeBoard ? <Board key={activeBoard._id} /> : null;
};

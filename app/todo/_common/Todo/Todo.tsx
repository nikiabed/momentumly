"use client";

import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";

export const Todo = () => {
  const { loading, todo, finalBoard } = useTodoContext();
  const selectedBoard = finalBoard?.find((b) => b.state);

  console.log("TODO", todo);

  console.log(
    "HAS IMPORTANT",
    todo.some((t) => t.isImportant),
  );

  console.log("FINAL BOARD", finalBoard);

  console.log("ACTIVE", selectedBoard);
  if (loading)
    return (
      <div
        className={`bg-gray-300 overflow-hidden flex-4 h-screen w-full py-5`}
      ></div>
    );
  return selectedBoard ? <Board item={selectedBoard} /> : null;
};

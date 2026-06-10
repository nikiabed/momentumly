"use client";

import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";

export const Todo = () => {
  const { loading, finalBoard } = useTodoContext();
  const selectedBoard = finalBoard?.find((b) => b.state);

  if (loading)
    return (
      <div
        className={`bg-gray-300 overflow-hidden flex-4 h-screen w-full py-5`}
      ></div>
    );
  return selectedBoard ? <Board item={selectedBoard} /> : null;
};

"use client";

import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";

export const Todo = () => {
  const { focused, loading } = useTodoContext();
  if (loading) return <div className={`bg-gray-300 overflow-hidden flex-4 h-screen w-full py-5`}></div>
  return (
    <>
      {focused?.map((item: any) => {
        if (item.state) {
          return <Board key={item.id} />;
        }
      })}
    </>
  );
};

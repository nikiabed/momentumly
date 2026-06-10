"use client";

import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";

export const Todo = () => {
  const { focused, } = useTodoContext();
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

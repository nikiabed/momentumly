"use client";

import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";

export const Todo = () => {
  const { focused, setFocused } = useTodoContext();
  return (
    <>
      {focused?.map((item: any) => {
        if (item.state) {
          return <Board item={item} key={item.id} />;
        }
      })}
    </>
  );
};

"use client";

import { memo } from "react";
import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Board } from "./Board";

export const Todo = () => {
  const { focused } = useTodoContext();
  console.log("todo");
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

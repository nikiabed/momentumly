"use client";

import { useContext } from "react";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import Board from "./Board";

export default function Todo() {
  const { focused } = useContext(TodoContext);
  return (
    <>
      {focused?.map((item: any) => {
        if (item.state) {
          return <Board item={item} key={item.id} />;
        }
      })}
    </>
  );
}

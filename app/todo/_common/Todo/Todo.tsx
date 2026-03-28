"use client";

import { useContext, useState } from "react";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";

export default function Todo() {
  const { focused, newList } = useContext(TodoContext);
  return (
    <>
      {focused?.map((item: any) => {
        if (item.state) {
          let Component = item.component;
          return <Component item={item} key={item.id} />;
        }
      })}
    </>
  );
}

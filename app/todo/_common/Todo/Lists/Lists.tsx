"use client";

import { ArrowDown2 } from "iconsax-reactjs";
import { useState } from "react";
import { TodoList as TodoListType } from "@/app/types";
import { TodoDateList } from "../TodoDateList";

export const Lists = ({ todo, list }: { todo: TodoListType; list: string }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className=" cursor-pointer bg-background px-1 items-center max-w-44 justify-between py-1 text-md rounded-md text-foreground flex gap-2 hover:bg-background/50"
      >
        <div className="flex items-center gap-2.5">
          <ArrowDown2
            className={`${isOpen ? "rotate-0" : "rotate-90"} transition-all`}
            size={15}
          />
          <span>{list}</span>
        </div>
        <span className="text-sm bg-rose-400 text-pink-50 rounded-lg px-2">
          {todo.length}
        </span>
      </div>
      {isOpen && <TodoDateList todo={todo} />}
    </div>
  );
};

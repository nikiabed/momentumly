"use client"

import { TodoContext } from "@/app/_utils/hooks";
import { ArrowDown2 } from "iconsax-reactjs";
import { useContext, useState } from "react";
import { TodoList } from "../TodoList";


export const Lists = ({ todo, list }: any) => {
  const [isOpen, setOpen] = useState(true);
  const { setTodo } = useContext(TodoContext);

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className=" cursor-pointer bg-pink-200 px-1 items-center max-w-44 justify-center py-1 text-md rounded-md text-black flex gap-2 hover:bg-pink-50"
      >
        {
          <ArrowDown2
            className={`${isOpen ? "rotate-0" : "rotate-90"} transition-all`}
            size={15}
          />
        }

        <span>{list.title}</span>
        <span className="text-sm bg-rose-400 text-pink-50 rounded-lg px-2">
          {todo.length}
        </span>
      </div>
      {isOpen && <TodoList todo={todo} setTodo={setTodo} />}
    </div>
  );
};
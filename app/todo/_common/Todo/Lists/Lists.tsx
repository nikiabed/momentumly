"use client";

import { TodoContext } from "@/app/_utils/hooks";
import { ArrowDown2 } from "iconsax-reactjs";
import { useContext, useState } from "react";
import { TodoList } from "../TodoList";
import { t } from "@/app/i18n/t";
import { titleToKey } from "../../Sidebar";

export const Lists = ({ todo, list }: any) => {
  const [isOpen, setOpen] = useState(false);
  const { setTodo } = useContext(TodoContext);

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className=" cursor-pointer bg-pink-200 px-1 items-center max-w-44 justify-between py-1 text-md rounded-md text-black flex gap-2 hover:bg-pink-50"
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
      {isOpen && <TodoList todo={todo} setTodo={setTodo} />}
    </div>
  );
};

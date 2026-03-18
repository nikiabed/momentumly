import { useState } from "react";
import { TodoListItems } from "./TodoListItems";
import { completed, TodoListType } from "./Todo.const";
import { ArrowDown2 } from "iconsax-reactjs";

export default function CompletedList({ todo }: { todo: TodoListType }) {
  const [isOpen, setOpen] = useState(true);
  return (
    <>
      <div className=" bg-pink-200 px-1 items-center max-w-44 justify-center py-1 text-md rounded-md text-black flex gap-2 hover:bg-pink-50">
        {
          <ArrowDown2
            className={`${isOpen ? "rotate-0" : "rotate-90"} transition-all`}
            size={15}
            onClick={() => setOpen((prev) => !prev)}
          />
        }

        <span>{completed.header}</span>
        <span className="text-sm bg-rose-400 text-pink-50 rounded-lg px-2">
            {todo.length}
          </span>
      </div>

      {isOpen && (
        <ul className="flex flex-col gap-1 w-full">
          {todo.map((list: any) => {
            return <TodoListItems key={list.id} list={list} />;
          })}
        </ul>
      )}
    </>
  );
}

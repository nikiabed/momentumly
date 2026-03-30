import { useState } from "react";
import { TodoListItems } from "./TodoListItems";
import { completed, TodoListType } from "./Todo.const";
import { ArrowDown2 } from "iconsax-reactjs";

export default function CompletedList({ todo }: { todo: TodoListType }) {
  const [isOpen, setOpen] = useState(true);
  return (
    <>
      

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

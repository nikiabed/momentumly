import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import { useContext } from "react";
import { TodoListItems } from "./TodoListItems";
import { TodoListType } from "./Todo.const";

export default function CompletedList({ todo }: { todo: TodoListType }) {
  
  return (
    <>
      <h1 className="text-white font-semibold">تموم شده ها</h1>
      <ul className="flex flex-col gap-1 w-full">
        {todo.map((list: any, idx: number) => {
          return (
              <TodoListItems key={list.id} list={list} idx={idx} />
          );
        })}
      </ul>
    </>
  );
}

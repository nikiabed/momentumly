"use client";
import { useContext } from "react";
import { TodoListItems } from "./TodoListItems";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import { TodoListType } from "./Todo.const";

export default function TodoList({ todo }: { todo: TodoListType }) {
  // const { todo } = useContext(TodoContext);
  return (
    <>
      <ul className="flex flex-col gap-1 w-full">
        {todo.map((list: any, idx: number) => {
          return <TodoListItems key={list.id} list={list} idx={idx} />;
        })}
      </ul>
    </>
  );
}

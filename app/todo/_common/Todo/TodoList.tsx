"use client";
import { useContext } from "react";
import { TodoListItems } from "./TodoListItems";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";

export default function TodoList() {
  const { todo, isCompleted } = useContext(TodoContext);
  console.log(isCompleted)

  return (
    <>
      <ul className="flex flex-col gap-1 w-full">
        {todo.map((list: any, idx: number) => {
          return (
            <div key={idx + 80}>
              {!list.status && (
                <TodoListItems key={idx} list={list} idx={idx} />
              )}
            </div>
          );
        })}
      </ul>

      {isCompleted && isCompleted.length>1 && !isCompleted.includes(false)  && (
        <h1 className="text-white font-semibold">تموم شده ها</h1>
      )}
      <ul className="flex flex-col gap-1 w-full">
        {todo.map((list: any, idx: number) => {
          return (
            <div key={idx + 100}>
              {list.status && (
                <TodoListItems key={idx + 50} list={list} idx={idx} />
              )}
            </div>
          );
        })}
      </ul>
    </>
  );
}

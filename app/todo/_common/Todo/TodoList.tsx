"use client";
import { TodoListItems } from "./TodoListItems";
import { TodoListType } from "./Todo.const";

export default function TodoList({ todo }: { todo: TodoListType }) {
  return (
    <>
      <ul className="flex flex-col gap-1 w-full">
        {todo.map((list: any) => {
          return <TodoListItems key={list.id} list={list} />;
        })}
      </ul>
    </>
  );
}

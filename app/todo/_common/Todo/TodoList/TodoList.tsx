"use client";

import { Dispatch, SetStateAction } from "react";
import { TodoList as TodoListType } from "@/app/types";
import { TodoListItems } from "../TodoListItem";

export const TodoList = ({
  todo,
}: {
  todo: TodoListType;
  setTodo: Dispatch<SetStateAction<TodoListType>>;
}) => {
  if (!todo?.length) {
    return <div className="text-muted">کاری پیدا نشد!</div>;
  }
  return (
    <ul className="flex flex-col gap-1">
      {todo
        .filter((item) => !item.parentTodoId)
        .map((parent) => {
          const children = todo.filter(
            (child) => child.parentTodoId === parent._id,
          );

          return (
            <TodoListItems key={parent._id} list={parent} subTodos={children} />
          );
        })}
    </ul>
  );
};

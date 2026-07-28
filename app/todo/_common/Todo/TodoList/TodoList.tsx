"use client";
import { Dispatch, SetStateAction } from "react";
import { TodoListItems } from "../TodoListItem";
import { Todo, TodoList as TodoListType } from "@/app/types";

export const TodoList = ({
  todo,
}: {
  todo: TodoListType;
  setTodo: Dispatch<SetStateAction<TodoListType>>;
}) => {
  return (
    <>
      <ul className="flex flex-col gap-1">
        {todo.map((list: Todo) => {
          return <TodoListItems key={list._id} list={list} />;
        })}
      </ul>
    </>
  );
};

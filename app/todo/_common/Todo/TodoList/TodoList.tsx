"use client";

import { Dispatch, SetStateAction, useMemo } from "react";
import { TodoListItems } from "../TodoListItem";
import { Todo, TodoList as TodoListType } from "@/app/types";

export const TodoList = ({
  todo,
  setTodo,
}: {
  todo: TodoListType;
  setTodo: Dispatch<SetStateAction<TodoListType>>;
}) => {
  const todoTree = useMemo(() => {
    const parents = todo.filter((item) => !item.parentTodoId);
    return parents.map((parent) => ({
      ...parent,
      children: todo.filter((child) => child.parentTodoId === parent._id),
    }));
  }, [todo]);

  return (
    <ul className="flex flex-col gap-1">
      {todoTree.map((list) => (
        <TodoListItems key={list._id} list={list} subTodos={list.children} />
      ))}
    </ul>
  );
};

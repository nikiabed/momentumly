"use client";

import { Dispatch, SetStateAction } from "react";
import { TodoListItems } from "../TodoListItem";
import { TodoList as TodoListType } from "@/app/types";

export const TodoList = ({
  todo,
  allTodos,
  setTodo,
}: {
  todo: TodoListType;
  allTodos: TodoListType;
  setTodo: Dispatch<SetStateAction<TodoListType>>;
}) => {
  const normalizeId = (id: unknown) => {
    if (id == null) return null;
    return String(id);
  };

  const parents = todo.filter(
    (item) => item.parentTodoId == null
  );

  const todoTree = parents.map((parent) => {
    const parentId = normalizeId(parent._id);
    const children = allTodos.filter(
      (child) =>
        normalizeId(child.parentTodoId) === parentId
    );

    return {
      ...parent,
      children,
    };
  });

  return (
    <div className="flex flex-col gap-1">
      {todoTree.map((list) => (
        <TodoListItems
          key={list._id}
          list={list}
          subTodos={list.children}
        />
      ))}
    </div>
  );
};

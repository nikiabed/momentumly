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

  // todo = فقط Parentهای همین گروه تاریخ
  const parents = todo.filter(
    (item) => item.parentTodoId == null
  );

  const todoTree = parents.map((parent) => {
    const parentId = normalizeId(parent._id);

    // allTodos = کل Todoهای Board
    const children = allTodos.filter(
      (child) =>
        normalizeId(child.parentTodoId) === parentId
    );

    return {
      ...parent,
      children,
    };
  });

  console.log("TODO:", todo.length);
  console.log("ALL TODOS:", allTodos.length);

  console.log(
    "TREE:",
    todoTree.map((item) => ({
      id: item._id,
      title: item.title,
      children: item.children.length,
    }))
  );

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

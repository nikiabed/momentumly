"use client";

import { Context, TodoListType } from "@/app/todo/_common/Todo/Todo.const";
import { createContext, useState } from "react";

export const TodoContext = createContext<Context>({
  todo: [{ id: "", title: "string", status: false }],
});

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todo, setTodo] = useState<TodoListType>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const addTodo = (title: string, status: boolean) => {
    let newTask = { id: crypto.randomUUID(), title: title, status: status };
    setTodo((prev)=>[...prev, newTask]);
    setInputValue("");
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputValue.length != 0) {
      addTodo(inputValue, false);
    }
  };

  const handleDelete = (index: string) => {
    setTodo((list: any) => {
      return list.filter((l: any) => l.id !== index);
    });
  };

  const changeTaskState = (index: string) => {
    setTodo((prev: any) =>
      prev.map((item: any) =>
        item.id === index ? { ...item, status: !item.status } : item,
      ),
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        inputValue,
        addTodo,
        handleChange,
        handleDelete,
        changeTaskState,
        handleSubmit,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

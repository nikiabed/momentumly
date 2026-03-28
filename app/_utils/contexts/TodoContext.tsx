"use client";

import All from "@/app/todo/_common/Todo/All/All";
import Complete from "@/app/todo/_common/Todo/Complete/Complete";
import Progress from "@/app/todo/_common/Todo/Progress/Progress";
import Today from "@/app/todo/_common/Todo/Today/Today";
import {
  Context,
  sidebar,
  todoData,
  TodoListType,
} from "@/app/todo/_common/Todo/Todo.const";
import { Card, Chart, Sun1, TickCircle } from "iconsax-reactjs";
import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext<Context>({
  todo: [{ id: "", title: "string", status: false, isEdit: false }],
});

export const save = (todo: any) => {
  localStorage.setItem("todo", JSON.stringify(todo));
};

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todo, setTodo] = useState<TodoListType>(todoData);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const item = localStorage.getItem("todo");
    const parsed = item && JSON.parse(item);
    setTodo(parsed);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    save(todo);
  }, [todo]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editedTask, setEditedTask] = useState<string>("");
  const [focused, setFocused] = useState([
    {
      title: sidebar.myDay,
      state: true,
      id: "1",
      icon: Sun1,
      component: Today,
    },
    {
      title: sidebar.All,
      state: false,
      id: "2",
      icon: Card,
      component: All,
    },
    {
      title: sidebar.complete,
      state: false,
      id: "3",
      icon: TickCircle,
      component: Complete,
    },
    {
      title: "پیشرفت",
      state: false,
      id: "4",
      icon: Chart,
      component: Progress,
    },
  ]);

  const addTodo = (title: string, status: boolean) => {
    let newTask = { id: crypto.randomUUID(), title: title, status: status };
    setTodo((prev: any) => {
      let clone = [...prev, newTask];
      return clone;
    });
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

  const handleNewChange = (index: string) => {
    const newList = todo.map((l: any) => {
      if (index === l.id) {
        l.title = editedTask;
        return l;
      }
      return l;
    });
    setTodo(newList);
    handleIsEdit(index)
  };

  const handleEditedTask = (e: any) => {
    setEditedTask(e.target.value);
  };

  const handleIsEdit = (index: string) => {
    setTodo((prev: any) =>
      prev.map((item: any) =>
        item.id === index ? { ...item, isEdit: !item.isEdit } : item,
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
        handleNewChange,
        setEditedTask,
        handleEditedTask,
        handleIsEdit,
        focused,
        setFocused,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

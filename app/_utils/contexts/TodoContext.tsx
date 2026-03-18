"use client";

import All from "@/app/todo/_common/Todo/All/All";
import Complete from "@/app/todo/_common/Todo/Complete/Complete";
import Today from "@/app/todo/_common/Todo/Today/Today";
import {
  Context,
  sidebar,
  TodoListType,
} from "@/app/todo/_common/Todo/Todo.const";
import { Card, SearchNormal1, Sun1, TickCircle } from "iconsax-reactjs";

import { createContext, useState } from "react";

export const TodoContext = createContext<Context>({
  todo: [{ id: "", title: "string", status: false }],
});

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todo, setTodo] = useState<TodoListType>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editedTask, setEditedTask] = useState<string>("");
  const [isEdit, setEdit] = useState<boolean>(false);
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
  ]);

  const addTodo = (title: string, status: boolean) => {
    let newTask = { id: crypto.randomUUID(), title: title, status: status };
    setTodo((prev) => [...prev, newTask]);
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
    // console.log(todo);
    // setTodo((prev: any) =>
    //   prev.map((list: any) => {
    //     index === list.id
    //       ? { ...list, title: editedTask, status: list.status }
    //       : list;
    //   })
    // );
    const newList = todo.map((l: any) => {
      if (index === l.id) {
        l.title = editedTask;
        return l;
      }
      return l;
    });
    setTodo(newList);
    setEdit(() => !isEdit);
  };

  const handleEditedTask = (e: any) => {
    setEditedTask(e.target.value);
    console.log(editedTask);
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
        setEdit,
        isEdit,
        setEditedTask,
        handleEditedTask,
        focused,
        setFocused,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

"use client"
import { Context } from "@/app/todo/_common";
import { createContext, useContext } from "react";

export const TodoContext = createContext<Context>({
  todo: [
    {
      id: "",
      title: "This is A Default Value",
      status: false,
      isEdit: false,
      date: "",
      isImportant: false,
      item: "",
    },
  ],
});

export const useTodoContext = () => useContext(TodoContext);
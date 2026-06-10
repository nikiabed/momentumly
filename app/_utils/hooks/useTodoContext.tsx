"use client";
import { Context } from "@/app/todo/_common";
import { createContext, useContext } from "react";

export const TodoContext = createContext<Context>({
  todo: [
    {
      _id: "",
      title: "This is A Default Value",
      status: false,
      isImportant: false,
      boardKey: "",
      item: "",
      createdAt: "",
    },
  ],
  focused: []
});

export const useTodoContext = () => useContext(TodoContext);

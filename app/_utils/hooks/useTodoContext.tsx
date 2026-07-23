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
      isEdit: false,
      deadline: null,
      myDayDate: null,
      attachment: null,
      completedAt: null,

    },
  ],
  boardList: []
});

export const useTodoContext = () => useContext(TodoContext);

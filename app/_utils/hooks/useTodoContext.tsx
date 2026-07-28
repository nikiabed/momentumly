"use client";

import { Context } from "@/app/todo/_common";
import { createContext, useContext } from "react";

export const TodoContext = createContext<Context | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodoContext must be used inside TodoContext.Provider");
  }

  return context;
};

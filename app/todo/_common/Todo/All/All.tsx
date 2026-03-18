import React, { useContext } from "react";
import Header from "../Today/Header/Header";
import CompletedList from "../CompletedList";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import TodoList from "../TodoList";

const All = ({ item }: any) => {
  const { todo } = useContext(TodoContext);
  const notCompletedTodo = todo.filter((list: any) => !list.status);
  const completedTodo = todo.filter((list: any) => list.status);
  const Icon = item.icon
  return (
    <div className="overflow-y-auto flex-4 flex gap-3 flex-col bg-linear-45 from-purple-300 to-purple-400 h-screen p-15">
      <div className="flex gap-5 text-rose-50">
        <Icon size={40} />
        <h2 className="font-semibold text-3xl">{item.title}</h2>
      </div>
      {<TodoList todo={todo} />}
    </div>
  );
};

export default All;

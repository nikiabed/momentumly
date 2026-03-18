import React, { useContext } from "react";
import Header from "../Today/Header/Header";
import CompletedList from "../CompletedList";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";

const Complete = () => {
  const { todo } = useContext(TodoContext);
  const notCompletedTodo = todo.filter((list: any) => !list.status);
  const completedTodo = todo.filter((list: any) => list.status);
  return (
    <div className="overflow-y-auto flex-4 flex gap-3 flex-col bg-linear-45 from-purple-300 to-rose-400 h-screen p-15">
      {<CompletedList todo={completedTodo} />}
    </div>
  );
};

export default Complete;

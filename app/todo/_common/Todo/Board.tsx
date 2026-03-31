"use client";
import { useContext } from "react";
import { ListItemProps, sidebar, TodoListType, TodoType } from "./Todo.const";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import Header from "../Header/Header";

const Board = ({ item }: { item: ListItemProps }) => {
  const color = item.color;
  const { todo, setTodo } = useContext(TodoContext);

  const filtered = todo.filter((list: TodoType) => {
    switch (item.title) {
      case sidebar.myDay:
        const date = new Date();
        return !list.status && list.date === date.toDateString();
      case sidebar.important:
        return list.isImportant;
      case sidebar.All:
        return list;
      case sidebar.complete:
        return list.status;
      default:
        return;
    }
  });
  return (
    <div
      className={` from-${color[0]} to-${color[1]} overflow-y-auto flex-4 flex gap-4 flex-col bg-linear-45 h-screen px-15 pt-5`}
    >
      <Header item={item} />
      {item.title === sidebar.myDay && <TodoInput />}
      <TodoList todo={filtered} setTodo={setTodo} />
    </div>
  );
};

export default Board;

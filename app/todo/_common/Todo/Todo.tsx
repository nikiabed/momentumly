"use client";
import { useEffect, useState } from "react";
import { Status } from "./Todo.const";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import Header from "./Header/Header";

export default function Todo() {
  const [todoList, setTodoList] = useState<
    Array<{ id: number; title: string; status: Status }>
  >([]);

  const [task, setTask] = useState({ id: 0, title: "hi", status: Status.done });
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: any) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addTodo(inputValue, Status.isPending);
  };

  useEffect(() => {
    setInputValue(inputValue);
  }, [inputValue]);

  useEffect(() => {
    setTodoList([task, ...todoList]);
  }, [task]);

  const addTodo = (title: string, status: Status) => {
    setTask({ id: title.length + 1, title, status });
    setInputValue("");
    
  };

  return (
    <div className="flex-4 flex flex-col bg-linear-45 from-purple-300 to-rose-400 h-screen p-15">
      <Header />
      <TodoInput
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
      />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import Header from "./Header/Header";

export default function Todo() {
  const [todoList, setTodoList] = useState<
    Array<{ id: number; title: string; status: boolean }>
  > ([]);

  const [task, setTask] = useState<{ id: number; title: string; status: boolean } | undefined>();
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: any) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputValue.length !=0) {
      addTodo(inputValue, false);
    }
  };

  useEffect(() => {
    setInputValue(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if(task) {
      setTodoList([task, ...todoList]);
    }
  }, [task]);

  const addTodo = (title: string, status: boolean) => {
    console.log(task)
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
      <TodoList todoList={todoList} setTodoList={setTodoList} task={task} setTask={setTask}/>
    </div>
  );
}

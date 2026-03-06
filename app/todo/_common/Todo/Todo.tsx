"use client"
import { useEffect, useState } from "react";
import { Status } from "./Todo.const";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";

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
    console.log(todoList);
  }, [task]);

  const addTodo = (title: string, status: Status) => {
    setTask({ id: title.length + 1, title, status });
    setInputValue("");
    console.log(todoList);
  };

  return (
    <div className=" flex flex-col items-center bg-linear-45 from-purple-300 to-rose-400 h-screen">
      <h1>To Do List</h1>
      <TodoInput handleChange={handleChange} handleSubmit={handleSubmit} inputValue={inputValue}/>
      <div>
        <TodoList todoList={todoList} />
      </div>
    </div>
  );
}

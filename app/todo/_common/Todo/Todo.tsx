"use client";
import { useContext, useEffect, useState } from "react";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import Header from "./Header/Header";
import { TodoListType } from "./Todo.const";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";

export default function Todo() {
  // const [todoList, setTodoList] = useState<
  //   Array<{ id: number; title: string; status: boolean }>
  // >([]);

  // const [inputValue, setInputValue] = useState<string>("");

  // const handleChange = (e: any) => {
  //   e.preventDefault();
  //   setInputValue(e.target.value);
  // };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   if (inputValue.length != 0) {
  //     addTodo(inputValue, false);
  //   }
  // };

  // const addTodo = (title: string, status: boolean) => {
  //   let newTask = { id: title.length, title: title, status: status };
  //   setTodoList([...todoList, newTask]);
  //   setInputValue("");
  // };

  // const handleDelete = (index: number) => {
  //   setTodoList((list: TodoListType) => {
  //     return list.filter((_: any, i: number) => i !== index);
  //   });
  // };

  // const changeTaskState = (index: number) => {
  //   const updatedList = todoList.map((list: any, idx: number) => {
  //     // change status
  //     if (idx === index) {
  //       list.status = !list.status;
  //       if (list.status) {
  //         setIscompleted(true);
  //       }
  //       return list;
  //     }
  //     return list;
  //   });
  //   setTodoList(updatedList);
  // };

  return (
    <div className="overflow-y-auto flex-4 flex gap-3 flex-col bg-linear-45 from-purple-300 to-rose-400 h-screen p-15">
      <Header />
      <TodoInput />
      <TodoList
      />
    </div>
  );
}

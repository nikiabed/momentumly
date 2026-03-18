import React from "react";
import { useContext, useEffect, useRef, useState } from "react";

import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import Header from "../Header/Header";
import TodoInput from "../TodoInput";
import TodoList from "../TodoList";
import CompletedList from "../CompletedList";

const Today = () => {
  const { todo } = useContext(TodoContext);
  const notCompletedTodo = todo.filter((list: any) => !list.status);
  const completedTodo = todo.filter((list: any) => list.status);
  
  const [dragCapture, setDragCap] = useState(false);
  const handleDrag = (e: any) => {
    console.log(e.target.id);
    e.dataTransfer.setData("text", e.target.id);
  };
  const handleDragCapture = () => {
    console.log(dragCapture);
    setDragCap(true);
  };
  const handleDragLeave = () => {
    console.log(dragCapture);
    setDragCap(false);
  };

  const [dropped, setDrop] = useState(false);
  const [dropped1, setDrop1] = useState(false);
  const handleOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    const draggedId = e.dataTransfer.getData("text");
    if (draggedId === "white") {
      setDrop(true);
    } else {
      setDrop1(true);
    }
  };

  return (
    <div className="overflow-y-auto flex-4 flex gap-3 flex-col bg-linear-45 from-purple-300 to-rose-400 h-screen p-15">
      <Header />
      <TodoInput />
      <TodoList todo={notCompletedTodo} />
      {completedTodo.length > 0 && <CompletedList todo={completedTodo} />}
      <div className="flex gap-10">
        <div>
          {!dropped && (
            <div
              id="white"
              onDragStart={handleDrag}
              draggable={true}
              className="text-center w-50 h-50 bg-white transition-all ease-in-out"
            >
              Box1
            </div>
          )}
          {!dropped1 && (
            <div
              id="yellow"
              onDragStart={handleDrag}
              draggable={true}
              className="text-center w-50 h-50 bg-yellow-300"
            >
              Box2
            </div>
          )}
        </div>
        <div
          id="gray"
          onDrop={handleDrop}
          onDragOver={handleOver}
          onDragEnter={handleDragCapture}
          onDragLeave={handleDragLeave}
          className={` ${dragCapture ? "border border-black" : ""} flex flex-col items-center bg-gray-200 w-55 h-100`}
        >
          {dropped && (
            <div
              id="white"
              onDragStart={handleDrag}
              draggable={true}
              className="text-center w-50 h-50 bg-white"
            >
              Box1
            </div>
          )}
          {dropped1 && (
            <div
              id="yellow"
              onDragStart={handleDrag}
              draggable={true}
              className="text-center w-50 h-50 bg-yellow-300"
            >
              Box2
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Today;

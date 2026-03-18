import React from "react";
import { useContext, useEffect, useRef, useState } from "react";

import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import Header from "./Header/Header";
import TodoInput from "../TodoInput";
import TodoList from "../TodoList";
import CompletedList from "../CompletedList";

const Today = ({ item }: any) => {
  const { todo } = useContext(TodoContext);
  const notCompletedTodo = todo.filter((list: any) => !list.status);
  const completedTodo = todo.filter((list: any) => list.status);

  const [dragEnter, setDragEnter] = useState(false);
  const handleDrag = (e: any) => {
    console.log(e.target.id);
    e.dataTransfer.setData("text", e.target.id);
  };
  const handleDragEnter = () => {
    console.log(dragEnter);
    setDragEnter(true);
  };
  const handleDragLeave = () => {
    console.log(dragEnter);
    setDragEnter(false);
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

  const [list, setList] = useState([
    {
      id: 1,
      title: "box1",
      dragEnter: false,
      dropped: false,
    },
    {
      id: 2,
      title: "box2",
      dragEnter: false,
      dropped: false,
    },
    {
      id: 3,
      title: "box3",
      dragEnter: false,
      dropped: false,
    },
  ]);

  return (
    <div className="overflow-y-auto flex-4 flex gap-3 flex-col bg-linear-45 from-purple-300 to-rose-400 h-screen p-15">
      <Header item={item} />
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
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={` ${dragEnter ? "border border-black" : ""} flex flex-col items-center bg-gray-200 w-55 h-100`}
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

      <div className="my-10">
        <ul
          onDrop={handleDrop}
          onDragOver={handleOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className="bg-gray-400 flex flex-col gap-2 w-50 h-50"
        >
          {list.map((l) => {
            return (
              <li
                key={l.id}
                onDragStart={handleDrag}
                draggable={true}
                className="w-50 bg-white"
              >
                {l.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Today;

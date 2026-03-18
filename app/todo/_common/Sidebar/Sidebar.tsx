"use client";
import {
  CameraSlash,
  Card,
  CardTick1,
  Code1,
  Command,
  Flashy,
  Menu,
  More,
  More2,
  SearchNormal,
  SearchNormal1,
  SearchStatus,
  Sun,
  Sun1,
  TickCircle,
} from "iconsax-reactjs";
import Image from "next/image";
import { sidebar } from "../Todo/Todo.const";
import { useContext, useState } from "react";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";

export default function Sidebar() {
  const { todo } = useContext(TodoContext);
  const notCompletedTodo = todo.filter((list: any) => !list.status);
  const completedTodo = todo.filter((list: any) => list.status);
  const [focused, setFocused] = useState(true);

  return (
    <div className="h-screen py-5 px-3 bg-pink-50 flex flex-1 flex-col gap-2">
      <div className="flex ">
        <Image
          src={"/images/niki-abedzade.jpg"}
          className="max-h-15 max-w-15 rounded-full"
          width={80}
          height={80}
          alt="niki abed"
        />
      </div>
      <div className="relative w-full flex justify-center">
        <input
          className="block shadow-sm border-b-gray-500 bg-white border w-[97%] border-gray-200 rounded-lg h-9.5 px-3 text-sm focus:outline-none relative"
          placeholder={sidebar.placeholder}
        />
        <SearchNormal1
          size={15}
          className="absolute left-6 bottom-3 text-gray-400"
        />
      </div>
      <div className="flex flex-col gap-4 mt-5 text-gray-800 text-md ">
        <div
          className={`justify-between pl-1 py-2 w-full  rounded flex gap-1 items-center hover:bg-black/5 hover:rounded ${focused ? "bg-black/5" : "bg-none"} `}
          onClick={() => setFocused(!focused)}
        >
          <div
            className={`flex items-center gap-1.5 before:border-r-[4.2px] border-transparent ${focused ? " justify-between before:border-r-[4.2px] before:border-blue-600 before:rounded before:h-5" : "bg-none"}`}
          >
            <div className="flex items-center gap-4">
              <Sun1 size={20} className="text-rose-400" />
              <span>{sidebar.myDay}</span>
            </div>
          </div>
          {todo.length > 0 && (
            <span className="bg-rose-400 h-5 px-1 rounded-md text-pink-50 text-sm">
              {todo.length}
            </span>
          )}
        </div>
        <div
          className={`justify-between pl-1 py-2 w-full  rounded flex gap-1 items-center hover:bg-black/5 hover:rounded ${focused ? "bg-black/5" : "bg-none"} `}
          onClick={() => setFocused(!focused)}
        >
          <div
            className={`flex items-center gap-1.5 before:border-r-[4.2px] border-transparent ${focused ? " justify-between before:border-r-[4.2px] before:border-blue-600 before:rounded before:h-5" : "bg-none"}`}
          >
            <div className="flex gap-4 items-center">
              <Card size={20} className="text-rose-400" />
              <span>{sidebar.All}</span>
            </div>
          </div>
          {todo.length > 0 && (
            <span className="bg-rose-400 h-5 px-1 rounded-md text-pink-50 text-sm">
              {todo.length}
            </span>
          )}
        </div>
        <div
          className={`justify-between pl-1 py-2 w-full  rounded flex gap-1 items-center hover:bg-black/5 hover:rounded ${focused ? "bg-black/5" : "bg-none"} `}
          onClick={() => setFocused(!focused)}
        >
          <div
            className={`flex items-center gap-1.5 before:border-r-[4.2px] border-transparent ${focused ? " justify-between before:border-r-[4.2px] before:border-blue-600 before:rounded before:h-5" : "bg-none"}`}
          >
            <div className="flex items-center gap-4">
              <TickCircle size={20} className="text-rose-400" />
              <span>{sidebar.complete}</span>
            </div>
          </div>
          {completedTodo.length > 0 && (
            <span className="bg-rose-400 h-5 px-1 rounded-md text-pink-50 text-sm">
              {completedTodo.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

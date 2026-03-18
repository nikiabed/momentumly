"use client";
import Image from "next/image";
import Search from "./Search/Search";
import ListItem from "./ListItem/ListItem";
import { useContext } from "react";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import { sidebar } from "../Todo/Todo.const";
import { Add } from "iconsax-reactjs";

export default function Sidebar() {
  const { focused, setFocused } = useContext(TodoContext);
  const handleClick = (e: any) => {
    console.log(e.target.id);
    setFocused &&
      setFocused((prev: any) =>
        prev.map((item: any) =>
          e.target.id == item.id
            ? { ...item, state: !item.state }
            : { ...item, state: false },
        ),
      );
  };

  return (
    <div className="relative h-screen py-5 px-3 bg-pink-50 flex flex-1 flex-col gap-2">
      <div className="flex ">
        <Image
          src={"/images/niki-abedzade.jpg"}
          className="max-h-15 max-w-15 rounded-full"
          width={80}
          height={80}
          alt="niki abed"
        />
      </div>
      <Search />
      <div className="flex flex-col gap-2 mt-5 text-gray-800 text-md pb-1.5 border-b border-gray-300 shadow-gray-600">
        {focused &&
          focused.map((list) => {
            return (
              <ListItem
                key={list.id}
                focused={list}
                handleClick={handleClick}
              />
            );
          })}
      </div>
      <div className="cursor-pointer flex items-center gap-4 px-2 text-gray-700 w-full max-w-70 hover:bg-black/5 hover:rounded py-2 absolute bottom-1 ">
        <Add size={23} className="cursor-pointer text-xs"/>
        <button className="cursor-pointer">{sidebar.button}</button>
      </div>
    </div>
  );
}

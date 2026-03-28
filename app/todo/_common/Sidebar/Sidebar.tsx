"use client";
import Image from "next/image";
import Search from "./Search/Search";
import ListItem from "./ListItem/ListItem";
import { useContext, useState } from "react";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import { ListItemProps, sidebar } from "../Todo/Todo.const";
import { Add, Chart, Icon } from "iconsax-reactjs";
import Work from "../Todo/Work/Work";

export default function Sidebar() {
  const { newList, setNewList, focused, setFocused } = useContext(TodoContext);

  const handleClick = (e: any) => {
    setFocused &&
      setFocused((prev: any) =>
        prev.map((item: any) =>
          e.target.id == item.id
            ? { ...item, state: true }
            : { ...item, state: false },
        ),
      );
  };

  const handleNewListClick = (e: any) => {
    setNewList &&
      setNewList((prev: any) =>
        prev.map((item: any) =>
          e.target.id == item.id
            ? { ...item, state: true }
            : { ...item, state: false },
        ),
      );
  };

  return (
    <div className="relative h-screen py-5 px-3 bg-pink-50 flex flex-1 flex-col gap-2 justify-between">
      <div className="flex flex-col gap-2">
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
        <div className="flex flex-col gap-2 mt-5 text-gray-800 text-md pb-1.5  shadow-gray-600">
          {focused &&
            focused.map((list: ListItemProps) => {
              return (
                <ListItem
                  key={list.id}
                  focused={list}
                  handleClick={handleClick}
                />
              );
            })}
        </div>
        {/* <div className="flex flex-col">
          {newList &&
            newList.map((list: ListItemProps) => {
              return (
                <ListItem
                  key={list.id}
                  focused={list}
                  handleClick={handleNewListClick}
                />
              );
            })}
        </div> */}
      </div>

      <div className="cursor-pointer flex items-center gap-4 px-2 text-gray-700 hover:bg-black/5 hover:rounded py-2 ">
        <Add size={23} className="cursor-pointer text-xs" />
        <button className="cursor-pointer">{sidebar.button}</button>
      </div>
    </div>
  );
}

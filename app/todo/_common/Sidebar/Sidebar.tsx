"use client";
import Image from "next/image";
import Search from "./Search/Search";
import ListItem from "./ListItem/ListItem";
import { useContext } from "react";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import { ListItemProps, sidebar } from "../Todo/Todo.const";
import { Add, HamburgerMenu } from "iconsax-reactjs";

export default function Sidebar() {
  const { focused, handleNewList } = useContext(TodoContext);

  return (
    <div className="overflow-y-hidden h-screen pt-5 px-3 bg-pink-50 flex flex-1 flex-col gap-2 justify-between">
      <div className="shrink-0">
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
      </div>

      <div className="overflow-auto grow flex flex-col gap-2 text-gray-800 text-md pb-1.5  shadow-gray-600">
        {focused?.map((list: ListItemProps) => {
          return <ListItem key={list.id} focused={list} />;
        })}
      </div>

      <button
        onClick={handleNewList}
        className="shrink-0 cursor-pointer flex items-center gap-4 px-2 text-gray-700 hover:bg-black/5 hover:rounded py-2 "
      >
        <Add size={23} className="cursor-pointer text-xs" />
        {sidebar.button}
      </button>
    </div>
  );
}

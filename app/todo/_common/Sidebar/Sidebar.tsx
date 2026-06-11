"use client";
import Image from "next/image";
import { ListItemProps } from "../Todo/Todo.const";
import { Add } from "iconsax-reactjs";
import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Search } from "./Search";
import { ListItem } from "./ListItem";
import { sidebar } from "./Sidebar.const";


export const Sidebar = () => {
  const { handleNewList, uiBoard } = useTodoContext()
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

      <div className="overflow-auto grow flex flex-col gap-2 text-gray-800 text-md pb-1.5 shadow-gray-600">
        {uiBoard?.map((list: ListItemProps) => {
          return <ListItem key={list._id} focused={list} />;
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
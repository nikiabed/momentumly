"use client";
import { Card, SearchNormal1, Sun1, TickCircle } from "iconsax-reactjs";
import Image from "next/image";
import { sidebar } from "../Todo/Todo.const";
import { useContext, useState } from "react";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import Search from "./Search/Search";
import ListItem from "./ListItem/ListItem";

export default function Sidebar() {
  const [focused, setFocused] = useState([
    {
      title: sidebar.myDay,
      state: true,
      id: "1",
      icon: Sun1,
    },
    {
      title: sidebar.All,
      state: false,
      id: "2",
      icon: Card,
    },
    {
      title: sidebar.complete,
      state: false,
      id: "3",
      icon: TickCircle,
    },
  ]);

  const handleClick = (e: any) => {
    console.log(e.target.id);
    setFocused((prev: any) =>
      prev.map((item: any) =>
        e.target.id == item.id ? { ...item, state: !item.state } : { ...item, state: false },
      ),
    );
  };

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
      <Search />
      <div className="flex flex-col gap-2 mt-5 text-gray-800 text-md ">
        {focused.map((list) => {
          return <ListItem key={list.id} focused={list} handleClick={handleClick} />;
        })}

       
      </div>
    </div>
  );
}

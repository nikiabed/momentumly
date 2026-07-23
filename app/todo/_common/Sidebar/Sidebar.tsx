"use client";
import Image from "next/image";
import { Add } from "iconsax-reactjs";
import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";
import { Search } from "./Search";
import { ListItem } from "./ListItem";
import { sidebar } from "./Sidebar.const";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Board } from "@/app/types";

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: any) => {
  const { handleNewList, uiBoard } = useTodoContext();
  const { data } = useSession();
  return (
    <div
      className={`
fixed top-0 right-0 h-screen w-72 z-600
bg-pink-50 flex flex-col gap-2 justify-between
transition-transform duration-300

md:static md:translate-x-0 pt-15 p-2 md:p-2

${sidebarOpen ? "translate-x-0" : "translate-x-full"}
`}
    >
      <div className="shrink-0">
        <div className="flex gap-2 items-center">
          {data?.user?.image && (
            <Image
              src={data.user.image}
              className="max-h-15 max-w-15 rounded-full"
              width={80}
              height={80}
              alt="niki abed"
            />
          )}
          <div>
            <div className="font-semibold">{data?.user?.name}</div>
            <div className="text-gray-500 text-sm">{data?.user?.email}</div>
          </div>
        </div>
        <Search />
      </div>

      <div className="overflow-auto grow flex flex-col gap-2 text-gray-800 text-md pb-1.5 shadow-gray-600">
        {uiBoard?.map((list: Board) => {
          const isProgress = list.boardKey === "progress";
          return (
            <div key={list._id} onClick={() => setSidebarOpen(!sidebarOpen)}>
              <ListItem key={list._id} focused={list} />
              {isProgress && <div className=" mt-2 border-t border-gray-200" />}
            </div>
          );
        })}
      </div>
      <button
        onClick={() =>
          signOut({
            callbackUrl: "/login",
          })
        }
        className="px-4 py-2 bg-rose-400 text-rose-50 rounded-lg cursor-pointer"
      >
        {sidebar.signOut}
      </button>

      <button
        onClick={handleNewList}
        className="shrink-0 cursor-pointer flex items-center gap-4 px-2 text-gray-700 hover:bg-black/5 hover:rounded py-2 "
      >
        <Add size={23} className="cursor-pointer text-xs" />
        {sidebar.button}
      </button>
    </div>
  );
};

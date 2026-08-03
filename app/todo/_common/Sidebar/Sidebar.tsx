"use client";
import Image from "next/image";
import { Add, ProgrammingArrow, Star, StarSlash } from "iconsax-reactjs";
import { Search } from "./Search";
import { ListItem } from "./ListItem";
import { sidebar } from "./Sidebar.const";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Board } from "@/app/types";
import { useTodoContext } from "@/app/_utils";

export type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { handleNewList, uiBoard, setActiveTool } = useTodoContext();
  const { data } = useSession();
  return (
    <div
      className={`
fixed top-0 right-0 h-screen w-72 z-600
bg-background flex flex-col gap-2 justify-between
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
            <div className=" text-sm">{data?.user?.email}</div>
          </div>
        </div>
        <Search />
      </div>

      <div className="overflow-auto grow flex flex-col gap-2  text-md pb-1.5 shadow-sm shadow-border-gray border border-border-gray rounded-lg">
        {uiBoard?.map((list: Board) => {
          const isProgress = list.boardKey === "progress";
          return (
            <div key={list._id} onClick={() => setSidebarOpen(!sidebarOpen)}>
              <ListItem key={list._id} focused={list} />
              {isProgress && (
                <div className=" mt-2 border-t border-border-gray" />
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleNewList}
        className="shrink-0 cursor-pointer flex items-center gap-4 px-2 hover:bg-foreground/10  hover:rounded py-2 text-sm text-muted"
      >
        <Add size={23} className="cursor-pointer text-xs" />
        {sidebar.button}
      </button>
      <div className=" border-t border-border-gray" />
      <div className="shrink-0 flex flex-col gap-2 px-2">
        <h2 className="font-semibold">ابزارها</h2>
        <button
          className=" cursor-pointer flex items-center gap-4  hover:bg-foreground/10  hover:rounded py-2  "
          onClick={() => setActiveTool("ai-breaker")}
        >
         <ProgrammingArrow size={20} className="text-rose-400" /> خرد کردن کار با AI
        </button>
      </div>
      <button
        onClick={() =>
          signOut({
            callbackUrl: "/login",
          })
        }
        className="px-4 py-2 bg-rose-400 rounded-lg cursor-pointer text-sm hover:bg-rose-400/80"
      >
        {sidebar.signOut}
      </button>
    </div>
  );
};

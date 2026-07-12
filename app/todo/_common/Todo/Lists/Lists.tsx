"use client";

import { TodoContext } from "@/app/_utils/hooks";
import { ArrowDown2, Calendar, Clock, Moon, Sun1 } from "iconsax-reactjs";
import { useContext, useState } from "react";
import { TodoList } from "../TodoList";
import { t } from "@/app/i18n/t";
import { titleToKey } from "../../Sidebar";
import { formatGroupDate, getDateKey } from "@/app/_utils/date";

export const Lists = ({ todo, list }: any) => {
  const [isOpen, setOpen] = useState(false);
  const { setTodo } = useContext(TodoContext);

  const groupedByDate = todo.reduce(
    (acc, item) => {
      const date = getDateKey(item.date || item.createdAt);
      if (!acc[date || ""]) {
        acc[date || ""] = [];
      }

      acc[date || ""].push(item);

      return acc;
    },
    {} as Record<string, typeof todo>,
  );

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className=" cursor-pointer bg-pink-200 px-1 items-center max-w-44 justify-between py-1 text-md rounded-md text-black flex gap-2 hover:bg-pink-50"
      >
        <div className="flex items-center gap-2.5">
          <ArrowDown2
            className={`${isOpen ? "rotate-0" : "rotate-90"} transition-all`}
            size={15}
          />
          <span>{list}</span>
        </div>
        <span className="text-sm bg-rose-400 text-pink-50 rounded-lg px-2">
          {todo.length}
        </span>
      </div>
      {isOpen &&
        Object.entries(groupedByDate).map(([date, todos]: any) => {
          const formatted = formatGroupDate(date);
          console.log("formatted", formatted);
          const icon =
            formatted.label === "امروز" ? (
              <Sun1 size={16} />
            ) : formatted.label === "دیروز" ? (
              <Moon size={16} />
            ) : formatted.label === "فردا" ? (
              <Clock size={16} />
            ) : (
              <Calendar size={16} />
            );
          return (
            <div key={date} className="ml-5 mb-3">
              <div
                className="inline-flex items-center gap-2 mb-1
                px-3 py-1.5
                rounded-full
                bg-white/10
                backdrop-blur-md
                border border-white/20
                text-white"
              >
                {icon}
                {formatted.label && (
                  <span className="font-semibold text-white">
                    {formatted.label}
                  </span>
                )}

                <span className="text-sm text-gray-200">{formatted.date}</span>
              </div>

              <TodoList todo={todos} setTodo={setTodo} />
            </div>
          );
        })}
    </div>
  );
};

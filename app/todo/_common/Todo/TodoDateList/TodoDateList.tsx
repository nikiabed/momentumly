"use client";

import { useTodoContext } from "@/app/_utils/hooks";
import { formatGroupDate } from "@/app/_utils/date";
import { getTodoDisplayDate } from "@/app/_utils/todo";
import { Todo, TodoList as TodoListType } from "@/app/types";
import { Calendar, Clock, Moon, Sun1 } from "iconsax-reactjs";
import { TodoList } from "../TodoList";

export const TodoDateList = ({ todo }: { todo: TodoListType }) => {
  const { setTodo } = useTodoContext();

  const groupedByDate = todo.reduce(
    (acc: Record<string, Todo[]>, item: Todo) => {
      const date = getTodoDisplayDate(item);
      if (!date) return acc;
      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(item);
      return acc;
    },
    {},
  );
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(groupedByDate).map(([date, todos]) => {
        const formatted = formatGroupDate(date);
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
          <div key={date} className="mb-3">
            <div
              className="
                inline-flex items-center gap-2 mb-1
                px-3 py-1.5
                rounded-full
                bg-white/10
                backdrop-blur-md
                border border-white/20
                text-white
              "
            >
              {icon}

              {formatted.label && (
                <span className="font-semibold">{formatted.label}</span>
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

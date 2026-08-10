"use client";

import { useTodoContext } from "@/app/_utils/hooks";
import { formatGroupDate } from "@/app/_utils/date";
import { getTodoDisplayDate } from "@/app/_utils/todo";
import { Todo, TodoList as TodoListType } from "@/app/types";
import { Calendar, Clock, Moon, Sun1 } from "iconsax-reactjs";
import { TodoList } from "../TodoList";

export const TodoDateList = ({ todo }: { todo: TodoListType }) => {
  const { setTodo } = useTodoContext();

  // فقط Parentها برای تعیین گروه تاریخ استفاده می‌شوند
  const parents = todo.filter((item) => item.parentTodoId == null);

  const groupedByDate = parents.reduce(
    (acc: Record<string, Todo[]>, parent: Todo) => {
      const date = getTodoDisplayDate(parent);

      if (!date) return acc;

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(parent);

      return acc;
    },
    {},
  );

  return (
    <div>
      {Object.entries(groupedByDate).map(([date, parentsForDate]) => {
        const formatted = formatGroupDate(date);

        const icon =
          formatted.label === "امروز" ? (
            <Sun1 size={18} />
          ) : formatted.label === "دیروز" ? (
            <Clock size={18} />
          ) : formatted.label === "فردا" ? (
            <Moon size={18} />
          ) : (
            <Calendar size={18} />
          );

        return (
          <div key={date} className="mb-3">
            <div
              className="
                inline-flex items-center gap-2 mb-1
                px-3 py-1.5
                rounded-full
                bg-background/10
                backdrop-blur-md
                border border-border
                text-foreground
              "
            >
              {icon}

              {formatted.label && (
                <span className="font-semibold">{formatted.label}</span>
              )}

              <span className="text-sm text-text-muted">{formatted.date}</span>
            </div>

            <TodoList todo={parentsForDate} allTodos={todo} setTodo={setTodo} />
          </div>
        );
      })}
    </div>
  );
};

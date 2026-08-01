"use client";
import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";
import { CloseCircle, TickCircle } from "iconsax-reactjs";
import { useTodoContext } from "@/app/_utils/hooks";
import { TodoEditInput } from "../TodoEditInput";
import { getDateKey } from "@/app/_utils";
import { Todo } from "@/app/types";
import { TodoTimer } from "../TodoTimer";

type itemProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  list: Todo;
};

export const getTodoState = (todo: Todo, today = getDateKey(new Date())) => {
  if (todo.status) return "done";
  if (!todo.deadline) return "normal";
  const deadline = getDateKey(todo.deadline);
  if (!deadline) return "normal";
  if (deadline === today) return "today";
  if (today && deadline < today) return "overdue";
  return "normal";
};

export const TodoListItems: FC<itemProps> = ({ list, ...props }) => {
  const [localTitle, setLocalTitle] = useState(list.title);
  const { handleUpdateTodo, handleIsEdit } = useTodoContext();

  const todayKey = getDateKey(new Date()) || "normal";
  useEffect(() => {
    setLocalTitle(list.title);
  }, [list.title]);
  const state = getTodoState(list, todayKey);

  return (
    <div
      {...props}
      className={`flex text-wrap justify-center items-center gap-1  bg-background rounded-lg hover:bg-background/80 group py-2 p-2 ${state === "overdue" ? "bg-overdue-soft text-overdue-text" : ""}
${state === "today" ? "bg-today-soft text-today-text" : ""}
${state === "done" ? "opacity-50" : ""}`}
    >
      {list.isEdit ? (
        <form
          name="edited task"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleIsEdit?.(list._id, false);
            }
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateTodo?.(list, localTitle);
          }}
          className="flex items-center justify-center w-full"
        >
          <button
            type="button"
            className="pr-5 px-1"
            onClick={() => {
              handleIsEdit?.(list._id, false);
            }}
          >
            <CloseCircle size={20} />
          </button>
          <button type="submit" className="pl-1 px-2">
            <TickCircle size={20} />
          </button>
          <input
            type="text"
            value={localTitle}
            autoFocus
            className="h-10 px-2 w-full bg-background rounded-lg group-hover:bg-background/90 focus:outline-none focus:bg-background/50"
            onChange={(e) => setLocalTitle(e.target.value)}
          />
        </form>
      ) : (
        <div className="flex items-center w-full gap-1">
          <div className="flex-1 min-w-0">
            <TodoEditInput list={list} />
          </div>
        </div>
      )}
    </div>
  );
};

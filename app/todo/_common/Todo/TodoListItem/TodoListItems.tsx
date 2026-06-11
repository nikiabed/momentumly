"use client"
import { DetailedHTMLProps, FC, HTMLAttributes, memo, useState } from "react";
import { CloseCircle, TickCircle } from "iconsax-reactjs";
import { useTodoContext } from "@/app/_utils/hooks";
import { TodoEditInput } from "../TodoEditInput";

type itemProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  list: string[];
};
export const TodoListItems: FC<itemProps> = ({ list, ...props }: any) => {
  const [localTitle, setLocalTitle] = useState(list.title);
  const { handleUpdateTodo, handleIsEdit } = useTodoContext();

  return (
    <div
      {...props}
      className="flex justify-center items-center gap-1 bg-pink-100 rounded-lg hover:bg-pink-50 group py-2 pl-2"
    >
      {list.isEdit ? (
        <form
          name="edited task"
          onKeyDown={(e: any) => {
            if (e.key === "Escape") {
              handleIsEdit?.(list._id);
            }
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateTodo?.(list._id, localTitle);
          }}
          className="flex items-center justify-center w-full"
        >
          <button
            type="button"
            className="pr-5 px-1"
            onClick={() => {
              handleIsEdit?.(list._id);
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
            className="h-10 px-2 w-full bg-pink-100 rounded-lg group-hover:bg-pink-50 focus:outline-none on focus:bg-white"
            onChange={(e) => setLocalTitle(e.target.value)}
          />
        </form>
      ) : (
        <TodoEditInput list={list} />
      )}
    </div>
  );
};

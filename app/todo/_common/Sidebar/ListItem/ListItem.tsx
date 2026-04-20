"use client";
import { ListItemProps } from "../../Todo";
import { useTodoContext } from "@/app/_utils/hooks";
import { ItemIcon } from "../../Header";
import { sidebar } from "../Sidebar.const";

export const ListItem = ({ focused }: { focused: ListItemProps }) => {
  const {
    todo,
    handleBoardSubmit,
    handleBoardInput,
    boardValue,
    handleBoardClick,
    handleBoardEditable,
  } = useTodoContext();

  return (
    <li
      onClick={() => handleBoardClick?.(focused.id)}
      onDoubleClick={() => handleBoardEditable?.(focused.id)}
      className={`relative justify-between cursor-pointer  pl-1 py-2 w-full rounded flex gap-1 items-center group hover:bg-black/5 hover:rounded ${focused.state ? "bg-black/5" : "bg-none"} `}
    >
      <div
        className={`flex items-center gap-1.5 before:border-r-4 before:border-transparent before:rounded before:h-5 ${focused.state ? " justify-between before:border-rose-700!" : ""}`}
      >
        <div className=" flex items-center gap-4">
          <ItemIcon item={focused} size={20} className="text-rose-400" />
          {focused.isEdit ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                boardValue && handleBoardSubmit?.(focused.id, boardValue);
              }}
            >
              <input
                autoFocus
                type="text"
                defaultValue={focused.title}
                onChange={handleBoardInput}
              />
            </form>
          ) : (
            <span>{focused.title}</span>
          )}
        </div>
      </div>
      {todo.filter(focused.filter).length > 0 &&
        focused.title !== sidebar.progress && (
          <span className="bg-rose-400 h-5 px-1 rounded-md text-pink-50 text-sm">
            {todo.filter(focused.filter).length}
          </span>
        )}
      {focused.title == sidebar.progress && (
        <div className="border-b border-gray-300 p absolute -bottom-1 w-full"></div>
      )}
    </li>
  );
};

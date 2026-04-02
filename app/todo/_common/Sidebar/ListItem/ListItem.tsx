"use client";
import { useContext, useState } from "react";
import { TodoContext } from "@/app/_utils/ui/TodoProvider/TodoProvider";
import { ItemIcon, ListItemProps, sidebar, TodoListType } from "../../Todo";

export const getTodoCount = (list: TodoListType, focused: ListItemProps) => {
  const completedTodo = list.filter((list: any) => list.status);
  const todayTodo = list.filter((l: any) => {
    const date = new Date();
    return !l.status && l.date === date.toDateString();
  });
  const importantTodo = list.filter((list: any) => list.isImportant);
  switch (focused.title) {
    case sidebar.myDay:
      return todayTodo.length;
    case sidebar.important:
      return importantTodo.length;
    case sidebar.All:
      return list.length;
    case sidebar.complete:
      return completedTodo.length;
    default:
      return -1;
  }
};

const ListItem = ({ focused }: { focused: ListItemProps }) => {
  const {
    todo,
    handleBoardSubmit,
    handleBoardInput,
    boardValue,
    handleBoardClick,
    handleBoardEditable,
  } = useContext(TodoContext);

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
                  boardValue &&
                  handleBoardSubmit?.(focused.id, boardValue);
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
      {getTodoCount(todo, focused) > 0 && (
        <span className="bg-rose-400 h-5 px-1 rounded-md text-pink-50 text-sm">
          {getTodoCount(todo, focused)}
        </span>
      )}
      {focused.title == sidebar.progress && (
        <div className="border-b border-gray-300 p absolute -bottom-1 w-full"></div>
      )}
    </li>
  );
};

export default ListItem;

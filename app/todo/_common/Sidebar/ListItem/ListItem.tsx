"use client";
import { useContext } from "react";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import { ListItemProps, TodoListType } from "../../Todo";

const ListItem = ({
  focused,
  handleClick,
}: {
  focused: ListItemProps;
  handleClick: (e: any) => void;
}) => {
  const { todo } = useContext(TodoContext);
  const Icon2 = focused.icon;

  const getTodoCount = (list: TodoListType) => {
    const completedTodo = todo.filter((list: any) => list.status);
    const todayTodo = list.filter((l: any) => {
      const date = new Date();
      return !l.status && l.date === date.toDateString();
    });
    const importantTodo = todo.filter((list: any) => list.isImportant);
    switch (focused.id) {
      case "1":
        return todayTodo.length;
      case "2":
        return importantTodo.length;
      case "3":
        return todo.length;
      case "4":
        return completedTodo.length;
      default:
        return -1;
    }
  };
  return (
    <li
      id={focused.id}
      onClick={handleClick}
      className={`relative justify-between cursor-pointer  pl-1 py-2 w-full rounded flex gap-1 items-center group hover:bg-black/5 hover:rounded ${focused.state ? "bg-black/5" : "bg-none"} `}
    >
      <div
        id={focused.id}
        className={`flex items-center gap-1.5 before:border-r-4 before:border-transparent before:rounded before:h-5 ${focused.state ? " justify-between before:border-rose-700!" : ""}`}
      >
        <div id={focused.id} className=" flex items-center gap-4">
          <Icon2 id={focused.id} size={20} className="text-rose-400" />
          <span id={focused.id}>{focused.title}</span>
        </div>
      </div>
      {getTodoCount(todo) > 0 && (
        <span className="bg-rose-400 h-5 px-1 rounded-md text-pink-50 text-sm">
          {getTodoCount(todo)}
        </span>
      )}
      {focused.id == "5" && (
        <div className="border-b border-gray-300 p absolute -bottom-1 w-full"></div>
      )}
    </li>
  );
};

export default ListItem;

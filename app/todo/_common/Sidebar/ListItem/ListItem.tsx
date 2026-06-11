"use client";
import { ListItemProps } from "../../Todo";
import { useTodoContext } from "@/app/_utils/hooks";
import { ItemIcon } from "../../Header";
import { sidebar } from "../Sidebar.const";
import { More } from "iconsax-reactjs";
import { useState } from "react";
import { t } from "@/app/i18n/t";

export const titleToKey: Record<string, string> = {
  "My Day": "myDay",
  Important: "important",
  All: "all",
  Complete: "complete",
  Progress: "progress",
  Work: "work",
};

export const ListItem = ({ focused }: { focused: any }) => {
  const {
    handleBoardInput,
    handleBoardEditable,
    removeList,
    selectBoard,
    activeBoard,
    saveBoard,
  } = useTodoContext();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className=" relative flex items-center justify-between">
      <div
        onClick={() => selectBoard?.(focused, focused._id)}
        onDoubleClick={() => handleBoardEditable?.(focused._id)}
        className={` justify-between rounded cursor-pointer w-full flex gap-1 items-center group hover:bg-black/5 hover:rounded ${activeBoard === focused.boardKey ? "bg-black/5" : "bg-none"} `}
      >
        <div
          className={`flex py-2 items-center gap-2 before:border-r-4 before:border-transparent before:rounded before:h-5 ${activeBoard === focused.boardKey ? " before:border-rose-700!" : ""}`}
        >
          <div className="flex gap-2">
            <ItemIcon item={focused} size={20} className="text-rose-400" />
            {focused.isEdit ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveBoard?.(focused._id);
                }}
              >
                <input
                  autoFocus
                  type="text"
                  defaultValue={t(titleToKey[focused.title] ?? focused.title)}
                  onChange={handleBoardInput}
                />
              </form>
            ) : (
              <span>{t(titleToKey[focused.title] ?? focused.title)}</span>
            )}
          </div>
        </div>
        {/* {todo.filter(focused.filter).length > 0 &&
          focused.title !== sidebar.progress && (
            <span className="bg-rose-400 h-5 px-1 rounded-md text-pink-50 text-sm">
              {todo.filter(focused.filter).length}
            </span>
          )} */}
        {focused.title == sidebar.progress && (
          <div className="border-b border-gray-300 p absolute -bottom-1 w-full"></div>
        )}
      </div>
      {focused.editable && (
        <div>
          <More
            color="transparent"
            style={{
              fill: "#000",
            }}
            className=" max-h-4 text-gray-400 rotate-90 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <ul className="absolute left-5 top-5 w-40 z-20">
              <li
                onClick={() => removeList?.(focused._id)}
                className="bg-white rounded px-2 py-1 text-sm cursor-pointer shadow"
              >
                حذف لیست
              </li>
            </ul>
          )}
        </div>
      )}
    </li>
  );
};

"use client";
import { useTodoContext } from "@/app/_utils/hooks";
import { ItemIcon } from "../../Header";
import { sidebar } from "../Sidebar.const";
import { More } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";
import { t } from "@/app/i18n/t";
import { BOARD_KEYS, isInMyDay } from "@/app/_utils";
import { Board } from "@/app/types";

export const titleToKey: Record<string, string> = {
  "My Day": "myDay",
  Important: "important",
  All: "all",
  Complete: "complete",
  Progress: "progress",
  Work: "work",
  Search: "search",
};

export const ListItem = ({ focused }: { focused: Board }) => {
  const {
    handleBoardInput,
    removeList,
    selectBoard,
    activeBoard,
    saveBoard,
    todo,
    boardList,
    systemBoards,
    setNewBoardKey,
    newBoardKey,
  } = useTodoContext();

  const [isOpen, setIsOpen] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const isEditing = editingId === focused._id;
  const handleBoardEditable = (id: string) => {
    setEditingId(id);
  };

  useEffect(() => {
    if (newBoardKey === focused.boardKey) {
      setEditingId(focused._id);
      setNewBoardKey?.(null);
    }
  }, [newBoardKey, focused]);

  const isSystemBoard = [
    "myDay",
    "all",
    "important",
    "complete",
    "progress",
  ].includes(focused.boardKey);

  const value = t(titleToKey[focused.title] ?? focused.title);
  const currentBoard =
    boardList.find((b) => b.boardKey === focused.boardKey) ??
    systemBoards?.[focused.boardKey];
  const isAll = currentBoard?.boardKey === BOARD_KEYS.ALL;
  const isImportant = currentBoard?.boardKey === BOARD_KEYS.IMPORTANT;
  const isComplete = currentBoard?.boardKey === BOARD_KEYS.COMPLETE;
  const isMyDay = currentBoard?.boardKey === BOARD_KEYS.MY_DAY;
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredTodos = todo.filter((t) => {
    if (!currentBoard) return false;
    if (isAll) return true;
    if (isImportant) return t.isImportant;
    if (isComplete) return t.status;
    if (isMyDay) {
      return isInMyDay(t);
    }
    return t.boardKey === currentBoard.boardKey;
  });

  const notCompletedTodos = filteredTodos.filter((t) => !t.status).length;

  return (
    <li className=" relative flex items-center justify-between">
      <div
        onClick={() => selectBoard?.(focused, focused._id)}
        onDoubleClick={() => handleBoardEditable?.(focused._id)}
        className={` justify-between rounded cursor-pointer md:w-full flex gap-1 items-center group hover:bg-black/5 hover:rounded ${activeBoard === focused.boardKey ? "bg-black/5" : "bg-none"} `}
      >
        <div
          className={`flex py-2 items-center gap-2 before:border-r-4 before:border-transparent before:rounded before:h-5 ${activeBoard === focused.boardKey ? " before:border-rose-700!" : ""}`}
        >
          <div className="flex gap-2">
            <ItemIcon item={focused} size={20} className="text-rose-400" />
            {isEditing && !isSystemBoard ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveBoard?.(focused._id);
                }}
              >
                <input
                  autoFocus
                  type="text"
                  defaultValue={value}
                  onChange={handleBoardInput}
                  size={value.length}
                />
              </form>
            ) : (
              <span>{t(titleToKey[focused.title] ?? focused.title)}</span>
            )}
          </div>
        </div>
        {notCompletedTodos > 0 && (
          <span className="bg-rose-400 h-5 px-1 rounded-md text-pink-50 text-sm">
            {notCompletedTodos}
          </span>
        )}
        {focused.title == BOARD_KEYS.PROGRESS && (
          <div className="border-b border-gray-300 p absolute -bottom-1 w-full"></div>
        )}
      </div>
      {!isSystemBoard && (
        <div className="relative" ref={itemRef}>
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

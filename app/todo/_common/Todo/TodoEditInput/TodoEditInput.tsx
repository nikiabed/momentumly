"use client";

import { useTodoContext } from "@/app/_utils/hooks";
import { Edit, Record, Star1, TickCircle, Trash } from "iconsax-reactjs";
import { MouseEvent, useState } from "react";

export const TodoEditInput = ({ list }: any) => {
  const {
    toggleImportant,
    toggleStatus,
    handleIsEdit,
    deleteTodo,
    moveToMyDay,
  } = useTodoContext();

  const [isOpen, setOpen] = useState(false);
  const [isRightClicked, setRightClick] = useState(false);
  return (
    <div className="relative w-full">
      <div className="flex justify-end">
        {list.status ? (
          <TickCircle
            variant="Bold"
            size={26}
            className="mx-5 group-hover:bg-pink-50 text-rose-400 "
            onClick={() => toggleStatus?.(list._id, !list.status)}
          />
        ) : (
          <Record
            size={26}
            className="mx-5 group-hover:bg-pink-50 text-black/55 cursor-pointer"
            onClick={() => toggleStatus?.(list._id, !list.status)}
          />
        )}
        <div
          aria-checked={list.status}
          className="flex items-center aria-checked:line-through aria-checked:text-black/30 flex-2 h-8"
          onClick={() => setOpen((prev: Boolean) => !prev)}
          onContextMenu={(e: MouseEvent) => {
            e.preventDefault();
            setRightClick((prev: Boolean) => !prev);
          }}
        >
          {list.title}
        </div>

        {isOpen && (
          <>
            <button
              onClick={() => {
                handleIsEdit?.(list._id);
              }}
              className="cursor-pointer px-2 h-8 text-sm bg-blue-400 hover:bg-blue-500 rounded-lg text-pink-50"
            >
              <Edit size={18} />
            </button>

            <button
              className="cursor-pointer px-2 h-8 text-sm bg-rose-400 hover:bg-rose-500 rounded-lg text-pink-50"
              onClick={() => {
                deleteTodo?.(list._id);
              }}
            >
              <Trash size={18} />
            </button>
          </>
        )}
        {/* <span>{list.date}</span> */}
        <button
          className={` hover:cursor-pointer rounded-md h-8 px-2 text-sm  ${isOpen ? "bg-pink-500 text-rose-50 hover:bg-pink-600 " : "hover:text-pink-800"}`}
          onClick={() => {
            toggleImportant?.(list._id, !list.isImportant);
          }}
        >
          {list.isImportant ? (
            <Star1
              size={18}
              variant="Bold"
              className={` ${isOpen ? "text-rose-50" : "text-pink-800"}`}
            />
          ) : (
            <Star1 size={18} variant="Linear" />
          )}
        </button>
      </div>
      {isRightClicked && (
        <ul className="absolute z-50 -bottom-12 bg-white w-60 rounded ">
          <li
            onClick={() => moveToMyDay?.(list.id)}
            className="text-sm hover:bg-black/5 p-2"
          >
            جابه جایی به امروز
          </li>
        </ul>
      )}
    </div>
  );
};

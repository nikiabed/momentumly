"use client";

import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import { Edit, Record, TickCircle, Trash } from "iconsax-reactjs";
import { useContext, useState } from "react";

export default function TodoEditInput({ list }: any) {
  const { handleIsEdit, changeTaskState, handleDelete } =
    useContext(TodoContext);

  const [isOpen, setOpen] = useState(false);
  return (
    <>
      {list.status ? (
        <TickCircle
          variant="Bold"
          size={26}
          className="mx-5 group-hover:bg-pink-50 text-rose-400 "
          onClick={() => changeTaskState && changeTaskState(list.id)}
        />
      ) : (
        <Record
          size={26}
          className="mx-5 group-hover:bg-pink-50 text-black/55 cursor-pointer"
          onClick={() => changeTaskState && changeTaskState(list.id)}
        />
      )}
      <div
        aria-checked={list.status}
        className="flex items-center aria-checked:line-through aria-checked:text-black/30 flex-2 h-8"
        onClick={() => setOpen((prev: Boolean) => !prev)}
      >
        {list.title}
      </div>

      {isOpen && (
        <>
          <button
            onClick={() => {
              handleIsEdit && handleIsEdit(list.id);
            }}
            className="cursor-pointer px-2 h-8 text-sm bg-blue-400 rounded-lg text-pink-50"
          >
            <Edit size={18} />
          </button>

          <button
            className="cursor-pointer px-2 h-8 text-sm bg-rose-400 rounded-lg text-pink-50"
            onClick={() => {
              handleDelete && handleDelete(list.id);
            }}
          >
            <Trash size={18} />
          </button>
        </>
      )}
      {/* <span>{list.date}</span> */}
    </>
  );
}

"use client";

import { useTodoContext } from "@/app/_utils/hooks";
import {
  Calendar,
  Edit,
  Record,
  Star1,
  TickCircle,
  Trash,
  ArrowDown2,
  ArrowUp2,
  Folder,
  Link21,
  Clock,
} from "iconsax-reactjs";
import { useState } from "react";

export const TodoEditInput = ({ list }: any) => {
  const {
    toggleImportant,
    toggleStatus,
    handleIsEdit,
    deleteTodo,
    moveToMyDay,
  } = useTodoContext();

  const [isOpen, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Todo Row */}
      <div className="flex items-center gap-2 px-4 py-2">
        {list.status ? (
          <TickCircle
            variant="Bold"
            size={24}
            className="text-rose-400 cursor-pointer shrink-0"
            onClick={() => toggleStatus?.(list._id, !list.status)}
          />
        ) : (
          <Record
            size={24}
            className="text-black/50 cursor-pointer shrink-0"
            onClick={() => toggleStatus?.(list._id, !list.status)}
          />
        )}

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex flex-1 items-center justify-between text-right cursor-pointer"
        >
          <span
            className={`${list.status ? "line-through text-black/30" : ""} `}
          >
            {list.title}
          </span>

          {isOpen ? (
            <ArrowUp2 size={18} className="text-black/40" />
          ) : (
            <ArrowDown2 size={18} className="text-black/40" />
          )}
        </button>

        <button
          className="cursor-pointer"
          onClick={() => toggleImportant?.(list._id, !list.isImportant)}
        >
          {list.isImportant ? (
            <Star1 size={20} variant="Bold" className="text-pink-600" />
          ) : (
            <Star1 size={20} />
          )}
        </button>
      </div>

      {/* Details Panel */}
      {isOpen && (
        <div className=" overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm flex justify-evenly">
          <button
            onClick={() => handleIsEdit?.(list._id)}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-center justify-center hover:bg-black/5 transition"
          >
            <Edit size={18} />
            <span>ویرایش</span>
          </button>

          <button
            onClick={() => moveToMyDay?.(list._id)}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-center justify-center hover:bg-black/5 transition"
          >
            <Calendar size={18} />
            <span>انتقال به امروز</span>
          </button>

          <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-center justify-center hover:bg-black/5 transition">
            <Folder size={18} />
            <span>انتقال به لیست دیگر</span>
          </button>

          <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-center justify-center hover:bg-black/5 transition">
            <Clock size={18} />
            <span>تعیین ددلاین</span>
          </button>

          <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-center justify-center hover:bg-black/5 transition">
            <Link21 size={18} />
            <span>افزودن لینک</span>
          </button>

          <div className="h-px bg-black/5" />

          <button
            onClick={() => deleteTodo?.(list._id)}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-center justify-center text-red-500 hover:bg-red-50 transition"
          >
            <Trash size={18} />
            <span>حذف</span>
          </button>
        </div>
      )}
    </div>
  );
};

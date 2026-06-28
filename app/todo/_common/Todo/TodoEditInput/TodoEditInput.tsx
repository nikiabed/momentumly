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
import { titleToKey } from "../../Sidebar";
import { t } from "@/app/i18n/t";
import { BOARD_KEYS } from "@/app/_utils";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";



export const TodoEditInput = ({ list }: any) => {
  const {
    toggleImportant,
    toggleStatus,
    handleIsEdit,
    deleteTodo,
    moveToMyDay,
    removeFromMyDay,
    boardList,
    moveTodo,
    setDeadline,
  } = useTodoContext();

  const [isOpen, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeadLineOpen, setDeadlineOpen] = useState(false);

  const systemBoards = [
    BOARD_KEYS.ALL,
    BOARD_KEYS.IMPORTANT,
    BOARD_KEYS.COMPLETE,
    BOARD_KEYS.PROGRESS,
    BOARD_KEYS.SEARCH,
    BOARD_KEYS.MY_DAY,
  ];

  const moveTargets = [
    ...boardList.filter((b) => !systemBoards.includes(b.boardKey as any)),
  ];

  return (
    <div className="w-full z-50">
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
        <div className=" rounded-2xl border border-black/5 bg-white shadow-sm flex justify-evenly z-50">
          <button
            onClick={() => handleIsEdit?.(list._id)}
            className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center hover:bg-black/5 transition"
          >
            <Edit size={18} />
            <span>ویرایش</span>
          </button>

          <button
            onClick={() => moveToMyDay?.(list._id)}
            className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center hover:bg-black/5 transition"
          >
            <Calendar size={18} />
            <span>انتقال به امروز</span>
          </button>

          <button className="flex w-full items-center relative gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center hover:bg-black/5 transition">
            <Folder size={18} />
            <span onClick={() => setIsMenuOpen(!isMenuOpen)}>
              انتقال به لیست
            </span>
            {isMenuOpen && (
              <div className="absolute right-0 top-full bg-white shadow rounded-xl ">
                {moveTargets?.map((board) => (
                  <button
                    key={board._id}
                    onClick={() => moveTodo?.(list._id, board.boardKey)}
                    className="block w-full text-right px-3 py-2 hover:bg-slate-50 cursor-pointer"
                  >
                    {t(titleToKey[board.title]) || board.title}
                  </button>
                ))}
              </div>
            )}
          </button>

          <div className="w-full">
            <div
              onClick={() => setDeadlineOpen(!isDeadLineOpen)}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm justify-center hover:bg-black/5 transition cursor-pointer"
            >
              <Clock size={18} />
              <span>تعیین ددلاین</span>
              {/* {list.deadline && (
                <span>
                  {new Date(list.deadline).toLocaleDateString("fa-IR")}
                </span>
              )} */}
            </div>

            {isDeadLineOpen && (
              <div
                className="absolute z-9999 bg-white border-none"
                onClick={(e) => e.stopPropagation()}
              >
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={list.deadline}
                  onChange={(date) => setDeadline?.(list._id, date?.toDate())}
                  inputMode="none"
                  inputClass="w-full px-3 py-1 text-[12px] shadow bg-transparent border-none outline-none text-center cursor-pointer hover:bg-black/10"
                />
              </div>
            )}
          </div>

          <button className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center hover:bg-black/5 transition">
            <Link21 size={18} />
            <span>افزودن لینک</span>
          </button>

          <div className="h-px bg-black/5" />

          <button
            onClick={() => removeFromMyDay?.(list._id)}
            className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center hover:bg-black/5 transition"
          >
            <Trash size={18} />
            <span>حذف از امروز</span>
          </button>
          <button
            onClick={() => deleteTodo?.(list._id)}
            className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center text-red-500 hover:bg-red-50 transition"
          >
            <Trash size={18} />
            <span>حذف</span>
          </button>
        </div>
      )}
    </div>
  );
};

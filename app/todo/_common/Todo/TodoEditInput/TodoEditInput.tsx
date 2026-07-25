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
} from "iconsax-reactjs";
import { useRef, useState } from "react";
import { titleToKey } from "../../Sidebar";
import { t } from "@/app/i18n/t";
import { BOARD_KEYS, isInMyDay, isManuallyInMyDay } from "@/app/_utils";
import { DeadlinePicker } from "./DeadlinePicker";
import { useClickOutside } from "@/app/_utils/hooks/useClickOutside";
import { CompletedDatePicker } from "./CompletedDatePicker";

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
    handleFile,
    removeLink,
  } = useTodoContext();

  const [isOpen, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const todoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isCompleteMenuOpen, setIsCompleteMenuOpen] = useState(false);
  const completeMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside([todoRef, menuRef, completeMenuRef], () => {
    setOpen(false);
    setIsCompleteMenuOpen(false);
  });

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

  const fileRef = useRef<HTMLInputElement>(null);
  const isToday = isInMyDay(list);

  return (
    <div className="w-full relative" ref={todoRef}>
      {/* Todo Row */}
      <div
        className="flex items-center gap-2 px-4 py-2  min-w-0 text-wrap"
        ref={completeMenuRef}
      >
        <ArrowDown2
          size={14}
          className="cursor-pointer text-black/50 hover:text-gray-600"
          onClick={() => setIsCompleteMenuOpen((p) => !p)}
        />

        {list.status ? (
          <TickCircle
            variant="Bold"
            size={24}
            className="text-rose-400 cursor-pointer shrink-0"
            onClick={() => toggleStatus?.(list._id, !list.status, new Date())}
          />
        ) : (
          <Record
            size={24}
            className="text-black/50 cursor-pointer shrink-0"
            onClick={() => toggleStatus?.(list._id, !list.status, new Date())}
          />
        )}

        {isCompleteMenuOpen && (
          <div className="absolute top-12 right-0 w-48 bg-white z-50 ">
            <button
              className="w-full px-4 py-2 text-right hover:bg-gray-100 cursor-pointer shrink-0"
              onClick={() => {
                toggleStatus?.(list._id, true, new Date());
                setIsCompleteMenuOpen(false);
              }}
            >
              ✓ انجام امروز
            </button>
            <button
              className="w-full px-4 py-2 text-right hover:bg-gray-100 cursor-pointer shrink-0"
              onClick={() => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                toggleStatus?.(list._id, true, yesterday);
                setIsCompleteMenuOpen(false);
              }}
            >
              ✓ انجام دیروز
            </button>
            <div className="w-full px-4 py-2 text-right hover:bg-gray-100 cursor-pointer shrink-0">
              <div className=" text-right">
                <CompletedDatePicker
                  value={list.completedAt}
                  onChange={(date:any) => {
                    const d = date?.toDate?.();
                    if (!d) return;
                    toggleStatus?.(list._id, true, d);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex flex-1 min-w-0 items-center justify-between text-right cursor-pointer"
        >
          <span
            className={`${list.status ? "line-through text-black/30" : ""} wrap-break-word flex-1 min-w-0`}
          >
            {list.title}
          </span>

          {isOpen ? (
            <ArrowUp2 size={18} className="text-black/40" />
          ) : (
            <ArrowDown2 size={18} className="text-black/40" />
          )}
        </div>

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
        <div
          className=" rounded-2xl border border-black/5 bg-white shadow-sm flex flex-col
   md:justify-evenly z-0 md:flex-row "
        >
          <div
            onClick={() => handleIsEdit?.(list._id, true)}
            className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center hover:bg-black/5 transition"
          >
            <Edit size={18} />
            <span>ویرایش</span>
          </div>

          {!isInMyDay(list) && (
            <div
              onClick={() => moveToMyDay?.(list._id)}
              className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center hover:bg-black/5 transition"
            >
              <Calendar size={18} />
              <span>انتقال به امروز</span>
            </div>
          )}

          <div className="relative w-full flex item-center">
            <div
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex w-full items-center gap-3 px-4 py-3
      justify-center text-sm  hover:bg-black/5 transition cursor-pointer"
            >
              <Folder size={18} />
              <span>انتقال</span>
            </div>

            {isMenuOpen && (
              <div
                className=" w-full
        absolute
        top-full
        left-1/2
        -translate-x-1/2
        mt-2
        bg-white
        shadow-lg
        z-100
      "
              >
                {moveTargets?.map((board) => (
                  <button
                    key={board._id}
                    onClick={() => moveTodo?.(list._id, board.boardKey)}
                    className="block w-full whitespace-nowrap px-3 py-2 text-right hover:bg-black/5 transition cursor-pointer text-sm"
                  >
                    {t(titleToKey[board.title]) || board.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {
            <DeadlinePicker
              value={list.deadline}
              onChange={(date: Date) => setDeadline?.(list._id, date)}
              onClear={() => setDeadline?.(list._id, null)}
            />
          }

          <div className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center hover:bg-black/5 transition">
            <div
              onClick={() => fileRef.current?.click()}
              className="flex gap-3"
            >
              <Link21 size={18} />
              <span>لینک</span>
            </div>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                await handleFile?.(file, list._id);
              }}
            />
            {list.attachment && (
              <a
                href={list.attachment}
                target="_blank"
                className="text-xs text-blue-500 underline"
              >
                فایل 📎
              </a>
            )}
            {list.attachment && (
              <button
                onClick={() => removeLink?.(list._id)}
                className="text-gray-400 hover:text-red-500 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {isManuallyInMyDay(list) && list.boardKey !== BOARD_KEYS.MY_DAY && (
            <div
              onClick={() => removeFromMyDay?.(list._id)}
              className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center hover:bg-black/5 transition"
            >
              <Trash size={18} />
              <span>حذف از امروز</span>
            </div>
          )}
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

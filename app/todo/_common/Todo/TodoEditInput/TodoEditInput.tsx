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
import { CompletedDatePicker } from "./CompletedDatePicker";
import { Todo } from "@/app/types";
import { TodoTimer } from "../TodoTimer";

export const TodoEditInput = ({ list }: { list: Todo }) => {
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
  const [isCompleteMenuOpen, setIsCompleteMenuOpen] = useState(false);
  const completeMenuRef = useRef<HTMLDivElement>(null);
  const [selectedCompletionDate, setSelectedCompletionDate] =
    useState<Date | null>(list.completedAt);

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
  return (
    <div className="w-full relative " ref={todoRef}>
      <div
        className="flex items-center z-40 gap-2 py-2  min-w-0 text-wrap"
        ref={completeMenuRef}
      >
        {!list.status && (
          <TodoTimer
            todoId={list._id}
            trackedTimeSeconds={list.trackedTimeSeconds}
          />
        )}

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
            className="text-foreground cursor-pointer shrink-0"
            onClick={() => toggleStatus?.(list._id, !list.status, new Date())}
          />
        )}
        <ArrowDown2
          size={14}
          className="cursor-pointer text-foreground hover:text-foreground"
          onClick={() => {
            setIsCompleteMenuOpen((p) => !p);
          }}
        />

        {isCompleteMenuOpen && (
          <div
            className="absolute top-12 right-0 w-48 bg-background z-50 shadow-lg rounded-xl"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="w-full px-4 py-2 text-right hover:bg-foreground/10 cursor-pointer"
              onClick={() => {
                toggleStatus?.(list._id, true, new Date(), "manual");
                setIsCompleteMenuOpen(false);
              }}
            >
              ✓ انجام امروز
            </button>

            <button
              type="button"
              className="w-full px-4 py-2 text-right hover:bg-foreground/10 cursor-pointer"
              onClick={() => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                toggleStatus?.(list._id, true, yesterday, "manual");
                setIsCompleteMenuOpen(false);
              }}
            >
              ✓ انجام دیروز
            </button>
            <div className="flex justify-around">
              <div
                className="flex-2 w-full"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <CompletedDatePicker
                  value={selectedCompletionDate}
                  onChange={(date) => {
                    setSelectedCompletionDate(date);
                  }}
                />
              </div>

              <button
                className="px-4 py-2 hover:bg-foreground/10 cursor-pointer text-right text-sm w-full flex-1"
                type="button"
                onClick={() => {
                  if (!selectedCompletionDate) return;
                  toggleStatus?.(
                    list._id,
                    true,
                    selectedCompletionDate,
                    "manual",
                  );
                  setIsCompleteMenuOpen(false);
                }}
              >
                ثبت{" "}
              </button>
            </div>
          </div>
        )}
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex flex-1 min-w-0 items-center justify-between text-right cursor-pointer"
        >
          <span
            className={`${list.status ? "line-through text-foreground/30" : ""} wrap-break-word flex-1 min-w-0`}
          >
            {list.title}
          </span>

          {isOpen ? (
            <ArrowUp2 size={18} className="text-foreground/40" />
          ) : (
            <ArrowDown2 size={18} className="text-foreground/40" />
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
          className=" rounded-2xl border border-foreground/20 bg-background shadow-sm flex flex-col
   md:justify-evenly z-0 md:flex-row "
        >
          <div
            onClick={() => handleIsEdit?.(list._id, true)}
            className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center hover:rounded-2xl hover:bg-foreground/10 transition"
          >
            <Edit size={18} />
            <span>ویرایش</span>
          </div>

          {!isInMyDay(list) && (
            <div
              onClick={() => moveToMyDay?.(list._id)}
              className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center hover:bg-foreground/10 transition"
            >
              <Calendar size={18} />
              <span>انتقال به امروز</span>
            </div>
          )}

          <div className="relative w-full flex item-center">
            <div
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex w-full items-center gap-3 px-4 py-3
      justify-center text-sm  hover:bg-foreground/10 transition cursor-pointer"
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
        bg-background
        shadow-lg
        z-100
      "
              >
                {moveTargets?.map((board) => (
                  <button
                    key={board._id}
                    onClick={() => moveTodo?.(list._id, board.boardKey)}
                    className="block w-full whitespace-nowrap px-3 py-2 text-right hover:bg-foreground/10 transition cursor-pointer text-sm"
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
              onChange={(date) => {
                const newDate = date?.toDate() || null;
                setDeadline?.(list._id, newDate);
              }}
              onClear={() => setDeadline?.(list._id, null)}
              className={"justify-center hover:bg-foreground/10"}
            />
          }

          <div className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center hover:bg-foreground/10 transition">
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
              className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center hover:bg-foreground/10 transition"
            >
              <Trash size={18} />
              <span>حذف از امروز</span>
            </div>
          )}
          <button
            onClick={() => deleteTodo?.(list._id)}
            className="flex w-full items-center gap-3 px-4 py-3 cursor-pointer text-sm text-center justify-center text-rose-400 hover:rounded-2xl hover:bg-foreground/10 transition"
          >
            <Trash size={18} />
            <span>حذف</span>
          </button>
        </div>
      )}
    </div>
  );
};

"use client";

import { Clock } from "iconsax-reactjs";
import { Todo, TodoEntry } from "@/app/types";

type Props = {
  todos: Todo[];
  entries: TodoEntry[];
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} دقیقه`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} ساعت`;
  }

  return `${hours} ساعت و ${remainingMinutes} دقیقه`;
};

const formatDate = (date: string) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "fa-IR",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
    },
  );
};

export const WeeklyTimeReport = ({
  todos,
  entries,
}: Props) => {
  const todoMap = new Map(
    todos.map((todo) => [todo._id, todo]),
  );

  const grouped = entries.reduce(
    (acc, entry) => {
      if (!acc[entry.date]) {
        acc[entry.date] = [];
      }

      acc[entry.date].push(entry);

      return acc;
    },
    {} as Record<string, TodoEntry[]>,
  );

  const days = Object.entries(grouped).sort(
    ([a], [b]) => a.localeCompare(b),
  );

  const totalSeconds = entries.reduce(
    (total, entry) =>
      total + entry.durationSeconds,
    0,
  );

  return (
    <div className="w-full rounded-4xl bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">
            گزارش زمان این هفته
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            زمان واقعی‌ای که برای کارها گذاشتی
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1.5 text-xs font-medium text-pink-500">
          <Clock size={14} />
          {formatDuration(totalSeconds)}
        </div>
      </div>

      {days.length === 0 ? (
        <div className="rounded-2xl bg-gray-50 py-8 text-center text-sm text-gray-400">
          هنوز زمانی برای این هفته ثبت نشده.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {days.map(([date, dayEntries]) => {
            const dayTotal = dayEntries.reduce(
              (total, entry) =>
                total + entry.durationSeconds,
              0,
            );

            return (
              <div
                key={date}
                className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">
                    {formatDate(date)}
                  </span>

                  <span className="text-xs font-medium text-gray-400">
                    {formatDuration(dayTotal)}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {dayEntries.map((entry) => {
                    const todo = todoMap.get(
                      entry.todoId,
                    );

                    if (!todo) return null;

                    return (
                      <div
                        key={entry._id}
                        className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5"
                      >
                        <span className="truncate text-sm text-gray-600">
                          {todo.title}
                        </span>

                        <span className="ml-3 shrink-0 text-xs font-medium tabular-nums text-pink-400">
                          {formatDuration(
                            entry.durationSeconds,
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
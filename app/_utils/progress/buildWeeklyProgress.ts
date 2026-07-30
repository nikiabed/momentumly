import { TodoEntry, TodoList } from "@/app/types";
import { calculateDailyProgress } from "./calculateDailyProgress";

export const buildWeeklyProgress = (
  todos: TodoList,
  weekOffset = 0,
  compact = false,
) => {
  const days = [];

  const today = new Date();

  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const diff = (today.getDay() + 1) % 7;

  const startOfWeek = new Date(todayStart);
  startOfWeek.setDate(todayStart.getDate() - diff - weekOffset * 7);

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);

    const progress = calculateDailyProgress(todos, day);

    days.push({
      label: compact
        ? day.toLocaleDateString("fa-IR", {
            weekday: "narrow",
          })
        : day.toLocaleDateString("fa-IR", {
            weekday: "short",
          }),
      ...progress,
    });
  }

  return days;
};

export const buildWeeklyTimeProgress = (
  entries: TodoEntry[],
  weekOffset = 0,
  compact = false,
) => {
  const days = [];

  const today = new Date();

  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const diff = (today.getDay() + 1) % 7;

  const startOfWeek = new Date(todayStart);
  startOfWeek.setDate(todayStart.getDate() - diff - weekOffset * 7);

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);

    const dateKey = [
      day.getFullYear(),
      String(day.getMonth() + 1).padStart(2, "0"),
      String(day.getDate()).padStart(2, "0"),
    ].join("-");

    const durationSeconds = entries
      .filter((entry) => entry.date === dateKey)
      .reduce((total, entry) => total + entry.durationSeconds, 0);

    days.push({
      label: compact
        ? day.toLocaleDateString("fa-IR", {
            weekday: "narrow",
          })
        : day.toLocaleDateString("fa-IR", {
            weekday: "short",
          }),
      date: dateKey,
      durationSeconds,
    });
  }

  return days;
};

import { calculateDailyProgress } from "./calculateDailyProgress";

export const buildWeeklyProgress = (
  todos: any[],
  weekOffset = 0,
  compact = false,
) => {
  const days = [];

  const today = new Date();

  const diff = (today.getDay() + 1) % 7;

  const startOfWeek = new Date(today);

  startOfWeek.setDate(today.getDate() - diff - weekOffset * 7);

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

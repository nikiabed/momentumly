import { getDateKey } from "./date";

export const buildWeeklyProgress = (
  todos: any[],
  weekOffset = 0,
  compact = false,
) => {
  const days = [];

  const today = new Date();

  // 👇 شروع هفته با offset
  const diff = (today.getDay() + 1) % 7;
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - diff - weekOffset * 7);

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);

    const dateKey = getDateKey(day);

    const dayTodos = todos.filter((t) => t.myDayDate === dateKey);

    const done = dayTodos.filter(
      (t) => t.status && t.completedAt && getDateKey(t.completedAt) === dateKey,
    ).length;

    const planned = dayTodos.length;

    const ratio = planned === 0 ? 0 : done / planned;

    const score = Math.round(ratio * 80) + Math.min(planned, 10) * 2;
    const label = compact
      ? day.toLocaleDateString("fa-IR", { weekday: "narrow" })
      : day.toLocaleDateString("fa-IR", { weekday: "short" });
      
    days.push({
      label,
      done,
      planned,
      score,
    });
  }

  return days;
};

import { getDateKey } from "./date";

export const buildWeeklyProgress = (todos: any[]) => {
  const days = [];
  const today = new Date();
  const diff = (today.getDay() + 1) % 7;
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - diff);
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);

    const dateKey = getDateKey(day);
    const dayTodos = todos.filter((t) => t.myDayDate === dateKey );
    const done = dayTodos.filter(
      (t) => t.status && t.completedAt && getDateKey(t.completedAt) === dateKey,
    ).length;
    const planned = dayTodos.length;
    const ratio = planned === 0 ? 0 : done / planned;
    const score = Math.round(ratio * 80) + Math.min(planned, 10) * 2;

    days.push({
      label: day.toLocaleDateString("fa-IR", {
        weekday: "short",
      }),
      done,
      planned,
      score,
    });
  }
  return days;
};

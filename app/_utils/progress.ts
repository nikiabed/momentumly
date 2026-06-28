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
    const createdTasks = todos.filter(
      (t) => getDateKey(t.createdAt) === dateKey,
    );

    const dayTodos = todos.filter((t) => {
      return getDateKey(t.createdAt) === dateKey;
    });

    const done = dayTodos.filter((t) => t.status).length;
    const total = createdTasks.length;
    const ratio = done / Math.max(total, 1);
    const volumeBonus = Math.min(done * 2, 40);
    days.push({
      label: day.toLocaleDateString("fa-IR", {
        weekday: "short",
      }),

      done,
      total,
      score: Math.round(ratio * 60 + volumeBonus),
    });
  }

  return days;
};

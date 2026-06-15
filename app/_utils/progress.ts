import { getDateKey } from "./date";

export const buildWeeklyProgress = (todos: any[]) => {
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    const dateKey = getDateKey(day);
    const dayTodos = todos.filter(
      (t) =>
        t.boardKey === "myDay" &&
        getDateKey(t.createdAt) === dateKey
    );

    days.push({
      label: day.toLocaleDateString("fa-IR", {
        weekday: "short",
      }),
      done: dayTodos.filter((t) => t.status).length,
      total: dayTodos.length,
    });
  }

  return days;
};
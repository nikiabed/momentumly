import { getDateKey } from "./date";

export const buildWeeklyProgress = (todos: any[]) => {
  const days = [];

  const today = new Date();

  // شنبه = 0
  const diff =
    (today.getDay() + 1) % 7;

  const startOfWeek = new Date(today);

  startOfWeek.setDate(
    today.getDate() - diff
  );

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);

    day.setDate(startOfWeek.getDate() + i);

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
      done: dayTodos.filter(
        (t) => t.status
      ).length,
      total: dayTodos.length,
    });
  }

  return days;
};
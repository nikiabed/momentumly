import { getDateKey } from "./index";

export const getStats = (
  todos: any[],
  period: "month" | "week" = "month"
) => {
  const now = new Date();

  const filtered = todos.filter((t) => {
    const date = new Date(t.createdAt);

    const sameMonth =
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const sameWeek =
      now.getTime() - date.getTime() <=
      7 * 24 * 60 * 60 * 1000;

    return (
      t.boardKey === "myDay" &&
      (period === "month"
        ? sameMonth
        : sameWeek)
    );
  });

  const completed = filtered.filter(
    (t) => t.status
  );

  const coinsByDay: Record<string, number> = {};

  completed.forEach((t) => {
    const key = getDateKey(t.createdAt);

    coinsByDay[key] =
      (coinsByDay[key] || 0) + 10;
  });

  const completedCount =
    completed.length;

  return {
    todos: filtered,
    completed,

    maxCoins: Math.max(
      ...Object.values(coinsByDay),
      0
    ),

    activeDays:
      Object.keys(coinsByDay).length,

    completedCount,

    progress:
      filtered.length === 0
        ? 0
        : Math.round(
            (completedCount /
              filtered.length) *
              100
          ),

    totalCoins:
      completedCount * 10,
  };
};
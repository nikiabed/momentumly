import { getDateKey } from "../date";

export const calculateCoin = (todo: any) => {
  if (!todo.status || !todo.completedAt) return 0;

  if (!todo.myDayDate) return 0;

  const completedDate = getDateKey(todo.completedAt);
  const plannedDate = getDateKey(todo.myDayDate);

  const delay = Math.floor(
    (new Date(completedDate || "").getTime() -
      new Date(plannedDate || "").getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return Math.max(3, 10 - Math.max(0, delay));
};

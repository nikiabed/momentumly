import { BOARD_KEYS } from "./constants";
import { getDateKey } from "./date";

const getScore = (
  done: number,
  total: number
) => {
  if (!total) return 0;

  const ratio = done / total;

  if (ratio < 0.2) return 0;
  if (ratio < 0.4) return 1;
  if (ratio < 0.6) return 2;
  if (ratio < 0.8) return 3;

  return 4;
};

export const buildWeeklyProgress = (
  todos: any[]
) => {
  const days = [];

  const today = new Date();

  const diff =
    (today.getDay() + 1) % 7;

  const startOfWeek = new Date(today);

  startOfWeek.setDate(
    today.getDate() - diff
  );

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);

    day.setDate(
      startOfWeek.getDate() + i
    );

    const dateKey =
      getDateKey(day);

    const dayTodos =
      todos.filter(
        (t) =>
          t.boardKey ===
            BOARD_KEYS.MY_DAY &&
          getDateKey(
            t.createdAt
          ) === dateKey
      );

    const done =
      dayTodos.filter(
        (t) => t.status
      ).length;

    const total =
      dayTodos.length;

    days.push({
      label:
        day.toLocaleDateString(
          "fa-IR",
          {
            weekday:
              "short",
          }
        ),

      done,
      total,

      score: getScore(
        done,
        total
      ),
    });
  }

  return days;
};
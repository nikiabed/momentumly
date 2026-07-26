import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";

import { calculateCoin } from "./CalculateCoin";
import { calculateXP } from "./calculateXP";

export function getMonthStats(todos: any[], monthOffset = 0) {
  const now = new DateObject({
    calendar: persian,
  }).add(monthOffset, "month");

  const year = now.year;
  const month = now.month.number;
  const isLeap = persian.isLeap(year);

  const monthLengths = persian.getMonthLengths(isLeap);
  const daysInMonth = monthLengths[month - 1];
  const monthName = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    month: "long",
  }).format(now.toDate());

  const start = new DateObject({
    calendar: persian,
    year,
    month,
    day: 1,
  }).toDate();

  const nextMonth = new DateObject({
    calendar: persian,
    year,
    month,
    day: 1,
  })
    .add(1, "month")
    .toDate();

  const completedTodos = todos.filter((t) => t.status && t.completedAt);

  const monthTodos = completedTodos.filter((todo) => {
    const date = new Date(todo.completedAt);

    return date >= start && date < nextMonth;
  });

  const coins = monthTodos.reduce((sum, todo) => sum + calculateCoin(todo), 0);

  const xp = monthTodos.reduce((sum, todo) => sum + calculateXP(todo), 0);

  const completedTasks = monthTodos.length;

  // روزهای فعال
  const activeDays = new Set(
    monthTodos.map((todo) => {
      const d = new Date(todo.completedAt);

      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    }),
  ).size;

  // بیشترین سکه در یک روز
  const dailyCoins: Record<string, number> = {};

  monthTodos.forEach((todo) => {
    const d = new Date(todo.completedAt);

    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

    dailyCoins[key] = (dailyCoins[key] || 0) + calculateCoin(todo);
  });

  const maxDailyCoins = Object.values(dailyCoins).length
    ? Math.max(...Object.values(dailyCoins))
    : 0;

  // میانگین پیشرفت
  const dailyProgress: Record<string, { planned: number; completed: number }> =
    {};

  todos.forEach((todo) => {
    const plannedDate = todo.myDayDate ?? todo.deadline;

    if (!plannedDate) return;

    const date = new Date(plannedDate);

    if (date < start || date >= nextMonth) return;

    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    if (!dailyProgress[key]) {
      dailyProgress[key] = {
        planned: 0,
        completed: 0,
      };
    }

    dailyProgress[key].planned++;

    if (todo.status && todo.completedAt) {
      dailyProgress[key].completed++;
    }
  });

  let totalScore = 0;
  let count = 0;

  Object.values(dailyProgress).forEach((day) => {
    if (day.planned === 0) return;

    totalScore += Math.min(
      100,
      Math.round((day.completed / day.planned) * 100),
    );

    count++;
  });

  return {
    year,
    month,
    monthName: monthName,
    daysInMonth: daysInMonth,
    coins,
    xp,
    activeDays,
    completedTasks,
    maxDailyCoins,
    averageProgress: count === 0 ? 0 : Math.round(totalScore / count),
  };
}

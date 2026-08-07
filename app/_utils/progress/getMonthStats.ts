import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { TodoList } from "@/app/types";
import { calculateDailyProgress } from "./calculateDailyProgress";

export const getMonthStats = (todos: TodoList, monthOffset = 0) => {
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

  let coins = 0;
  let xp = 0;
  let possibleXP = 0;

  let completedTasks = 0;
  let activeDays = 0;

  let maxDailyCoins = 0;

  let plannedTotal = 0;
  let completedTotal = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new DateObject({
      calendar: persian,
      year,
      month,
      day,
    }).toDate();

    const progress = calculateDailyProgress(todos, date);

    coins += progress.coins;
    xp += progress.xp;
    possibleXP += progress.planned * 15;
    completedTasks += progress.completed;

    plannedTotal += progress.planned;
    completedTotal += progress.completed;

    if (progress.coins > maxDailyCoins) {
      maxDailyCoins = progress.coins;
    }

    if (progress.planned > 0 || progress.completed > 0) {
      activeDays++;
    }
  }

  const completionPercent =
    plannedTotal === 0
      ? completedTotal > 0
        ? completedTotal * 100
        : 0
      : Math.round((completedTotal / plannedTotal) * 100);

  const xpPercent = possibleXP === 0 ? 0 : Math.round((xp / possibleXP) * 100);

  return {
    year,
    month,
    monthName,
    daysInMonth,
    coins,
    xp,
    possibleXP,
    xpPercent,
    completedTasks,
    activeDays,
    maxDailyCoins,
    plannedTasks: plannedTotal,
    completionPercent,
  };
};

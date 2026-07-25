import { calculateCoin } from "./CalculateCoin";
import { calculateDailyScore } from "./calculateDailyScore";
import { calculateXP } from "./calculateXP";
import { getCompletionType } from "./completion";
import { isCompletedOn, isPlannedForDay } from "./todoAnalytics";

export const buildWeeklyProgress = (
  todos: any[],
  weekOffset = 0,
  compact = false,
) => {
  const days = [];
  const today = new Date();
  const diff = (today.getDay() + 1) % 7;
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - diff - weekOffset * 7);

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const plannedTodos = todos.filter((t) => isPlannedForDay(t, day));
    const completedTodos = todos.filter((t) => isCompletedOn(t, day));
    const coins = completedTodos.reduce((sum, t) => sum + calculateCoin(t), 0);
    const onTimeTodos = completedTodos.filter(
      (t) => getCompletionType(t) === "onTime",
    );
    const recoveryTodos = completedTodos.filter(
      (t) => getCompletionType(t) === "delayed",
    );
    const xp = completedTodos.reduce((sum, t) => sum + calculateXP(t), 0);
    const score = calculateDailyScore({
      planned: plannedTodos.length,
      onTime: onTimeTodos.length,
      recovery: recoveryTodos.length,
    });

    days.push({
      label: compact
        ? day.toLocaleDateString("fa-IR", { weekday: "narrow" })
        : day.toLocaleDateString("fa-IR", { weekday: "short" }),

      planned: plannedTodos.length,
      onTime: onTimeTodos.length,
      recovery: recoveryTodos.length,
      totalCompleted: completedTodos.length,
      coins,
      score,
      xp: xp,
    });
  }

  return days;
};

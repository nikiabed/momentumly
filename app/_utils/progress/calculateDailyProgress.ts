import { TodoList } from "@/app/types";
import { calculateCoin } from "./CalculateCoin";
import { calculateXP } from "./calculateXP";
import { getCompletionType } from "./completion";
import { isCompletedOn, isPlannedForDay } from "./todoAnalytics";
import { calculateDailyPercentage } from "./calculateDailyPercentage";

export const calculateDailyProgress = (todos: TodoList, day: Date) => {
  const completedTodos = todos.filter((todo) => isCompletedOn(todo, day));

  const plannedTodos = todos.filter((todo) => isPlannedForDay(todo, day));

  const onTimeTodos = completedTodos.filter(
    (todo) => getCompletionType(todo) === "onTime",
  );

  const recoveryTodos = completedTodos.filter(
    (todo) => getCompletionType(todo) === "delayed",
  );

  // 🪙 رشد کلی
  const coins = completedTodos.reduce(
    (sum, todo) => sum + calculateCoin(todo),
    0,
  );

  // ⭐ رشد شخصی / ADHD XP
const xp = calculateXP({
  completed: completedTodos.length,
  planned: plannedTodos.length,
  onTime: onTimeTodos.length,
  recovered: recoveryTodos.length,
  focusMinutes: 0,
});
  // 📊 فقط آمار امروز
  const percentage = calculateDailyPercentage(
    completedTodos.length,
    plannedTodos.length,
  );

  return {
    planned: plannedTodos.length,
    completed: completedTodos.length,
    percentage,
    onTime: onTimeTodos.length,
    recovery: recoveryTodos.length,
    totalCompleted: completedTodos.length,
    coins,
    xp,
  };
};

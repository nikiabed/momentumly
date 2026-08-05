import { TodoList } from "@/app/types";
import { calculateCoin } from "./CalculateCoin";
import { calculateDailyScore } from "./calculateDailyScore";
import { calculateXP } from "./calculateXP";
import { getCompletionType } from "./completion";
import { isCompletedOn, isPlannedForDay } from "./todoAnalytics";

export const calculateDailyProgress = (todos: TodoList, day: Date) => {
  const completedTodos = todos.filter((todo) => isCompletedOn(todo, day));

  const plannedTodos = todos.filter((todo) => isPlannedForDay(todo, day));

  const onTimeTodos = completedTodos.filter(
    (todo) => getCompletionType(todo) === "onTime",
  );

  const recoveryTodos = completedTodos.filter(
    (todo) => getCompletionType(todo) === "delayed",
  );

  const coins = completedTodos.reduce(
    (sum, todo) => sum + calculateCoin(todo),
    0,
  );

  const xp = completedTodos.reduce((sum, todo) => sum + calculateXP(todo), 0);

  const score = calculateDailyScore({
    planned: Math.max(plannedTodos.length, completedTodos.length),
    onTime: onTimeTodos.length,
    recovery: recoveryTodos.length,
  });

  return {
    planned: plannedTodos.length,
    onTime: onTimeTodos.length,
    recovery: recoveryTodos.length,
    totalCompleted: completedTodos.length,
    coins,
    xp,
    score,
  };
};

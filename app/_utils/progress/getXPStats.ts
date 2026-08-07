import { TodoList } from "@/app/types";
import { calculateXP } from "./calculateXP";
import { getCompletionType } from "./completion";
import { isPlannedForDay } from "./todoAnalytics";

export function getXPStats(todos: TodoList) {
  const completedTodos = todos.filter(
    (todo) => todo.status && todo.completedAt,
  );

  const globalXP = completedTodos.reduce((sum, todo) => {
    const planned = isPlannedForDay(todo, new Date(todo.completedAt!)) ? 1 : 0;

    const onTime = getCompletionType(todo) === "onTime" ? 1 : 0;

    const recovered = getCompletionType(todo) === "delayed" ? 1 : 0;

    const xp = calculateXP({
      completed: 1,
      planned,
      onTime,
      recovered,
      focusMinutes: 0,
    });

    return sum + xp;
  }, 0);

  return {
    globalXP,
  };
}

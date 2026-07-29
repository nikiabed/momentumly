import { TodoList } from "@/app/types";
import { calculateCoin } from "./CalculateCoin";
import { calculateRecovery } from "./calculateRecovery";

export function getCoinStats(todos: TodoList) {
  const completedTodos = todos.filter((t) => t.status && t.completedAt);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const day = now.getDay();
  const daysFromSaturday = (day + 1) % 7;
  const weekStart = new Date(todayStart);
  weekStart.setDate(todayStart.getDate() - daysFromSaturday);
  const globalCoins = completedTodos.reduce(
    (sum, todo) => sum + calculateCoin(todo),
    0,
  );
  const globalRecovery = completedTodos.reduce(
    (sum, todo) => sum + calculateRecovery(todo),
    0,
  );
  const weekTodos = completedTodos.filter((todo) => {
    const date = new Date(todo.completedAt || "");
    return date >= weekStart && date <= now;
  });

  const weekCoins = weekTodos.reduce(
    (sum, todo) => sum + calculateCoin(todo),
    0,
  );

  const weekRecovery = weekTodos.reduce(
    (sum, todo) => sum + calculateRecovery(todo),
    0,
  );

  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1);
  const todayTodos = completedTodos.filter((todo) => {
    const date = new Date(todo.completedAt!);
    return date >= todayStart && date < todayEnd;
  });

  const todayCoins = todayTodos.reduce(
    (sum, todo) => sum + calculateCoin(todo),
    0,
  );

  const todayRecovery = todayTodos.reduce(
    (sum, todo) => sum + calculateRecovery(todo),
    0,
  );

  return {
    globalCoins,
    globalRecovery,
    weekCoins,
    weekRecovery,
    todayCoins,
    todayRecovery,
  };
}

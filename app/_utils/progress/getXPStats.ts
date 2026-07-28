import { TodoList } from "@/app/types";
import { calculateXP } from "./calculateXP";

export function getXPStats(todos: TodoList) {
  const completedTodos = todos.filter((t) => t.status && t.completedAt);

  const globalXP = completedTodos.reduce(
    (sum, todo) => sum + calculateXP(todo),
    0,
  );

  return {
    globalXP,
  };
}

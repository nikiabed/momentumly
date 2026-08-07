import { TodoList } from "@/app/types";
import { isPlannedForDay } from "./todoAnalytics";

export const calculateWeeklyMaxXP = (todos: TodoList, days: Date[]) => {
  return days.reduce((total, day) => {
    const plannedTodos = todos.filter((todo) => isPlannedForDay(todo, day));

    // بهترین حالت: هر کار به موقع انجام شود
    return total + plannedTodos.length * 15;
  }, 0);
};

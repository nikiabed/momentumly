import { TodoList } from "@/app/types";
import { isCompletedOn, isPlannedForDay } from "./todoAnalytics";
import { calculateXP } from "./calculateXP";
import { getCompletionType } from "./completion";

export const calculateWeeklyXPProgress = (todos: TodoList, days: Date[]) => {
  let earnedXP = 0;
  let possibleXP = 0;

  days.forEach((day) => {
    const plannedTodos = todos.filter((todo) => isPlannedForDay(todo, day));

    const completed = todos.filter((todo) => isCompletedOn(todo, day));

    earnedXP += calculateXP({
      completed: completed.length,
      planned: plannedTodos.length,
      onTime: completed.filter((t) => getCompletionType(t) === "onTime").length,
      recovered: completed.filter((t) => getCompletionType(t) === "delayed")
        .length,
      focusMinutes: 0,
    });

    // بهترین حالت:
    // همه کارها انجام + به موقع
    possibleXP += plannedTodos.length * 15;
  });

  if (!possibleXP) return 0;

  return Math.round((earnedXP / possibleXP) * 100);
};

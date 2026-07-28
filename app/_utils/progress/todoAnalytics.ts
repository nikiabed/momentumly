import { Todo } from "@/app/types";
import { getDateKey } from "../date";

export const isCompletedOn = (todo: Todo, day: Date) => {
  if (!todo.status || !todo.completedAt) return false;
  return getDateKey(todo.completedAt) === getDateKey(day);
};

export const isPlannedForDay = (todo: Todo, day: Date) => {
  const dateKey = getDateKey(day);
  const myDay = todo.myDayDate === dateKey;
  const deadline = todo.deadline && getDateKey(todo.deadline) === dateKey;
  return Boolean(myDay || deadline);
};

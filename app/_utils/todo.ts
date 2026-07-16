import { TodoType } from "../todo/_common";
import { getDateKey } from "./date";

export const isInMyDay = (todo: TodoType) => {
  const today = getDateKey(new Date());
  const manuallyAdded = todo.myDayDate === today;
  const deadlineToday = todo.deadline && getDateKey(todo.deadline) === today;
  return manuallyAdded || deadlineToday;
};

export const isManuallyInMyDay = (todo: TodoType) =>
  todo.myDayDate === getDateKey(new Date());

export const isInDay = (todo: TodoType, date: Date | string) => {
  const dayKey = getDateKey(date);

  return (
    todo.myDayDate === dayKey ||
    (todo.deadline && getDateKey(todo.deadline) === dayKey)
  );
};

export const getTodoDisplayDate = (todo: TodoType) => {
  return getDateKey(todo.deadline || todo.createdAt);
};

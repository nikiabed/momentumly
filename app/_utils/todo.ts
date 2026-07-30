import { Todo } from "../types";
import { getDateKey } from "./date";

export const isInMyDay = (todo: Todo) => {
  const today = getDateKey(new Date());
  const manuallyAdded = todo.myDayDate === today;
  const deadlineToday = todo.deadline && getDateKey(todo.deadline) === today;
  return manuallyAdded || deadlineToday;
};

export const isManuallyInMyDay = (todo: Todo) =>
  todo.myDayDate === getDateKey(new Date());

export const isInDay = (todo: Todo, date: Date | string) => {
  const dayKey = getDateKey(date);

  return (
    todo.myDayDate === dayKey ||
    (todo.deadline && getDateKey(todo.deadline) === dayKey)
  );
};

export const getTodoDisplayDate = (todo: Todo) => {
  if (todo.status && todo.completedAt) {
    return getDateKey(todo.completedAt);
  }
  if (todo.deadline) {
    return getDateKey(todo.deadline);
  }
  return getDateKey(todo.createdAt);
};

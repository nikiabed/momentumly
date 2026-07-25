import { getDateKey } from "../date";

export const getCompletionType = (todo: any) => {
  if (!todo.status || !todo.completedAt) {
    return "pending";
  }
  const completedDate = getDateKey(todo.completedAt);
  const plannedDate = todo.myDayDate
    ? getDateKey(todo.myDayDate)
    : todo.deadline
      ? getDateKey(todo.deadline)
      : null;

  if (!plannedDate) {
    return "completed";
  }

  if (completedDate === plannedDate) {
    return "onTime";
  }

  return "delayed";
};

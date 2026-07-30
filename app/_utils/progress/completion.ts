import { Todo } from "@/app/types";
import { getDateKey } from "../date";

export const getCompletionType = (todo: Todo) => {
  if (!todo.status || !todo.completedAt) {
    return "pending";
  }

  if (!todo.myDayDate && !todo.deadline) {
    return "onTime";
  }

  const completedDate = getDateKey(todo.completedAt);
  const plannedDate = todo.myDayDate
    ? getDateKey(todo.myDayDate)
    : getDateKey(todo.deadline!);

  return completedDate === plannedDate ? "onTime" : "delayed";
};

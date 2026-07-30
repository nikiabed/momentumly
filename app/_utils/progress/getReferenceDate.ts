import { Todo } from "@/app/types";
import { getDateKey } from "../date";

export const getReferenceDate = (todo: Todo) => {
  if (todo.myDayDate) {
    return getDateKey(todo.myDayDate);
  }

  if (todo.deadline) {
    return getDateKey(todo.deadline);
  }

  return todo.completedAt ? getDateKey(todo.completedAt) : null;
};

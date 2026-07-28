import { Todo } from "@/app/types";
import { getDateKey } from "../date";

export const calculateRecovery = (todo: Todo) => {
  if (!todo.status || !todo.completedAt) return 0;
  const planned = todo.myDayDate ?? todo.deadline;
  if (!planned) return 0;
  const completedDate = new Date(getDateKey(todo.completedAt) || "");
  const plannedDate = new Date(getDateKey(planned) || "");
  const delay = Math.floor(
    (completedDate.getTime() - plannedDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (delay <= 0) return 0;
  if (delay === 1) return 3;
  if (delay === 2) return 2;
  if (delay === 3) return 1;
  if (delay <= 10) return 1;

  return 0;
};

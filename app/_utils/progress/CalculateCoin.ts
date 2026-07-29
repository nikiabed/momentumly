import { Todo } from "@/app/types";
import { getDateKey } from "../date";
import { getReferenceDate } from "./getReferenceDate";

export const calculateCoin = (todo: Todo) => {
  if (!todo.status || !todo.completedAt) return 0;

  const reference = getReferenceDate(todo);
  if (!reference) return 0;

  const completedDate = new Date(getDateKey(todo.completedAt) || "");
  const referenceDate = new Date(reference);

  const delay = Math.floor(
    (completedDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (delay <= 0) return 10;
  if (delay === 1) return 8;
  if (delay === 2) return 6;
  if (delay === 3) return 4;

  return 0;
};

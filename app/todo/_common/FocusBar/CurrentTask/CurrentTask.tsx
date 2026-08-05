"use client";

import { useTimer, useTodoContext } from "@/app/_utils";

export const CurrentTask = () => {
  const { todo } = useTodoContext();
  const { activeTimer } = useTimer();

  if (!activeTimer) return null;

  const current = todo.find((t) => t._id === activeTimer.todoId);

  return (
    <div className="max-w-62.5 truncate font-semibold">{current?.title}</div>
  );
};

export const calculateXP = (todo: any) => {
  if (!todo.status || !todo.completedAt) return 0;

  const planned = todo.myDayDate ?? todo.deadline;
  if (!planned) return 0;
  const completed = new Date(todo.completedAt);
  const plannedDate = new Date(planned);
  const delay = Math.floor(
    (completed.getTime() - plannedDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (delay <= 0) return 15;
  if (delay <= 3) return 10;
  if (delay <= 10) return 8;
  return 5;
};

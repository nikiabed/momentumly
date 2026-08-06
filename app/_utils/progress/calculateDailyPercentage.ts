export function calculateDailyPercentage(
  completed: number,
  planned: number
) {
  if (planned === 0) {
    return completed > 0 ? completed * 100 : 0;
  }

  return Math.round((completed / planned) * 100);
}
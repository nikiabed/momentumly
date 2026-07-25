type DailyScoreInput = {
  planned: number;
  onTime: number;
  recovery: number;
};

export function calculateDailyScore({
  planned,
  onTime,
  recovery,
}: DailyScoreInput) {
  if (planned === 0) return 0;

  const completionRate = Math.min(onTime / planned, 1);
  const recoveryBonus = Math.min(recovery * 5, 15);
  const score = completionRate * 85 + recoveryBonus;
  return Math.min(100, Math.round(score));
}

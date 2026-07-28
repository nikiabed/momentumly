export const getLevelInfo = (coins: number, thresholds: number[]) => {
  let level = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (coins >= thresholds[i]) {
      level = i;
    } else {
      break;
    }
  }
  const currentThreshold = thresholds[level];
  const nextThreshold = thresholds[level + 1];

  if (nextThreshold === undefined) {
    return {
      level,
      currentThreshold,
      nextThreshold: null,
      percent: 100,
      remaining: 0,
    };
  }

  const progress = coins - currentThreshold;
  const needed = nextThreshold - currentThreshold;

  return {
    level,
    currentThreshold,
    nextThreshold,
    percent: Math.min((progress / needed) * 100, 100),
    remaining: Math.max(nextThreshold - coins, 0),
  };
};

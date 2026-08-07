type XPInput = {
  completed: number;
  planned: number;
  onTime: number;
  recovered: number;
  focusMinutes: number;
};

export function calculateXP({
  completed,
  planned,
  onTime,
  recovered,
  focusMinutes,
}: XPInput) {

  let xp = 0;


  // انجام کار
  xp += completed * 10;


  // انجام بیشتر از برنامه
  if (planned > 0 && completed > planned) {
    const extra = completed - planned;
    xp += extra * 5;
  }


  // نظم زمانی
  xp += onTime * 5;


  // برگشت بعد از عقب افتادن
  xp += recovered * 8;


  // تمرکز واقعی
  xp += Math.floor(focusMinutes / 25) * 5;


  return xp;
}
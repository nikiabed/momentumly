import { useTodoContext } from "@/app/_utils";
import {
  buildWeeklyProgress,
  calculateWeeklyMaxXP,
  getWeekMood,
} from "@/app/_utils/progress";
import Image from "next/image";

export const WeekSect = () => {
  const { todo } = useTodoContext();
  const weeklyData = buildWeeklyProgress(todo);
  const weeklyXP = weeklyData.reduce((sum, day) => sum + day.xp, 0);
  const weeklyMaxXP = calculateWeeklyMaxXP(
    todo,
    weeklyData.map((day) => day.date),
  );

  const xpPercent =
    weeklyMaxXP === 0
      ? 0
      : Math.min(Math.round((weeklyXP / weeklyMaxXP) * 100), 100);
  const mood = getWeekMood(weeklyXP);
  return (
    <div
      className="
    relative overflow-hidden
    bg-background
    border border-border-gray
    rounded-4xl
    shadow-sm
    p-6
    mb-5
    min-h-55
    flex items-center
    justify-around
  "
    >
      <div
        className="
      flex flex-col
      items-center
      justify-center
      text-center
      gap-3
      z-10
    "
      >
        <span className="text-sm font-semibold text-muted">خلاصه این هفته</span>

        <h2 className="text-2xl md:text-3xl font-black text-foreground">
          {mood.title}
        </h2>

        <p className="text-sm md:text-base text-muted font-medium">
          {mood.text}
        </p>

        <div className="flex flex-col gap-2 mt-2 w-48">
          <div className="relative w-full h-3 bg-white/20 rounded-full overflow-hidden">
            {/* ظرفیت کل هفته */}
            <div className="absolute inset-0 bg-border-gray rounded-full" />

            {/* XP فعلی */}
            <div
              className="
        absolute
        left-0
        top-0
        h-full
        bg-coin-primary
        rounded-full
        transition-all
      "
              style={{ width: `${xpPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-muted">
            <span>⭐ {weeklyXP} XP</span>

            <span>{weeklyMaxXP} XP</span>
          </div>
        </div>
      </div>

      <div className="w-37.5 md:w-55 ">
        <Image
          src={mood.image}
          alt=""
          width={250}
          height={180}
          className="object-contain"
        />
      </div>
    </div>
  );
};

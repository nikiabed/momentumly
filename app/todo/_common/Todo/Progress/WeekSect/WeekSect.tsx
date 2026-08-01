import { useTodoContext } from "@/app/_utils";
import { buildWeeklyProgress, getWeekMood } from "@/app/_utils/progress";
import Image from "next/image";

export const WeekSect = () => {
  const { todo } = useTodoContext();
  const weeklyData = buildWeeklyProgress(todo);
  const activeDays = weeklyData.filter((day) => day.planned > 0);
  const progress =
    activeDays.length === 0
      ? 0
      : Math.round(
          activeDays.reduce((sum, day) => sum + day.score, 0) /
            activeDays.length,
        );

  const mood = getWeekMood(progress);
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
        <span className="text-sm font-semibold text-muted">
          خلاصه این هفته
        </span>

        <h2 className="text-2xl md:text-3xl font-black text-foreground">
          {mood.title}
        </h2>

        <p className="text-sm md:text-base text-muted font-medium">
          {mood.text}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <div className="w-32 h-2 bg-border-gray rounded-full overflow-hidden">
            <div
              className="h-full bg-coin-primary rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-sm font-black text-coin-primary">
            {progress}%
          </span>
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

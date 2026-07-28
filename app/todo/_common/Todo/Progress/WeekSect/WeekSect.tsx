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
    bg-white
    border border-gray-100
    rounded-4xl
    shadow-sm
    p-6 md:p-8
    mb-5
    min-h-55
    flex items-center
  "
    >
      <div className="absolute left-5 top-5 opacity-80">
        <Image
          src="/images/bulb.png"
          alt=""
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      <div
        className="
      flex-1
      flex flex-col
      items-center
      justify-center
      text-center
      gap-3
      z-10
    "
      >
        <span className="text-sm font-semibold text-gray-400">
          خلاصه این هفته
        </span>

        <h2 className="text-2xl md:text-3xl font-black text-gray-800">
          {mood.title}
        </h2>

        <p className="text-sm md:text-base text-gray-500 font-medium">
          {mood.text}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-sm font-black text-violet-600">
            {progress}%
          </span>
        </div>
      </div>

      {/* Mood */}
      <div className="w-37.5 md:w-55 flex justify-center">
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

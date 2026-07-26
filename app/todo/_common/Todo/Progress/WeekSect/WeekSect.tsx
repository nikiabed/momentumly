import { useTodoContext } from "@/app/_utils";
import { buildWeeklyProgress } from "@/app/_utils/progress";
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

  function getWeekMood(progress: number) {
    if (progress < 20)
      return {
        image: "/images/stormy.png",
        title: "هفته آرومی بوده 🌧️",
        text: "هفته بعد هنوز فرصت داری، بهترین ها در انتظارت هستن!",
      };

    if (progress < 50)
      return {
        image: "/images/rainy.png",
        title: "کم کم داری جلو میری ☁️",
        text: "ادامه بده، بهترین ها در انتظارت هستن!",
      };

    if (progress < 80)
      return {
        image: "/images/cloudy.png",
        title: "هفته خوبی داشتی ⛅",
        text: "روندت رو حفظ کن، بهترین ها در انتظارت هستن!",
      };

    return {
      image: "/images/sunny.png",
      title: "درخشیدی ☀️",
      text: "به همین مسیر ادامه بده، بهترین ها در انتظارت هستن!",
    };
  }

  const mood = getWeekMood(progress);
  return (
    <div className="bg-[#f8fafc] flex justify-between p-5 rounded-3xl shadow mb-5">
      <div className="flex items-center">
        <Image src="/images/bulb.png" alt="cloudy" width={120} height={10} />
      </div>
      <div className="flex flex-col gap-4 justify-center text-center">
        <h1 className="text-2xl font-semibold">{mood.title}</h1>
        <h1 className="text-gray-600 font-semibold">{mood.text}</h1>
      </div>
      <Image src={mood.image} alt="cloudy" width={250} height={100} />
    </div>
  );
};

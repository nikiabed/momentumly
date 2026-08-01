import { useTodoContext } from "@/app/_utils";
import Image from "next/image";
import { Summary } from "./Summary";
import { LevelBar } from "./LevelBar";
import { getCoinStats, getLevelInfo } from "@/app/_utils/progress";

export const MonthSect = () => {
  const { todo } = useTodoContext();
  const thresholds = [0, 450, 1500, 4000, 9000, 12000];
  const { globalCoins } = getCoinStats(todo);

  const levels = [
    {
      name: "جوانه",
      image: "/images/plant0.png",
    },
    {
      name: "نهال",
      image: "/images/plant1.png",
    },
    {
      name: "گیاه کوچک",
      image: "/images/plant2.png",
    },
    {
      name: "گیاه بالغ",
      image: "/images/plant3.png",
    },
    {
      name: "درختچه",
      image: "/images/plant4.png",
    },
    {
      name: "درخت کامل",
      image: "/images/plant5.png",
    },
  ];

  const { level, nextThreshold, percent, remaining } = getLevelInfo(
    globalCoins,
    thresholds,
  );

  const currentPlant = levels[level] ?? levels[levels.length - 1];

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center">
      <div className="bg-background rounded-3xl shadow p-5 flex flex-col gap-2 flex-1">
        <h2 className="text-2xl font-bold">سطح رشدت</h2>
        <div className="flex items-center justify-around">
          <div className="flex flex-col gap-2 ">
            <h1 className="text-4xl font-black text-[#34d399] ">
              {currentPlant.name}
            </h1>
            <h2 className="text-muted font-semibold ">سطح {level + 1} </h2>
          </div>
          <div>
            <Image
              alt={currentPlant.name}
              src={currentPlant.image}
              width={200}
              height={100}
              className="object-contain pl-20"
            />
          </div>
        </div>
        <LevelBar percent={percent} remaining={remaining} />
        {nextThreshold ? (
          <>
            <div className="text-muted font-semibold">
              برای رسیدن به سطح بعدی
            </div>
            <div className="font-semibold">
              {globalCoins} / {nextThreshold}
              <span className="text-[#34d399]"> سکه</span>
            </div>
          </>
        ) : (
          <div className="text-[#34d399] font-bold">
            🎉 بالاترین سطح رو باز کردی!
          </div>
        )}
      </div>
      <Summary />
    </div>
  );
};

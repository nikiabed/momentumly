import { useTodoContext } from "@/app/_utils";
import LevelBar from "./LevelBar/LevelBar";
import Summary from "./Summary/Summary";
import Image from "next/image";

function getLevelProgress(
  coins: number,
  currentLevelThreshold: number,
  nextLevelThreshold: number,
) {
  const progress = coins - currentLevelThreshold;
  const needed = nextLevelThreshold - currentLevelThreshold;
  const percent = Math.min((progress / needed) * 100, 100);

  return {
    percent,
    remaining: Math.max(needed - progress, 0),
  };
}

function getCurrentLevel(coins: number, thresholds: number[]) {
  let level = 0;

  for (let i = 0; i < thresholds.length; i++) {
    if (coins >= thresholds[i]) {
      level = i;
    } else {
      break;
    }
  }

  return level;
}

const MonthSect = () => {
  const { todo } = useTodoContext();
  const coins = todo.filter((t) => t.status).length * 10;
  const thresholds = [0, 1000, 3000, 6000, 9000, 12000];
  const currentLevel = getCurrentLevel(coins, thresholds);
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

  const currentPlant = levels[currentLevel] ?? levels[levels.length - 1];
  const { percent, remaining } = getLevelProgress(
    coins,
    thresholds[currentLevel],
    thresholds[currentLevel + 1],
  );

  return (
    <div className="flex gap-6 justify-center">
      <div className="bg-white rounded-3xl shadow p-5 flex flex-col gap-2 flex-1">
        <h2 className="text-xl font-semibold">سطح رشدت</h2>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 ">
            <h1 className="text-4xl font-bold text-[#34d399] ">
              {currentPlant.name}
            </h1>
            <h2 className="text-gray-400 font-semibold ">
              سطح {getCurrentLevel(coins, thresholds) + 1}
            </h2>
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
        <div className="text-gray-400 font-semibold">
          برای رسیدن به سطح بعدی
        </div>
        <div>
          {thresholds[getCurrentLevel(coins, thresholds) + 1]} / {remaining}{" "}
          <span className="text-[#34d399]">سکه</span>
        </div>
      </div>

      <Summary />
    </div>
  );
};

export default MonthSect;

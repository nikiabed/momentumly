import Image from "next/image";
import { useTodoContext } from "@/app/_utils";
import { getCoinStats } from "@/app/_utils/progress";

const CoinSect = ({ xp }: { xp: number }) => {
  const { todo } = useTodoContext();
  const { globalCoins, weekCoins, todayCoins, weekRecovery, todayRecovery } =
    getCoinStats(todo);

  return (
    <div
      className="
      flex flex-col lg:flex-row justify-between items-center
      bg-white
      shadow
      rounded-4xl
      max-w-980
      p-6
    "
    >
      {/* Left */}
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-gray-700">
            <p className="text-2xl font-bold">کل سکه‌هات</p>
          </div>

          <h2 className="text-5xl font-bold text-violet-700 text-center">
            {globalCoins}
          </h2>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <p className="text-lg text-gray-700 font-semibold">این هفته</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-center">{weekCoins} +</h2>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <span className="text-center">🔄</span>
          <p className="text-lg text-gray-700 font-semibold">نجات</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-center">{weekRecovery}</h2>
        </div>
      </div>

      {/* Piggy */}
      <Image
        width={250}
        height={180}
        src="/images/piggy.png"
        alt="piggy bank"
        className="object-contain"
      />

      {/* Right */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">آفرین ✨</h2>

          <p className="text-lg">امروز عالی بودی!</p>

          <p className="text-gray-500">به هدفت نزدیک‌تر شدی</p>
        </div>
        <div
          className="
    cursor-pointer
    px-5 py-3
    rounded-full
    bg-yellow-400
    font-semibold
  "
        >
          🪙 +{todayCoins} سکه امروز
          <div>🔄 +{todayRecovery}</div>
        </div>
      </div>
    </div>
  );
};

export default CoinSect;

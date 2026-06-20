import Image from "next/image";
import { useTodoContext } from "@/app/_utils";

const CoinSect = () => {
  const { todo } = useTodoContext();

  const globalCoins = todo.filter((t) => t.status).length * 10;

  const weekCoins =
    todo.filter((t) => {
      const created = new Date(t.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return t.status && created >= weekAgo;
    }).length * 10;

  const todayCoins =
    todo.filter((t) => {
      if (!t.status) return false;
      const created = new Date(t.createdAt);
      const today = new Date();
      return (
        created.getFullYear() === today.getFullYear() &&
        created.getMonth() === today.getMonth() &&
        created.getDate() === today.getDate()
      );
    }).length * 10;

  return (
    <div
      className="
      flex justify-between items-center
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
            <span>🪙</span>
            <p className="text-2xl font-bold">کل سکه‌هات</p>
          </div>

          <h1 className="text-5xl font-bold text-violet-700 text-center">
            {globalCoins}
          </h1>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <span className="text-center">✨</span>
          <p className="text-lg text-gray-700 font-semibold" >این هفته</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-center">{weekCoins} +</h2>
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
        <button
          className="
    cursor-pointer
    px-5 py-3
    rounded-full
    bg-yellow-400
    font-semibold
  "
        >
          🪙 +{todayCoins} سکه امروز
        </button>
      </div>
    </div>
  );
};

export default CoinSect;

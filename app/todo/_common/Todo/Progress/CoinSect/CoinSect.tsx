import Image from "next/image";
import { useTodoContext } from "@/app/_utils";
import { getCoinStats } from "@/app/_utils/progress";

export const CoinSect = () => {
  const { todo } = useTodoContext();

  const { globalCoins, weekCoins, todayCoins, weekRecovery, todayRecovery } =
    getCoinStats(todo);

  return (
    <div
      className="
        w-full max-w-980
        bg-white
        rounded-4xl
        shadow-sm
        border border-gray-100
        p-6 md:p-8
        flex flex-col lg:flex-row
        items-center
        gap-8
        overflow-hidden
      "
    >
      <div className="w-full lg:w-1/3 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-gray-500 justify-center">
          <span className="text-xl">🪙</span>
          <span className="text-md font-semibold">موجودی سکه‌ها</span>
        </div>

        <div className="flex items-baseline gap-2 mt-1 justify-center">
          <span className="text-5xl font-black text-violet-600">
            {globalCoins}
          </span>

          <span className="text-xl font-bold text-gray-400">سکه</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-violet-50 rounded-2xl p-4">
            <div className="text-md text-violet-400 font-semibold text-center">
              این هفته
            </div>

            <div className="flex items-center gap-1 mt-1 justify-center">
              <span className="text-lg">🪙</span>
              <span className="text-xl font-bold text-violet-700">
                +{weekCoins}
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4">
            <div className="text-md text-emerald-500 font-semibold text-center">
              نجات
            </div>

            <div className="flex items-center gap-1 mt-1 justify-center">
              <span className="text-lg">🔄</span>
              <span className="text-xl font-bold text-emerald-600">
                {weekRecovery}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className="relative">
          <div
            className="
              absolute
              inset-4
              rounded-full
              bg-yellow-50
              z-0
            "
          />

          <Image
            width={240}
            height={180}
            src="/images/piggy.png"
            alt="piggy bank"
            className="object-contain relative z-10"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/3">
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-gray-800">امروز ✨</h2>

            <span className="px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">
              پاداش
            </span>
          </div>

          <p className="text-sm text-gray-400 mt-1">
            هر کاری که انجام میدی، یه قدم جلوترت می‌بره.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div
            className="
              flex items-center justify-between
              bg-yellow-50
              border border-yellow-100
              rounded-2xl
              px-4 py-3
            "
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-yellow-100 flex items-center justify-center">
                🪙
              </span>

              <div>
                <div className="text-xs text-gray-400">سکه امروز</div>
                <div className="font-bold text-gray-700">پاداش انجام کارها</div>
              </div>
            </div>

            <span className="text-lg font-black text-yellow-600">
              +{todayCoins}
            </span>
          </div>

          <div
            className="
              flex items-center justify-between
              bg-emerald-50
              border border-emerald-100
              rounded-2xl
              px-4 py-3
            "
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                🔄
              </span>

              <div>
                <div className="text-xs text-gray-400">نجات امروز</div>
                <div className="font-bold text-gray-700">
                  برگشتی و انجامش دادی
                </div>
              </div>
            </div>

            <span className="text-lg font-black text-emerald-600">
              +{todayRecovery}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

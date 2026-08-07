import Image from "next/image";
import { useTodoContext } from "@/app/_utils";
import { getCoinStats } from "@/app/_utils/progress";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CoinSect = () => {
  const { todo } = useTodoContext();

  const { globalCoins, weekCoins, todayCoins, weekRecovery, todayRecovery } =
    getCoinStats(todo);

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="
      relative
        w-full max-w-980
        bg-linear-90
        from-background
        to-coin-background
        rounded-4xl
        shadow
        p-15
        ring-1 ring-yellow-300/20
        flex flex-col lg:flex-row
        items-center
        gap-8
        overflow-hidden
hover:bg-coin-background hover:bg-blend-hue
        
      "
    >
      <div
        className="
absolute bottom-0 left-10 right-10
h-0.5
bg-linear-to-r
from-transparent
via-yellow-400/50
to-transparent
"
      />
      <div className="w-full lg:w-1/3 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-muted justify-center">
          <span className="text-md font-semibold">موجودی سکه‌ها</span>
        </div>

        <motion.div
          className="flex items-baseline gap-2 mt-1 justify-center"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-5xl font-black text-coin-primary">
            {globalCoins}
          </span>

          <span className="text-xl font-bold text-muted ">🪙</span>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-coin-soft rounded-2xl p-4">
            <div className="text-md text-coin-primary font-semibold text-center">
              این هفته
            </div>

            <div className="flex items-center gap-1 mt-1 justify-center">
              <span className="text-lg">🪙</span>
              <span className="text-xl font-bold text-coin-primary">
                +{weekCoins}
              </span>
            </div>
          </div>

          <div className="bg-success-soft rounded-2xl p-4">
            <div className="text-md text-border-focus font-semibold text-center">
              نجات
            </div>

            <div className="flex items-center gap-1 mt-1 justify-center">
              <span className="text-lg">🔄</span>
              <span className="text-xl font-bold text-border-focus">
                {weekRecovery}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center ">
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              width={240}
              height={180}
              src={"/images/coinBox.png"}
              alt="coin box"
              className="object-contain relative z-10"
            />
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/3">
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-foreground">امروز ✨</h2>

            <span
              className="
                px-2.5 py-1 rounded-full
                bg-reward-soft
                text-yellow-500
                text-xs font-bold
              "
            >
              پاداش
            </span>
          </div>

          <p className="text-sm text-muted mt-1">
            هر کاری که انجام میدی، یه قدم جلوترت می‌بره.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div
            className="
              flex items-center justify-between
              bg-reward-soft
              border border-border
              rounded-2xl
              px-4 py-3
            "
          >
            <div className="flex items-center gap-3">
              <span
                className="
                  w-9 h-9 rounded-xl
                  bg-yellow-500/20
                  flex items-center justify-center
                "
              >
                🪙
              </span>

              <div>
                <div className="text-xs text-muted">سکه امروز</div>

                <div className="font-bold text-foreground">
                  پاداش انجام کارها
                </div>
              </div>
            </div>

            <span className="text-lg font-black text-yellow-500">
              +{todayCoins}
            </span>
          </div>

          <div
            className="
              flex items-center justify-between
              bg-success-soft
              border border-border
              rounded-2xl
              px-4 py-3
            "
          >
            <div className="flex items-center gap-3">
              <span
                className="
                  w-9 h-9 rounded-xl
                  flex items-center justify-center
                "
              >
                🔄
              </span>

              <div>
                <div className="text-xs text-muted">نجات امروز</div>

                <div className="font-bold text-foreground">
                  برگشتی و انجامش دادی
                </div>
              </div>
            </div>

            <span className="text-lg font-black text-border-focus">
              +{todayRecovery}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

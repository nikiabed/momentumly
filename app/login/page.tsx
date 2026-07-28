"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginScene } from "./LoginScene";
import { Footer } from "../_common";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/todo");
    }
  }, [status, router]);

  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        overflow-hidden
        bg-gradient-to-br
        from-[#b8b9bd]
        via-[#5b55b8]
        to-[#3d176d]
      "
    >
      <main
        className="
          flex-1
          w-full
          max-w-6xl
          mx-auto
          px-8
          py-10
          grid
          md:grid-cols-2
          items-center
          gap-8
        "
      >
        {/* Login */}
        <section
          className="
            order-2
            md:order-1
            flex
            justify-center
          "
        >
          <div
            className="
              w-full
              max-w-md
              text-white
              text-center
              md:text-right
            "
          >
            <p
              className="
                text-sm
                text-white/60
                mb-3
                tracking-wide
              "
            >
              | Momentumly 
            </p>

            <h1
              className="
                text-3xl
                md:text-4xl
                font-black
                leading-tight
                mb-4
              "
            >
              آماده‌ای شروع کنی؟
            </h1>

            <p
              className="
                text-white/70
                text-lg
                leading-8
                mb-8
              "
            >
              هر روز یک قدم کوچک،
              <br />
              یک رشد بزرگ.
            </p>

            <button
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/todo",
                })
              }
              className="
                w-full
                max-w-sm
                px-7
                py-4
                rounded-2xl
                bg-white
                text-gray-900
                font-bold
                shadow-xl
                transition
                duration-200
                hover:scale-[1.02]
                hover:shadow-2xl
                active:scale-[0.98]
                cursor-pointer
              "
            >
              <span className="flex items-center justify-center gap-3">
                <span className="text-lg">G</span>
                ادامه با گوگل
                <span>→</span>
              </span>
            </button>

            <p
              className="
                mt-5
                text-xs
                text-white/40
              "
            >
              شروع کن، بدون فشار برای کامل بودن.
            </p>
          </div>
        </section>

        {/* Scene */}
        <section
          className="
            order-1
            md:order-2
            flex
            justify-center
            items-center
          "
        >
          <LoginScene />
        </section>
      </main>

      <Footer />
    </div>
  );
}

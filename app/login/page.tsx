"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginScene } from "./LoginScene";
import { motion } from "framer-motion";
import { Footer } from "../_common";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/todo");
    }
  }, [status]);
  return (
    <div className="min-h-screen flex flex-col ">
      <div
        className="
relative
overflow-hidden
flex
items-center
justify-center
flex-1
"
      >
        <div
          className="
rounded-[40px]
p-10
flex
flex-col
items-center
gap-6
"
        >
          <LoginScene />
          <h1
            className="
text-3xl
font-black
text-gray-800
"
          >
            آماده‌ای شروع کنی؟
          </h1>
          <p className="text-gray-500">هر روز یک قدم کوچک، یک رشد بزرگ</p>
          <motion.button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/todo",
              })
            }
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
    px-8
    py-3
    bg-green-600
    rounded-full
    text-white
    font-bold
    cursor-pointer
  "
          >
            شروع مسیر 🚀
          </motion.button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

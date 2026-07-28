"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginScene } from "./LoginScene";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/todo");
    }
  }, [status]);
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div
        className="
relative
overflow-hidden
bg-linear-to-br
from-purple-50
to-green-50
h-screen
flex
items-center
justify-center
"
      >
        <div
          className="
bg-white/80
backdrop-blur
rounded-[40px]
shadow-xl
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
            آماده‌ای شروع کنی؟ 🌱
          </h1>

          <p className="text-gray-500">هر روز یک قدم کوچک، یک رشد بزرگ</p>

          <button>شروع مسیر 🚀</button>
        </div>
      </div>
    </div>
  );
}

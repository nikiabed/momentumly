"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <h1 className="mb-4 text-xl font-bold">خوش آمدید</h1>

        <div className="flex gap-3">
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/todo",
              })
            }
            className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer"
          >
            ادامه با گوگل
          </button>
        </div>
      </div>
    </div>
  );
}

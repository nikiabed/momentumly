"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <h1 className="mb-4 text-xl font-bold">Welcome</h1>

        <div className="flex gap-3">
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/todo",
              })
            }
            className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer"
          >
            Continue with Google
          </button>

          
        </div>
      </div>
    </div>
  );
}

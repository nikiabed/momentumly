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
  }, [status, router]);

  return (
    <div
      className="
      h-screen overflow-hidden
      bg-cover
      bg-center
      bg-no-repeat
      text-gray-700
      
    "
      style={{
        backgroundImage: "url('/images/login-mountains.jpg')",
      }}
    >
      {/* LOGIN */}
      <main
        className="flex 
 items-center justify-center px-6 py-16"
      >
        {/* FORM */}
        <section
          className="
            order-2
            flex
            justify-center
            md:order-1
            bg-white/50
            
            rounded-4xl
           px-6 py-8 sm:px-10 sm:py-10 md:px-20
          "
        >
          <div className="w-full max-w-md">
            {/* LOGO */}
            <div className="mb-10">
              <span
                className="
                  text-xl
                  font-bold
                  tracking-tight
                  
                "
              >
                وارد شوید{" "}
              </span>
            </div>

            {/* FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // بعداً اینجا login credentials را اضافه می‌کنیم
              }}
              className="space-y-5"
            >
              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                  "
                >
                  ایمیل
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="
                    w-full
                    rounded-2xl
                    px-4
                    py-3.5
                    text-sm
                    text-black
                    outline-none
                    border
                    border-gray-400
                    placeholder:text-black/25
                    transition
                    focus:border-purple-400/60
                    focus:bg-white/[0.06]
                    focus:ring-2
                    focus:ring-purple-400/10
                  "
                />
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="
                      text-sm
                      font-semibold
                    "
                  >
                    رمز عبور
                  </label>

                  <button
                    type="button"
                    className="
                      text-xs
                      font-medium
                      text-purple-400
                      transition
                      hover:text-purple-200
                    "
                  >
                    رمز عبور را فراموش کردی؟
                  </button>
                </div>

                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="
                    w-full
                    rounded-2xl
                    text-black
                    outline-none
                    border
                    border-gray-400
                    placeholder:text-black/25
                    transition
                    focus:border-purple-400/60
                    focus:bg-white/6
                    px-4
                    py-3.5
                    text-sm
                    focus:ring-2
                    focus:ring-purple-400/10
                  "
                />
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="
                  w-full
                  rounded-2xl
                  bg-gradient-to-r
                  from-violet-500
                  to-purple-500
                  px-6
                  py-4
                  font-bold
                  text-white
                  shadow-lg
                  shadow-purple-500/20
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-purple-500/30
                  active:translate-y-0
                "
              >
                ورود
              </button>
            </form>

            {/* DIVIDER */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/50" />

              <span className="text-xs ">یا</span>

              <div className="h-px flex-1 bg-white/50" />
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/todo",
                })
              }
              className="
    flex
    w-full
    items-center
    justify-center
    gap-3
    rounded-2xl
    border
    border-gray-200
    bg-white
    px-6
    py-4
    font-bold
    text-gray-800
    shadow-lg
    transition
    hover:-translate-y-0.5
    hover:bg-gray-50
    active:translate-y-0
  "
            >
              <span>ورود با گوگل</span>

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
                />
                <path
                  fill="#34A853"
                  d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z"
                />
                <path
                  fill="#FBBC05"
                  d="M6.54 13.6A5.86 5.86 0 0 1 6.23 12c0-.56.1-1.1.31-1.6V7.87H3.3A9.73 9.73 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.13l3.24-2.53Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 6.37c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.46 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.37l3.24 2.53C7.31 8.09 9.46 6.37 12 6.37Z"
                />
              </svg>
            </button>

            {/* SIGN UP */}
            <p
              className="
                mt-7
                text-center
                text-sm
              "
            >
              حساب کاربری نداری؟{" "}
              <button
                type="button"
                className="
                  font-semibold
                  text-purple-400
                  transition
                  hover:text-purple-500
                  cursor-pointer
                "
              >
                ثبت‌ نام کن
              </button>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

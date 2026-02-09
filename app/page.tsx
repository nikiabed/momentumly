"use client"


import { useRouter } from "next/navigation";
import { createProjectAction } from "./actions/project";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <div className="bg-[#0a0f20] rounded-xl p-5">
            <form>
              <p>Email</p>
              <input className="bg-gray-800 text-white p-2 my-2 w-full rounded" type="email"/>
              <div className="flex justify-between gap-3">
              <button className="bg-blue-600 p-2 my-2 rounded hover:bg-blue-800 ">Login With Email</button>
              <button type="button" onClick={ () => router.push("/dashboard")} className="bg-gray-800 text-white p-2 my-2 rounded hover:bg-gray-900">Continue as Guests</button>
              </div>
            </form>
            <div>
              <div className="flex items-center my-3">
              <div className="flex-grow border-t border-gray-800"></div>
              <p className=" ">Or Quick Login AS</p>
              <div className="flex-grow border-t border-gray-800"></div>
              </div>
              <div className="flex justify-between gap-3">
              <button className="bg-gray-800 text-white p-2 my-2 rounded hover:bg-gray-900 flex-1" >Niki</button>
              <button className="bg-gray-800 text-white p-2 my-2 rounded hover:bg-gray-900 flex-1">Ali</button>
              </div>

              <div className="flex justify-between gap-3">
              <button className="bg-gray-800 text-white p-2 my-1 rounded hover:bg-gray-900 flex-1">Mina</button>
              <button className="bg-gray-800 text-white p-2 my-1 rounded hover:bg-gray-900 flex-1">Soheil</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

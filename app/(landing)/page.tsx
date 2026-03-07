import Link from "next/link";
import { ROUTES } from "../_utils/constants";

export default function Home() {
  return (
    <div className="">
      <h1>Home Page</h1>
      <div className=" p-5 bg-purple-200 w-full">
        <div className="container mx-auto">
          <div className="flex gap-10 justify-center">
            <div className="bg-linear-90 from-blue-300 to-pink-400 flex-1 text-center hover:cursor-pointer rounded-lg shadow-sm shadow-gray-400group hover:from-20% transition duration-5000 ease-in">
              <Link href={`${ROUTES.PRODUCTS}`} className="w-full block text-blue-900 font-bold group-hover:text-blue-950">
                محصولات
              </Link>
            </div>
            <div className="bg-linear-90 from-pink-300 to-red-400 flex-1 text-center">
              <Link href={`${ROUTES.DASHBOARD}`}>داشبورد</Link>
            </div>
            <div className="bg-linear-90 from-pink-300 to-red-400 flex-1 text-center">
              <Link href={`${ROUTES.TODO}`}>اپلیکیشن TODO</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

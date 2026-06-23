import Link from "next/link";
import { ROUTES } from "../_utils/constants";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-6">Home Page</h1>

      <div className="p-5 bg-purple-200 w-full mt-10">
        <div className="container mx-auto">
          <div className="flex gap-6 justify-center">
            {/* Products */}
            <div className="flex-1 text-center rounded-lg shadow-sm shadow-gray-400 bg-linear-to-r from-blue-300 to-pink-400 hover:opacity-90 transition">
              <Link
                href={ROUTES.PRODUCTS}
                className="block p-6 font-bold text-blue-900"
              >
                محصولات
              </Link>
            </div>

            {/* Dashboard */}
            <div className="flex-1 text-center rounded-lg shadow-sm shadow-gray-400 bg-linear-to-r from-pink-300 to-red-400 hover:opacity-90 transition">
              <Link href={ROUTES.DASHBOARD} className="block p-6 font-bold">
                داشبورد
              </Link>
            </div>

            {/* Todo */}
            <div className="flex-1 text-center rounded-lg shadow-sm shadow-gray-400 bg-linear-to-r from-green-300 to-blue-400 hover:opacity-90 transition">
              <Link href={ROUTES.TODO} className="block p-6 font-bold">
                اپلیکیشن TODO
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

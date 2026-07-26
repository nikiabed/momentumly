import { getDateKey, toFa, useTodoContext } from "@/app/_utils";
import { getMonthStats } from "@/app/_utils/progress";

export const Summary = () => {
  const { todo } = useTodoContext();
  const now = new Date();
  const monthStats = getMonthStats(todo);

  return (
    <div className="bg-white rounded-3xl shadow p-6 flex-1">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📊</span>
        <h1 className="text-2xl font-bold text-gray-800">
          خلاصه <span className="text-violet-600">{monthStats.monthName}</span>
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center gap-3">
          <span className="text-[#f59e0b]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />

              <circle
                cx="12"
                cy="12"
                r="6"
                stroke="currentColor"
                strokeWidth="1.8"
              />

              <path
                d="M12 4V6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <path
                d="M12 18V20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <div className="text-center">
            <h2 className="text-gray-500 text-sm font-semibold">
              بیشترین سکه در روز
            </h2>
            <h1 className="text-3xl font-semibold">
              {toFa(monthStats.maxDailyCoins)}
            </h1>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#f8fafc] rounded-2xl p-5 text-center">
          <div className="text-center font-semibold">
            <h2 className="text-gray-500 text-sm">روزهای فعال</h2>
            <h1 className="text-3xl">{toFa(monthStats.activeDays)}</h1>
            <h2 className="text-gray-500 text-sm ">از 30 روز</h2>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center gap-3">
          <span className="text-[#34d399]">
            {/* check */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <div className="text-center font-semibold">
            <h2 className="text-gray-500 text-sm">تسک های انجام شده</h2>
            <h1 className="text-3xl "> {toFa(monthStats.completedTasks)}</h1>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#f8fafc] rounded-2xl p-5 flex items-center gap-3">
          <span className="text-[#8b5cf6]">
            {/* trending up */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 17L9 11L13 15L21 7"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <div className="text-center font-semibold">
            <h2 className="text-gray-500 text-sm">میانگین پیشرفت</h2>
            <h1 className="text-3xl"> {toFa(monthStats.averageProgress)}٪</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

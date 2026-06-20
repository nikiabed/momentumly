import { getDateKey, toFa, useTodoContext } from "@/app/_utils";

const Summary = () => {
  const { todo } = useTodoContext();
  const now = new Date();

  const monthTodos = todo.filter((t: any) => {
    const date = new Date(t.createdAt);
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear() &&
      t.boardKey === "myDay"
    );
  });

  const completed = monthTodos.filter((t: any) => t.status);
  const coinsByDay: Record<string, number> = {};
  completed.forEach((t: any) => {
    const key = getDateKey(t.createdAt);
    coinsByDay[key] = (coinsByDay[key] || 0) + (t.status ? 10 : 0);
  });

  const maxCoins = Math.max(...Object.values(coinsByDay), 0);
  const activeDays = Object.keys(coinsByDay).length;
  const completedCount = completed.length;
  const progress =
    monthTodos.length === 0
      ? 0
      : Math.round((completedCount / monthTodos.length) * 100);

  return (
    <div className="bg-white rounded-3xl shadow p-6 flex-1">
      <h1 className="text-2xl font-bold mb-6">خلاصه این ماه</h1>
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
            <h2 className="text-gray-500 text-sm font-semibold">بیشترین سکه در روز</h2>
            <h1 className="text-3xl font-semibold">{toFa(maxCoins)}</h1>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#f8fafc] rounded-2xl p-5 text-center">
          <div className="text-center font-semibold">
            <h2 className="text-gray-500 text-sm">روزهای فعال</h2>
            <h1 className="text-3xl">{toFa(activeDays)}</h1>
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
            <h1 className="text-3xl "> {toFa(completedCount)}</h1>
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
            <h1 className="text-3xl"> {toFa(progress)}٪</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;

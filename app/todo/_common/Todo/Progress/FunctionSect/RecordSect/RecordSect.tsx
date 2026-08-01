import { getDateKey, useTodoContext } from "@/app/_utils";
import { TodoList } from "@/app/types";

export const getStreak = (todos: TodoList) => {
  const completed = todos.filter((t) => t.status && t.boardKey === "myDay");
  const completedDays = new Set(completed.map((t) => getDateKey(t.createdAt)));
  let streak = 1;
  const current = new Date();

  if (!completedDays.has(getDateKey(current))) {
    current.setDate(current.getDate() - 1);
  }
  while (true) {
    const key = getDateKey(current);
    if (completedDays.has(key)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
};
export const RecordSect = () => {
  const { todo } = useTodoContext();
  const streak = getStreak(todo);

  return (
    <div
      className="
        bg-background
        rounded-4xl
        shadow-sm
        border border-border-gray
        p-6
        lg:flex-1
        flex flex-col
        items-center
        justify-center
        text-center
        min-h-55
      "
    >
      <div className="flex items-center gap-2 text-muted">
        <span>رکورد فعلی</span>
        <span>🔥</span>
      </div>

      <div className="flex items-baseline gap-2 mt-3">
        <span className="text-5xl font-black text-orange-500">{streak}</span>
        <span className="text-sm font-bold text-muted">روز</span>
      </div>

      <p className="text-sm text-muted mt-2">
        {streak === 1
          ? "امروز شروع یک رکورد جدیده 🌱"
          : streak === 2
            ? "شروعش کردی! فردا ادامه بده 🔥"
            : `${streak} روزه که داری ادامه میدی!`}
      </p>

      <div className="mt-5 px-4 py-2 rounded-full bg-background text-reward-soft text-xs font-bold">
        🔥 رکوردت رو حفظ کن
      </div>
    </div>
  );
};

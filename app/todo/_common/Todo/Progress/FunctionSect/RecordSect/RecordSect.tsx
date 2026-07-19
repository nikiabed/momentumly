import { getDateKey, useTodoContext } from "@/app/_utils";

export const getStreak = (todos: any[]) => {
  const completed = todos.filter((t) => t.status && t.boardKey === "myDay");
  const completedDays = new Set(completed.map((t) => getDateKey(t.createdAt)));
  let streak = 0;
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
    <div className="bg-white rounded-3xl shadow flex-1/5 items-center justify-center flex flex-col">
      <h2 className="font-semibold ">رکورد فعلی</h2>
      <h1 className="text-2xl">🔥</h1>
      <h1 className="text-5xl font-bold ">{streak}</h1>
      <h2>روز متوالی</h2>
    </div>
  );
};
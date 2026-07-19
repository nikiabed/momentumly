import { useTodoContext } from "@/app/_utils";
import { TodoList, Board } from "@/app/types";

export const Coins = ({ item, filterTodo }: { item: Board; filterTodo: TodoList }) => {
  const { todo } = useTodoContext();
  const globalCoins = todo.filter((t) => t.status).length * 10;
  const boardCoins = filterTodo.filter((t) => t.status).length * 10;
  return (
    <div className="flex gap-1">
      <div
        className="
      flex items-center gap-2
      px-3 py-1
      rounded-2xl
      bg-white/20
      backdrop-blur-md
      border border-white/30
    "
      >
        <span>🪙</span>

        <span className="font-semibold">{globalCoins}</span>
      </div>

      <div
        className="
      flex items-center gap-2
      px-3 py-1
      rounded-2xl
      bg-white/15 border border-white/30
    "
      >
        <span>✨</span>

        <span className="font-semibold">{boardCoins}</span>
      </div>
    </div>
  );
};
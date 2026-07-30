"use client";

import { useTodoContext } from "@/app/_utils";
import { getCoinStats } from "@/app/_utils/progress";
import { TodoList, Board } from "@/app/types";

export const Coins = ({
  filterTodo,
}: {
  item: Board;
  filterTodo: TodoList;
}) => {
  const { todo } = useTodoContext();
  const globalStats = getCoinStats(todo);
  const boardStats = getCoinStats(filterTodo);

  return (
    <div className="flex gap-1">
      <div
        id="global-coin-counter"
        className="
          flex items-center gap-2
          px-3 py-1
          rounded-2xl
          bg-white/20
          backdrop-blur-md
          border border-white/30
          transition-transform duration-200
        "
      >
        <span>🪙</span>

        <span className="font-semibold">{globalStats.globalCoins}</span>
      </div>

      <div
        className="
          flex items-center gap-2
          px-3 py-1
          rounded-2xl
          bg-white/15
          border border-white/30
        "
      >
        <span>✨</span>

        <span className="font-semibold">{boardStats.globalCoins}</span>
      </div>
    </div>
  );
};

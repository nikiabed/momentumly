"use client";

import { buildWeeklyProgress } from "@/app/_utils/progress";
import { LineChart } from "../../LineChart";
import { useTodoContext } from "@/app/_utils";

type Props = {
  progress: number;
  xp?: number;
  streak?: number;
};

export const Progress = ({ progress = 0, xp = 0, streak = 0 }: Props) => {
  const { todo } = useTodoContext();

  const moodText =
    progress < 40
      ? "آرام شروع شده"
      : progress < 80
        ? "در حال رشد"
        : "روز پُررونق";

  const weeklyData = buildWeeklyProgress(todo);
  return (
    <div>
      <LineChart data={weeklyData} width={1200} height={260} />
    </div>
  );
};

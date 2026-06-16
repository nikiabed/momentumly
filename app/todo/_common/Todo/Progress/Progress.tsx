"use client";

import { buildWeeklyProgress } from "@/app/_utils/progress";
import { LineChart } from "../../LineChart";
import { useTodoContext } from "@/app/_utils";
import { ChartHeader } from "../../ChartHeader";

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
    <div
      className="mx-auto bg-white
p-5
mt-5
shadow rounded-4xl"
    >
      <ChartHeader />
      <LineChart data={weeklyData} width={960} height={260} />
    </div>
  );
};

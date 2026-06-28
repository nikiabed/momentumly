"use client";

import { buildWeeklyProgress } from "@/app/_utils/progress";
import { LineChart } from "../../LineChart";
import { useTodoContext } from "@/app/_utils";
import { ChartHeader } from "../../ChartHeader";
import CoinSect from "./CoinSect/CoinSect";
import FunctionSect from "./FunctionSect/FunctionSect";
import MonthSect from "./MonthSect/MonthSect";
import WeekSect from "./WeekSect/WeekSect";
import { useEffect, useRef, useState } from "react";

type Props = {
  progress: number;
  xp?: number;
  streak?: number;
};

export const Progress = ({ progress = 0, xp = 0, streak = 0 }: Props) => {
  const { todo } = useTodoContext();
  const [weekOffset, setWeekOffset] = useState(0);
  const weeklyData = buildWeeklyProgress(todo, weekOffset);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const resize = () => {
      setChartWidth(containerRef.current!.offsetWidth);
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  type Props = {
    onChangeWeek: (offset: number) => void;
    active: number;
  };

  return (
    <div className=" flex flex-col gap-5 w-full px-6 md:px-15">
      <CoinSect />
      <FunctionSect />

      <div
        ref={containerRef}
        className="w-full overflow-hidden bg-white p-5 mt-5 mb-5 shadow rounded-4xl"
      >
        <ChartHeader onChangeWeek={setWeekOffset} active={weekOffset} />

        {chartWidth > 0 && (
          <LineChart data={weeklyData} width={chartWidth - 40} height={260} />
        )}
      </div>
      <MonthSect />
      <WeekSect />
    </div>
  );
};

"use client";

import { useTodoContext } from "@/app/_utils";
import {
  buildWeeklyProgress,
  buildWeeklyTimeProgress,
} from "@/app/_utils/progress";
import { useEffect, useRef, useState } from "react";
import { CoinSect } from "./CoinSect";
import { FunctionSect } from "./FunctionSect";
import { ChartHeader } from "./ChartHeader";
import { LineChart } from "./LineChart";
import { MonthSect } from "./MonthSect";
import { WeekSect } from "./WeekSect";
import { TimeLineChart } from "./TimeLineChart";
import { WeeklyTimeReport } from "./WeeklyTimeReport";

export const Progress = () => {
  const { todo, todoEntries, saveTodoTimeEntry } = useTodoContext();
  const [weekOffset, setWeekOffset] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);
  const isMobile = chartWidth < 500;
  const weeklyData = buildWeeklyProgress(todo, weekOffset, isMobile);
  const weeklyTimeData = buildWeeklyTimeProgress(
    todoEntries,
    weekOffset,
    isMobile,
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const resize = () => {
      setChartWidth(containerRef.current!.offsetWidth);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full px-4 md:px-10 lg:px-16">
      <CoinSect />
      <FunctionSect />
      <div
        ref={containerRef}
        className="w-full overflow-hidden bg-white px-5 py-5 mt-5 mb-5 shadow rounded-4xl"
      >
        <ChartHeader onChangeWeek={setWeekOffset} active={weekOffset} />
        {chartWidth > 0 && (
          <LineChart data={weeklyData} width={chartWidth - 40} height={260} />
        )}
      </div>

      <div className="mt-5 mb-5 w-full overflow-hidden rounded-4xl bg-white px-5 py-5 shadow">
        <ChartHeader
          title="زمان صرف‌شده"
          onChangeWeek={setWeekOffset}
          active={weekOffset}
        />

        {chartWidth > 0 && (
          <TimeLineChart
            data={weeklyTimeData}
            width={chartWidth - 40}
            height={260}
          />
        )}
      </div>
      <WeeklyTimeReport todos={todo} entries={todoEntries} />
      <MonthSect />
      <WeekSect />
    </div>
  );
};

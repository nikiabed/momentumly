"use client";
import { ArrowDown2 } from "iconsax-reactjs";
import { FC, useState } from "react";
import { CHART_HEADER, WEEK_OPTIONS } from "./chartHeader.const";
type ChartHeaderProps = {
  onChangeWeek: (offset: number) => void;
  active: number;
  title?: string;
};

export const ChartHeader = ({
  onChangeWeek,
  active,
  title = "عملکرد هفتگی",
}: ChartHeaderProps) => {
  const [open, setOpen] = useState(false);
  const selectWeek = (offset: number) => {
    onChangeWeek(offset);
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-between mb-1 ">
      <h2 className="text-base font-semibold text-gray-800">{CHART_HEADER.title}</h2>
      <div
        className="relative flex gap-2 py-1.5 px-2 justify-center items-center
            rounded-xl
            border
            border-slate-100
           text-xs font-semibold text-gray-800
            hover:bg-slate-200
            transition
            cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <ArrowDown2 size={16} />
        <button>{WEEK_OPTIONS.find((w) => w.value === active)?.label}</button>
        {open && (
          <div
            className="
            absolute top-7 right-0 mt-2
            w-40
            bg-white
            border border-slate-200
            rounded-xl
            shadow-lg
            overflow-hidden
            z-80
          "
          >
            <button
              className="w-full  py-2 text-sm hover:bg-slate-50 text-right cursor-pointer"
              onClick={() => selectWeek(0)}
            >
              {WEEK_OPTIONS.find((w) => w.value === 0)?.label}
            </button>
            <button
              className="w-full px-3 py-2 text-sm hover:bg-slate-50 text-right cursor-pointer"
              onClick={() => selectWeek(1)}
            >
              {WEEK_OPTIONS.find((w) => w.value === 1)?.label}
            </button>
            <button
              className="w-full px-3 py-2 text-sm hover:bg-slate-50 text-right cursor-pointer"
              onClick={() => selectWeek(2)}
            >
              {WEEK_OPTIONS.find((w) => w.value === 2)?.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

"use client";
import { ArrowDown2 } from "iconsax-reactjs";
import { FC, useState } from "react";
type ChartHeaderProps = {
  onChangeWeek: (offset: number) => void;
  active: number;
};

export const ChartHeader: FC<ChartHeaderProps> = ({
  onChangeWeek,
  active,
}: any) => {
  const [open, setOpen] = useState(false);
  const selectWeek = (offset: number) => {
    onChangeWeek(offset);
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-between mb-1 px-10 text-gray-700 font-bold text-lg">
      <h2>پیشرفت هفتگی</h2>

      <div
        className="relative flex gap-2 px-3 py-1.5 justify-center items-center
            rounded-xl
            border
            border-slate-100
            text-gray-600
            text-sm
            hover:bg-slate-200
            transition
            cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <ArrowDown2 size={16} />
        <button>
          {active === 0
            ? "این هفته"
            : active === 1
              ? "هفته قبل"
              : `${active} هفته قبل`}
        </button>

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
            
          "
          >
            <button
              className="w-full px-3 py-2 text-sm hover:bg-slate-50 text-right cursor-pointer"
              onClick={() => selectWeek(0)}
            >
              این هفته{" "}
            </button>
            <button
              className="w-full px-3 py-2 text-sm hover:bg-slate-50 text-right cursor-pointer"
              onClick={() => selectWeek(1)}
            >
              هفته قبل
            </button>
            <button
              className="w-full px-3 py-2 text-sm hover:bg-slate-50 text-right cursor-pointer"
              onClick={() => selectWeek(2)}
            >
              2 هفته قبل
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

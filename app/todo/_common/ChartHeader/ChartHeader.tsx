"use client";
import { ArrowDown, ArrowDown2 } from "iconsax-reactjs";
import { useState } from "react";

export const ChartHeader = () => {
  const [open, setOpen] = useState(false);

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
        <button >این هفته</button>

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
            <button className="w-full px-3 py-2 text-sm hover:bg-slate-50 text-right cursor-pointer">
              هفته قبل
            </button>
            <button className="w-full px-3 py-2 text-sm hover:bg-slate-50 text-right cursor-pointer">
              هفته پیش تر
            </button>
            <button className="w-full px-3 py-2 text-sm hover:bg-slate-50 text-right cursor-pointer">
              هفته انتخابی
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

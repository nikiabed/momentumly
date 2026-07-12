"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, Clock } from "iconsax-reactjs";

type DeadlinePickerProps = {
  value?: string;
  onChange: (date: Date) => void;
};

export const DeadlinePicker = ({ value, onChange }: DeadlinePickerProps) => {
  return (
    <div
      className="w-full relative flex justify-center hover:bg-black/5
      transition
      cursor-pointer"
    >
      <DatePicker
        portal
        calendarPosition="bottom-center"
        calendar={persian}
        locale={persian_fa}
        value={value}
        onChange={(date) => {
          const d = date?.toDate?.();
          if (!d) return;

          onChange(d);
        }}
        render={(value, openCalendar) => (
          <button
            type="button"
            onClick={openCalendar}
            className="
      flex
      w-full
      h-full
      items-center
      justify-center
      gap-3
      px-4
      py-3
      text-sm
     cursor-pointer
    "
          >
            <Clock size={18} />
            <span>{value || "ددلاین"}</span>

            {value && (
              <span className="text-xs rounded-full bg-rose-100 px-2 py-0.5 text-rose-600">
                <Calendar size={13} className="inline ml-1" />
                {value}
              </span>
            )}
          </button>
        )}
      />
    </div>
  );
};

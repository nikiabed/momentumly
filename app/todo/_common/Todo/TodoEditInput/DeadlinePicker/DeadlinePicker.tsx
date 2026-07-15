"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, Clock, CloseCircle } from "iconsax-reactjs";

type DeadlinePickerProps = {
  value?: string;
  onChange: (date: Date) => void;
  onClear?: () => void;
};

export const DeadlinePicker = ({ value, onChange, onClear }: DeadlinePickerProps) => {
  return (
    <div
      className="w-full relative flex justify-center hover:bg-black/5
      transition
      cursor-pointer  items-center
"
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
            className={`
      flex
      w-full
      h-full
      items-center
      justify-center
      gap-3
      text-sm
      cursor-pointer
      ${value ? "rounded-full bg-rose-100 px-2 py-0.5 text-rose-600" : ""}`}
          >
            {value ? (
              <>
                <Calendar size={15} className="text-rose-600" />
                <span>{value}</span>
                <CloseCircle
                  size={16}
                  className="text-gray-400 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear?.();
                  }}
                />
              </>
            ) : (
              <>
                <Clock size={18} />
                <span>ددلاین</span>
              </>
            )}
          </button>
        )}
      />
    </div>
  );
};

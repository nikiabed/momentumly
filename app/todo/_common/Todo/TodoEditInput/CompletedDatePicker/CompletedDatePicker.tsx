"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import { Calendar } from "iconsax-reactjs";

type CompletedDatePickerProps = {
  value?: string | Date | null;
  onChange: (date: Date | null) => void;
};

export const CompletedDatePicker = ({
  value,
  onChange,
}: CompletedDatePickerProps) => {
  return (
    <DatePicker
      calendar={persian}
      locale={persian_fa}
      value={value ?? ""}
      portal={false}
      calendarPosition="bottom-right"
      onChange={(date: DateObject | null) => {
        onChange(date ? date.toDate() : null);
      }}
      render={(value, openCalendar) => (
        <button
          type="button"
          className="w-full flex items-center gap-2 px-2 py-2 text-sm cursor-pointer hover:bg-foreground/10"
          onClick={(e) => {
            e.stopPropagation();
            openCalendar();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <Calendar size={17} />
          <span>{value || "انتخاب تاریخ"}</span>
        </button>
      )}
    />
  );
};

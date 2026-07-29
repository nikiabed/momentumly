import DateObject from "react-date-object";
import {
  DatePickerField,
  DatePickerFieldProps,
} from "../../../DatePickerField";

type CompletedDatePickerProps = Omit<DatePickerFieldProps, "onChange"> & {
  onChange: (date: Date | null) => void;
};

export const CompletedDatePicker = ({
  onChange,
  ...props
}: CompletedDatePickerProps) => {
  return (
    <DatePickerField
      {...props}
      label="تاریخ انجام"
      onChange={(date: DateObject | null) => {
        onChange(date ? date.toDate() : null);
      }}
    />
  );
};

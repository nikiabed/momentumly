import {
  DatePickerField,
  DatePickerFieldProps,
} from "../../../DatePickerField";

export const CompletedDatePicker = ({
  onChange,
  ...props
}: DatePickerFieldProps) => {
  return <DatePickerField {...props} label="تاریخ انجام" onChange={onChange} />;
};

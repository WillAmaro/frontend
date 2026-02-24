import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";

interface DatePickerProps {
  value: Dayjs | null;
  setValue: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
  label: string;
}

export default function DatePickerBase({ value, setValue, label }: DatePickerProps) {
  //   const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-17"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        format="DD/MM/YYYY"
        onChange={(newValue) => setValue(newValue)}
        slotProps={{
          textField: {
            sx: {
              minWidth: "180px",
              background: "white",
              borderRadius: 2,
              "& .MuiInputBase-root": {
                borderRadius: "12px",
                backgroundColor: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#b4b4b4",
              },
              "& .MuiPickersOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "white",
              },
            },

            size: "medium",
          },
        }}

      />
    </LocalizationProvider>
  );
}

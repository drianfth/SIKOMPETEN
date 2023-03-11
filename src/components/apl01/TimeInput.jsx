import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useField } from "formik";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
const TimeInput = ({ name, label, error, mandatory = false }) => {
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label} {mandatory ? <span className="text-red-700">*</span> : ""}
      </label>
      <MobileTimePicker
        label={'"Jam", "Menit" and "Detik"'}
        views={["hours", "minutes", "seconds"]}
        value={value}
        onChange={(time) => {
          setValue(time);
        }}
        error={error}
        renderInput={(params) => <TextField {...params} />}
      />
      {/* <TimePicker
        {...field}
        label={label}
        defaultValue={dayjs("2022-04-17T15:30")}
        value={value}
        onChange={(time) => {
          setValue(time);
        }}
        error={error}
        renderInput={(params) => <TextField {...params} />}
      /> */}
      {/* <DatePicker
        {...field}
        label={label}
        value={value}
        className="bg-gray-50 border-2 border-gray-300 mt-4 text-gray-900 text-sm rounded-lg w-full outline-none"
        onChange={(date) => {
          setValue(date);
        }}
        error={error}
        renderInput={(params) => <TextField {...params} />}
      /> */}
    </LocalizationProvider>
  );
};

export default TimeInput;

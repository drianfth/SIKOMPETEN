import React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useField } from "formik";

const DateInput = ({ name, label, mandatory = false }) => {
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}{" "}
        <span className={`${mandatory ? "text-red-700" : ""}`}> * </span>
      </label>
      <DatePicker
        {...field}
        label={label}
        value={value}
        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg w-full outline-none"
        onChange={(date) => {
          setValue(date);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DateInput;

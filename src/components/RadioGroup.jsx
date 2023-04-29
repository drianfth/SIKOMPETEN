import { ListItem } from "@mui/material";
import { Field } from "formik";
import React from "react";

const RadioGroup = ({ name, options, label }) => {
  return (
    <div>
      <h1 className="mb-2 text-sm font-semibold  text-gray-900 ">{label}</h1>
      <ul className="flex gap-x-10">
        {options.map((option, index) => (
          <li className="flex items-center" key={index}>
            <Field
              type="radio"
              value={option.value}
              name={name}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 cursor-pointer">
              {option.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RadioGroup;

import React from "react";
import { Field } from "formik";

const TextAreaInput = ({ name, label, mandatory }) => {
  return (
    <div className="">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label} {mandatory ? <span className="text-red-700">*</span> : ""}
      </label>
      <Field
        as="textarea"
        id={name}
        name={name}
        placeholder={label}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
      />
    </div>
  );
};

export default TextAreaInput;

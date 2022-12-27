import React from "react";
import { Field } from "formik";

const FieldInput = ({ label, name, mandatory = false, type }) => {
  return (
    <div className="">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label} {mandatory ? <span className="text-red-700">*</span> : ""}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={label}
        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
      />
    </div>
  );
};

export default FieldInput;

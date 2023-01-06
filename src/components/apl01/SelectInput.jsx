import React from "react";
import { Field, Form, Formik, FormikProps } from "formik";

const SelectInput = ({ mandatory, label, name, option }) => {
  return (
    <div className="">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label} {mandatory ? <span className="text-red-700">*</span> : ""}
      </label>
      <Field
        as="select"
        name={name}
        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      >
        <option value="">Pilih {label}</option>
        {option.map((o) => (
          <option key={o.id} value={o.value}>
            {o.name}
          </option>
        ))}
      </Field>
    </div>
  );
};

export default SelectInput;

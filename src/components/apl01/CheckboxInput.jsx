import { Field } from "formik";
import React from "react";

const CheckboxInput = ({ label, options, name }) => {
  return (
    <div>
      <h1 className="mb-2 text-sm font-semibold  text-gray-900 ">{label}</h1>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex flex-col">
        {options.map((o) => (
          <li className="w-full border-b border-gray-200 " key={o.id}>
            <div className="flex items-center pl-3">
              <Field
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                name={name}
                value={o.value}
              />
              <label
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 "
              >
                {o.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxInput;

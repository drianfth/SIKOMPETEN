import React from "react";
import { Field } from "formik";

const BuktiField = ({ label, name, nomor }) => {
  // console.log(name);
  return (
    <div className="flex px-20 mt-14 space-x-4">
      <span className="font-semibold text-gray-700 mr-2">{nomor})</span>
      <label htmlFor="" className="font-semibold text-gray-700 w-5/12">
        {label}
      </label>
      <div className="flex flex-col space-y-1">
        <div className="flex items-center">
          <Field
            type="radio"
            value="ada memenuhi syarat"
            name={`${name}`}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
          />
          <label
            htmlFor="default-radio-1"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Ada, Memenuhi syarat
          </label>
        </div>
        <div className="flex items-center">
          <Field
            type="radio"
            value="ada tidak memenuhi syarat"
            name={`${name}`}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
          />
          <label
            htmlFor="default-radio-2"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Ada, Tidak Memenuhi syarat
          </label>
        </div>
        <div className="flex items-center">
          <Field
            type="radio"
            value="tidak ada"
            name={`${name}`}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
          />
          <label
            htmlFor="default-radio-2"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Tidak Ada
          </label>
        </div>
      </div>
    </div>
  );
};

export default BuktiField;

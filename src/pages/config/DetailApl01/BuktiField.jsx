import React from "react";

const BuktiField = ({ nomor, label, value }) => {
  return (
    <div className="flex flex-col md:px-5 mt-10 space-x-4">
      <div className="">
        <span className="font-semibold text-gray-700 mr-2">{nomor})</span>
        <label htmlFor="" className="font-semibold text-gray-700 md:w-5/12">
          {label}
        </label>
      </div>
      <div className="flex flex-col space-y-1 mt-1">
        <div className="flex items-center">
          <input
            type="radio"
            disabled
            name={`${label}`}
            checked={value === "ada memenuhi syarat"}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="default-radio-1"
            className={`ml-2 text-sm  text-gray-400 ${
              value === "ada memenuhi syarat"
                ? "text-sky-600 font-semibold"
                : "text-gray-700 font-medium"
            }`}
          >
            Ada, Memenuhi syarat
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            disabled
            name={`${label}`}
            checked={value === "ada tidak memenuhi syarat"}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="default-radio-2"
            className={`ml-2 text-sm  text-gray-400 ${
              value === "ada tidak memenuhi syarat"
                ? "text-sky-600 font-semibold"
                : "text-gray-700 font-medium"
            }`}
          >
            Ada, Tidak Memenuhi syarat
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            disabled
            name={`${label}`}
            checked={value === "tidak ada"}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="default-radio-2"
            className={`ml-2 text-sm  text-gray-400 ${
              value === "tidak ada"
                ? "text-sky-600 font-semibold"
                : "text-gray-700 font-medium"
            }`}
          >
            Tidak ada
          </label>
        </div>
      </div>
    </div>
  );
};

export default BuktiField;

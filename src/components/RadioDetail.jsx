import React from "react";

const RadioDetail = ({ label, value, options }) => {
  return (
    <div>
      <h3 className="mb-2 font-semibold text-gray-900 ">{label}</h3>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg mb-4">
        {options.map((option, index) => (
          <li
            className="w-full border-b border-gray-200 rounded-t-lg"
            key={index}
          >
            <div className="flex items-center pl-3">
              <input
                type="radio"
                name={`${label}`}
                checked={value === option.value}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">
                {option.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RadioDetail;

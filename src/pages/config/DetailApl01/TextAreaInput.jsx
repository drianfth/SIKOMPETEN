import React from "react";

const TextAreaInput = ({ label, value }) => {
  return (
    <div className="">
      <label
        htmlFor={label}
        className={`block mb-2 text-sm font-medium text-gray-900 `}
      >
        {label}
      </label>
      <textarea
        as="textarea"
        id={label}
        name={label}
        value={value}
        className={`bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-2  text-sm rounded-lg  block w-full p-2.5 outline-none cursor-not-allowed`}
      />
    </div>
  );
};

export default TextAreaInput;

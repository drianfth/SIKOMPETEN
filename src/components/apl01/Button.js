import React from "react";

const Button = ({ children, active, handleTab }) => {
  return (
    <button
      type="button"
      className={`${
        active
          ? "text-white bg-sky-700 hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all duration-500"
          : "py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border-2 border-gray-200 hover:bg-gray-100 hover:text-sky-700 focus:z-10 focus:ring-4 focus:ring-gray-200 transition-all duration-500"
      }`}
      onClick={handleTab}
    >
      {children}
    </button>
  );
};

export default Button;

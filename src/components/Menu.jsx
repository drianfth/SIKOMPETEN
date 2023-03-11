import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ name, icon, href }) => {
  return (
    <Link to={href}>
      <div className="p-6 flex justify-between hover:cursor-pointer bg-sky-50 border border-gray-200 hover:text-white group rounded-lg shadow-sm hover:bg-sky-700 ">
        <div className="flex space-x-3 truncate overflow-hidden">
          {icon}
          <h1 className="font-semibold">{name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default Menu;

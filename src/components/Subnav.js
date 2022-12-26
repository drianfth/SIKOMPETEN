import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink } from "react-router-dom";

const Subnav = ({ pageActive, setPageActive, label, icon, open, href }) => {
  return (
    <li>
      <NavLink to={href} onClick={() => setPageActive(label)}>
        <div
          to={href}
          className={`flex items-center p-2 text-base font-normal hover:text-gray-800 rounded-lg hover:bg-gray-100 group active:bg-gray-100 active:text-gray-800 ${
            pageActive === label ? "bg-gray-100 text-gray-800" : "text-gray-50"
          } `}
        >
          {icon}
          <span className={`ml-3 ${open ? "flex" : "hidden"}`}>{label}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Subnav;

import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [pageActive, setPageActive] = useState("home");

  console.log(pageActive);
  return (
    <div className="">
      <aside
        className={`${
          open ? "md:w-60" : "md:w-30"
        } h-screen sticky top-0 bottom-0 left-0 shadow border-gray-200`}
      >
        <KeyboardArrowRightIcon
          className={`absolute ${
            open ? "rotate-0" : "rotate-180"
          } md:flex cursor-pointer -right-5 z-20 rounded-full bg-white top-3 w-8 h-8 shadow-md border transition duration-300`}
          onClick={() => setOpen(!open)}
        />
        <div className="overflow-y-auto p-4 bg-sky-700 min-h-screen relative ">
          <ul className="space-y-2">
            <li>
              <NavLink to="/dashboard" onClick={() => setPageActive("home")}>
                <div
                  to="/dashboard"
                  className={`flex items-center p-2 text-base font-normal hover:text-gray-800 rounded-lg hover:bg-gray-100 group active:bg-gray-100 active:text-gray-800 ${
                    pageActive === "home"
                      ? "bg-gray-100 text-gray-800"
                      : "text-gray-50"
                  } `}
                >
                  <DashboardIcon />
                  <span className={`ml-3 ${open ? "flex" : "hidden"}`}>
                    Dashboard
                  </span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="uji-kompetensi"
                onClick={() => setPageActive("uji-kompetensi")}
              >
                <div
                  className={`flex items-center p-2 text-base font-normal hover:text-gray-800 rounded-lg hover:bg-gray-100 group active:bg-gray-100 active:text-gray-800 ${
                    pageActive === "uji-kompetensi"
                      ? "bg-gray-100 text-gray-800"
                      : "text-gray-50"
                  } `}
                >
                  <NoteAltIcon />
                  <span className={`ml-3 ${open ? "flex" : "hidden"}`}>
                    Uji Kompetensi
                  </span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

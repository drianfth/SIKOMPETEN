import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <aside
        class={`${
          open ? "md:w-64" : "md:w-32"
        } min-h-screen sticky top-0 bottom-0 left-0 shadow`}
        aria-label="Sidebar"
      >
        <KeyboardArrowRightIcon
          className={`absolute ${
            open ? "rotate-0" : "rotate-180"
          } hidden md:flex cursor-pointer -right-5 z-20 rounded-full bg-white top-3 w-8 h-8 shadow-md border`}
          onClick={() => setOpen(!open)}
        />
        <div class="overflow-y-auto py-4 px-3 bg-sky-700 min-h-screen relative">
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-base font-normal text-gray-50 hover:text-gray-800 rounded-lg  hover:bg-gray-100 group"
              >
                <DashboardIcon />
                <span class="ml-3">Dashboard</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

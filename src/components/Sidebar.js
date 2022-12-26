import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Subnav from "./Subnav";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [pageActive, setPageActive] = useState("Dashboard");

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
          } md:flex cursor-pointer -right-5 z-20 rounded-full bg-white top-16 w-8 h-8 shadow-md border transition duration-300`}
          onClick={() => setOpen(!open)}
        />
        <div className="overflow-y-auto p-4 bg-sky-700 min-h-screen relative ">
          <ul className="space-y-2 mt-12">
            <Subnav
              pageActive={pageActive}
              setPageActive={setPageActive}
              label="Dashboard"
              icon={<DashboardIcon />}
              open={open}
              href="/dashboard"
            />
            <Subnav
              pageActive={pageActive}
              setPageActive={setPageActive}
              label="Uji Kompetensi"
              icon={<NoteAltIcon />}
              open={open}
              href="uji-kompetensi"
            />
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

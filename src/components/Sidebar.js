import React, { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Subnav from "./Subnav";
import useNavStore from "../context/useNavStore";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { activeNav } = useNavStore();
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
            {activeNav.map((nav) => (
              <Subnav key={nav.id} label={nav.name} open={open} />
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

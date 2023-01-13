import React from "react";

import EventNoteIcon from "@mui/icons-material/EventNote";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Master = ({ name, icon, subMenu }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="">
      <div
        className="p-6 flex justify-between hover:cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 "
        aria-describedby={id}
        onClick={handleClick}
      >
        <div className="flex space-x-3 truncate">
          <EventNoteIcon />
          <h1 className="font-semibold">{name}</h1>
        </div>
        {icon}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className="-mt-7 ml-5"
      >
        {subMenu.map((menu) => (
          <Typography
            className="p-4 hover:bg-gray-200 hover:cursor-pointer w-60"
            key={menu.id}
          >
            <Link to={`/dashboard/${menu.href}`} className="w-full">
              {menu.name}
            </Link>
          </Typography>
        ))}
      </Popover>
    </div>
  );
};

export default Master;

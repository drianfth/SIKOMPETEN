import React, { useState } from "react";
// import { Card, CardContent } from "@mui/material";
// import Master from "../components/Master";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "../components/Menu";
import FolderIcon from "@mui/icons-material/Folder";

const Configuration = () => {
  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Configuration
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Menu
          name="Paket Skema"
          icon={<FolderIcon className="text-gray-700 group-hover:text-white" />}
          href="paket"
        />
      </div>
    </div>
  );
};

export default Configuration;

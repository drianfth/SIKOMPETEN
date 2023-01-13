import React, { useState } from "react";
import { Card, CardContent } from "@mui/material";
import Master from "../components/Master";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Configuration = () => {
  const jadwalSubMenu = [
    { id: 1, name: "Master Jadwal", href: "jadwal" },
    { id: 2, name: "Master Paket Asesmen", href: "paket" },
  ];
  return (
    <div>
      <Card className="shadow-lg overflow-hidden pb-24">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            Configuration
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          <div className="grid grid-cols-4 gap-5">
            <Master
              name="Jadwal"
              icon={<KeyboardArrowDownIcon />}
              subMenu={jadwalSubMenu}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Configuration;

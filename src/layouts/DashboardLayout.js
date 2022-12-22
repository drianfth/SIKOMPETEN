import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="">
      <Navbar />
      <main className="flex">
        <Sidebar />
        <div className="p-10 bg-gray-50 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

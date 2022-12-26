import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="">
      <main className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="p-10 bg-gray-50 w-full h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
    // <div className="">
    //   <Navbar />
    //   <main className="flex">
    //     <Sidebar />
    //     <div className="p-10 bg-gray-50 w-full">
    //       <Outlet />
    //     </div>
    //   </main>
    // </div>
  );
};

export default DashboardLayout;

import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import useAuthStore from "../context/userAuthStore";

const Dashboard = () => {
  return (
    <div className="">
      <main className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="md:p-10 p-4 bg-gray-50 w-full h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

const DashboardLayout = () => {
  const { user } = useAuthStore();
  return user ? <Dashboard /> : <Navigate to="/login" />;
};

export default DashboardLayout;
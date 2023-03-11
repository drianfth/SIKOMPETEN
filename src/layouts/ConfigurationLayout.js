import { Card, CardContent } from "@mui/material";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import useAuthStore from "../context/userAuthStore";

const Setting = () => {
  return (
    <div className="">
      <main className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="p-4 sm:p-10 bg-gray-50 w-full h-full">
            <Card className="shadow-lg overflow-hidden pb-24">
              <CardContent>
                <Outlet />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const ConfigurationLayout = () => {
  const { user } = useAuthStore();
  return user ? <Setting /> : <Navigate to="/login" />;
};

export default ConfigurationLayout;

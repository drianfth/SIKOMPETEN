import { Card, CardContent } from "@mui/material";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import useAuthStore from "../context/userAuthStore";

const Apl02 = () => {
  return (
    <div className="">
      <main className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="md:p-10 p-4 bg-gray-50 w-full h-full">
            <Card className="shadow-xl overflow-hidden">
              <CardContent>
                <div className="text-center font-bold pb-8 text-lg text-gray-800">
                  FR.APL.02.ASESMEN MANDIRI
                  <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
                </div>
                <Outlet />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const Apl02Layout = () => {
  const { user } = useAuthStore();
  return user ? <Apl02 /> : <Navigate to="/login" />;
};

export default Apl02Layout;

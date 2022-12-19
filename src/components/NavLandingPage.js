import React from "react";
import Logo from "../assets/Image/Logo.png";

const NavLandingPage = () => {
  return (
    <div className="bg-sky-700  border-gray-200 text-gray-50 px-6 sm:px-10">
      <nav className=" md:max-w-7xl mx-auto py-6 px-6 sm:px-2 ">
        <div className="container flex flex-wrap items-center justify-center md:justify-start mx-auto">
          <a href="https://flowbite.com/" className="flex items-center">
            <img src={Logo} className="h-6 mr-3 sm:h-9" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              SIKOMPETEN
            </span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavLandingPage;

import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Image/Logo.png";

const Navbar = () => {
  return (
    <nav class="bg-white border-gray-200 shadow px-2 sm:px-4 py-2.5 sticky top-0 bottom-0 left-0 w-full z-20">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" class="flex items-center">
          <img src={Logo} class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap text-gray-800">
            SIKOMPETEN
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

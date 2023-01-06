import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Image/Logo.png";
import LogoUser from "../assets/Image/user.jpg";
import useAuthStore from "../context/userAuthStore";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const { user } = useAuthStore();
  // console.log(user)
  return (
    <nav className="bg-white border-gray-200  shadow px-2 sm:px-4 py-2.5 sticky top-0 bottom-0 left-0 w-full z-20">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex items-center">
          <img src={Logo} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-800">
            SIKOMPETEN
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 relative">
          <span>{user.name}</span>
          <button
            type="button"
            className="flex mr-3 text-sm rounded-full md:mr-0 focus:ring-4 border border-gray-200 focus:ring-gray-300 "
            id="user-menu-button"
            onClick={() => setOpen(!open)}
          >
            <img
              src={LogoUser}
              className="w-10 h-10 rounded-full mx-auto"
              alt="user photo"
            />
          </button>
          <div
            className={`z-50 ${
              open ? "flex flex-col" : "hidden"
            }  absolute top-10 right-0  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow `}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 ">{user.name}</span>
              <span className="block text-sm font-medium text-gray-500 truncate ">
                {user.email}
              </span>
            </div>
            <ul className="py-1" aria-labelledby="user-menu-button">
              <li>
                <button
                  className="block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100 "
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

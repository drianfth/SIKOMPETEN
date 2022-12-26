import { Button } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";

const SubTimeLine = ({
  title,
  time,
  content,
  href,
  last = false,
  active = false,
}) => {
  return (
    <li className={`${last ? "" : "mb-10"} ml-6`}>
      <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white ">
        <svg
          aria-hidden="true"
          className="w-3 h-3 text-blue-600 "
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
      <h3 className="mb-1 text-lg font-semibold text-gray-900 ">{title}</h3>
      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
        {active ? time : "Menunggu"}
      </time>
      <p className="text-base font-normal text-gray-500 ">
        {active ? (
          <>
            <p>{content}</p>

            <div className="mt-5">
              <Link to={href} className="bg-sky-600 text-gray-50 p-2  rounded">
                Lakukan Sekarang
                <KeyboardArrowRightIcon />
              </Link>
            </div>
          </>
        ) : (
          ""
        )}
      </p>
    </li>
  );
};

export default SubTimeLine;

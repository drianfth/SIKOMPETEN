import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import WarningIcon from "@mui/icons-material/Warning";

const SubTimeLine = ({
  title,
  time,
  content,
  href,
  isDoApl01,
  isDoApl02,
  last = false,
  active = false,
  sesi,
}) => {
  const tanggal = new Date(time);
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
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
      <h3 className="mb-1 text-lg font-semibold text-gray-900 ">{title}</h3>
      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
        {active ? tanggal.toDateString() : "Menunggu"}
      </time>
      <div className="text-base font-normal text-gray-500 ">
        {active ? (
          <>
            {title === "Pra-Asesmen" && (
              <>
                <p>{content}</p>

                {!isDoApl01 && (
                  <div className="mt-5">
                    <Link
                      to={href}
                      className="bg-sky-600 text-gray-50 p-2  rounded"
                    >
                      Lakukan Sekarang
                      <KeyboardArrowRightIcon className="hidden md:inline" />
                    </Link>
                  </div>
                )}
                {isDoApl01 && (
                  <div
                    className="flex pt-2 text-sm text-green-600 bg-white rounded-lg"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div>
                      <span className="font-medium text-gray-800">
                        Anda Sudah Mengisi Form Apl 01
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
            {title === "Asesmen" && (
              <>
                <p>{content}</p>

                {/* {!isDoApl02 && isDoApl01 && ( */}
                {sesi.isSuccess && sesi.data[0]?.open === 1 && (
                  <div className="mt-5">
                    <Link
                      to="/formulir/frak01"
                      className="bg-sky-600 text-gray-50 p-2  rounded"
                    >
                      Lakukan Sekarang
                      <KeyboardArrowRightIcon />
                    </Link>
                  </div>
                )}

                {/* )} */}
                {/* {!isDoApl01 && (
                  <div
                    className="flex pt-2 text-sm text-yellow-500 bg-white rounded-lg"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div>
                      <span className="font-medium text-gray-800">
                        Anda Belum Mengisi Form Apl 01, Harap Mengisi Terlebih
                        dahulu
                      </span>
                    </div>
                  </div>
                )}
                {isDoApl02 && (
                  <div
                    className="flex pt-2 text-sm text-green-600 bg-white rounded-lg"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div>
                      <span className="font-medium text-gray-800">
                        Anda Sudah Mengisi Form Apl 02
                      </span>
                    </div>
                  </div>
                )} */}
              </>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </li>
  );
};

export default SubTimeLine;

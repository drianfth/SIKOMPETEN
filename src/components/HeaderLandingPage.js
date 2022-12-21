import Avatar1 from "../assets/Image/avatar1.png";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const HeaderLandingPage = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="" id="home">
      <div className="bg-sky-700 text-gray-50 px-6 sm:px-10 py-8">
        <section className=" md:max-w-7xl mx-auto flex flex-col md:flex-row">
          <div
            className=" text-center md:text-left md:justify-center flex flex-col  basis-1/2"
            data-aos="zoom-in-down"
            data-aos-delay="300"
          >
            <h1 className="text-[43px] font-bold text-yellow-400">
              LSP, buktikan kemampuanmu Lewat Sertifikasi
            </h1>
            <p className="py-5">
              LSP merupakan lembaga yang melaksanakan sertifikasi profesi yang
              dibentuk oleh Asosiasi Profesi terakreditasi atau Lembaga
              Pendidikan dan Pelatihan Kerja yang memenuhi syarat.
            </p>
            <div className="">
              <Link
                to="login"
                type="button"
                className="text-gray-50 bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-100 font-semibold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 "
              >
                Daftar Disini
              </Link>
            </div>
          </div>
          <div
            className="flex justify-center basis-1/2"
            data-aos="zoom-in-up"
            data-aos-delay="600"
          >
            <img src={Avatar1} className="w-96 md:w-9/12" alt="Avatar 1" />
          </div>
        </section>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0369a1"
          fillOpacity="1"
          d="M0,128L48,122.7C96,117,192,107,288,101.3C384,96,480,96,576,90.7C672,85,768,75,864,74.7C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
};

export default HeaderLandingPage;

import Avatar from "../assets/Image/avatar2.png";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const ContentLandingPage = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <section className=" px-6 sm:px-10 ">
      <div className="md:max-w-7xl mx-auto flex flex-col md:flex-row">
        <div
          className="text-center md:text-left basis-1/2 md:order-last md:pl-8"
          data-aos-delay="300"
          data-aos="zoom-in-left"
        >
          <h1 className="font-bold text-3xl text-gray-800 pb-8">LSP P1-PENS</h1>
          <p>
            Politeknik Elektronika Negeri Surabaya (PENS) senantiasa memberi
            bekal kepada mahasiswanya baik di bidang akademik maupun non
            akademik. Selain itu, PENS juga berkontribusi dalam hal pengujian
            guna mengukur sejauh apa kompetensi yang dimiliki mahasiswanya,
            sebagai persiapan mereka terjun di dunia kerja.
          </p>
        </div>
        <div
          className="basis-1/2 "
          data-aos="zoom-in-right"
          data-aos-delay="600"
        >
          <img src={Avatar} className="mx-auto" alt="" />
        </div>
      </div>
    </section>
  );
};

export default ContentLandingPage;

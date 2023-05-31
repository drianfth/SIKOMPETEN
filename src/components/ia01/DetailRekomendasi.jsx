import React, { useState } from "react";

const HeadUnitKomptensi = ({ data }) => {
  return (
    <div className="flex justify-center">
      <div className="p-4 border border-gray-200 rounded-l-md text-center">
        <p className="font-semibold">Unit Komptensi</p>
      </div>
      <div className="border border-gray-200 rounded-r-md">
        <div className="p-2 border-b border-gray-200">
          <p>
            <span className="font-semibold">Kode Unit : </span>
            {data.kode_unit}
          </p>
        </div>
        <div className="p-2">
          <p>
            <span className="font-semibold">Judul Unit : </span>{" "}
            {data.judul_unit}
          </p>
        </div>
      </div>
    </div>
  );
};

const BoxNumber = ({ number, setSubElemenIndex, values }) => {
  // const name = "rekomendasi" + number;
  // const isAnswere = values[name] !== "";
  const isRekomendasi = (values = "K");
  let color = "";
  if (isRekomendasi) {
    color = "bg-green-400";
  } else {
    color = "bg-red-400";
  }

  return (
    <div
      className={` ${color}  cursor-pointer p-3 h-12 text-center rounded-md hover:bg-gray-100 font-medium`}
      onClick={() => setSubElemenIndex(number - 1)}
    >
      {number}
    </div>
  );
};

const Question = ({ data, nomor }) => {
  // console.log(subElemen.elemen);
  return (
    <div className="">
      <HeadUnitKomptensi data={data.sub_elemen.elemen.unit_kompetensi} />
      <div className="w-full md:p-4">
        <ol>
          <li>
            <p className="mb-3">
              <strong> {nomor + 1}) Elemen : </strong>{" "}
              {data.sub_elemen.elemen.name}
            </p>
            <p className="mb-3">
              <strong>Sub Elemen : </strong> {data.sub_elemen.name}
            </p>
            <p className="mb-3">
              <strong>SOP : </strong> {data.sub_elemen.elemen.sop || "-"}
            </p>
            <div className=" ml-2 mt-5 ">
              <div className="mb-8">
                <label htmlFor="" className="font-bold">
                  Rekomendasi
                </label>
                <div className="flex gap-x-10">
                  <div className="flex items-center ">
                    <input
                      type="radio"
                      disabled
                      checked={data.rekomendasi === "K"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 cursor-pointer">
                      Kompeten
                    </label>
                  </div>

                  <div className="flex items-center ">
                    <input
                      type="radio"
                      disabled
                      checked={data.rekomendasi === "BK"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 cursor-pointer">
                      Belum Kompeten
                    </label>
                  </div>
                </div>
              </div>
              <div className="">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm  text-gray-900 font-bold"
                >
                  {" "}
                  Penilaian Lanjut
                </label>
                <textarea
                  rows="4"
                  value={
                    data.penilaian_lanjut === null
                      ? "Tidak ada Penilaian"
                      : data.penilaian_lanjut
                  }
                  disabled
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                ></textarea>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

const DetailRekomendasi = ({ jawaban_ia01s, values }) => {
  const [subElemenIndex, setSubElemenIndex] = useState(0);
  return (
    <div className="flex w-full gap-x-5 mt-5">
      <div className="basis-9/12">
        <Question data={jawaban_ia01s[subElemenIndex]} nomor={subElemenIndex} />
        <div className="flex justify-end space-x-3 mt-10">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() =>
              subElemenIndex > 0 && setSubElemenIndex(subElemenIndex - 1)
            }
          >
            Back
          </button>
          {subElemenIndex + 1 < jawaban_ia01s.length && (
            <button
              className="btn btn-primary"
              type="button"
              onClick={() =>
                subElemenIndex < jawaban_ia01s.length &&
                setSubElemenIndex(subElemenIndex + 1)
              }
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="hidden md:flex md:flex-col basis-3/12  h-fit shadow-md rounded-md p-2">
        <h1 className="my-3 text-center font-semibold text-gray-800">
          Kriteria Unjuk Kerja
        </h1>
        <div className="md:grid grid-cols-5 gap-2">
          {jawaban_ia01s.map((subElemen, index) => (
            <BoxNumber
              number={index + 1}
              key={subElemen.id}
              values={jawaban_ia01s}
              setSubElemenIndex={setSubElemenIndex}
              subElemenIndex={subElemen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailRekomendasi;

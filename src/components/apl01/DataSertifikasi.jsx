import { Field } from "formik";
import React from "react";
import unitData from "../../data/unit_kompetensi.json";

const DataSertifikasi = () => {
  console.log(unitData);
  return (
    <div className="w-full flex flex-col transition-all duration-800">
      <h1 className="text-center px-20 font-semibold mb-5">
        berikut Daftar Unit Kompetensi sesuai kemasan pada skema sertifikasi
        untuk mendapatkan pengakuan sesuai dengan latar belakang pendidikan,
        pelatihan serta pengalaman kerja yang anda miliki.{" "}
      </h1>

      <div className="flex mx-auto">
        <div className="p-4 border border-gray-400 rounded-l-md">
          <p>Skema Sertifikasi</p>
          <span className="line-through">KKNI</span>/<span> Okupsi</span>/
          <span className="line-through"> Klaster</span>
        </div>
        <div className="border-r border-gray-400 rounded-r-md">
          <div className="p-2 border-t  border-b border-gray-400">
            Software Quality Control Tester
          </div>
          <div className="p-2  border-b border-gray-400">SS-31-SQT-00-2022</div>
        </div>
      </div>

      <div className="flex px-20 mt-14 space-x-4">
        <label htmlFor="" className="font-semibold text-gray-700">
          Tujuan Asesmen
        </label>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center">
            <Field
              type="radio"
              value="sertifikasi"
              name="tujuan_asesmen"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />
            <label
              htmlFor="default-radio-1"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Sertifikasi
            </label>
          </div>
          <div className="flex items-center">
            <Field
              type="radio"
              value="sertifikasi ulang"
              name="tujuan_asesmen"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />
            <label
              htmlFor="default-radio-2"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Sertifikasi Ulang
            </label>
          </div>
          <div className="flex items-center">
            <Field
              type="radio"
              value="PKT"
              name="tujuan_asesmen"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />
            <label
              htmlFor="default-radio-2"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Pengakuan Kompetensi Terkini (PKT)
            </label>
          </div>
          <div className="flex items-center">
            <Field
              type="radio"
              value="Rekognisi Pembelajaran Lampau"
              name="tujuan_asesmen"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />
            <label
              htmlFor="default-radio-2"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Rekognisi Pembelajaran Lampau
            </label>
          </div>
          <div className="flex items-center">
            <Field
              type="radio"
              value="Lainnya"
              name="tujuan_asesmen"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />
            <label
              htmlFor="default-radio-2"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Lainnya
            </label>
          </div>
        </div>
      </div>

 
    </div>
  );
};

export default DataSertifikasi;

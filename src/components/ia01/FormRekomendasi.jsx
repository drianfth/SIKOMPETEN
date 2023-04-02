import { Alert, Button } from "@mui/material";
import { Field } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const BoxNumber = ({ number, subElemenIndex, setSubElemenIndex, values }) => {
  const name = "rekomendasi" + number;
  const isAnswere = values[name] !== "";
  let color = "";
  if (isAnswere) {
    color = "bg-green-400";
  } else if (subElemenIndex + 1 === number) {
    color = "bg-gray-100";
  } else {
    color = "bg-gray-300";
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

const Question = ({ subElemen, nomor, nameRadio, namePenilaian }) => {
  // console.log(subElemen.elemen);
  return (
    <div className="">
      <HeadUnitKomptensi data={subElemen.elemen.unit_kompetensi} />
      <div className="w-full md:p-4">
        <ol>
          <li>
            <p className="mb-3">
              <strong> {nomor + 1}) Elemen : </strong> {subElemen.elemen.name}
            </p>
            <p className="mb-3">
              <strong>Sub Elemen : </strong> {subElemen.name}
            </p>
            <div className=" ml-2 mt-5 ">
              <div className="mb-8">
                <label htmlFor="" className="font-bold">
                  Rekomendasi
                </label>
                <div className="flex gap-x-10">
                  <div className="flex items-center ">
                    <Field
                      type="radio"
                      value="K"
                      name={nameRadio}
                      id={nameRadio + "1"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      htmlFor={nameRadio + "1"}
                      className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Kompeten
                    </label>
                  </div>

                  <div className="flex items-center ">
                    <Field
                      type="radio"
                      value="BK"
                      name={nameRadio}
                      id={nameRadio + "2"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      htmlFor={nameRadio + "2"}
                      className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
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
                <Field
                  as="textarea"
                  rows="4"
                  name={namePenilaian}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Jika diperlukan isilah penilaian lanjut"
                ></Field>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

const FormRekomendasi = ({ subElemens, values, errors }) => {
  const [subElemenIndex, setSubElemenIndex] = useState(0);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const isValidasi = (errors) => {
    const status =
      Object.keys(errors).length === 0 && errors.constructor === Object;
    const message = status ? "" : "Harap Isi Semua Pertanyaan";
    setMessage(message);
  };
  return (
    <div className="">
      {message && (
        <Alert severity="error" className="w-1/2 mx-auto mt-4 text-center">
          {message}
        </Alert>
      )}

      <div className="flex w-full gap-x-5 mt-5">
        <div className="basis-9/12">
          <Question
            namePenilaian={"penilaian" + (subElemenIndex + 1)}
            nameRadio={"rekomendasi" + (subElemenIndex + 1)}
            nomor={subElemenIndex}
            subElemen={subElemens[subElemenIndex]}
          />
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
            {subElemenIndex + 1 < subElemens.length && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() =>
                  subElemenIndex < subElemens.length &&
                  setSubElemenIndex(subElemenIndex + 1)
                }
              >
                Next
              </button>
            )}
            {subElemenIndex + 1 >= subElemens.length && (
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => isValidasi(errors)}
              >
                Submit
              </button>
            )}
          </div>
        </div>
        <div className="hidden md:flex md:flex-col basis-3/12  h-fit shadow-md rounded-md p-2">
          <h1 className="my-3 text-center font-semibold text-gray-800">
            Kriteria Unjuk Kerja
          </h1>
          <div className="md:grid grid-cols-5 gap-2">
            {subElemens.map((subElemen, index) => (
              <BoxNumber
                number={index + 1}
                key={subElemen.id}
                values={values}
                setSubElemenIndex={setSubElemenIndex}
                subElemenIndex={subElemen}
              />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FormRekomendasi;

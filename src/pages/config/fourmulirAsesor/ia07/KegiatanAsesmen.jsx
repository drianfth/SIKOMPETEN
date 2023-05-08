import { Field } from "formik";
import React from "react";
import { useState } from "react";

const Question = ({ kegiatanAsesmen, nomor, nameRadio, nameText, errors }) => {
  return (
    <div className="w-full md:p-4">
      <h1 className="md:w-2/3 mt-2 text-gray-800 font-medium">
        <span className="font-bold">{nomor}) KegiatanAsesmen:</span>{" "}
        {kegiatanAsesmen.name}
      </h1>
      <ol className="mt-2">
        <h1 className="text-sm font-semibold text-gray-900">Ya/Tidak : </h1>
        <li>
          <div className="flex gap-x-10 mt-1">
            <div className="flex items-center ">
              <Field
                type="radio"
                value="Ya"
                name={nameRadio}
                id={nameRadio}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
              />

              <label
                className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                htmlFor={nameRadio}
              >
                Ya
              </label>
            </div>
            <div className="flex items-center">
              <Field
                type="radio"
                value="Tidak"
                name={nameRadio}
                id={nameRadio + "2"}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
              />

              <label
                className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                htmlFor={nameRadio + "2"}
              >
                Tidak
              </label>
            </div>
          </div>
          <div className="mt-5">
            <label className="block mb-2 text-sm font-semibold text-gray-900">
              Komentar
            </label>
            <Field
              as="textarea"
              rows="4"
              name={nameText}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Komentar"
            ></Field>
            {errors[nameText] && (
              <p className="mt-2 text-sm text-red-600 ">{errors[nameText]}.</p>
            )}
          </div>
        </li>
      </ol>
    </div>
  );
};

const BoxNumber = ({ number, kegiatanIndex, setKegiatanIndex, values }) => {
  // const isAnswere = values.hasOwnProperty("soal" + number);
  const name = "konfirmasi" + number;
  const isAnswere = values[name] !== "";
  let color = "";

  if (kegiatanIndex + 1 === number) {
    color = "bg-gray-100";
  } else if (isAnswere) {
    color = "bg-green-400";
  } else {
    color = "bg-gray-300";
  }
  return (
    <div
      className={` ${color}  cursor-pointer p-3 h-12 text-center rounded-md hover:bg-gray-100 font-medium`}
      onClick={() => setKegiatanIndex(number - 1)}
    >
      {number}
    </div>
  );
};

const KegiatanAsesmen = ({ data, values, errors }) => {
  //   console.log(data);
  const [kegiatanIndex, setKegiatanIndex] = useState(0);

  return (
    <div className="flex flex-col">
      <div className="flex w-full gap-x-5 mt-5">
        <div className="basis-9/12">
          <Question
            kegiatanAsesmen={data[kegiatanIndex]}
            nameRadio={"konfirmasi" + (kegiatanIndex + 1)}
            nameText={"komentar" + (kegiatanIndex + 1)}
            nomor={kegiatanIndex + 1}
            errors={errors}
          />
        </div>
        <div className="hidden md:flex md:flex-col basis-3/12  h-fit shadow-md rounded-md p-2">
          <h1 className="my-3 text-center font-semibold text-gray-800">
            Nomor Kegiatan
          </h1>
          <div className="md:grid grid-cols-5 gap-2 ">
            {data.map((k, index) => (
              <BoxNumber
                number={index + 1}
                key={k.id}
                values={values}
                setKegiatanIndex={setKegiatanIndex}
                kegiatanIndex={kegiatanIndex}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-10">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() =>
            kegiatanIndex > 0 && setKegiatanIndex(kegiatanIndex - 1)
          }
        >
          Back
        </button>
        {kegiatanIndex + 1 < data.length && (
          <button
            className="btn btn-primary"
            type="button"
            onClick={() =>
              kegiatanIndex < data.length && setKegiatanIndex(kegiatanIndex + 1)
            }
          >
            Next
          </button>
        )}
        {kegiatanIndex + 1 >= data.length && (
          <button
            className="btn btn-primary"
            type="submit"
            // onClick={() => isValidasi(errors)}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default KegiatanAsesmen;

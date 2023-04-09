import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getIa07 } from "../../../../api/ia07";
import { Card, CardContent } from "@mui/material";
import Loading from "../../../../components/Loading";

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

const BoxNumber = ({ number, setPertanyaanIndex, values }) => {
  // console.log(values)
  const isRekomendasi = values === "K";
  let color = "";
  if (isRekomendasi) {
    color = "bg-green-400";
  } else {
    color = "bg-red-400";
  }

  return (
    <div
      className={` ${color}  cursor-pointer p-3 h-12 text-center rounded-md hover:bg-gray-100 font-medium`}
      onClick={() => setPertanyaanIndex(number - 1)}
    >
      {number}
    </div>
  );
};

const Question = ({ data, nomor }) => {
  // console.log(subElemen.elemen);
  return (
    <div className="">
      <HeadUnitKomptensi data={data.pertanyaania07.unit_kompetensi} />
      <div className="w-full md:p-4">
        <ol>
          <li>
            <p className="mb-3">
              <strong> {nomor + 1}) Pertanyaan : </strong>{" "}
              {data.pertanyaania07.name}
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
                  Jawaban
                </label>
                <textarea
                  rows="4"
                  value={data.jawaban}
                  disabled
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Jawaban Asesi"
                ></textarea>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

const DetailIa07 = () => {
  const { id } = useParams();
  const ia07 = useQuery("ia07", () => getIa07(id));
  const [value, setValue] = React.useState("1");
  const [pertanyaanIndex, setPertanyaanIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.IA.07. PERTANYAAN LISAN
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {console.log(ia07.isFetching)}
        {ia07.isFetching ? (
          <Loading />
        ) : (
          <div className="">
            {ia07.isError ? (
              <h1 className="text-center">Data Kosong</h1>
            ) : (
              <div className="flex w-full gap-x-5 mt-5">
                <div className="basis-9/12">
                  <Question
                    data={ia07.data[0].jawaban_ia07s[pertanyaanIndex]}
                    nomor={pertanyaanIndex}
                  />
                  <div className="flex justify-end space-x-3 mt-10">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() =>
                        pertanyaanIndex > 0 &&
                        setPertanyaanIndex(pertanyaanIndex - 1)
                      }
                    >
                      Back
                    </button>
                    {pertanyaanIndex + 1 <
                      ia07.data[0].jawaban_ia07s.length && (
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() =>
                          pertanyaanIndex < ia07.data[0].jawaban_ia07s.length &&
                          setPertanyaanIndex(pertanyaanIndex + 1)
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
                    {ia07.data[0].jawaban_ia07s.map((jawab, index) => (
                      <BoxNumber
                        number={index + 1}
                        key={index}
                        setPertanyaanIndex={setPertanyaanIndex}
                        values={jawab.rekomendasi}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailIa07;

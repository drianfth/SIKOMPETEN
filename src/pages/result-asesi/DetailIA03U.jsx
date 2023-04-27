import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getIa03 } from "../../api/ia03";
import { Card, CardContent, Tab } from "@mui/material";
import Loading from "../../components/Loading";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import FieldInput from "../config/DetailApl01/FieldInput";

const DetailUmpanBalik = ({ data }) => {
  //   console.log(data);
  return (
    <div>
      {data.map((umpan_balik, index) => (
        <FieldInput
          label={`${index + 1}) ${umpan_balik.unit_kompetensi.judul_unit}`}
          value={umpan_balik.umpan_balik}
          key={index}
        />
      ))}
    </div>
  );
};

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
  
  const Question = ({ data, nomor }) => {
    // console.log(subElemen.elemen);
    console.log(data);
    return (
      // <div className=""></div>
      <div className="">
        <HeadUnitKomptensi data={data.pertanyaania03.unit_kompetensi} />
        <div className="w-full md:p-4">
          <ol>
            <li>
              <p className="mb-3">
                <strong> {nomor + 1}) Pertanyaan : </strong>{" "}
                {data.pertanyaania03.name}
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
                    Tanggapan
                  </label>
                  <textarea
                    rows="4"
                    value={
                      data.tanggapan === null
                        ? "Tidak ada Tanggapan"
                        : data.tanggapan
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
  
  const BoxNumber = ({ number, setPertanyaanIndex, values }) => {
    // const name = "rekomendasi" + number;
    // const isAnswere = values[name] !== "";
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
  
  const DetailHasil = ({ data }) => {
    const [pertanyaanIndex, setPertanyaanIndex] = useState(0);
  
    return (
      <div className="flex w-full gap-x-5 mt-5">
        <div className="basis-9/12">
          <Question data={data[pertanyaanIndex]} nomor={pertanyaanIndex} />
          <div className="flex justify-end space-x-3 mt-10">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() =>
                pertanyaanIndex > 0 && setPertanyaanIndex(pertanyaanIndex - 1)
              }
            >
              Back
            </button>
            {pertanyaanIndex + 1 < data.length && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() =>
                  pertanyaanIndex < data.length &&
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
            Pertanyaan
          </h1>
          <div className="md:grid grid-cols-5 gap-2">
            {data.map((jawaban, index) => (
              <BoxNumber
                number={index + 1}
                key={index}
                setPertanyaanIndex={setPertanyaanIndex}
                values={jawaban.rekomendasi}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

const DetailIA03U = () => {
  const { id } = useParams();
  const ia03 = useQuery("ia03", () => getIa03(id));
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.IA.03. PERTANYAAN UNTUK MENDUKUNG OBSERVASI
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {ia03.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            {!ia03.data ? (
              <h1 className="text-center">Data Kosong</h1>
            ) : (
              <TabContext value={value}>
                <div className="">
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab label="Umpan Balik Tiap Unit" value="1" />
                    <Tab
                      label="Hasil FR.IA.03. Pertanyaan Untuk Mendukung Observasi"
                      value="2"
                    />
                  </TabList>
                </div>
                <TabPanel value="1">
                  <DetailUmpanBalik data={ia03.data[0]?.jawaban_unit_ia03s} />
                </TabPanel>
                <TabPanel value="2">
                  {/* <DetailHasil /> */}
                  <DetailHasil data={ia03.data[0]?.jawaban_ia03s} />
                </TabPanel>
              </TabContext>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailIA03U;

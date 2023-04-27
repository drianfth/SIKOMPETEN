import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDetailApl02 } from "../../api/apl02";
import { Card, CardContent, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import Loading from "../../components/Loading";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import FieldInput from "../config/DetailApl01/FieldInput";

const LabelSchema = ({ schema }) => {
  return (
    <div className="flex">
      <div className="p-4 border border-gray-200 rounded-l-md text-center">
        <p>Skema Sertifikasi</p>
        <p>({schema?.schema_sertifikasi})</p>
      </div>
      <div className="border border-gray-200 rounded-r-md">
        <div className="p-2 border-b border-gray-200">
          <p>
            <span>Judul : </span>
            {schema?.name}
          </p>
        </div>
        <div className="p-2">
          <p>
            <span>Nomor : </span> {schema?.nomor}
          </p>
        </div>
      </div>
    </div>
  );
};

const BoxNumber = ({ number, elemenIndex, setElemenIndex, values }) => {
  // const isAnswere = values.hasOwnProperty("soal" + number);
  // const name = "soal" + number;
  const isKompeten = values === "kompeten";
  let color = "";
  if (isKompeten) {
    color = "bg-green-400";
  } else {
    color = "bg-red-400";
  }
  return (
    <div
      className={` ${color}  cursor-pointer p-3 h-12 text-center rounded-md hover:bg-gray-100 font-medium`}
      onClick={() => setElemenIndex(number - 1)}
    >
      {number}
    </div>
  );
};

const Question = ({ data, nomor }) => {
  return (
    <div className="w-full md:p-4">
      <h1 className="md:w-2/3 mt-2 font-bold text-gray-800">
        {data.elemen.unit_kompetensi.pertanyaan}
      </h1>
      <ol className=" ml-3 mt-2">
        <li>
          <p>
            {nomor + 1}) Elemen: {data.elemen.name}. Kriteria Unjuk Kerja:
          </p>
          <ul className="list-disc ml-14">
            {data.elemen.sub_elemens.map((sub_elemen) => (
              <li key={sub_elemen.id}>{sub_elemen.name}</li>
            ))}
          </ul>
          <div className="flex gap-x-10 ml-14 mt-5">
            <div className="flex items-center ">
              <input
                type="radio"
                disabled
                checked={data.jawaban === "kompeten"}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
              />

              <label className="ml-2 text-sm font-medium text-gray-900 cursor-pointer">
                Kompeten
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                disabled
                checked={data.jawaban === "belum kompeten"}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
              />

              <label className="ml-2 text-sm font-medium text-gray-900 cursor-pointer">
                Belum Kompeten
              </label>
            </div>
          </div>
          <div className="ml-14 mt-10">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Bukti Relevan
            </label>
            <textarea
              rows="4"
              value={data.bukti === null ? "" : data.bukti}
              disabled
              className="block p-2.5 w-full text-sm cursor-not-allowed text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            ></textarea>
          </div>
        </li>
      </ol>
    </div>
  );
};

const JawabanApl02 = ({ data }) => {
  const [elemenIndex, setElemenIndex] = useState(0);
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <LabelSchema schema={data[0]?.schema} />
      </div>
      <div className="flex w-full gap-x-5 mt-5">
        <div className="basis-9/12">
          <Question
            data={data[0].jawaban_apl02s[elemenIndex]}
            nomor={elemenIndex}
          />
        </div>
        <div className="hidden md:flex md:flex-col basis-3/12  h-fit shadow-md rounded-md p-2">
          <h1 className="my-3 text-center font-semibold text-gray-800">
            Nomor Elemen
          </h1>
          <div className="md:grid grid-cols-5 gap-2 ">
            {data[0].jawaban_apl02s.map((e, index) => (
              <BoxNumber
                number={index + 1}
                key={e.id}
                values={e.jawaban}
                setElemenIndex={setElemenIndex}
                elemenIndex={elemenIndex}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between space-x-3 mt-10">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => elemenIndex > 0 && setElemenIndex(elemenIndex - 1)}
        >
          Back
        </button>
        {elemenIndex + 1 < data[0].jawaban_apl02s.length && (
          <button
            className="btn btn-primary"
            type="button"
            onClick={() =>
              elemenIndex < data[0].jawaban_apl02s.length &&
              setElemenIndex(elemenIndex + 1)
            }
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

const Apl02Pengesahan = ({ data }) => {
  return (
    <div className="border border-gray-300 p-8 rounded">
      <FieldInput label="Rekomendasi Pemohon" value={data.status} />
      <FieldInput
        label="Status Konfirmasi"
        value={data.konfirmasi === 1 ? "Dikonfirmasi" : "Belum Dikonfirmasi"}
      />
    </div>
  );
};

const DetailApl02U = () => {
  let { id } = useParams();
  const { data, isLoading } = useQuery("detailApl02", () => getDetailApl02(id));
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Card className="shadow-lg h-full p-3">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            FR.APL.02. ASESMEN MANDIRI
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          {!data ? (
            <div className="">
              <h1 className="text-center">Tidak Ada Data</h1>
            </div>
          ) : (
            <TabContext value={value}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                className="flex justify-items-center"
              >
                <Tab label="Hasil APL02" value="1" />
                <Tab label="Pengesahan" value="2" />
              </TabList>
              {isLoading ? (
                <Loading />
              ) : (
                <div className="">
                  <TabPanel value="1">
                    <JawabanApl02 data={data} />
                  </TabPanel>
                  <TabPanel value="2">
                    <Apl02Pengesahan data={data[0]} />
                  </TabPanel>
                </div>
              )}
            </TabContext>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailApl02U;

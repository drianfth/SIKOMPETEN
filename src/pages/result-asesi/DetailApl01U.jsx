import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDetailApl01 } from "../../api/apl01";
import { Button, Card, CardContent } from "@mui/material";
import Loading from "../../components/Loading";
import FieldInput from "../config/DetailApl01/FieldInput";
import TextAreaInput from "../config/DetailApl01/TextAreaInput";
import BuktiField from "../config/DetailApl01/BuktiField";
import CloudIcon from "@mui/icons-material/Cloud";

const ButtonTab = ({ children, active, handleTab }) => {
  return (
    <button
      type="button"
      className={`${
        active
          ? "text-white bg-sky-700 hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2 border-2 border-transparent transition-all duration-500"
          : "py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border-2 border-gray-200 hover:bg-gray-100 hover:text-sky-700 focus:z-10 focus:ring-4 focus:ring-gray-200 transition-all duration-500"
      }`}
      onClick={handleTab}
    >
      {children}
    </button>
  );
};

const HeadSchema = ({ schema }) => {
  return (
    <div className="flex mx-auto w-fit ">
      <div className="p-4 border border-gray-400 rounded-l-md">
        <p>Skema Sertifikasi</p>
        <span
          className={`${
            schema?.schema_sertifikasi === "KKNI"
              ? ""
              : "line-through hidden sm:inline"
          }`}
        >
          KKNI /
        </span>
        <span
          className={`${
            schema?.schema_sertifikasi === "Okupasi"
              ? ""
              : "line-through hidden sm:inline"
          }`}
        >
          {" "}
          Okupasi /
        </span>
        <span
          className={`${
            schema?.schema_sertifikasi === "Klaster"
              ? ""
              : "line-through hidden sm:inline"
          }`}
        >
          {" "}
          Klaster
        </span>
      </div>
      <div className="border-r border-gray-400 rounded-r-md">
        <div className="p-2 border-t  border-b border-gray-400">
          {schema?.name}
        </div>
        <div className="p-2  border-b border-gray-400">{schema?.nomor}</div>
      </div>
    </div>
  );
};

const DataPribadi = ({ data }) => {
  const tanggal = new Date(data?.tgl_lahir);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="w-full flex flex-col transition-all duration-800">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-3">
        {/* <div className=" w-1/2 px-2 space-y-5"> */}
        <FieldInput label="Nama" value={data?.name} />
        <FieldInput label="No. KTP/NIK/Paspor" value={data?.kk_ktp_paspor} />
        <FieldInput label="Tempat Lahir" value={data?.tempat_lhr} />
        <FieldInput label="Jenis Kelamin" value={data?.jns_kelamin} />
        <FieldInput
          label="Tanggal Lahir"
          value={`${tanggal.getDate()}-${
            month[tanggal.getMonth()]
          }-${tanggal.getFullYear()}`}
        />
        {/* </div> */}

        {/* <div className=" w-1/2 px-2 space-y-5"> */}
        <FieldInput label="Kebangsaan" value={data?.kebangsaan} />
        <FieldInput label="Nomor Telepon" value={data?.no_telp} />
        <FieldInput label="Email" value={data?.email} />
        <FieldInput label="Kuali Pendidikan" value={data?.pendidikan} />
        <FieldInput label="Kode Pos" value={data?.kode_pos} />
        {/* </div> */}
      </div>
      <div className=" mt-1">
        <TextAreaInput label="Alamat" value={data?.alamat} />
      </div>
    </div>
  );
};
const DataPekerjaan = ({ data }) => {
  return (
    <div className="w-full flex flex-col transition-all duration-800">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-3">
        {/* <div className=" w-1/2 px-2 space-y-5"> */}
        <FieldInput label="Perusahaann" value={data?.perusahaan} />
        <FieldInput label="Jabatan" value={data?.jabatan} />
        <FieldInput label="Nomor Telepon" value={data?.telp_kantor} />
        {/* </div> */}

        {/* <div className=" w-1/2 px-2 space-y-5"> */}
        <FieldInput label="Fax" value={data?.fax} />
        <FieldInput label="Email Kantor" value={data?.email_kantor} />
        <FieldInput label="Kado Pos Kantor" value={data?.kado_pos_kantor} />
        {/* </div> */}
      </div>
      <div className="mt-1">
        <TextAreaInput label="Alamat Kantor" value={data?.alamat} />
      </div>
    </div>
  );
};
const BuktiKelengkapan = ({ kelengkapan, tujuan, link }) => {
  return (
    <div>
      <div className="md:px-5">
        <FieldInput label="Tujuan Asesmen" value={tujuan} />
      </div>
      <div className="">
        {kelengkapan?.map((kelengkapan, i) => (
          <BuktiField
            nomor={i + 1}
            value={kelengkapan.jawaban_kelengkapan}
            label={kelengkapan.kelengkapan}
          />
        ))}
      </div>
      <div className="md:px-5 mt-4">
        <label htmlFor="dokumen" className="font-semibold">
          Dokumen Kelengkapan
        </label>

        <a href={link} target="_blank" rel="noreferrer noopener">
          <div className="border px-12 py-6 border-gray-200 shadow-md hover:shadow-lg w-fit rounded-md group hover:scale-110 transition-all mt-2">
            <CloudIcon className="text-sky-500 text-5xl group-hover:animate-bounce " />
          </div>
        </a>
        <i className="text-yellow-500 mt-2 text-sm">
          *klik logo awan diatas untuk melihat dokumen kelengkapan
        </i>
      </div>
    </div>
  );
};
const DataPengesahan = ({ status, konfirmasi }) => {
  return (
    <div className="border border-gray-300 p-8 rounded">
      <div className="">
        <FieldInput label="Status" value={status} />
        <FieldInput
          label="Konfirmasi"
          value={konfirmasi === 1 ? "Sudah Dikonfirmasi" : "Belum Dikonfirmasi"}
        />
      </div>
    </div>
  );
};

const DetailApl01U = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(
    "detailApl01",
    () => getDetailApl01(id),
    {
      // refetchInterval: 2000,
    }
  );
  const initialTab = [
    { id: 1, name: "Data Pribadi", active: true },
    { id: 2, name: "Data Pekerjaan", active: false },
    { id: 3, name: "Kelengkapan dan Sertifikasi", active: false },
    { id: 4, name: "Pengesahan", active: false },
  ];
  const [tab, setTab] = useState(initialTab);
  const [currentTab, setCurrentTab] = useState(1);
  const handleTab = (index) => {
    setCurrentTab(index);
    const tempTab = tab.map((t) => {
      if (t.id === index) {
        return {
          ...t,
          active: true,
        };
      } else {
        return {
          ...t,
          active: false,
        };
      }
    });
    setTab(tempTab);
  };
  const handleNextTab = (index) => {
    if (index >= 4) {
      handleTab(4);
    } else {
      handleTab(index + 1);
    }
  };
  const handleBackTab = (index) => {
    if (index <= 1) {
      handleTab(1);
    } else {
      handleTab(index - 1);
    }
  };

  return (
    <div>
      <Card className="shadow-lg h-full">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            FR.APL.01. PERMOHONAN SERTIFIKASI KOMPETENSI
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="">
              <HeadSchema schema={data[0].schema} />
              <div className="flex w-full px-3 mt-4">
                <div className="w-2/12 md:flex flex-col hidden">
                  {tab.map((t) => (
                    <ButtonTab
                      key={t.id}
                      active={t.active}
                      handleTab={() => handleTab(t.id)}
                    >
                      {t.name}
                    </ButtonTab>
                  ))}
                </div>
                <main className="w-full transition-all duration-600">
                  {currentTab === 1 && <DataPribadi data={data[0]} />}
                  {currentTab === 2 && <DataPekerjaan data={data[0]} />}
                  {currentTab === 3 && (
                    <BuktiKelengkapan
                      kelengkapan={data[0].r_kelengkapans}
                      tujuan={data[0].tujuan_asesmen}
                      link={data[0].link}
                    />
                  )}
                  {currentTab === 4 && (
                    <DataPengesahan
                      konfirmasi={data[0]?.konfirmasi}
                      status={data[0]?.status}
                    />
                  )}
                </main>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  className="bg-gray-200 px-4 py-2 rounded shadow"
                  onClick={() => handleBackTab(currentTab)}
                >
                  Back
                </button>
                <button
                  className="bg-gray-200 px-4 py-2 rounded shadow"
                  onClick={() => handleNextTab(currentTab)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailApl01U;

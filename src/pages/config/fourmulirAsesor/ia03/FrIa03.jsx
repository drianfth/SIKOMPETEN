import React from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getSchemaElSub } from "../../../../api/schema";
import { getDetailAk01 } from "../../../../api/ak01";
import { Card, CardContent } from "@mui/material";
import Loading from "../../../../components/Loading";

const HeadSchema = ({ schema, ak01 }) => {
  return (
    <div className="flex mx-auto w-fit ">
      <div className="">
        <div className="p-4 border border-gray-400 ">
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
        <div className="p-2 border-l border-b border-r border-gray-400">
          TUK :
        </div>
        <div className="p-2 border-l border-b border-r border-gray-400">
          Nama Asesor :
        </div>
        <div className="p-2 border-l border-b border-r border-gray-400">
          Nama Asesi :
        </div>
        <div className="p-2 border-l border-b border-r border-gray-400">
          Tanggal :{" "}
        </div>
      </div>
      <div className="border-r border-gray-400">
        <div className="p-2 border-t  border-b border-gray-400">
          {schema?.name}
        </div>
        <div className="p-2  border-b border-gray-400">{schema?.nomor}</div>
        <div className="p-2 border-b border-gray-400">{ak01.tuk}</div>
        <div className="p-2 border-b border-gray-400">{ak01.asesor.name}</div>
        <div className="p-2 border-b border-gray-400">{ak01.asesi.name}</div>
        <div className="p-2 border-b border-gray-400">
          {ak01.sesi.paket_skema.tanggal}
        </div>
      </div>
    </div>
  );
};

const Intruksi = ({ intruksis, judul, intruksi = true }) => {
  return (
    <div className=" mt-10 border border-gray-300 rounded-md max-w-2xl mx-auto">
      <div className="p-2 bg-gray-200 text-center font-semibold">
        <h1>{judul}</h1>
      </div>
      <div className="p-4">
        {intruksi && <h2 className="font-semibold mb-4">Intruksi :</h2>}
        <ul className="list-disc list-inside space-y-1">
          {intruksis.map((intruksi, index) => (
            <li key={index}>{intruksi}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FrIa03 = () => {
  const location = useLocation();
  const apl01 = location.state.asesi;
  const turunanSchema = useQuery("turunanSkema", () =>
    getSchemaElSub(apl01.schema_id)
  );
  const ak01 = useQuery("ak01", () => getDetailAk01(apl01.id), {
    enabled: !!turunanSchema,
  });
  const navigate = useNavigate();
  const openujian = () => {
    navigate("/formulir/ujian-fria03", {
      state: {
        skema: turunanSchema.data[0],
        apl01: apl01,
        ak01: ak01.data[0],
      },
    });
  };
  const panduanPoint = [
    "Formulir ini diisi pada saat asesor akan melakukan asesmen dengan metode observasi demonstrasi ",
    "Pertanyaan dibuat dengan tujuan untuk menggali, dapat berisi pertanyaan yang berkaitan dengan dimensi kompetensi, batasan variabel dan aspek kritis.",
    "Tanggapan asesi dapat ditulis oleh asesor dikolom tanggapan, dan apabila tanggapan sesuai maka beri tanda centrang pada kolom (K) dan apabila belum sesuai beri tanda centrang pada kolom (BK)",
  ];

  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.IA.03. PERTANYAAN UNTUK MENDUKUNG OBSERVASI
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {ak01.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            <HeadSchema schema={turunanSchema.data[0]} ak01={ak01.data[0]} />
            <Intruksi intruksis={panduanPoint} judul="PANDUAN BAGI ASESOR" />
            <div className="flex justify-end space-x-3 mt-16">
              <button
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <button className="btn btn-primary" onClick={openujian}>
                Next
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FrIa03;

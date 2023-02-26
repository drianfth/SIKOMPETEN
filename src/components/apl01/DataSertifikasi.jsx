import { Field } from "formik";
import React from "react";
import { useMemo } from "react";
import TableBasic from "../TableBasic";
import { useQuery } from "react-query";
import { getUnitKompetensi } from "../../api/unitKompetensi";
import Loading from "../Loading";
import { getSchema } from "../../api/schema";
import { Alert } from "@mui/material";

const DaftarPertanyaan = () => {
  return (
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
  );
};

const DataSertifikasi = ({ schema_id, errors }) => {
  const units = useQuery("dataUnit", () => getUnitKompetensi(schema_id));
  const schemas = useQuery("uniqSchema", () => getSchema(schema_id));
  const columns = useMemo(
    () => [
      {
        Header: "Nomor",
        accessor: "nomor",
      },
      {
        Header: "Kode Unit",
        accessor: "kode_unit",
      },
      {
        Header: "Judul Unit",
        accessor: "judul_unit",
      },
      {
        Header: "Jenis Standar",
        accessor: "jenis_standar",
      },
    ],
    []
  );
  let no = 1;

  const dataTable = useMemo(
    () => units.data?.map((tes) => ({ ...tes, nomor: no++ })),
    [units.data, no]
  );

  return (
    <div className="w-full flex flex-col transition-all duration-800">
      <h1 className="text-center px-20 font-semibold mb-5">
        berikut Daftar Unit Kompetensi sesuai kemasan pada skema sertifikasi
        untuk mendapatkan pengakuan sesuai dengan latar belakang pendidikan,
        pelatihan serta pengalaman kerja yang anda miliki.{" "}
      </h1>
      {units.isLoading ? (
        <Loading />
      ) : (
        <>
          {!schemas.isLoading && (
            <div className="flex mx-auto">
              <div className="p-4 border border-gray-400 rounded-l-md">
                <p>Skema Sertifikasi</p>
                <span
                  className={`${
                    schemas.data[0].schema_sertifikasi === "KKNI"
                      ? ""
                      : "line-through"
                  }`}
                >
                  KKNI
                </span>
                /
                <span
                  className={`${
                    schemas.data[0].schema_sertifikasi === "Okupasi"
                      ? ""
                      : "line-through"
                  }`}
                >
                  {" "}
                  Okupasi
                </span>
                /
                <span
                  className={`${
                    schemas.data[0].schema_sertifikasi === "Klaster"
                      ? ""
                      : "line-through"
                  }`}
                >
                  {" "}
                  Klaster
                </span>
              </div>
              <div className="border-r border-gray-400 rounded-r-md">
                <div className="p-2 border-t  border-b border-gray-400">
                  {schemas.data[0].name}
                </div>
                <div className="p-2  border-b border-gray-400">
                  {schemas.data[0].nomor}
                </div>
              </div>
            </div>
          )}
          {errors.tujuan_asesmen && (
            <Alert severity="error" className="w-1/2 mx-auto mt-4">
              {errors.tujuan_asesmen}
            </Alert>
          )}

          <DaftarPertanyaan />

          <TableBasic data={dataTable} columns={columns} />
        </>
      )}
    </div>
  );
};

export default DataSertifikasi;

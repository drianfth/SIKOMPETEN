import React from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getSchema, getSchemaNow } from "../../api/schema";
import Loading from "../../components/Loading";
import useApl02Store from "../../context/ujiKompetensi/useApl02Store";
import useSchemaStore from "../../context/ujiKompetensi/useSchemaStore";
import useAuthStore from "../../context/userAuthStore";

const Apl02 = () => {
  const { user } = useAuthStore();
  const historyApl01 = useApl02Store((state) => state.historyApl01);
  const navigate = useNavigate();
  // const location = useLocation();
  const { setSchema } = useSchemaStore();
  const schema = useQuery("schema", () => getSchema(historyApl01.schema_id), {
    onSuccess: (data) => {
      setSchema(data);
    },
  });
  console.log(historyApl01);

  const openujian = () => {
    navigate("/apl02/ujian");
  };

  return (
    <div>
      {schema.isLoading && <Loading />}
      {schema.isSuccess && (
        <div className="flex flex-col items-center">
          <div className="flex">
            <div className="p-4 border border-gray-200 rounded-l-md text-center">
              <p>Skema Sertifikasi</p>
              <p>({schema.data[0]?.schema_sertifikasi})</p>
            </div>
            <div className="border border-gray-200 rounded-r-md">
              <div className="p-2 border-b border-gray-200">
                <p>
                  <span>Judul : </span>
                  {schema.data[0]?.name}
                </p>
              </div>
              <div className="p-2">
                <p>
                  <span>Nomor : </span> {schema.data[0]?.nomor}
                </p>
              </div>
            </div>
          </div>

          <div className=" mt-10 border border-gray-300 rounded-md max-w-2xl">
            <div className="p-2 bg-gray-200 text-center font-semibold">
              <h1>PANDUAN ASESMEN MANDIRI</h1>
            </div>
            <div className="p-4">
              <h2 className="font-semibold mb-4">Intruksi :</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Baca setiap pertanyaan </li>
                <li>
                  Checklist jika Anda yakin dapat melakukan tugas yang
                  dijelaskan.
                </li>
                <li>
                  Isi kuom Bukti yang relevan dengan mendaftar bukti yang Anda
                  miliki untuk menunjukkan bahwa Anda melakukan tugas-tugas ini.
                </li>
                <li>
                  Disarankan memamakai laptop Atau komputer ketika mengisi data
                  APL 02
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end space-x-3 mt-16">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="btn btn-primary" onClick={openujian}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Apl02;

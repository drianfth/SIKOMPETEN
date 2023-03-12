import React from "react";
import BuktiField from "./BuktiField";
import InitialKelengkapan from "../../data/kelengkapan.json";
import { useQuery } from "react-query";
import { getOneKelengkapan } from "../../api/kelengkapan";
import Loading from "../Loading";
import { Alert } from "@mui/material";
import FieldInput from "./FieldInput";
import AlertTitle from "@mui/material/AlertTitle";

const BuktiKelengkapan = ({ schema_id, errors }) => {
  const kelengkapans = useQuery("kelengkapanData", () =>
    getOneKelengkapan(schema_id)
  );
  return (
    <div>
      <h1 className="text-center font-bold text-lg mb-2">
        Bukti Persyaratan Dasar Pemohon
      </h1>
      <Alert severity="info" className="md:w-8/12 mx-auto">
        <AlertTitle>Info</AlertTitle>
        Kumpulkan semua Bukti Kelengkapan dibawah ini dan Upload kedalam Google
        Drive. Kemudian Masukkan <strong> Link Google Drive </strong> tersebut
        kedalam kolom Link. Kemudia checklist kelengkapan dibawah sesuai berkas apa saya yang sudah di upload
      </Alert>
      <div className="md:px-4">
        <FieldInput
          label="Link"
          name="link"
          error={errors.link}
          mandatory={true}
          type="text"
        />
      </div>
      {kelengkapans.isLoading ? (
        <Loading />
      ) : (
        <div className="">
          {kelengkapans.data?.map((data, i) => (
            <BuktiField
              name={"kelengkapan" + (i + 1)}
              label={data.name}
              key={data.id}
              nomor={i + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BuktiKelengkapan;

import React from "react";
import BuktiField from "./BuktiField";
import InitialKelengkapan from "../../data/kelengkapan.json";
import { useQuery } from "react-query";
import { getOneKelengkapan } from "../../api/kelengkapan";
import Loading from "../Loading";

const BuktiKelengkapan = ({ schema_id }) => {
  const kelengkapans = useQuery("kelengkapanData", () =>
    getOneKelengkapan(schema_id)
  );
  return (
    <div>
      <h1 className="text-center font-bold text-lg mb-2">
        Bukti Persyaratan Dasar Pemohon
      </h1>
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

import React from "react";
import BuktiField from "./BuktiField";
import InitialKelengkapan from "../../data/kelengkapan.json";

const BuktiKelengkapan = () => {
  let no = 1;
  return (
    <div>
      <h1 className="text-center font-bold text-lg mb-2">
        Bukti Persyaratan Dasar Pemohon
      </h1>
      <div className="">
        {InitialKelengkapan.map((i) => (
          <BuktiField name={i.id} label={i.nama} key={i.id} nomor={no++} />
        ))}
      </div>
    </div>
  );
};

export default BuktiKelengkapan;

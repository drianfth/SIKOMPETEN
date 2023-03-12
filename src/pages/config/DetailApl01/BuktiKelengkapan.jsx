import React from "react";
import BuktiField from "./BuktiField";
import FieldInput from "./FieldInput";
import CloudIcon from "@mui/icons-material/Cloud";

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

export default BuktiKelengkapan;

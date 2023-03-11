import React from "react";
import BuktiField from "./BuktiField";
import FieldInput from "./FieldInput";

const BuktiKelengkapan = ({ kelengkapan, tujuan }) => {
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
    </div>
  );
};

export default BuktiKelengkapan;

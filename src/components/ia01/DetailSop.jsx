import { Button } from "@mui/material";
import React from "react";
import FieldInput from "../../pages/config/DetailApl01/FieldInput";

const DetailSop = ({ sops, setValue }) => {
  // console.log(sops);
  return (
    <div>
      {!sops ? (
        <h1 className="text-center font-semibold">
          Tidak ada Benchmark (SOP / spesifikasi produk industri)
        </h1>
      ) : (
        <div className="">
          {sops.map((sop, index) => (
            <FieldInput
              label={`${index + 1}) ${sop.elemen.name}`}
              value={sop.jawab_sop}
              key={index}
            />
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <Button
          variant="contained"
          className="bg-sky-700"
          onClick={() => setValue("2")}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default DetailSop;

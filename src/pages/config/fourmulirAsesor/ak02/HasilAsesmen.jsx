import { Button } from "@mui/material";
import React, { useState } from "react";
import FieldInput from "../../../../components/apl01/FieldInput";
import RadioGroup from "../../../../components/RadioGroup";

const HasilAsesmen = ({ data, setValue, errors, isValidasi }) => {
  const [option, setOption] = useState([
    { id: 1, label: "Kompeten", value: "Kompeten" },
    { id: 2, label: "Belum Kompeten", value: "Belum Kompeten" },
  ]);

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-y-4">
        <RadioGroup
          label="Rekomendasi hasil asesmen"
          name="rekomendasi"
          options={option}
        />
        <FieldInput
          error={errors.tindak_lanjut}
          name="tindak_lanjut"
          label="Tindak lanjut yang dibutuhkan (Masukkan pekerjaan tambahan dan asesmen yang diperlukan untuk mencapai kompetensi)"
        />
        <FieldInput
          error={errors.komentar}
          name="komentar"
          label="Komentar/ Observasi oleh asesor"
        />
      </div>
      <div className="mt-4">
        <p>LAMPIRAN DOKUMEN</p>
        <ol className="list-decimal list-inside">
          <li>Dokumen APL 01 peserta</li>
          <li>Dokumen APL 02 peserta</li>
          <li>Bukti-bukti berkualitas peserta</li>
          <li>Tinjauan proses asesmen.</li>
        </ol>
      </div>
      <div className="flex justify-between mt-4">
        <Button
          variant="contained"
          type="button"
          className="bg-gray-500"
          onClick={() => setValue("2")}
        >
          Back
        </Button>

        <Button
          variant="contained"
          type="submit"
          className="bg-sky-700"
          onClick={() => isValidasi(errors)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default HasilAsesmen;

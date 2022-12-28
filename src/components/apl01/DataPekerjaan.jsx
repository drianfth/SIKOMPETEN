import React from "react";
import FieldInput from "./FieldInput";
import DateInput from "./DateInput";
import SelectInput from "./SelectInput";
import TextAreaInput from "./TextAreaInput";

const DataPekerjaan = () => {
  return (
    <div className="w-full flex flex-col transition-all duration-800">
      <div className="flex px-4 space-x-2">
        <div className=" w-1/2 px-2 space-y-5">
          <FieldInput name="perusahaan" label="Perusahaan" type="text" />
          <FieldInput name="jabatan" label="Jabatan" type="text" />
          <FieldInput
            name="telp_kantor"
            label="Nomor Telepon Kantor"
            type="text"
          />
        </div>

        <div className=" w-1/2 px-2 space-y-5">
          <FieldInput name="fax" label="fax" type="text" />
          <FieldInput name="email_kantor" label="Email Kantor" type="email" />
          <FieldInput
            name="kode_pos_kantor"
            label="Kode Pos Kantor"
            type="number"
          />
        </div>
      </div>
      <div className="px-6 mt-4">
        <TextAreaInput name="almt_kantor" label="Alamat Kantor" />
      </div>
    </div>
  );
};

export default DataPekerjaan;

import React from "react";
import FieldInput from "./FieldInput";
import TextAreaInput from "./TextAreaInput";

const DataPekerjaan = ({ data }) => {
  return (
    <div className="w-full flex flex-col transition-all duration-800">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-3">
        {/* <div className=" w-1/2 px-2 space-y-5"> */}
        <FieldInput label="Perusahaann" value={data?.perusahaan} />
        <FieldInput label="Jabatan" value={data?.jabatan} />
        <FieldInput label="Nomor Telepon" value={data?.telp_kantor} />
        {/* </div> */}

        {/* <div className=" w-1/2 px-2 space-y-5"> */}
        <FieldInput label="Fax" value={data?.fax} />
        <FieldInput label="Email Kantor" value={data?.email_kantor} />
        <FieldInput label="Kado Pos Kantor" value={data?.kado_pos_kantor} />
        {/* </div> */}
      </div>
      <div className="mt-1">
        <TextAreaInput label="Alamat Kantor" value={data?.alamat} />
      </div>
    </div>
  );
};

export default DataPekerjaan;

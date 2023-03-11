import React from "react";
import FieldInput from "./FieldInput";
import TextAreaInput from "./TextAreaInput";

const DataPribadi = ({ data }) => {
  const tanggal = new Date(data?.tgl_lahir);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="w-full flex flex-col transition-all duration-800">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-3">
        {/* <div className=" w-1/2 px-2 space-y-5"> */}
        <FieldInput label="Nama" value={data?.name} />
        <FieldInput label="No. KTP/NIK/Paspor" value={data?.kk_ktp_paspor} />
        <FieldInput label="Tempat Lahir" value={data?.tempat_lhr} />
        <FieldInput label="Jenis Kelamin" value={data?.jns_kelamin} />
        <FieldInput
          label="Tanggal Lahir"
          value={`${tanggal.getDate()}-${
            month[tanggal.getMonth()]
          }-${tanggal.getFullYear()}`}
        />
        {/* </div> */}

        {/* <div className=" w-1/2 px-2 space-y-5"> */}
        <FieldInput label="Kebangsaan" value={data?.kebangsaan} />
        <FieldInput label="Nomor Telepon" value={data?.no_telp} />
        <FieldInput label="Email" value={data?.email} />
        <FieldInput label="Kuali Pendidikan" value={data?.pendidikan} />
        <FieldInput label="Kode Pos" value={data?.kode_pos} />
        {/* </div> */}
      </div>
      <div className=" mt-1">
        <TextAreaInput label="Alamat" value={data?.alamat} />
      </div>
    </div>
  );
};

export default DataPribadi;

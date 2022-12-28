import React from "react";
import { Field } from "formik";
import FieldInput from "./FieldInput";
import DateInput from "./DateInput";
import SelectInput from "./SelectInput";
import TextAreaInput from "./TextAreaInput";
// import SelectInput from "";

const DataPribadi = () => {
  const jns_kelamin = [
    { id: 1, value: "laki_laki", name: "Laki-Laki" },
    { id: 2, value: "perempuan", name: "Perempuan" },
  ];
  const pendidikan = [
    { id: 1, value: "sd", name: "SD" },
    { id: 2, value: "smp", name: "SMP" },
    { id: 3, value: "sma", name: "SMA" },
    { id: 4, value: "d3", name: "D3" },
    { id: 5, value: "d4", name: "D4" },
    { id: 6, value: "s1", name: "S1" },
    { id: 7, value: "s2", name: "S2" },
    { id: 8, value: "s3", name: "S3" },
  ];

  return (
    <div className="w-full flex flex-col transition-all duration-800">
      <div className="flex px-4 space-x-2">
        <div className=" w-1/2 px-2 space-y-5">
          <FieldInput name="name" label="Nama" mandatory={true} type="text" />
          <FieldInput
            name="kk_ktp_paspor"
            label="No. KTP/NIK/Paspor"
            mandatory={true}
            type="text"
          />
          <FieldInput name="tempat_lhr" label="Tempat Lahir" type="text" />
          <SelectInput
            name="jns_kelamin"
            label="Jenis Kelamin"
            option={jns_kelamin}
            mandatory={true}
          />
          <DateInput name="tgl_lahir" label="Tanggal Lahir" mandatory={true} />
        </div>

        <div className=" w-1/2 px-2 space-y-5">
          <FieldInput
            name="kebangsaan"
            label="Kebangsaan"
            mandatory={true}
            type="text"
          />
          <FieldInput
            name="no_telp"
            label="Nomor Telepon"
            mandatory={true}
            type="number"
          />
          <FieldInput
            name="email"
            label="Email"
            type="email"
            mandatory={true}
          />
          <SelectInput
            name="pendidikan"
            label="Kualifikasi Pendidikan"
            option={pendidikan}
            mandatory={true}
          />
          <FieldInput
            name="kode_pos"
            label="Kode Pos"
            mandatory={true}
            type="number"
          />
        </div>
      </div>
      <div className="px-6 mt-4">
        <TextAreaInput name="alamat" label="Alamat" mandatory={true} />
      </div>
    </div>
  );
};

export default DataPribadi;

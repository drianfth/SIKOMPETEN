import React from "react";
import { Field } from "formik";
import FieldInput from "./FieldInput";
import DateInput from "./DateInput";
import SelectInput from "./SelectInput";
import TextAreaInput from "./TextAreaInput";
// import SelectInput from "";

const DataPribadi = ({ errors, touched }) => {
  // console.log(errors);
  const jns_kelamin = [
    { id: 1, value: "laki_laki", name: "Laki-Laki" },
    { id: 2, value: "perempuan", name: "Perempuan" },
  ];
  const pendidikan = [
    // { id: 1, value: "sd", name: "SD" },
    // { id: 2, value: "smp", name: "SMP" },
    // { id: 3, value: "sma", name: "SMA" },
    { id: 4, value: "d3it", name: "D3 Teknik Informatika" },
    { id: 5, value: "d4it", name: "D4 Teknik Informatika" },
    // { id: 6, value: "s1", name: "S1" },
    // { id: 7, value: "s2", name: "S2" },
    // { id: 8, value: "s3", name: "S3" },
  ];

  return (
    <div className="w-full flex flex-col transition-all duration-800">
      <div className="flex px-4 space-x-2">
        <div className=" w-1/2 px-2 space-y-5">
          <FieldInput
            error={errors.name}
            name="name"
            label="Nama"
            mandatory={true}
            type="text"
          />
          <FieldInput
            error={errors.kk_ktp_paspor}
            name="kk_ktp_paspor"
            label="No. KTP/NIK/Paspor"
            mandatory={true}
            type="text"
          />
          <FieldInput
            // error={errors}
            error={errors.tempat_lhr}
            name="tempat_lhr"
            label="Tempat Lahir"
            type="text"
          />
          <SelectInput
            error={errors.jns_kelamin}
            name="jns_kelamin"
            label="Jenis Kelamin"
            option={jns_kelamin}
            mandatory={true}
          />
          <DateInput
            name="tgl_lahir"
            label="Tanggal Lahir"
            mandatory={true}
            error={errors.tgl_lahir}
          />
        </div>

        <div className=" w-1/2 px-2 space-y-5">
          <FieldInput
            // error={errors}
            error={errors.kebangsaan}
            name="kebangsaan"
            label="Kebangsaan"
            mandatory={true}
            type="text"
          />
          <FieldInput
            // error={errors}
            error={errors.no_telp}
            name="no_telp"
            label="Nomor Telepon"
            mandatory={true}
            type="number"
          />
          <FieldInput
            // error={errors}
            error={errors.email}
            name="email"
            label="Email"
            type="email"
            mandatory={true}
          />
          <SelectInput
            error={errors.pendidikan}
            name="pendidikan"
            label="Kualifikasi Pendidikan"
            option={pendidikan}
            mandatory={true}
          />
          <FieldInput
            // error={errors}
            error={errors.kode_pos}
            name="kode_pos"
            label="Kode Pos"
            mandatory={true}
            type="number"
          />
        </div>
      </div>
      <div className="px-6 mt-4">
        <TextAreaInput
          name="alamat"
          label="Alamat"
          mandatory={true}
          error={errors.alamat}
        />
      </div>
    </div>
  );
};

export default DataPribadi;

import React, { useMemo } from "react";
import FieldInput from "../../DetailApl01/FieldInput";
import RadioGroup from "../../../../components/RadioGroup";
import DataTable from "../../../../components/DataTable";
import { Button } from "@mui/material";

const HeadSchema = ({ schema }) => {
  return (
    <div className="flex mx-auto w-fit ">
      <div className="p-4 border border-gray-400 rounded-l-md">
        <p>Skema Sertifikasi</p>
        <span
          className={`${
            schema?.schema_sertifikasi === "KKNI"
              ? ""
              : "line-through hidden sm:inline"
          }`}
        >
          KKNI /
        </span>
        <span
          className={`${
            schema?.schema_sertifikasi === "Okupasi"
              ? ""
              : "line-through hidden sm:inline"
          }`}
        >
          {" "}
          Okupasi /
        </span>
        <span
          className={`${
            schema?.schema_sertifikasi === "Klaster"
              ? ""
              : "line-through hidden sm:inline"
          }`}
        >
          {" "}
          Klaster
        </span>
      </div>
      <div className="border-r border-gray-400 rounded-r-md">
        <div className="p-2 border-t  border-b border-gray-400">
          {schema?.name}
        </div>
        <div className="p-2  border-b border-gray-400">{schema?.nomor}</div>
      </div>
    </div>
  );
};

const DataAwal = ({ unitKomepensis, user, tanggal, setValue, errors }) => {
  const options = [
    { id: 1, label: "Sewaktu", value: "Sewaktu" },
    { id: 2, label: "Tempat Kerja", value: "Tempat Kerja" },
    { id: 3, label: "Mandiri", value: "Mandiri" },
  ];
  //   console.log(unitKomepensis);
  const columns = useMemo(
    () => [
      {
        Header: "Kode Unit",
        accessor: "kode_unit",
      },
      {
        Header: "Judul Unit",
        accessor: "judul_unit",
      },
    ],
    []
  );
  const dataTable = useMemo(
    () => unitKomepensis.unit_kompetensis,
    [unitKomepensis.unit_kompetensis]
  );

  return (
    <div>
      <HeadSchema schema={unitKomepensis} />
      <div className="border border-gray-200 rounded-md p-4 shadow-sm grid grid-cols-1 mt-4">
        <FieldInput label="Nama Asesor" value={user.name} />
        <FieldInput label="Tanggal" value={tanggal} />
        <RadioGroup
          label="TUK"
          name="tuk"
          options={options}
          error={errors.tuk}
        />
      </div>
      <div className="mt-8">
        <DataTable columns={columns} data={dataTable} nomor />
      </div>
      <div className="flex justify-between mt-4">
        <Button
          variant="contained"
          type="button"
          className="bg-sky-700"
          onClick={() => setValue("2")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataAwal;

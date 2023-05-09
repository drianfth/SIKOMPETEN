import { Button, Card, CardContent } from "@mui/material";
import React, { useMemo } from "react";
import FieldInput from "../../DetailApl01/FieldInput";
import DataTable from "../../../../components/DataTable";

const DetailUnitPeninjau = ({ data, setValue }) => {
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
  const dataTable = useMemo(() => data.unitKompetensis, [data.unitKompetensis]);
  return (
    <div className="">
      <div className="border border-gray-200 rounded-md p-4 shadow-sm grid grid-cols-1 gap-y-4">
        <FieldInput
          label="Nama Peninjau"
          value={data?.result[0].nama_peninjau}
        />
        <FieldInput
          label="Komentar Siap Digunakan"
          value={data?.result[0].komentar || "-"}
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

export default DetailUnitPeninjau;

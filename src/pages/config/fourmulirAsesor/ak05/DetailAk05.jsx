import {
  Button,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import useAuthStore from "../../../../context/userAuthStore";
import { useQuery } from "react-query";
import { getAk05 } from "../../../../api/ak05";
import FieldInput from "../../DetailApl01/FieldInput";
import RadioDetail from "../../../../components/RadioDetail";
import DataTable from "../../../../components/DataTable";
import TextAreaDetail from "../../../../components/TextAreaDetail";

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

const DetailAk05 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const ak05 = useQuery("ak05", () => getAk05(location.state.sesi.id, user.id));
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
  // console.log(ak05.data?.unit_kompetensi);
  const dataTable = useMemo(
    () => ak05.data?.unit_kompetensi,
    [ak05.data?.unit_kompetensi]
  );

  return (
    <div className="">
      <div className="text-center font-bold pb-6 text-xl text-gray-800">
        FR.AK.05. LAPORAN ASESMEN
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>

      {user.id === location.state.sesi.asesor1_id ||
      user.id === location.state.sesi.asesor2_id ? (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          className="mb-4"
          disabled={ak05.data?.result?.id ? true : false}
          onClick={() =>
            navigate(`/formulir/frak05/`, {
              state: {
                sesi: location.state,
              },
            })
          }
        >
          Isi FR.AK.05
        </Button>
      ) : (
        ""
      )}
      <div className="">
        {ak05.data?.result?.id && (
          <HeadSchema schema={ak05.data?.result?.schema} />
        )}
        <div className="border border-gray-200 rounded-md p-4 shadow-sm grid grid-cols-1 mt-4">
          <FieldInput
            label="Nama Asesor"
            value={ak05.data?.result?.asesor?.name || ""}
          />
          <FieldInput
            label="Tanggal"
            value={ak05.data?.result?.paket_skema?.tanggal || ""}
          />
          <FieldInput label="Tuk" value={ak05.data?.result?.tuk || ""} />
        </div>
      </div>
      <div className="mt-8">
        <DataTable columns={columns || []} data={dataTable || []} nomor />
      </div>
      <div className="mt-8">
        <TableContainer component={Paper} className="shadow-md ">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell align="center" rowSpan={2}>
                  No
                </TableCell>
                <TableCell align="center" rowSpan={2}>
                  Nama Asesi
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Rekomendasi
                </TableCell>
                <TableCell align="center" rowSpan={2}>
                  Keterangan**
                </TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell align="center">K</TableCell>
                <TableCell align="center">BK</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ak05.data?.result?.jawaban_ak05s?.map((jawaban, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    {jawaban.hasil_apl01.name}
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="radio"
                      checked={jawaban.rekomendasi === "Kompeten"}
                      // value="Kompeten"
                      // name={"rekomendasi" + (index + 1)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="radio"
                      // value="Belum Kompeten"
                      checked={jawaban.rekomendasi === "Belum Kompeten"}
                      // name={"rekomendasi" + (index + 1)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <FieldInput value={jawaban.keterangan} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="border border-gray-200 gap-y-4 rounded-md p-4 shadow-sm grid grid-cols-1 mt-7">
        <TextAreaDetail
          label="Aspek Negatif dan Positif dalam Asesemen"
          value={ak05.data?.result?.aspek_asesmen || ""}
        />
        <TextAreaDetail
          label="Pencatatan Penolakan Hasil Asesmen"
          value={ak05.data?.result?.catatan_penolakan || ""}
        />
        <TextAreaDetail
          label="Saran Perbaikan : (Asesor/Personil Terkait)"
          value={ak05.data?.result?.saran_perbaikan || ""}
        />
      </div>
      <div className="border border-gray-200 rounded-md p-4 shadow-sm grid grid-cols-1 mt-4">
        <TextAreaDetail
          label="Catatan"
          value={ak05.data?.result?.catatan || ""}
        />
        <div className="mt-4">
          <FieldInput label="Name" value={user.name} />
        </div>
        <FieldInput label="No reg" value={user.no_reg} />
      </div>
    </div>
  );
};

export default DetailAk05;

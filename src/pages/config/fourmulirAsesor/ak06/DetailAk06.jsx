import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../../../context/userAuthStore";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "react-query";
import { getAk06 } from "../../../../api/ak06";
import FieldInput from "../../DetailApl01/FieldInput";
import { QRCodeSVG } from "qrcode.react";
// import inputInput from "../../DetailApl01/inputInput";

const HeadSchema = ({ skema, tuk, asesor, tanggal }) => {
  return (
    <div className="flex mx-auto w-fit ">
      <div className="">
        <div className="p-4 border border-gray-400 ">
          <p>Skema Sertifikasi</p>
          <span>{skema?.schema_sertifikasi}/</span>
        </div>
        <div className="p-2 border-l border-b border-r border-gray-400">
          TUK :
        </div>
        <div className="p-2 border-l border-b border-r border-gray-400">
          Nama Asesor :
        </div>

        <div className="p-2 border-l border-b border-r border-gray-400">
          Tanggal :{" "}
        </div>
      </div>
      <div className="border-r border-gray-400">
        <div className="p-2 border-t  border-b border-gray-400">
          {skema?.name}
        </div>
        <div className="p-2  border-b border-gray-400">{skema?.nomor}</div>
        <div className="p-2 border-b border-gray-400">{tuk}</div>
        <div className="p-2 border-b border-gray-400">{asesor?.name}</div>
        <div className="p-2 border-b border-gray-400">{tanggal}</div>
      </div>
    </div>
  );
};

const DetailAk06 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const ak06 = useQuery("ak06", () => getAk06(location.state.sesi.id, user.id));

  function cariKata(string, kata) {
    return string.includes(kata);
  }

  return (
    <div>
      <div className="text-center font-bold pb-6 text-xl text-gray-800">
        FR.AK.06. MENINJAU PROSES ASESMEN
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      {user.id === location.state.sesi.asesor1_id ||
      user.id === location.state.sesi.asesor2_id ? (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          className="mb-4"
          disabled={ak06.data?.result?.id ? true : false}
          onClick={() =>
            navigate(`/formulir/frak06/`, {
              state: {
                data: location.state.sesi,
              },
            })
          }
        >
          Isi FR.AK.06
        </Button>
      ) : (
        ""
      )}
      {ak06.data?.result.id && (
        <HeadSchema
          skema={ak06.data?.result?.schema}
          tuk={ak06.data?.result?.tuk}
          asesor={ak06.data?.result?.asesor}
          tanggal={ak06.data?.result?.paket_skema.tanggal}
        />
      )}
      <div className="mt-10">
        <TableContainer component={Paper} className="shadow-md ">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell align="center" rowSpan={2}>
                  No
                </TableCell>
                <TableCell align="center" rowSpan={2}>
                  Asepek yang ditinjau
                </TableCell>
                <TableCell align="center" colSpan={4}>
                  Kesesuaian dengan prinsip asesmen
                </TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell align="center">Validitas</TableCell>
                <TableCell align="center">Reliabel</TableCell>
                <TableCell align="center">Fleksibel</TableCell>
                <TableCell align="center">Adil</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ak06.data?.result?.jkesesuaian_prinsips?.map(
                (jawaban, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      {jawaban.prosedur_asesmen.name}
                    </TableCell>
                    <TableCell align="center">
                      <input
                        type="checkbox"
                        checked={cariKata(jawaban.jawaban, "Validitas")}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <input
                        type="checkbox"
                        checked={cariKata(jawaban.jawaban, "Reliabel")}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {(jawaban.prosedur_asesmen?.id === 1 ||
                        jawaban.prosedur_asesmen?.id === 2 ||
                        jawaban.prosedur_asesmen?.id === 3) && (
                        <input
                          type="checkbox"
                          checked={cariKata(jawaban.jawaban, "Fleksibel")}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <input
                        type="checkbox"
                        checked={cariKata(jawaban.jawaban, "Adil")}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                    </TableCell>
                  </TableRow>
                )
              )}
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="">
                    <FieldInput
                      label="Rekomendasi untuk peningkatan"
                      value={ak06.data?.result?.rprinsip_asesmen}
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
                  Asepek yang ditinjau
                </TableCell>
                <TableCell align="center" colSpan={6}>
                  Pemenuhan dimensi kompetensi
                </TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell align="center">Task Skills</TableCell>
                <TableCell align="center">Task Management Skills</TableCell>
                <TableCell align="center">
                  Contingency Management Skills
                </TableCell>
                <TableCell align="center">
                  Job Role/ Environment Skills
                </TableCell>
                <TableCell align="center">Transfer Skills</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ak06.data?.result?.jpemenuhan_dimensis?.map((jawaban, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    {jawaban.keputusan_asesmen.name}
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="checkbox"
                      checked={cariKata(jawaban.jawaban, "Task Skills")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="checkbox"
                      checked={cariKata(
                        jawaban.jawaban,
                        "Task Management Skills"
                      )}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="checkbox"
                      checked={cariKata(
                        jawaban.jawaban,
                        "Contingency Management Skills"
                      )}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="checkbox"
                      checked={cariKata(
                        jawaban.jawaban,
                        "Job Role/ Environment Skills"
                      )}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <input
                      type="checkbox"
                      checked={cariKata(jawaban.jawaban, "Transfer Skills")}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="">
                    <FieldInput
                      label="Rekomendasi untuk peningkatan"
                      value={ak06.data?.result?.rpemenuhan_dimensik}
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="mt-8 flex justify-center">
        <div className="w-11/12 grid grid-cols-3 border border-gray-500 justify-center">
          <div className="flex items-center flex-col py-2 border border-r border-r-gray-500">
            <h1 className="text-gray-800 font-semibold text-base">
              Nama Peninjau
            </h1>
            <div className="h-full flex items-center">
              <h2>{ak06.data?.result?.nama_peninjau}</h2>
            </div>
          </div>
          <div className=" flex items-center flex-col py-2">
            <h1 className="text-gray-800 font-semibold text-base mb-4">
              Tanda Tangan
            </h1>
            <QRCodeSVG
              value={ak06.data?.result?.created_at}
              size={128}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={false}
            />
          </div>
          <div className="flex items-center flex-col py-2 border border-l border-l-gray-500">
            <h1 className="text-gray-800 font-semibold text-base mb-4">
              Komentar
            </h1>
            <h2 className="h-full flex items-center">
              {ak06.data?.result?.komentar}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAk06;

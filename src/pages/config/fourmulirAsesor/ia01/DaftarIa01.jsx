import React from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getPeserta } from "../../../../api/sesi";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loading from "../../../../components/Loading";
import { IconButton, TableContainer, Tooltip } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getDaftarIa01 } from "../../../../api/ia01";

const DaftarIa01 = () => {
  const location = useLocation();
  const asesis = useQuery("asesis", () => getPeserta(location.state.sesi.id));
  const daftar = useQuery(
    "daftar-ia01",
    () => getDaftarIa01(location.state.sesi.id),
    {
      enabled: !!asesis,
    }
  );
  // console.log(daftar.data);
  const navigate = useNavigate();
  const openIA01 = (data) => {
    navigate("/formulir/fria01", {
      state: {
        asesi: data,
      },
    });
  };
  function checkHasilIA01(data, hasil_apl01_id) {
    console.log(data, hasil_apl01_id);
    for (var i = 0; i < data?.length; i++) {
      if (data[i]?.hasil_apl01_id === hasil_apl01_id) {
        return true;
      }
    }
    return false; // return false jika tidak ditemukan
  }

  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Daftar Asesi {location.state.sesi?.nama_sesi}
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      {asesis.isLoading ? (
        <Loading />
      ) : (
        <div className="">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="bg-gray-100 ">
                  <TableCell align="center">Nomor</TableCell>
                  <TableCell align="center">Nama Peserta</TableCell>
                  <TableCell align="center">Formulir IA01</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {asesis.data.map((asesi, id) => (
                  <TableRow key={id}>
                    <TableCell align="center">{id + 1}</TableCell>
                    <TableCell align="center">{asesi.name}</TableCell>
                    <TableCell align="center">
                      {/* {checkHasilIA01(daftar.data, asesi.id))} */}
                      {checkHasilIA01(daftar.data, asesi.id) ? (
                        <Tooltip title="Buat IA 01 Untuk peserta ini">
                          <IconButton
                            disabled
                            className="text-gray-600"
                            onClick={() => openIA01(asesi)}
                          >
                            <NoteAddIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Buat IA 01 Untuk peserta ini">
                          <IconButton
                            className="text-sky-700"
                            onClick={() => openIA01(asesi)}
                          >
                            <NoteAddIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {checkHasilIA01(daftar.data, asesi.id) ? (
                        <Tooltip title="Lihat IA 01 Untuk peserta ini">
                          <IconButton
                            className="text-green-700"
                            onClick={() =>
                              navigate(`/formulir/detailia01/${asesi.id}`)
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Lihat IA 01 Untuk peserta ini">
                          <IconButton
                            disabled
                            className="text-gray-600"
                            onClick={() =>
                              navigate(`/formulir/detailia01/${asesi.id}`)
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default DaftarIa01;

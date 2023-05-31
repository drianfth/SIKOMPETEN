import React from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getPeserta } from "../../../../api/sesi";
import { getDaftarIa11 } from "../../../../api/ia11";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Loading from "../../../../components/Loading";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";

const DaftarIa11 = () => {
  const location = useLocation();
  const asesis = useQuery("asesis", () => getPeserta(location.state.sesi.id));
  const daftar = useQuery(
    "daftar-ia01",
    () => getDaftarIa11(location.state.sesi.id),
    {
      enabled: !!asesis,
    }
  );
  const navigate = useNavigate();
  const openIA11 = (data) => {
    navigate("/formulir/fria11", {
      state: {
        asesi: data,
      },
    });
  };
  function checkHasilIA11(data, hasil_apl01_id) {
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
                <TableRow className="bg-gray-100">
                  <TableCell align="center">Nomor</TableCell>
                  <TableCell align="center">Nama Peserta</TableCell>
                  <TableCell align="center">Formulir IA11</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {asesis.data.map((asesi, id) => (
                  <TableRow key={id}>
                    <TableCell align="center">{id + 1}</TableCell>
                    <TableCell align="center">{asesi.name}</TableCell>
                    <TableCell align="center">
                      {checkHasilIA11(daftar.data, asesi.id) ? (
                        <Tooltip title="Buat IA 11 Untuk peserta ini">
                          <IconButton
                            disabled
                            className="text-gray-600"
                            onClick={() => openIA11(asesi)}
                          >
                            <NoteAddIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Buat IA 07 Untuk peserta ini">
                          <IconButton
                            className="text-sky-700"
                            onClick={() => openIA11(asesi)}
                          >
                            <NoteAddIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {checkHasilIA11(daftar.data, asesi.id) ? (
                        <Tooltip title="Lihat IA 11 Untuk peserta ini">
                          <IconButton
                            className="text-green-700"
                            onClick={() =>
                              navigate(`/formulir/detailia11/${asesi.id}`)
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Lihat IA 11 Untuk peserta ini">
                          <IconButton
                            disabled
                            className="text-gray-600"
                            onClick={() =>
                              navigate(`/formulir/detailia11/${asesi.id}`)
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

export default DaftarIa11;

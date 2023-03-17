import React from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../../../api/user";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Loading from "../../../../components/Loading";
const DaftarMapa01 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const asesor1 = useQuery("asesor1", () =>
    getUser(location.state.sesi.asesor1_id)
  );
  const asesor2 = useQuery("asesor2", () =>
    getUser(location.state.sesi.asesor2_id)
  );
  const openMapa01 = (id) => {
    navigate("/formulir/mapa01/", {
      state: {
        id: id,
        sesi: location.state.sesi,
      },
    });
  };

  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Formulir MAPA 01 {location.state.sesi?.nama_sesi}
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      <div className="">
        {asesor1.isLoading ? (
          <Loading />
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">Nama Asesor</TableCell>
                  <TableCell align="center">status </TableCell>
                  <TableCell align="center">Formulir MUK</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {asesor1.data[0] && (
                  <TableRow>
                    <TableCell align="center">1</TableCell>
                    <TableCell align="center">
                      {asesor1.data[0]?.name}
                    </TableCell>
                    <TableCell align="center">
                      <Chip label="Belum Mengisi" color="error" />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="buka MAPA 01">
                        <IconButton
                          onClick={() => openMapa01(asesor1.data[0]?.id)}
                        >
                          <VisibilityIcon className="text-sky-500" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )}
                {asesor2.isFetched && asesor2.data[0] && (
                  <TableRow>
                    <TableCell align="center">2</TableCell>
                    <TableCell align="center">
                      {asesor2.data[0]?.name}
                    </TableCell>
                    <TableCell align="center">
                      <Chip label="Belum Mengisi" color="error" />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="buka MAPA 01">
                        <IconButton
                          onClick={() => openMapa01(asesor2.data[0]?.id)}
                        >
                          <VisibilityIcon className="text-sky-500" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default DaftarMapa01;

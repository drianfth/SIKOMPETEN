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
import { Button, Chip, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Loading from "../../../../components/Loading";
import { checkAk01 } from "../../../../api/ak01";
import useAuthStore from "../../../../context/userAuthStore";

const DaftarAK01 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const asesor1 = useQuery("asesor1", () =>
    getUser(location.state.sesi.asesor1_id)
  );
  const asesor2 = useQuery("asesor2", () =>
    getUser(location.state.sesi.asesor2_id)
  );
  const check1 = useQuery("check1", () =>
    checkAk01(location.state.sesi.id, location.state.sesi.asesor1_id)
  );
  const check2 = useQuery("check2", () =>
    checkAk01(location.state.sesi.id, location.state.sesi.asesor2_id)
  );
  const openAK01 = (id) => {
    navigate("/formulir/aka01/", {
      state: {
        // id: id,
        sesi: location.state.sesi,
      },
    });
  };


  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        FR AK 01 {location.state.sesi?.nama_sesi}
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      <div className="">
        {asesor1.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            <Button
              variant="outlined"
              className="mb-4"
              onClick={openAK01}
              disabled={
                user.id === check1.data?.asesor_id ||
                user.id === check2.data?.asesor_id
                  ? true
                  : false
              }
            >
              Isi AK.01
            </Button>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">No</TableCell>
                    <TableCell align="center">Nama Asesor</TableCell>
                    <TableCell align="center">status </TableCell>
                    {/* <TableCell align="center">Formulir MUK</TableCell> */}
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
                        {check1.data?.id ? (
                          <Chip label="Sudah Mengisi" color="success" />
                        ) : (
                          <Chip label="Belum Mengisi" color="error" />
                        )}
                      </TableCell>
                      {/* <TableCell align="center">
                        <Tooltip title="buka MAPA 01">
                          <IconButton
                          // onClick={() => openMapa01(asesor1.data[0]?.id)}
                          >
                            <VisibilityIcon className="text-sky-500" />
                          </IconButton>
                        </Tooltip>
                      </TableCell> */}
                    </TableRow>
                  )}
                  {asesor2.isFetched && asesor2.data[0] && (
                    <TableRow>
                      <TableCell align="center">2</TableCell>
                      <TableCell align="center">
                        {asesor2.data[0]?.name}
                      </TableCell>
                      <TableCell align="center">
                        {check2.data?.id ? (
                          <Chip label="Sudah Mengisi" color="success" />
                        ) : (
                          <Chip label="Belum Mengisi" color="error" />
                        )}
                      </TableCell>
                      {/* <TableCell align="center">
                        <Tooltip title="buka MAPA 01">
                          <IconButton
                          // onClick={() => openMapa01(asesor2.data[0]?.id)}
                          >
                            <VisibilityIcon className="text-sky-500" />
                          </IconButton>
                        </Tooltip>
                      </TableCell> */}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default DaftarAK01;

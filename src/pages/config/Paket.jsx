import {
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  TableContainer,
  Tooltip,
} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "react-query";
import { getAllPaketAsesmen } from "../../api/paketasesmen";
import Loading from "../../components/Loading";

const Paket = () => {
  const pakets = useQuery("paketAsesmen", getAllPaketAsesmen);
  // console.log(pakets.data);
  let nomor = 1;
  return (
    <div>
      <Card className="shadow-lg overflow-hidden pb-24">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            Kelola Paket Asesmen
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          {pakets.isLoading ? (
            <Loading />
          ) : (
            <div className="">
              <Button
                variant="contained"
                className="mb-4 bg-sky-600"
                endIcon={<AddIcon />}
              >
                Tambah Paket
              </Button>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow className="bg-gray-100 ">
                      <TableCell align="center">Nomor</TableCell>
                      <TableCell align="center">Nama Paket</TableCell>
                      <TableCell align="center">Skema</TableCell>
                      <TableCell align="center">Jumlah Asesi</TableCell>
                      <TableCell align="center">Jadwal Asesmen</TableCell>
                      <TableCell align="center">Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pakets.data?.map((paket) => (
                      <TableRow
                        key={paket.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{nomor++}</TableCell>
                        <TableCell align="center">{paket.name}</TableCell>
                        <TableCell align="center">{paket.skema}</TableCell>
                        <TableCell align="center">{paket.jumlah}</TableCell>
                        <TableCell align="center">
                          {!paket.tanggal ? (
                            <Chip
                              label="Tanggal Belum Diatur"
                              color="warning"
                              variant="outlined"
                              className="font-bold"
                            />
                          ) : (
                            paket.tanggal
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Edit Paket">
                            <IconButton className="text-amber-400">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Paket">
                            <IconButton className="text-red-400">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Paket;

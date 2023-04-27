import {
  Card,
  CardContent,
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
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getListApl01 } from "../api/apl01";
import useAuthStore from "../context/userAuthStore";
import Loading from "../components/Loading";
import ArticleIcon from "@mui/icons-material/Article";

const Home = () => {
  const { user } = useAuthStore();
  const apl01 = useQuery("listApl01", () => getListApl01(user.id));
  const navigate = useNavigate();
  const detailDokumen = (id) => {
    navigate(`/hasil/formulir/${id}`);
  };
  return (
    <div className="">
      <Card>
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            Hasil Pengisian
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          {apl01.isLoading ? (
            <Loading />
          ) : (
            <div className="">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow className="bg-gray-100 ">
                      <TableCell align="center">Nomor</TableCell>
                      <TableCell align="center">Tanggal</TableCell>
                      <TableCell align="center">Sesi</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {apl01.data?.map((fr, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          {fr.sesi.paket_skema.tanggal}
                        </TableCell>
                        <TableCell align="center">
                          {fr.sesi.nama_sesi}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Detail Dokumen">
                            <IconButton
                              className="text-sky-700"
                              onClick={() => detailDokumen(fr.id)}
                            >
                              <ArticleIcon />
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

export default Home;

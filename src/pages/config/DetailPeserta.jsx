import { Card, CardContent, TableContainer } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getAllAsesiPaketAsesmen } from "../../api/paketasesmen";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loading from "../../components/Loading";

const DetailPeserta = () => {
  let { id } = useParams();
  const asesis = useQuery("asesis", () => getAllAsesiPaketAsesmen(id));
  let nomor = 1;
  return (
    <div>
      <Card className="shadow-lg overflow-hidden pb-10">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            Daftar Peserta
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          {asesis.isLoading ? (
            <Loading />
          ) : (
           
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className="bg-gray-100 ">
                    <TableCell align="center">Nomor</TableCell>
                    <TableCell align="center">Nama Peserta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {asesis.data?.map((asesi) => (
                    <TableRow>
                      <TableCell align="center">{nomor++}</TableCell>
                      <TableCell align="center">{asesi.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailPeserta;

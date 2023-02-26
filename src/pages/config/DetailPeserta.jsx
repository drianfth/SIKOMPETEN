import {
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
  TableContainer,
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getAllAsesiPaketAsesmen } from "../../api/paketasesmen";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loading from "../../components/Loading";
import DescriptionIcon from "@mui/icons-material/Description";

const DetailPeserta = () => {
  let { id } = useParams();
  const asesis = useQuery("asesis", () => getAllAsesiPaketAsesmen(id));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // const idPoopover = open ? "simple-popover" : undefined;
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
                    <TableCell align="center">Formulir MUK</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {asesis.data?.map((asesi) => (
                    <TableRow key={asesi.id}>
                      <TableCell align="center">{nomor++}</TableCell>
                      <TableCell align="center">{asesi.name}</TableCell>
                      <TableCell align="center">
                        <Button
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                          variant="outlined"
                          className="mx-auto"
                          startIcon={<DescriptionIcon />}
                        >
                          Dokumen
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={handleClose}>
                            <Link to={`/formulir/apl01/${asesi.id}`}>
                              Form APL-01
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>Form APL-02</MenuItem>
                          {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                        </Menu>
                      </TableCell>
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

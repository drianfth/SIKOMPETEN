import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  Button,
} from "@mui/material";
import React from "react";
import FieldInput from "../../../../components/apl01/FieldInput";
import { Field } from "formik";

const RekomendasiAsesi = ({ data, errors, setValue }) => {
  // console.log(data);
  return (
    <div>
      <Alert className="my-4" severity="info">
        tuliskan Kode dan Judul Unit Kompetensi yang dinyatakan BK bila mengases
        satu skema{" "}
      </Alert>
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
            {data?.map((user, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">
                  <Field
                    type="radio"
                    value="Kompeten"
                    name={"rekomendasi" + (index + 1)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                </TableCell>
                <TableCell align="center">
                  <Field
                    type="radio"
                    value="Belum Kompeten"
                    name={"rekomendasi" + (index + 1)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                </TableCell>
                <TableCell align="center">
                  <FieldInput
                    name={"keterangan" + (index + 1)}
                    error={errors["keterangan" + (index + 1)]}
                    label=""
                    type="text"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-between mt-4">
        <Button
          variant="contained"
          type="button"
          className="bg-gray-500"
          onClick={() => setValue("1")}
        >
          Back
        </Button>
        <Button
          variant="contained"
          type="button"
          className="bg-sky-700"
          onClick={() => setValue("3")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RekomendasiAsesi;

import {
  Alert,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Field } from "formik";
import React, { useEffect, useState } from "react";
import FieldInput from "../../../../components/apl01/FieldInput";
import TextAreaInput from "../../../../components/apl01/TextAreaInput";

const PemenuhanDimensi = ({
  data,
  // user,
  values,
  errors,
  setValue,
  // message2,
  // checkValidation,
}) => {
  const [message2, setMessage2] = useState("");

  const errorPemenuhan = (errors) => {
    const keys = Object.keys(errors);
    const filteredKeys = keys.filter((key) => key.includes("j_keputusan"));

    if (filteredKeys.length > 0) {
      const firstKey = filteredKeys[0];
      setMessage2(errors[firstKey]);
    } else {
      setMessage2("");
    }
  };

  useEffect(() => {
    errorPemenuhan(errors);
  }, [errors]);

  return (
    <div>
      {message2 && (
        <Alert severity="error" className="w-1/2 mx-auto my-2 text-center">
          {message2}
        </Alert>
      )}
      <div className="">
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
              {data?.map((keputusan, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{keputusan.name}</TableCell>
                  <TableCell align="center">
                    <Field
                      type="checkbox"
                      value="Task Skills"
                      name={"j_keputusan" + (index + 1)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Field
                      type="checkbox"
                      value="Task Management Skills"
                      name={"j_keputusan" + (index + 1)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Field
                      type="checkbox"
                      value="Contingency Management Skills"
                      name={"j_keputusan" + (index + 1)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Field
                      type="checkbox"
                      value="Job Role/ Environment Skills"
                      name={"j_keputusan" + (index + 1)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Field
                      type="checkbox"
                      value="Transfer Skills"
                      name={"j_keputusan" + (index + 1)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="">
                    <h3 className="mb-4 font-semibold text-gray-900">
                      Rekomendasi untuk peningkatan
                    </h3>
                    <div className="flex items-center mb-4">
                      <Field
                        type="radio"
                        value="Tidak Ada"
                        name="rpemenuhan_dimensik"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 ">
                        Tidak Ada
                      </label>
                    </div>
                    <div className="flex items-center mb-4">
                      <Field
                        type="radio"
                        value="Ada"
                        checked={
                          values.rpemenuhan_dimensik === "Ada" ||
                          values.rpemenuhan_dimensik !== "Tidak Ada"
                        }
                        name="rpemenuhan_dimensik"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 ">
                        Ada
                      </label>
                    </div>
                    {values.rpemenuhan_dimensik !== "Tidak Ada" ||
                    values.rpemenuhan_dimensik === "" ? (
                      <div>
                        <label
                          className={`block mb-2 text-sm font-medium ${
                            errors?.rpemenuhan_dimensik
                              ? "text-red-700"
                              : "text-gray-900"
                          } `}
                        >
                          Tuliskan:
                        </label>
                        <Field
                          type="text"
                          name="rpemenuhan_dimensik"
                          className={`${
                            errors?.rpemenuhan_dimensik
                              ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                              : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          }  border-2  text-sm rounded-lg   block w-full p-2.5 outline-none`}
                        />
                        {errors?.rpemenuhan_dimensik && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors?.rpemenuhan_dimensik}.
                          </p>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="border border-gray-200 rounded-md p-4 shadow-sm grid grid-cols-1 mt-4">
        <FieldInput
          label="Nama Peninjau"
          name="nama_peninjau"
          mandatory
          error={errors.nama_peninjau}
        />
        <TextAreaInput label="Komentar" name="komentar" />
      </div>

      <div className="flex justify-between mt-4">
        <Button
          variant="contained"
          type="button"
          className="bg-gray-500"
          onClick={() => setValue("1")}
        >
          Back
        </Button>
        <button
          className="btn btn-primary"
          type="submit"
          // onClick={() => checkValidation(errors)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PemenuhanDimensi;

import React, { useEffect, useState } from "react";
import FieldInput from "../../DetailApl01/FieldInput";
import RadioGroup from "../../../../components/RadioGroup";
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

const HeadSchema = ({ schema }) => {
  return (
    <div className="flex mx-auto w-fit ">
      <div className="p-4 border border-gray-400 rounded-l-md">
        <p>Skema Sertifikasi</p>
        <span
          className={`${
            schema?.schema_sertifikasi === "KKNI"
              ? ""
              : "line-through hidden sm:inline"
          }`}
        >
          KKNI /
        </span>
        <span
          className={`${
            schema?.schema_sertifikasi === "Okupasi"
              ? ""
              : "line-through hidden sm:inline"
          }`}
        >
          {" "}
          Okupasi /
        </span>
        <span
          className={`${
            schema?.schema_sertifikasi === "Klaster"
              ? ""
              : "line-through hidden sm:inline"
          }`}
        >
          {" "}
          Klaster
        </span>
      </div>
      <div className="border-r border-gray-400 rounded-r-md">
        <div className="p-2 border-t  border-b border-gray-400">
          {schema?.name}
        </div>
        <div className="p-2  border-b border-gray-400">{schema?.nomor}</div>
      </div>
    </div>
  );
};

const Intruksi = ({ intruksis, judul, intruksi = false }) => {
  return (
    <div className=" mt-10 border border-gray-300 rounded-md max-w-2xl mx-auto">
      <div className="p-2 bg-gray-200 text-center font-semibold">
        <h1>{judul}</h1>
      </div>
      <div className="p-4">
        {intruksi && <h2 className="font-semibold mb-4">Penjelasan :</h2>}
        <ul className="list-disc list-inside space-y-1">
          {intruksis.map((intruksi, index) => (
            <li key={index}>{intruksi}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PrinsipAsesmen = ({
  schema,
  user,
  tanggal,
  data,
  values,
  errors,
  setValue,
}) => {
  const [message1, setMessage1] = useState("");
  const options = [
    { id: 1, label: "Sewaktu", value: "Sewaktu" },
    { id: 2, label: "Tempat Kerja", value: "Tempat Kerja" },
    { id: 3, label: "Mandiri", value: "Mandiri" },
  ];
  const penjelasan = [
    "Peninjauan seharusnya dilakukan oleh asesor yang mensupervisi implementasi asesmen.",
    "Jika tinjauan dilakukan oleh asesor lain, tinjauan akan dilakukan setelah seluruh proses implementasi asesmen telah selesai.",
    "Peninjauan dapat dilakukan secara terpadu dalam skema sertifikasi dan / atau peserta kelompok yang homogen",
  ];

  const errorKesesuaian = (errors) => {
    const keys = Object.keys(errors);
    const filteredKeys = keys.filter((key) => key.includes("j_prosedur"));

    if (filteredKeys.length > 0) {
      const firstKey = filteredKeys[0];
      setMessage1(errors[firstKey]);
    } else {
      setMessage1("");
    }
  };

  useEffect(() => {
    errorKesesuaian(errors);
  }, [errors]);
  return (
    <div>
      <HeadSchema schema={schema} />
      <Intruksi intruksis={penjelasan} judul="Penjelasan" />
      <div className="border border-gray-200 rounded-md p-4 shadow-sm grid grid-cols-1 mt-4">
        <FieldInput label="Nama Asesor" value={user.name} />
        <FieldInput label="Tanggal" value={tanggal} />
        <RadioGroup
          label="TUK"
          name="tuk"
          options={options}
          error={errors?.tuk}
        />
      </div>
      {message1 && (
        <Alert severity="error" className="w-1/2 mx-auto my-2 mt-2 text-center">
          {message1}
        </Alert>
      )}
      <div className="mt-10">
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
                <TableCell align="center" colSpan={4}>
                  Kesesuaian dengan prinsip asesmen
                </TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell align="center">Validitas</TableCell>
                <TableCell align="center">Reliabel</TableCell>
                <TableCell align="center">Fleksibel</TableCell>
                <TableCell align="center">Adil</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((prosedur, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{prosedur.name}</TableCell>
                  <TableCell align="center">
                    <Field
                      type="checkbox"
                      value="Validitas"
                      name={"j_prosedur" + (index + 1)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Field
                      type="checkbox"
                      value="Reliabel"
                      name={"j_prosedur" + (index + 1)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {(prosedur.id === 1 ||
                      prosedur.id === 2 ||
                      prosedur.id === 3) && (
                      <Field
                        type="checkbox"
                        value="Fleksibel"
                        name={"j_prosedur" + (index + 1)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Field
                      type="checkbox"
                      value="Adil"
                      name={"j_prosedur" + (index + 1)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="">
                    <h3 className="mb-4 font-semibold text-gray-900">
                      Rekomendasi untuk peningkatan
                    </h3>
                    <div className="flex items-center mb-4">
                      <Field
                        type="radio"
                        value="Tidak Ada"
                        name="rprinsip_asesmen"
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
                          values.rprinsip_asesmen === "Ada" ||
                          values.rprinsip_asesmen !== "Tidak Ada"
                        }
                        name="rprinsip_asesmen"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 ">
                        Ada
                      </label>
                    </div>
                    {values.rprinsip_asesmen !== "Tidak Ada" ||
                    values.rprinsip_asesmen === "" ? (
                      <div>
                        <label
                          className={`block mb-2 text-sm font-medium ${
                            errors?.rprinsip_asesmen
                              ? "text-red-700"
                              : "text-gray-900"
                          } `}
                        >
                          Tuliskan:
                        </label>
                        <Field
                          type="text"
                          name="rprinsip_asesmen"
                          className={`${
                            errors?.rprinsip_asesmen
                              ? "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                              : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          }  border-2  text-sm rounded-lg   block w-full p-2.5 outline-none`}
                        />
                        {errors?.rprinsip_asesmen && (
                          <p className="mt-2 text-sm text-red-600 ">
                            {errors?.rprinsip_asesmen}.
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
      <div className="flex justify-between mt-4">
        <Button
          variant="contained"
          type="button"
          className="bg-sky-700"
          onClick={() => setValue("2")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PrinsipAsesmen;

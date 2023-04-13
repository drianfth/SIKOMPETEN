import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { createTUK, getAllTuk } from "../../../api/tuk";
import Loading from "../../../components/Loading";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton, TableContainer, Tooltip } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as yup from "yup";
import { Form, Formik } from "formik";
import FieldInput from "../../../components/apl01/FieldInput";

const ModalTambah = ({ setOpenAdd }) => {
  const tukMutation = useMutation(createTUK, {
    onSuccess: () => {
      setOpenAdd(false);
    },
  });

  const validationPaket = yup.object({
    nama_tuk: yup
      .string("Masukkan Nama TUK")
      .required("Nama TUK tidak boleh kosong"),
    pic_tuk: yup
      .string("Masukkan Nama PIC")
      .required("Nama PIC tidak boleh kosong"),
    // jam: yup.string("Masukkan Jam").required("Jam tidak boleh kosong"),
  });

  // console.log(tuk);
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-400/30">
      <div className="relative w-full h-full  max-w-2xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">Tambah TUK</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              onClick={() => setOpenAdd(false)}
              data-modal-hide="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <Formik
            initialValues={{
              nama_tuk: "",
              pic_tuk: "",
            }}
            validationSchema={validationPaket}
            onSubmit={(values) => {
              // console.log(date)
              tukMutation.mutate(values);

              setOpenAdd(false);
            }}
          >
            {({ values, errors }) => (
              <Form>
                <div className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                  <FieldInput
                    error={errors.nama_tuk}
                    name="nama_tuk"
                    label="Tempat Uji Kompetensi"
                    mandatory={true}
                    type="text"
                  />
                  <FieldInput
                    error={errors.pic_tuk}
                    name="pic_tuk"
                    label="Nama PIC"
                    mandatory={true}
                    type="text"
                  />
                </div>
                {/* <!-- Modal footer --> */}
                {/* {console.log(values)} */}
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                  <button
                    data-modal-hide="defaultModal"
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Tambah
                  </button>
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                    onClick={() => setOpenAdd(false)}
                  >
                    Batal
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const DaftarTuk = () => {
  const tuks = useQuery("tuk", getAllTuk, {
    refetchInterval: 200,
  });
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Daftar Tempat Uji Kompetensi
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      {tuks.isLoading ? (
        <Loading />
      ) : (
        <div className="">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            className="mb-4"
            onClick={() => setOpenAdd(true)}
          >
            Tambah Sesi
          </Button>
          {openAdd && <ModalTambah setOpenAdd={setOpenAdd} />}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="bg-gray-100 ">
                  <TableCell align="center">Nomor</TableCell>
                  <TableCell align="center">Nama TUK</TableCell>
                  <TableCell align="center">Nama PIC</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tuks.data.map((tuk, id) => (
                  <TableRow key={id}>
                    <TableCell align="center">{id + 1}</TableCell>
                    <TableCell align="center">{tuk.nama_tuk}</TableCell>
                    <TableCell align="center">{tuk.pic_tuk}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Buat IA 01 Untuk peserta ini">
                        <IconButton
                          className="text-sky-700"
                          //   onClick={() => openIA01(asesi)}
                        >
                          <NoteAddIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Lihat IA 01 Untuk peserta ini">
                        <IconButton
                          className="text-green-700"
                          //   onClick={() =>
                          //     navigate(`/formulir/detailia01/${asesi.id}`)
                          //   }
                        >
                          <VisibilityIcon />
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
    </div>
  );
};

export default DaftarTuk;

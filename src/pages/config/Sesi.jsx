import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery } from "react-query";
import { createSesi, getSesi, removeSesi } from "../../api/sesi";
import { Link, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../components/Loading";
import * as yup from "yup";
import { getAllAsesor } from "../../api/user";
import { Form, Formik } from "formik";
import SelectInput from "../../components/apl01/SelectInput";
import FieldInput from "../../components/apl01/FieldInput";
import TimeInput from "../../components/apl01/TimeInput";

const ModalConfirm = ({ setOpenConfirm, deletePaket }) => {
  const handleConfirm = () => {
    deletePaket();
    setOpenConfirm(false);
  };
  return (
    <div
      id="popup-modal"
      tabindex="-1"
      className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-500/40 flex items-center justify-center"
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
            data-modal-hide="popup-modal"
            onClick={() => setOpenConfirm(false)}
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
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 text-gray-400 w-14 h-14 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
              Apakah Anda Yakin akan Menghapus Paket Ini?
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              onClick={handleConfirm}
            >
              Ya, Saya Yakin
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              onClick={() => setOpenConfirm(false)}
            >
              Tidak, Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalUbah = ({ setOpenEdit, optionAsesor, paket_skema_id, data }) => {
  // const sesiMutation = useMutation(createSesi, {
  //   onSuccess: () => {
  //     setOpenEdit(false);
  //   },
  // });

  const validationPaket = yup.object({
    paket_skema_id: yup
      .string("Masukkan Skema")
      .required("Skema tidak boleh kosong"),
    nama_sesi: yup
      .string("Masukkan Nama Sesi")
      .required("Nama Sesi tidak boleh kosong"),
    jam: yup.string("Masukkan Jam").required("Jam tidak boleh kosong"),
  });
  const asesor = optionAsesor.map((s) => ({
    id: s.id,
    value: s.id,
    name: s.name,
  }));
  const formatAmPm = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };
  // console.log(tuk);
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-400/30">
      <div className="relative w-full h-full  max-w-2xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Tambah Paket
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              onClick={() => setOpenEdit(false)}
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
              paket_skema_id: paket_skema_id,
              asesor1_id: data.asesor1_id,
              asesor2_id: data.asesor2_id,
              nama_sesi: data.nama_sesi,
              jam: data.jam,
            }}
            validationSchema={validationPaket}
            onSubmit={(values) => {
              const date = new Date(values.jam);
              const jam = formatAmPm(date);
              const data = {
                paket_skema_id: values.paket_skema_id,
                nama_sesi: values.nama_sesi,
                jam: jam,
                asesor1_id: values.asesor1_id,
                asesor2_id: values.asesor2_id,
              };
              // sesiMutation.mutate(data);

              setOpenEdit(false);
            }}
          >
            {({ values, errors }) => (
              <Form>
                <div className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                  <FieldInput
                    error={errors.nama_sesi}
                    name="nama_sesi"
                    label="Nama Sesi"
                    mandatory={true}
                    type="text"
                  />
                  {console.log(errors)}
                  <SelectInput
                    name="asesor1_id"
                    label="Asesor 1"
                    option={asesor}
                    mandatory={false}
                  />
                  <SelectInput
                    name="asesor2_id"
                    label="Asesor 2"
                    option={asesor}
                    mandatory={false}
                  />
                  <TimeInput
                    name="jam"
                    label="Jam Pelaksanaan"
                    mandatory={true}
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
                    Ubah
                  </button>
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                    onClick={() => setOpenEdit(false)}
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
const formatAmPm = (tanggal) => {
  const date = new Date(tanggal);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
const ModalTambah = ({ setOpenAdd, optionAsesor, paket_skema_id }) => {
  const sesiMutation = useMutation(createSesi, {
    onSuccess: () => {
      setOpenAdd(false);
    },
  });

  const validationPaket = yup.object({
    paket_skema_id: yup
      .string("Masukkan Skema")
      .required("Skema tidak boleh kosong"),
    nama_sesi: yup
      .string("Masukkan Nama Sesi")
      .required("Nama Sesi tidak boleh kosong"),
    jam: yup.string("Masukkan Jam").required("Jam tidak boleh kosong"),
  });
  const asesor = optionAsesor.map((s) => ({
    id: s.id,
    value: s.id,
    name: s.name,
  }));

  // console.log(tuk);
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-400/30">
      <div className="relative w-full h-full  max-w-2xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Tambah Paket
            </h3>
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
              paket_skema_id: paket_skema_id,
              asesor1_id: "",
              asesor2_id: "",
              nama_sesi: "",
              jam: "",
            }}
            validationSchema={validationPaket}
            onSubmit={(values) => {
              // const date = new Date(values.jam);
              // const jam = formatAmPm(date);
              const data = {
                paket_skema_id: values.paket_skema_id,
                nama_sesi: values.nama_sesi,
                jam: values.jam,
                asesor1_id: values.asesor1_id,
                asesor2_id: values.asesor2_id,
              };
              // console.log(date)
              sesiMutation.mutate(data);

              setOpenAdd(false);
            }}
          >
            {({ values, errors }) => (
              <Form>
                <div className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                  <FieldInput
                    error={errors.nama_sesi}
                    name="nama_sesi"
                    label="Nama Sesi"
                    mandatory={true}
                    type="text"
                  />
                  {console.log(errors)}
                  <SelectInput
                    name="asesor1_id"
                    label="Asesor 1"
                    option={asesor}
                    mandatory={false}
                  />
                  <SelectInput
                    name="asesor2_id"
                    label="Asesor 2"
                    option={asesor}
                    mandatory={false}
                  />
                  <TimeInput
                    name="jam"
                    label="Jam Pelaksanaan"
                    mandatory={true}
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

const Sesi = () => {
  const { id } = useParams();
  const sesiDelete = useMutation(removeSesi);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const handleClick = (data) => {
    setEditData(data);
    setEdit(true);
  };
  const [openConfirm, setOpenConfirm] = useState(false);
  const { data: dataSesi, isLoading } = useQuery("sesi", () => getSesi(id), {
    refetchInterval: 2000,
  });
  const [openAdd, setOpenAdd] = useState(false);

  const asesor = useQuery("allAsesor", getAllAsesor);
  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Kelola Sesi Software Quality Taster pada Lab GIS {id}
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="sm:w-11/12 mx-auto">
          {asesor.isFetched && (
            <>
              {" "}
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                className="mb-4"
                onClick={() => setOpenAdd(true)}
              >
                Tambah Sesi
              </Button>
              {openAdd && (
                <ModalTambah
                  optionAsesor={asesor.data}
                  setOpenAdd={setOpenAdd}
                  paket_skema_id={id}
                />
              )}
              <TableContainer component={Paper} className="shadow-md ">
                <Table>
                  <TableHead>
                    <TableRow className="bg-gray-100">
                      <TableCell align="center">No</TableCell>
                      <TableCell align="center">Nama Sesi</TableCell>
                      <TableCell align="center">Jam</TableCell>
                      <TableCell align="center">Asesor 1</TableCell>
                      <TableCell align="center">Asesor 2</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataSesi?.map((sesi, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{sesi.nama_sesi}</TableCell>
                        <TableCell align="center">
                          {formatAmPm(sesi.jam)}
                        </TableCell>
                        <TableCell align="center">
                          {asesor.data?.map((asesor) => {
                            if (asesor.id === sesi.asesor1_id) {
                              return asesor.name;
                            }
                            return "";
                          })}
                        </TableCell>
                        <TableCell align="center">
                          {" "}
                          {asesor.data?.map((asesor) => {
                            if (asesor.id === sesi.asesor2_id) {
                              return asesor.name;
                            }
                            return "";
                          })}
                        </TableCell>
                        <TableCell align="center">
                          <Link to={`/configuration/detail-peserta/${sesi.id}`}>
                            <Tooltip title="Lihat Daftar Peserta">
                              <IconButton className="text-sky-500">
                                <ListAltIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>

                          <Tooltip title="Ubah Sesi">
                            <IconButton
                              className="text-yellow-500"
                              onClick={() => handleClick(sesi)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          {edit && (
                            <ModalUbah
                              data={editData}
                              optionAsesor={asesor.data}
                              setOpenEdit={setEdit}
                            />
                          )}

                          <Tooltip title="Hapus Sesi">
                            <IconButton
                              className="text-rose-500"
                              onClick={() => setOpenConfirm(true)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          {openConfirm && (
                            <ModalConfirm
                              setOpenConfirm={setOpenConfirm}
                              deletePaket={() => sesiDelete.mutate(sesi.id)}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Sesi;

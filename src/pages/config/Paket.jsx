import { Button, IconButton, TableContainer, Tooltip } from "@mui/material";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery } from "react-query";

import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import SelectInput from "../../components/apl01/SelectInput";
import { getAllSchema } from "../../api/schema";
import DateInput from "../../components/apl01/DateInput";

import {
  createPaketSkema,
  getAllPaketSkema,
  removePaketSkema,
  updatePaketSkema,
} from "../../api/paketskema";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import { getAllTuk } from "../../api/tuk";
import * as yup from "yup";

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

const ModalTambah = ({ setOpenAdd, optionSchema, optionTUK }) => {
  const paketMutation = useMutation(createPaketSkema, {
    onSuccess: () => {
      setOpenAdd(false);
    },
  });

  const validationPaket = yup.object({
    schema_id: yup
      .string("Masukkan Skema")
      .required("Skema tidak boleh kosong"),
    tuk_id: yup
      .string("Masukkan Tempat Uji Kompetensi")
      .required("Tempat Uji Kompetensi tidak boleh kosong"),
    tanggal: yup
      .string("Masukkan Tanggal")
      .required("Tanggal tidak boleh kosong"),
  });
  const skema = optionSchema.map((s) => ({
    id: s.id,
    value: s.id,
    name: s.name,
  }));
  const tuk = optionTUK.map((t) => ({
    id: t.id,
    value: t.id,
    name: t.nama_tuk,
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
              schema_id: "",
              tuk_id: "",
              tanggal: new Date(),
            }}
            validationSchema={validationPaket}
            onSubmit={(values) => {
              paketMutation.mutate(values);
              // console.log(values);
              setOpenAdd(false);
            }}
          >
            {({ values, errors }) => (
              <Form>
                <div className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                  <SelectInput
                    name="schema_id"
                    label="Jenis Skema"
                    option={skema}
                    mandatory={true}
                    error={errors.schema_id}
                  />
                  <SelectInput
                    name="tuk_id"
                    label="Tempat Uji Kompetensi"
                    option={tuk}
                    mandatory={true}
                    error={errors.tuk_id}
                  />
                  <DateInput name="tanggal" label="Tanggal Pelaksanaan" />
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
const ModalUbah = ({ setOpenEdit, data, optionSchema, optionTUK }) => {
  const paketMutation = useMutation(updatePaketSkema, {
    onSuccess: () => {
      setOpenEdit(false);
    },
  });
  const skema = optionSchema.map((s) => ({
    id: s.id,
    value: s.id,
    name: s.name,
  }));
  const tuk = optionTUK.map((t) => ({
    id: t.id,
    value: t.id,
    name: t.nama_tuk,
  }));
  // console.log(tuk);
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-400/30">
      <div className="relative w-full h-full  max-w-2xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">Ubah Data</h3>
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
              schema_id: data?.schema_id,
              tuk_id: data?.tuk_id,
              tanggal: new Date(data?.tanggal).toISOString(),
            }}
            onSubmit={(values) => {
              paketMutation.mutate({ data: values, id: data.id });
              // console.log(values);
              setOpenEdit(false);
            }}
          >
            {({ values }) => (
              <Form>
                <div className="grid grid-cols-1 text-start mx-auto p-6 space-y-3">
                  <SelectInput
                    name="schema_id"
                    label="Jenis Skema"
                    option={skema}
                    mandatory={true}
                  />
                  <SelectInput
                    name="tuk_id"
                    label="Tempat Uji Kompetensi"
                    option={tuk}
                  />
                  <DateInput name="tanggal" label="Tanggal Pelaksanaan" />
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

const Paket = () => {
  const { data, isLoading } = useQuery("paketSkema", getAllPaketSkema, {
    refetchInterval: 2000,
  });
  const navigate = useNavigate();
  const paketDelete = useMutation(removePaketSkema);
  const { data: dataSkema } = useQuery("Skema", getAllSchema);
  const { data: dataTuk } = useQuery("TUK", getAllTuk);
  const [edit, setEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [editData, setEditData] = useState(null);
  const handleClick = (data) => {
    setEditData(data);
    setEdit(true);
  };

  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Kelola Paket Skema
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      <div className="">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="sm:w-11/12 mx-auto">
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              className="mb-4"
              onClick={() => setOpenAdd(true)}
            >
              Tambah Paket
            </Button>
            {openAdd && (
              <ModalTambah
                optionSchema={dataSkema}
                optionTUK={dataTuk}
                setOpenAdd={setOpenAdd}
              />
            )}

            <TableContainer component={Paper} className="shadow-md ">
              <Table>
                <TableHead>
                  <TableRow className="bg-gray-100">
                    <TableCell align="center">No</TableCell>
                    <TableCell align="center">Skema</TableCell>
                    <TableCell align="center">TUK</TableCell>
                    <TableCell align="center">Tanggal</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((paket, index) => (
                    <TableRow key={paket.id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{paket.schema.name}</TableCell>
                      <TableCell align="center">{paket.tuk.nama_tuk}</TableCell>
                      <TableCell align="center">{paket.tanggal}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Lihat Sesi">
                          <Link to={`/configuration/sesi/${paket.id}`}>
                            <IconButton className="text-sky-500">
                              <ViewWeekIcon />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        <Tooltip title="Lihat Sesi">
                          <IconButton
                            className="text-yellow-500"
                            onClick={() => handleClick(paket)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        {edit && (
                          <ModalUbah
                            data={editData}
                            optionSchema={dataSkema}
                            optionTUK={dataTuk}
                            setOpenEdit={setEdit}
                          />
                        )}
                        <Tooltip title="Delete">
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
                            deletePaket={() => paketDelete.mutate(paket.id)}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              // startIcon={<AddIcon />}
              className="mt-4 bg-gray-500"
              onClick={() => navigate(-1)}
            >
              back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// const Paket = () => {
//   const pakets = useQuery("paketAsesmen", getAllPaketAsesmen, {
//     refetchInterval: 2000,
//   });
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [dataEdit, setDataEdit] = useState(null);
//   const schemas = useQuery("schema", getAllSchema);
//   const asesors = useQuery("asesors", getAllAsesor);
//   let optionSchema = useMemo(
//     () =>
//       schemas.data?.map((schema) => ({
//         id: schema.id,
//         value: schema.id,
//         name: schema.name,
//       })),
//     [schemas.data]
//   );
//   let optionTUK = useMemo(
//     () => [
//       { id: 1, value: 1, name: "Lab Gis" },
//       { id: 2, value: 2, name: "Lab Jaringan" },
//       { id: 3, value: 3, name: "Lab RPL" },
//     ],
//     []
//   );
//   let optionAsesor = useMemo(
//     () =>
//       asesors.data?.map((asesor) => ({
//         id: asesor.id,
//         value: asesor.id,
//         name: asesor.name,
//       })),
//     [asesors.data]
//   );

//   const paketDelete = useMutation(removePaketAsesmen, {
//     onSuccess: () => {
//       pakets.refetch();
//     },
//   });
//   const handleDataClick = (data) => {
//     setDataEdit(data);
//     setOpenEdit(true);
//   };
//   let nomor = 1;
//   return (
//     <div>
//       <Card className="shadow-lg overflow-hidden pb-24">
//         <CardContent>
//           <div className="text-center font-bold pb-8 text-xl text-gray-800">
//             Kelola Paket Asesmen
//             <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
//           </div>
//           {pakets.isLoading ? (
//             <Loading />
//           ) : (
//             <div className="">
//               <Link to="/dashboard/tambahpaket">
//                 <Button
//                   variant="contained"
//                   className="mb-4 bg-sky-600"
//                   endIcon={<AddIcon />}
//                 >
//                   Tambah Paket
//                 </Button>
//               </Link>
//               <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                   <TableHead>
//                     <TableRow className="bg-gray-100 ">
//                       <TableCell align="center">Nomor</TableCell>
//                       <TableCell align="center">Nama Paket</TableCell>
//                       <TableCell align="center">Skema</TableCell>
//                       <TableCell align="center">Jumlah Asesi</TableCell>
//                       <TableCell align="center">Jadwal Asesmen</TableCell>
//                       <TableCell align="center">Aksi</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {pakets.data?.map((paket) => (
//                       <TableRow
//                         key={paket.id}
//                         sx={{
//                           "&:last-child td, &:last-child th": { border: 0 },
//                         }}
//                       >
//                         <TableCell align="center">{nomor++}</TableCell>
//                         <TableCell align="center">{paket.name}</TableCell>
//                         <TableCell align="center">{paket.skema}</TableCell>
//                         <TableCell align="center">{paket.jumlah}</TableCell>
//                         <TableCell align="center">
//                           {!paket.tanggal ? (
//                             <Chip
//                               label="Tanggal Belum Diatur"
//                               color="warning"
//                               variant="outlined"
//                               className="font-bold"
//                             />
//                           ) : (
//                             paket.tanggal
//                           )}
//                         </TableCell>
//                         <TableCell align="center">
//                           <Tooltip title="Edit Paket">
//                             <IconButton
//                               className="text-amber-400"
//                               onClick={() => handleDataClick(paket)}
//                             >
//                               <EditIcon />
//                             </IconButton>
//                           </Tooltip>
//                           {openEdit && (
//                             <ModalUbah
//                               setOpenEdit={setOpenEdit}
//                               data={dataEdit}
//                               optionSchema={optionSchema}
//                               optionTUK={optionTUK}
//                               refetch={pakets.refetch}
//                               optionAsesor={optionAsesor}
//                             />
//                           )}
//                           <Tooltip title="Delete Paket">
//                             <IconButton
//                               className="text-red-400"
//                               onClick={() => setOpenConfirm(true)}
//                             >
//                               <DeleteIcon />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Lihat Daftar Peserta">
//                             <Link to={`/dashboard/detail-peserta/${paket.id}`}>
//                               <IconButton
//                                 className="text-sky-400"
//                                 onClick={() => setOpenConfirm(true)}
//                               >
//                                 <VisibilityIcon />
//                               </IconButton>
//                             </Link>
//                           </Tooltip>
//                           {openConfirm && (
//                             <ModalConfirm
//                               setOpenConfirm={setOpenConfirm}
//                               deletePaket={() => paketDelete.mutate(paket.id)}
//                             />
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

export default Paket;

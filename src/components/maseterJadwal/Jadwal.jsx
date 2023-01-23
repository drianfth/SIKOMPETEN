import React, { useState } from "react";
import { Card, CardContent } from "@mui/material";
import useFetchAuth from "../../hooks/useFetchAuth";
import Loading from "../Loading";
import DateInput from "../apl01/DateInput";
import { Formik, Form } from "formik";
import ToogleInput from "../apl01/ToogleInput";
import TextAreaInput from "../apl01/TextAreaInput";
import jadwalApi from "../../api/jadwal";

const ModalUbah = ({ setOpen, data, refetch }) => {
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full bg-gray-400/30">
      <div className="relative w-full h-full  max-w-2xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              {data.name}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              onClick={() => setOpen(false)}
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
              tanggal: new Date(data.tanggal),
              status: data.status === 1 ? true : false,
              deskripsi: data.deskripsi ? data.deskripsi : "",
            }}
            onSubmit={async (values) => {
              try {
                const res = await jadwalApi({
                  url: `http://127.0.0.1:8000/api/jadwal/${data.id}`,
                  data: values,
                });
                refetch();
              } catch (err) {
                console.log(err.response);
              }

            }}
          >
            {({ values }) => (
              <Form>
                <div className="p-6 space-y-6">

                  <DateInput
                    name="tanggal"
                    label="Tanggal Pelaksanaan"
                    mandatory={true}
                  />
                  <TextAreaInput
                    name="deskripsi"
                    label="Deskripsi"
                    mandatory={false}
                  />
                  <ToogleInput label="Buka Pelaksanaan" />

                  {/* <DateInput /> */}
                </div>
                {/* <!-- Modal footer --> */}
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
                    onClick={() => setOpen(false)}
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

const TableJadwal = ({ data, refetch }) => {
  let num = 1;
  const [open, setOpen] = useState(false);
  const [dataClick, setDataClick] = useState(null);
  const handelClick = (data) => {
    setDataClick(data);
    setOpen(true);
  };

  // console.log(data);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 border border-gray-100">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nomor
            </th>
            <th scope="col" className="px-6 py-3">
              Nama Jadwal
            </th>
            <th scope="col" className="px-6 py-3">
              Status Pelaksanaan
            </th>
            <th scope="col" className="px-6 py-3">
              Tanggal
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((jadwal) => (
            <tr className="bg-white border-b " key={jadwal.id}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {num++}
              </th>
              <td className="px-6 py-4">
                <strong> {jadwal.name}</strong>
              </td>
              <td className="px-6 py-4">
                {jadwal.status === 1 && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    Buka
                  </span>
                )}
                {jadwal.status === 0 && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    Tutup
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                {jadwal.tanggal ? jadwal.tanggal : "Belum Diatur"}
              </td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none "
                  onClick={() => handelClick(jadwal)}
                >
                  Ubah
                </button>
                {open && (
                  <ModalUbah
                    setOpen={setOpen}
                    data={dataClick}
                    refetch={refetch}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Jadwal = () => {
  const { data, loading, refetch } = useFetchAuth(
    "http://127.0.0.1:8000/api/jadwal"
  );
  return (
    <div>
      <Card className="shadow-lg overflow-hidden pb-24">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            Jadwal Pelaksanaan Uji Kompetensi
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          <div className="">
            {loading ? (
              <Loading />
            ) : (
              <TableJadwal data={data} refetch={refetch} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Jadwal;

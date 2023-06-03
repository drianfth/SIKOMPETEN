import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { updateApl01 } from "../../../api/apl01";
import CloseIcon from "@mui/icons-material/Close";
import SelectInput from "../../../components/apl01/SelectInput";

const DataPengesahan = ({ data, admins }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  // console.log(admins);
  const [adminOption, setAdminOption] = useState(null);

  const asesorOption = [
    {
      id: data.sesi?.asesor1?.id,
      value: data.sesi?.asesor1?.id,
      name: data.sesi?.asesor1?.name,
    },
    {
      id: data.sesi?.asesor2?.id,
      value: data.sesi?.asesor2?.id,
      name: data.sesi?.asesor2?.name,
    },
  ];

  useEffect(() => {
    const optionAd = admins?.map((admin) => ({
      id: admin?.id,
      value: admin?.id,
      name: admin?.name,
    }));
    setAdminOption(optionAd);
  }, [admins]);
  // console.log(adminOption);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const apl01Mutation = useMutation(updateApl01, {
    onSuccess: handleClick,
  });
  return (
    <div>
      <Formik
        initialValues={{
          status: data.status,
          asesor_id: data.asesor_id,
          admin_id: data.admin_id,
          konfirmasi: data.konfirmasi === 0 ? "belum konfirmasi" : "konfirmasi",
        }}
        onSubmit={async (values) => {
          data["konfirmasi"] = values.konfirmasi === "konfirmasi" ? 1 : 0;
          data["status"] = values.status;
          data["asesor_id"] = values.asesor_id;
          data["admin_id"] = values.admin_id;
          delete data.schema;
          delete data.r_kelengkapans;
          delete data.sesi;
          delete data.asesor;
          // console.log("mencoba", data);
          apl01Mutation.mutate({ data: data, id: data.id });
        }}
      >
        {({ values }) => (
          <Form>
            {/* {console.log(values)} */}
            <div className="border border-gray-300 p-8 rounded">
              <div className="flex flex-col md:px-5 space-x-4">
                <label htmlFor="" className="font-semibold text-gray-700">
                  Berdasarkan ketentuan persyaratan dasar, maka pemohon:{" "}
                </label>
                <div className="flex flex-col space-y-1 mt-1">
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      name="status"
                      value="diterima"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 ">
                      Diterima
                    </label>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 mt-1">
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      name="status"
                      value="menunggu"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 ">
                      Menunggu
                    </label>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 mt-1">
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      name="status"
                      value="tidak diterima"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 ">
                      Tidak Diterima
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:px-5 mt-5 space-x-4">
                <label
                  htmlFor=""
                  className="font-semibold text-gray-700 md:w-5/12"
                >
                  Konfirmasi Formulir ini:
                </label>
                <div className="flex flex-col space-y-1 mt-1">
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      name="konfirmasi"
                      value="konfirmasi"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 ">
                      Dikonfirmasi
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      name="konfirmasi"
                      value="belum konfirmasi"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 ">
                      Belum Dikonfirmasi
                    </label>
                  </div>
                </div>
              </div>
              <div className="ml-2 mt-4">
                <SelectInput
                  label="Asesor"
                  name="asesor_id"
                  key={1}
                  option={asesorOption}
                />
              </div>
              <div className="ml-2 mt-4">
                <SelectInput
                  label="Admin LSP"
                  name="admin_id"
                  key={2}
                  option={adminOption}
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="contained"
                  className="bg-sky-700"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Data Berhasil Dirubah
              </Alert>
            </Snackbar>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DataPengesahan;

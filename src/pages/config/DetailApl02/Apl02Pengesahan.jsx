import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { updateApl02 } from "../../../api/apl02";

const Apl02Pengesahan = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const apl01Mutation = useMutation(updateApl02, {
    onSuccess: handleClick,
  });
  return (
    <div>
      <Formik
        initialValues={{
          status: data.status,
          konfirmasi: data.konfirmasi === 0 ? "belum konfirmasi" : "konfirmasi",
        }}
        onSubmit={async (values) => {
          data["konfirmasi"] = values.konfirmasi === "konfirmasi" ? 1 : 0;
          data["status"] = values.status;
          delete data.jawaban_apl02s;
          delete data.schema;
          apl01Mutation.mutate({ data: data, id: data.id });
        }}
      >
        {({ values }) => (
          <Form>
            <div className="border border-gray-300 p-8 rounded">
              <div className="flex flex-col md:px-5 space-x-4">
                <label htmlFor="" className="font-semibold text-gray-700">
                  Rekomendasi pemohon:{" "}
                </label>
                <div className="flex flex-col space-y-1 mt-1">
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      name="status"
                      value="dilanjutkan"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 ">
                      dapat dilanjutkan
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
                      value="tidak dapat dilanjutkan"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 ">
                      tidak dapat dilanjutkan
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:px-5 mt-10 space-x-4">
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

export default Apl02Pengesahan;

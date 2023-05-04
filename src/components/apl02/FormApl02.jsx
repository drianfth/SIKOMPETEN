import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getElemen } from "../../api/elemen";
import useSchemaStore from "../../context/ujiKompetensi/useSchemaStore";
import Loading from "../Loading";
import Question from "./Question";
import { Formik, Form } from "formik";
import useAuthStore from "../../context/userAuthStore";
import { getOneApl01 } from "../../api/apl01";
import { addApl02 } from "../../api/apl02";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Alert } from "@mui/material";
import useApl02Store from "../../context/ujiKompetensi/useApl02Store";

const BoxNumber = ({ number, elemenIndex, setElemenIndex, values }) => {
  // const isAnswere = values.hasOwnProperty("soal" + number);
  const name = "soal" + number;
  const isAnswere = values[name] !== "";
  let color = "";
  if (isAnswere) {
    color = "bg-green-400";
  } else if (elemenIndex + 1 === number) {
    color = "bg-gray-100";
  } else {
    color = "bg-gray-300";
  }
  return (
    <div
      className={` ${color}  cursor-pointer p-3 h-12 text-center rounded-md hover:bg-gray-100 font-medium`}
      onClick={() => setElemenIndex(number - 1)}
    >
      {number}
    </div>
  );
};

const LabelSchema = ({ schema }) => {
  return (
    <div className="flex">
      <div className="p-4 border border-gray-200 rounded-l-md text-center">
        <p>Skema Sertifikasi</p>
        <p>({schema?.schema_sertifikasi})</p>
      </div>
      <div className="border border-gray-200 rounded-r-md">
        <div className="p-2 border-b border-gray-200">
          <p>
            <span>Judul : </span>
            {schema?.name}
          </p>
        </div>
        <div className="p-2">
          <p>
            <span>Nomor : </span> {schema?.nomor}
          </p>
        </div>
      </div>
    </div>
  );
};

const FormApl02 = () => {
  const { user } = useAuthStore();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const hasilApl01 = useQuery("hasilApl01", () => getOneApl01(user.id));
  const apl02Mutation = useMutation(addApl02, {
    onSuccess: (data) => {
      // console.log(data);
      navigate("/dashboard/uji-kompetensi", {
        state: "Selamat Anda Telah Berhasil Mengisi Form Apl 02",
      });
    },
  });
  // const location = useLocation();
  // const schema = location.state.schema;
  const schema = useSchemaStore((state) => state.schema[0]);
  const historyApl01 = useApl02Store((state) => state.historyApl01);
  // console.log("skema", schema);
  const elemens = useQuery("elemens", () => getElemen(schema.id));
  // const { schema } = useSchemaStore();
  // console.log(location);
  const [elemenIndex, setElemenIndex] = useState(0);
  const elemenQues = useMemo(
    () => (elemens.isSuccess ? elemens.data[0].elemens : null),
    [elemens]
  );
  let bukti = {};
  let soal = {};
  let validasi = {};
  elemenQues?.map((currElement, index) => (bukti["bukti" + (index + 1)] = ""));
  elemenQues?.map(
    (currElement, index) => (soal["soal" + (index + 1)] = "kompeten")
  );
  elemenQues?.map(
    (currElement, index) =>
      (validasi["soal" + (index + 1)] = yup
        .string("Masukkan Jawaban")
        .required("Terdapat Soal Yang belum terjawab"))
  );
  const validationSchema = yup.object(validasi);

  // const apl01 = hasilApl01.data?.filter((data) => data.konfirmasi === 0)[0];

  const isValidasi = (errors) => {
    const status =
      Object.keys(errors).length === 0 && errors.constructor === Object;
    const message = status ? "" : "Harap Isi Semua Pertanyaan";
    setMessage(message);
  };
  const id = "apl2" + crypto.randomUUID().substring(0, 8);
  // console.log(historyApl01);
  const data_diri = {
    id,
    schema_id: schema?.id,
    sesi_id: historyApl01.sesi_id,
    user_id: historyApl01.user_id,
    hasil_apl01_id: historyApl01.hasil_apl01_id,
  };
  let data_soal = {};
  elemenQues?.map(
    (currElement, index) => (data_soal["elemen" + (index + 1)] = currElement.id)
  );

  return (
    <div>
      {elemens.isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-center">
            <LabelSchema schema={schema} />
          </div>
          {hasilApl01.isSuccess && (
            <Formik
              initialValues={{
                ...soal,
                ...bukti,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                let data_jawaban = {};
                let data_bukti = {};
                elemenQues?.map(
                  (currElement, index) =>
                    (data_jawaban["jawaban" + (index + 1)] =
                      values["soal" + (index + 1)])
                );
                elemenQues?.map(
                  (currElement, index) =>
                    (data_bukti["bukti" + (index + 1)] =
                      values["bukti" + (index + 1)])
                );
                const data = {
                  data_diri,
                  data_soal,
                  data_jawaban,
                  data_bukti,
                };
                apl02Mutation.mutate(data);

                // console.log(data);
              }}
            >
              {({ values, errors }) => (
                <Form>
                  {/* {console.log(values)} */}
                  {message && (
                    <Alert
                      // variant="filled"
                      severity="error"
                      className="w-1/2 mx-auto mt-4 text-center"
                    >
                      {message}
                    </Alert>
                  )}
                  <div className="flex w-full gap-x-5 mt-5">
                    <div className="basis-9/12">
                      <Question
                        elemen={elemenQues[elemenIndex]}
                        nameText={"bukti" + (elemenIndex + 1)}
                        nameRadio={"soal" + (elemenIndex + 1)}
                        nomor={elemenIndex}
                      />
                    </div>
                    {/* {console.log(errors)} */}
                    <div className="hidden md:flex md:flex-col basis-3/12  h-fit shadow-md rounded-md p-2">
                      <h1 className="my-3 text-center font-semibold text-gray-800">
                        Nomor Elemen
                      </h1>
                      <div className="md:grid grid-cols-5 gap-2 ">
                        {elemens.data[0].elemens.map((e, index) => (
                          <BoxNumber
                            number={index + 1}
                            key={e.id}
                            values={values}
                            setElemenIndex={setElemenIndex}
                            elemenIndex={elemenIndex}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-10">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() =>
                        elemenIndex > 0 && setElemenIndex(elemenIndex - 1)
                      }
                    >
                      Back
                    </button>
                    {elemenIndex + 1 < elemenQues.length && (
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() =>
                          elemenIndex < elemenQues.length &&
                          setElemenIndex(elemenIndex + 1)
                        }
                      >
                        Next
                      </button>
                    )}
                    {elemenIndex + 1 >= elemenQues.length && (
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={() => isValidasi(errors)}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      )}
    </div>
  );
};

export default FormApl02;

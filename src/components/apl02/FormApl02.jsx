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
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Alert } from "@mui/material";

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
        <p>({schema[0]?.schema_sertifikasi})</p>
      </div>
      <div className="border border-gray-200 rounded-r-md">
        <div className="p-2 border-b border-gray-200">
          <p>
            <span>Judul : </span>
            {schema[0]?.name}
          </p>
        </div>
        <div className="p-2">
          <p>
            <span>Nomor : </span> {schema[0]?.nomor}
          </p>
        </div>
      </div>
    </div>
  );
};

const FormApl02 = () => {
  const elemens = useQuery("elemens", () => getElemen(schema[0].id));
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

  const { schema } = useSchemaStore();
  const [elemenIndex, setElemenIndex] = useState(0);
  const elemenQues = useMemo(
    () => (elemens.isSuccess ? elemens.data[0].elemens : null),
    [elemens]
  );
  let bukti = {};
  let soal = {};
  let validasi = {};
  elemenQues?.map((currElement, index) => (bukti["bukti" + (index + 1)] = ""));
  elemenQues?.map((currElement, index) => (soal["soal" + (index + 1)] = ""));
  elemenQues?.map(
    (currElement, index) =>
      (validasi["soal" + (index + 1)] = yup
        .string("Masukkan Jawaban")
        .required("Terdapat Soal Yang belum terjawab"))
  );
  const validationSchema = yup.object(validasi);

  // console.log(validasi);
  const apl01 = hasilApl01.data?.filter((data) => data.konfirmasi === 0)[0];

  const isValidasi = (errors) => {
    const status =
      Object.keys(errors).length === 0 && errors.constructor === Object;
    const message = status ? "" : "Harap Isi Semua Pertanyaan";
    setMessage(message);
  };
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
                schema_id: schema[0]?.id,
                paket_asesmen_id: apl01?.paket_asesmen_id,
                user_id: apl01?.user_id,
                name: apl01?.name,
                ...soal,
                ...bukti,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                apl02Mutation.mutate(values);
              }}
            >
              {({ values, errors }) => (
                <Form>
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
                    {console.log(errors)}
                    <div className=" basis-3/12  h-fit shadow-md rounded-md p-2">
                      <h1 className="my-3 text-center font-semibold text-gray-800">
                        Nomor Elemen
                      </h1>
                      <div className="grid grid-cols-5 gap-2">
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

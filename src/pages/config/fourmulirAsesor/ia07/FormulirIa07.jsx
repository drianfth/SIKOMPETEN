import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getPertanyaanIa07 } from "../../../../api/pertanyaania07";
import { Alert, Card, CardContent } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import Loading from "../../../../components/Loading";
import { addIa07 } from "../../../../api/ia07";
import LoadingBackground from "../../../../components/Backdrop";

const HeadUnitKomptensi = ({ data }) => {
  return (
    <div className="flex justify-center">
      <div className="p-4 border border-gray-200 rounded-l-md text-center">
        <p className="font-semibold">Unit Komptensi</p>
      </div>
      <div className="border border-gray-200 rounded-r-md">
        <div className="p-2 border-b border-gray-200">
          <p>
            <span className="font-semibold">Kode Unit : </span>
            {data.kode_unit}
          </p>
        </div>
        <div className="p-2">
          <p>
            <span className="font-semibold">Judul Unit : </span>{" "}
            {data.judul_unit}
          </p>
        </div>
      </div>
    </div>
  );
};

const Question = ({ pertanyaan, nomor, nameRadio, nameJawaban }) => {
  // console.log(subElemen.elemen);
  return (
    <div className="">
      <HeadUnitKomptensi data={pertanyaan.unit_kompetensi} />
      <div className="w-full md:p-4">
        <ol>
          <li>
            <p className="mb-3">
              <strong> {nomor + 1}) Pertanyaan : </strong> {pertanyaan.name}
            </p>
            <div className=" ml-2 mt-5 ">
              <div className="mb-8">
                <label htmlFor="" className="font-bold">
                  Rekomendasi
                </label>
                <div className="flex gap-x-10">
                  <div className="flex items-center ">
                    <Field
                      type="radio"
                      value="K"
                      name={nameRadio}
                      id={nameRadio + "1"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      htmlFor={nameRadio + "1"}
                      className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Kompeten
                    </label>
                  </div>

                  <div className="flex items-center ">
                    <Field
                      type="radio"
                      value="BK"
                      name={nameRadio}
                      id={nameRadio + "2"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      htmlFor={nameRadio + "2"}
                      className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Belum Kompeten
                    </label>
                  </div>
                </div>
              </div>
              <div className="">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm  text-gray-900 font-bold"
                >
                  {" "}
                  Jawaban
                </label>
                <Field
                  as="textarea"
                  rows="4"
                  name={nameJawaban}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Jawaban Asesi"
                ></Field>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

const BoxNumber = ({ number, pertanyaanIndex, setPertanyaanIndex, values }) => {
  const name = "rekomendasi" + number;
  const isAnswere = values[name] !== "";
  let color = "";
  if (isAnswere) {
    color = "bg-green-400";
  } else {
    color = "bg-gray-300";
  }

  if (pertanyaanIndex + 1 === number) {
    color = "bg-gray-100";
  }

  return (
    <div
      className={` ${color}  cursor-pointer p-3 h-12 text-center rounded-md hover:bg-gray-100 font-medium`}
      onClick={() => setPertanyaanIndex(number - 1)}
    >
      {number}
    </div>
  );
};

const FormulirIa07 = () => {
  const location = useLocation();
  const [pertanyaanIndex, setPertanyaanIndex] = useState(0);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = React.useState(false);

  const ak01 = location.state.ak01;
  const skema = location.state.skema;
  const apl01 = location.state.apl01;
  const createIa07Mutation = useMutation(addIa07, {
    onMutate: () => {
      setOpen(true);
    },
    onSuccess: () => {
      setOpen(false);
      navigate(-2);
    },
  });
  const navigate = useNavigate();

  const pertanyaanIa07 = useQuery("pertanyaan-ia07", () =>
    getPertanyaanIa07(skema.id)
  );

  let rekomendasi = {};
  let jawaban = {};
  pertanyaanIa07.data?.map(
    (currPer, index) => (rekomendasi["rekomendasi" + (index + 1)] = "K")
  );
  pertanyaanIa07.data?.map(
    (currPer, index) => (jawaban["jawaban" + (index + 1)] = "")
  );
  let validasi = {};
  pertanyaanIa07.data?.map(
    (currSub, index) =>
      (validasi["jawaban" + (index + 1)] = yup
        .string("Masukkan Jawaban")
        .required("Terdapat Soal Yang belum terjawab"))
  );
  const validationSchema = yup.object(validasi);
  const isValidasi = (errors) => {
    const status =
      Object.keys(errors).length === 0 && errors.constructor === Object;
    const message = status ? "" : "Harap Isi Semua Pertanyaan";
    setMessage(message);
  };
  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <LoadingBackground open={open} />
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.IA.07. PERTANYAAN LISAN
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {pertanyaanIa07.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            <Formik
              initialValues={{
                user_id: apl01.user_id,
                sesi_id: apl01.sesi_id,
                hasil_apl01_id: apl01.id,
                hasil_ak01_id: ak01.id,
                ...rekomendasi,
                ...jawaban,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                let data_pertanyaan = {};
                let data_jawaban = {};
                let data_rekomendasi = {};

                //identifikasi semua pertanyaan
                pertanyaanIa07.data?.map(
                  (pertanyaan, index) =>
                    (data_pertanyaan["pertanyaania07" + (index + 1)] =
                      pertanyaan.id)
                );

                // mapping data jawaban dari hasil yang sudah didapat
                pertanyaanIa07.data?.map(
                  (pertanyaan, index) =>
                    (data_jawaban["jawaban" + (index + 1)] =
                      values["jawaban" + (index + 1)])
                );

                pertanyaanIa07.data?.map(
                  (pertanyaan, index) =>
                    (data_rekomendasi["rekomendasi" + (index + 1)] =
                      values["rekomendasi" + (index + 1)])
                );

                const data = {
                  data_inti: {
                    user_id: values.user_id,
                    sesi_id: values.sesi_id,
                    hasil_apl01_id: values.hasil_apl01_id,
                    hasil_ak01_id: values.hasil_ak01_id,
                  },
                  data_pertanyaan_lisan: {
                    data_pertanyaan,
                    data_jawaban,
                    data_rekomendasi,
                  },
                };
                createIa07Mutation.mutate(data);
                // console.log(data);
              }}
            >
              {({ values, errors }) => (
                <Form>
                  <div className="">
                    {message && (
                      <Alert
                        severity="error"
                        className="w-1/2 mx-auto mt-4 text-center"
                      >
                        {message}
                      </Alert>
                    )}
                    <div className="flex w-full gap-x-5 mt-5">
                      <div className="basis-9/12">
                        <Question
                          pertanyaan={pertanyaanIa07.data[pertanyaanIndex]}
                          nameJawaban={"jawaban" + (pertanyaanIndex + 1)}
                          nameRadio={"rekomendasi" + (pertanyaanIndex + 1)}
                          nomor={pertanyaanIndex}
                        />
                        <div className="flex justify-end space-x-3 mt-10">
                          <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() =>
                              pertanyaanIndex > 0 &&
                              setPertanyaanIndex(pertanyaanIndex - 1)
                            }
                          >
                            Back
                          </button>
                          {pertanyaanIndex + 1 < pertanyaanIa07.data.length && (
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={() =>
                                pertanyaanIndex < pertanyaanIa07.data.length &&
                                setPertanyaanIndex(pertanyaanIndex + 1)
                              }
                            >
                              Next
                            </button>
                          )}
                          {pertanyaanIndex + 1 >=
                            pertanyaanIa07.data.length && (
                            <button
                              className="btn btn-primary"
                              type="submit"
                              onClick={() => isValidasi(errors)}
                            >
                              Submit
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="hidden md:flex md:flex-col basis-3/12  h-fit shadow-md rounded-md p-2">
                        <h1 className="my-3 text-center font-semibold text-gray-800">
                          Kriteria Unjuk Kerja
                        </h1>
                        <div className="md:grid grid-cols-5 gap-2">
                          {pertanyaanIa07.data?.map((subElemen, index) => (
                            <BoxNumber
                              number={index + 1}
                              key={index}
                              values={values}
                              setPertanyaanIndex={setPertanyaanIndex}
                              pertanyaanIndex={pertanyaanIndex}
                              // subElemenIndex={subElemen}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormulirIa07;

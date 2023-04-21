import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getPertanyaanIa03 } from "../../../../api/pertanyaania03";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Card, CardContent } from "@mui/material";
import Loading from "../../../../components/Loading";
import { Field, Form, Formik } from "formik";
import { addIa03 } from "../../../../api/ia03";
import * as yup from "yup";
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
            {data?.kode_unit}
          </p>
        </div>
        <div className="p-2">
          <p>
            <span className="font-semibold">Judul Unit : </span>
            {data?.judul_unit}
          </p>
        </div>
      </div>
    </div>
  );
};

const Question = ({ pertanyaan, nomor }) => {
  // console.log(subElemen.elemen);
  return (
    <div className="">
      {/* <HeadUnitKomptensi data={pertanyaan.unit_kompetensi} /> */}
      <div className="w-full md:p-4">
        <ol>
          <li>
            <p className="mb-3">
              <strong> {nomor + 1})</strong> {pertanyaan.name}
            </p>
            <div className=" ml-2 mt-5 ">
              <div className="">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm  text-gray-900 font-bold"
                >
                  {" "}
                  Tanggapan
                </label>
                <Field
                  as="textarea"
                  rows="4"
                  name={pertanyaan.no_tanggapan}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Jawaban Asesi"
                ></Field>
              </div>
            </div>
            <div className="mb-8 mt-4 ml-2">
              <label htmlFor="" className="font-bold">
                Rekomendasi
              </label>
              <div className="flex gap-x-10">
                <div className="flex items-center ">
                  <Field
                    type="radio"
                    value="K"
                    name={pertanyaan.no_rekomendasi}
                    id={pertanyaan.no_rekomendasi + "1"}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <label
                    htmlFor={pertanyaan.no_rekomendasi + "1"}
                    className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    Kompeten
                  </label>
                </div>

                <div className="flex items-center ">
                  <Field
                    type="radio"
                    value="BK"
                    name={pertanyaan.no_rekomendasi}
                    id={pertanyaan.no_rekomendasi + "2"}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <label
                    htmlFor={pertanyaan.no_rekomendasi + "2"}
                    className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    Belum Kompeten
                  </label>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

const SectionUnit = ({ pertanyaan, unit_kompetensi, nameUmpanBalik }) => {
  const pertanyaan_unit = pertanyaan.filter(
    (pertanyaan) => pertanyaan.unit_kompetensi.id === unit_kompetensi?.id
  );

  return (
    <div className="">
      <HeadUnitKomptensi data={unit_kompetensi} />
      {pertanyaan_unit.map((pertanyaan, index) => (
        <Question key={index} nomor={index} pertanyaan={pertanyaan} />
      ))}
      <div className="">
        <div className="">
          <label
            htmlFor=""
            className="block mb-2 text-sm  text-gray-900 font-bold"
          >
            Umpan Balik
          </label>
          <Field
            as="textarea"
            rows="4"
            name={nameUmpanBalik}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Masukkan Umpan Balik untuk Asesi"
          ></Field>
        </div>
      </div>
    </div>
  );
};

const FormulirIa03 = () => {
  const location = useLocation();
  const [unitKompetensi, setUnitKompetensi] = useState([]);
  const [pertanyaanBaru, setPertanyaanBaru] = useState([]);
  const [tanggapan, setTanggapan] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [rekomendasi, setRekomendasi] = useState(null);
  const [unitKompetensiIndex, setUnitKompetensiIndex] = useState(0);
  const [dataUmpanBalik, setDataUmpanBalik] = useState(null);
  const [dataUnitKompetensi, setDataUnitKompetensi] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const ak01 = location.state.ak01;
  const skema = location.state.skema;
  const apl01 = location.state.apl01;
  const ia03Mutation = useMutation(addIa03, {
    onMutate: () => {
      setOpen(true);
    },
    onSuccess: () => {
      setOpen(false);
      navigate(-2);
    },
  });
  const pertanyaanIa03 = useQuery("pertanyaan-ia03", () =>
    getPertanyaanIa03(skema.id)
  );

  useEffect(() => {
    const unit_kompetensi1 = pertanyaanIa03.isFetched
      ? pertanyaanIa03.data
          .filter((pertanyaan, index) => {
            // Filter out any pertanyaans that have already occurred earlier in the array
            return (
              index ===
              pertanyaanIa03.data.findIndex((prevPertanyaan) => {
                // Use the indexOf method to compare pertanyaan equality
                return (
                  JSON.stringify(prevPertanyaan.unit_kompetensi) ===
                  JSON.stringify(pertanyaan.unit_kompetensi)
                );
              })
            );
          })
          .map((pertanyaan) => pertanyaan.unit_kompetensi)
      : [];
    const pertanyaanBaru = pertanyaanIa03.isFetched
      ? pertanyaanIa03.data.map((pertanyaan, index) => ({
          ...pertanyaan,
          no_tanggapan: "tanggapan" + (index + 1),
          no_rekomendasi: "rekomendasi" + (index + 1),
        }))
      : [];
    setPertanyaanBaru(pertanyaanBaru);
    setUnitKompetensi(unit_kompetensi1);
    let tanggapan = {};
    let rekomendasi = {};
    let validasi = {};
    pertanyaanIa03.data?.map(
      (currPer, index) => (tanggapan["tanggapan" + (index + 1)] = "")
    );
    pertanyaanIa03.data?.map(
      (currPer, index) => (rekomendasi["rekomendasi" + (index + 1)] = "K")
    );
    pertanyaanIa03.data?.map(
      (currSub, index) =>
        (validasi["tanggapan" + (index + 1)] = yup
          .string("Masukkan Tanggapan")
          .required("Terdapat Soal Yang belum terjawab"))
    );
    setTanggapan(tanggapan);
    setRekomendasi(rekomendasi);
    const validationSchema = yup.object(validasi);
    setValidationSchema(validationSchema);
  }, [pertanyaanIa03.isFetched, pertanyaanIa03.data]);

  const isValidasi = (errors) => {
    const status =
      Object.keys(errors).length === 0 && errors.constructor === Object;
    const message = status ? "" : "Harap Isi Semua Pertanyaan";
    setMessage(message);
  };
  // console.log(pertanyaanBaru);
  useEffect(() => {
    let data_umpan_balik = {};
    let data_unit_kompetensi = {};
    unitKompetensi?.map(
      (currUnit, index) => (data_umpan_balik["umpan_balik" + (index + 1)] = "")
    );
    setDataUmpanBalik(data_umpan_balik);
    unitKompetensi?.map(
      (unit, index) =>
        (data_unit_kompetensi["unit_kompetensi" + (index + 1)] = unit.id)
    );
    setDataUnitKompetensi(data_unit_kompetensi);
  }, [unitKompetensi]);
  // console.log(dataUnitKompetensi)

  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <LoadingBackground open={open} />

        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.IA.03. PERTANYAAN UNTUK MENDUKUNG OBSERVASI
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {pertanyaanIa03.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            <Formik
              initialValues={{
                user_id: apl01.user_id,
                sesi_id: apl01.sesi_id,
                hasil_apl01_id: apl01.id,
                hasil_ak01_id: ak01.id,
                ...tanggapan,
                ...rekomendasi,
                ...dataUmpanBalik,
              }}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={async (values) => {
                let data_pertanyaan = {};
                let data_tanggapan = {};
                let data_rekomendasi = {};
                let data_umpan_balik = {};

                pertanyaanIa03.data?.map(
                  (pertanyaan, index) =>
                    (data_pertanyaan["pertanyaan" + (index + 1)] =
                      pertanyaan.id)
                );
                pertanyaanIa03.data?.map(
                  (pertanyaan, index) =>
                    (data_tanggapan["tanggapan" + (index + 1)] =
                      values["tanggapan" + (index + 1)])
                );
                pertanyaanIa03.data?.map(
                  (pertanyaan, index) =>
                    (data_rekomendasi["rekomendasi" + (index + 1)] =
                      values["rekomendasi" + (index + 1)])
                );
                unitKompetensi?.map(
                  (unit, index) =>
                    (data_umpan_balik["umpan_balik" + (index + 1)] =
                      values["umpan_balik" + (index + 1)])
                );

                const data = {
                  data_inti: {
                    user_id: values.user_id,
                    sesi_id: values.sesi_id,
                    hasil_apl01_id: values.hasil_apl01_id,
                    hasil_ak01_id: values.hasil_ak01_id,
                  },
                  data_jawaban: {
                    data_pertanyaan,
                    data_tanggapan,
                    data_rekomendasi,
                  },
                  data_jawaban_unit: {
                    data_unit_kompetensi: dataUnitKompetensi,
                    data_umpan_balik,
                  },
                };
                ia03Mutation.mutate(data);
                // console.log(data);
              }}
            >
              {({ values, errors }) => (
                <Form>
                  <div className="">
                    {message && (
                      <Alert
                        severity="error"
                        className="w-1/2 mx-auto my-2 text-center"
                      >
                        {message}
                      </Alert>
                    )}
                    <SectionUnit
                      unit_kompetensi={unitKompetensi[unitKompetensiIndex]}
                      nameUmpanBalik={"umpan_balik" + (unitKompetensiIndex + 1)}
                      pertanyaan={pertanyaanBaru}
                    />
                    <div className="flex justify-end space-x-3 mt-10">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() =>
                          unitKompetensiIndex > 0 &&
                          setUnitKompetensiIndex(unitKompetensiIndex - 1)
                        }
                      >
                        Back
                      </button>
                      {unitKompetensiIndex + 1 < unitKompetensi.length && (
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() =>
                            unitKompetensiIndex < unitKompetensi.length &&
                            setUnitKompetensiIndex(unitKompetensiIndex + 1)
                          }
                        >
                          Next
                        </button>
                      )}
                      {unitKompetensiIndex + 1 >= unitKompetensi.length && (
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
                </Form>
              )}
            </Formik>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormulirIa03;

import { Button, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { addAk03, getApl01danKomponen } from "../../../api/ak03";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { Form, Formik } from "formik";
import FieldInput from "../../../components/apl01/FieldInput";
// import FieldInput from "../../config/DetailApl01/FieldInput";

import DateInput from "../../../components/apl01/DateInput";
import DataInti from "./DataInti";
import RadioGroup from "../../../components/RadioGroup";
import TextAreaInput from "../../../components/apl01/TextAreaInput";

const UmpanBalik = ({ label, nameRadio, nameCatatan, nomor }) => {
  const options = [
    { id: 1, label: "Ya", value: "Ya" },
    { id: 2, label: "Tidak", value: "Tidak" },
  ];
  return (
    <div className="mt-10">
      <h1 className="font-bold">
        {nomor}) {label}
      </h1>
      <RadioGroup name={nameRadio} options={options} label="Hasil" />
      <FieldInput
        label="Catatan / Komentar Asesi"
        name={nameCatatan}
        // error={errors[nameCatatan]}
        mandatory
      />
    </div>
  );
};

const FrAk03 = () => {
  const { id } = useParams();
  const data = useQuery("dataAk03", () => getApl01danKomponen(id));
  const [dataHasil, setDataHasil] = useState({});
  const [dataCatatan, setDataCatatan] = useState({});
  const { apl01, komponens } = data.data || [];
  const navigate = useNavigate();

  let data_hasil = {};
  let data_catatan = {};
  data.data?.komponens?.map(
    (komponen, index) => (data_hasil["hasil" + (index + 1)] = "Ya")
  );
  data.data?.komponens?.map(
    (komponen, index) => (data_catatan["catatan" + (index + 1)] = "")
  );
  const createAK03Mutation = useMutation(addAk03, {
    onSuccess: () => {
      navigate(-1);
    },
  });

  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.AK.03. UMPAN BALIK DAN CATATAN ASESMEN
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {data.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            <Formik
              initialValues={{
                hasil_apl01_id: apl01.id,
                user_id: apl01.user_id,
                asesor_id: apl01.asesor_id,
                tanggal: Date.now(),
                waktu: "",
                komentar: "",
                ...data_hasil,
                ...data_catatan,
              }}
              onSubmit={async (values) => {
                // console.log(values);
                let data_komponen = {};
                let data_hasil = {};
                let data_catatan = {};

                data.data?.komponens?.map(
                  (komponen, index) =>
                    (data_komponen["komponen" + (index + 1)] = komponen.id)
                );

                data.data?.komponens?.map(
                  (komponen, index) =>
                    (data_hasil["hasil" + (index + 1)] =
                      values["hasil" + (index + 1)])
                );

                data.data?.komponens?.map(
                  (komponen, index) =>
                    (data_catatan["catatan" + (index + 1)] =
                      values["catatan" + (index + 1)])
                );

                const dataAk03 = {
                  data_inti: {
                    hasil_apl01_id: values.hasil_apl01_id,
                    user_id: values.user_id,
                    asesor_id: values.asesor_id,
                    tanggal: values.tanggal,
                    waktu: values.waktu,
                    komentar: values.komentar,
                  },
                  data_umpan_balik: {
                    data_komponen,
                    data_hasil,
                    data_catatan,
                  },
                };
                createAK03Mutation.mutate(dataAk03);
              }}
              // enableReinitialize
            >
              {({ values, errors }) => (
                <Form>
                  <DataInti
                    errors={errors}
                    values={values}
                    asesi={apl01.name}
                    asesor={apl01.asesor.name}
                  />
                  {/* {console.log(values)} */}
                  <div className="">
                    {data.data?.komponens.map((komponen, index) => (
                      <UmpanBalik
                        key={index}
                        nomor={index + 1}
                        errors={errors}
                        label={komponen.name}
                        nameRadio={"hasil" + (index + 1)}
                        nameCatatan={"catatan" + (index + 1)}
                      />
                    ))}
                  </div>
                  <div className="border border-gray-200 rounded-md p-4 shadow-sm grid grid-cols-1 my-4 ">
                    <TextAreaInput
                      error={errors.komentar}
                      label="Catatan/komentar lainnya (apabila ada)"
                      mandatory={true}
                      name="komentar"
                    />
                  </div>
                  <div className="felx justify-end">
                    <Button
                      variant="contained"
                      type="Submit"
                      className="bg-sky-700"
                    >
                      Submit
                    </Button>
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

export default FrAk03;
// getDetailApl01

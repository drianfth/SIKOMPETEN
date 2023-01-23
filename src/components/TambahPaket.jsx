import { Button, Card, CardContent, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import SelectInput from "./apl01/SelectInput";
import FieldInput from "./apl01/FieldInput";
import { useMutation, useQuery } from "react-query";
import { getAllSchema } from "../api/schema";
import DateInput from "./apl01/DateInput";
import { getAllAsesor } from "../api/user";
import * as yup from "yup";
import { createPaketAsesmen } from "../api/paketasesmen";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const validationSchema = yup.object({
  name: yup.string("Masukkan nama").required("nama tidak boleh kosong"),
  schema_id: yup
    .string("Masukkan Skema ")
    .required("Skema  tidak boleh kosong"),
});

const TambahPaket = () => {
  const navigate = useNavigate();
  const paketAsesmenMutation = useMutation(createPaketAsesmen, {
    onSuccess: () => {
      navigate("/dashboard/paket", {
        state: "Berhasil Menambahkan Paket Asesmen",
      });
    },
  });
  const initialValues = {
    schema_id: "",
    name: "",
    tanggal: new Date().toISOString(),
    asesor1_id: "",
    asesor2_id: "",
    tuk: "",
  };

  const schemas = useQuery("schema", getAllSchema);
  const asesors = useQuery("asesors", getAllAsesor);
  let optionSchema = schemas.data?.map((schema) => ({
    id: schema.id,
    value: schema.id,
    name: schema.name,
  }));
  let optionTUK = [
    { id: 1, value: 1, name: "Lab Gis" },
    { id: 2, value: 2, name: "Lab Jaringan" },
    { id: 3, value: 3, name: "Lab RPL" },
  ];
  let optionAsesor = asesors.data?.map((asesor) => ({
    id: asesor.id,
    value: asesor.id,
    name: asesor.name,
  }));

  return (
    <div>
      <Card className="shadow-lg overflow-hidden pb-10">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            Tambah Paket Asesmen
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              paketAsesmenMutation.mutate(values);
            }}
          >
            {({ values, errors, touched }) => (
              <Form>
                {/* {console.log(values)} */}
                {asesors.isLoading && <Loading />}
                {asesors.isSuccess && (
                  <div className=" grid grid-cols-2 space-x-4">
                    <div className="px-2 space-y-4">
                      <FieldInput
                        error={errors.name}
                        name="name"
                        label="Nama"
                        mandatory={true}
                        type="text"
                      />
                      {schemas.isSuccess && (
                        <SelectInput
                          error={errors.schema_id}
                          name="schema_id"
                          label="Skema"
                          option={optionSchema}
                          mandatory={true}
                        />
                      )}

                      <DateInput
                        name="tanggal"
                        label="Tanggal Pelaksanaan"
                        
                      />
                    </div>
                    <div className="px-2 space-y-4">
                      <SelectInput
                        name="tuk"
                        label="Tempat Uji Kompetensi"
                        option={optionTUK}
                      />
                      {asesors.isSuccess && (
                        <SelectInput
                          name="asesor1_id"
                          label="Asesor 1"
                          option={optionAsesor}
                        />
                      )}
                      {asesors.isSuccess && (
                        <SelectInput
                          name="asesor2_id"
                          label="Asesor 2"
                          option={optionAsesor}
                        />
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <Button
                    variant="contained"
                    className="bg-sky-700"
                    type="submit"
                  >
                    Buat
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default TambahPaket;

import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getSchemaElSub } from "../../../../api/schema";
import { getPesertaAsesor } from "../../../../api/sesi";
import useAuthStore from "../../../../context/userAuthStore";
import { Box, Card, CardContent, Tab } from "@mui/material";
import LoadingBackground from "../../../../components/Backdrop";
import Loading from "../../../../components/Loading";
import { Form, Formik } from "formik";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import DataAwal from "./DataAwal";
import RekomendasiAsesi from "./RekomendasiAsesi";
import Catatan from "./Catatan";
import * as Yup from "yup";
import { addAk05 } from "../../../../api/ak05";

const FrAk05 = () => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("1");
  const { user } = useAuthStore();
  const unit = useQuery("unit", () =>
    getSchemaElSub(location.state?.sesi?.sesi?.paket_skema.schema_id)
  );
  const navigate = useNavigate();
  const asesi = useQuery(
    "DaftarAsesi",
    () => getPesertaAsesor(location.state?.sesi?.sesi?.id, user.id),
    {
      enabled: !!unit,
    }
  );
  const ak05Mutation = useMutation(addAk05, {
    onSuccess: () => {
      navigate(-1);
    },
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let data_rekomendasi = {};
  let data_keterangan = {};
  let rekomendasi = {};
  let keterangan = {};
  asesi.data?.map(
    (asesi, index) =>
      (data_rekomendasi["rekomendasi" + (index + 1)] =
        Yup.string("isi Rekomendasi").required("isi Rekomendasi"))
  );
  asesi.data?.map(
    (asesi, index) =>
      (data_keterangan["keterangan" + (index + 1)] = Yup.string(
        "Keterangan wajib diisi"
      ).required("Keterangan wajib diisi"))
  );
  let validationSchema = Yup.object({
    tuk: Yup.string("Masukkan TUK").required("Harap Isi TUK"),
    catatan: Yup.string("Masukkan Catatan").required("Harap Isi Catatan"),
    aspek_asesmen: Yup.string(
      "Masukkan Aspek Negatif dan Positif dalam Asesemen"
    ).required("Harap Isi Aspek Negatif dan Positif dalam Asesemen"),
    catatan_penolakan: Yup.string(
      "Masukkan Pencatatan Penolakan Hasil Asesmen"
    ).required("Harap Isi Pencatatan Penolakan Hasil Asesmen"),
    saran_perbaikan: Yup.string("Masukkan Saran Perbaikan").required(
      "Harap Isi Saran Perbaikan"
    ),
    ...data_rekomendasi,
    ...data_keterangan,
  });

  asesi.data?.map(
    (asesi, index) => (rekomendasi["rekomendasi" + (index + 1)] = "Kompeten")
  );
  asesi.data?.map(
    (asesi, index) => (keterangan["keterangan" + (index + 1)] = "")
  );
  const initialValues = {
    paket_skema_id: location.state?.sesi?.sesi?.paket_skema.id,
    asesor_id: user.id,
    schema_id: location.state?.sesi?.sesi?.paket_skema.schema_id,
    tuk: "",
    catatan: "",
    aspek_asesmen: "",
    catatan_penolakan: "",
    saran_perbaikan: "",
    ...rekomendasi,
    ...keterangan,
  };
  const handleSubmit = async (values) => {
    let data_apl01 = {};
    let data_rekomendasi = {};
    let data_keterangan = {};
    asesi.data?.map(
      (apl01, index) => (data_apl01["apl01" + (index + 1)] = apl01.id)
    );
    asesi.data?.map(
      (apl01, index) =>
        (data_rekomendasi["rekomendasi" + (index + 1)] =
          values["rekomendasi" + (index + 1)])
    );
    asesi.data?.map(
      (apl01, index) =>
        (data_keterangan["keterangan" + (index + 1)] =
          values["keterangan" + (index + 1)])
    );

    const dataPost = {
      data_inti: {
        paket_skema_id: values.paket_skema_id,
        asesor_id: values.asesor_id,
        schema_id: values.schema_id,
        tuk: values.tuk,
        catatan: values.catatan,
        aspek_asesmen: values.aspek_asesmen,
        catatan_penolakan: values.catatan_penolakan,
        saran_perbaikan: values.saran_perbaikan,
      },
      data_jawaban: {
        data_apl01,
        data_rekomendasi,
        data_keterangan,
      },
    };
    ak05Mutation.mutate(dataPost);
    // console.log(dataPost);
  };

  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <LoadingBackground open={open} />
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.AK.05. LAPORAN ASESMEN
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {asesi.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ values, errors }) => (
                <Form>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        variant="fullWidth"
                        scrollButtons="auto"
                      >
                        <Tab label="Data Awal" value="1" />
                        <Tab label="Rekomendasi Asesi" value="2" />
                        <Tab label="Catatan" value="3" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <DataAwal
                        unitKomepensis={unit.data[0]}
                        user={user}
                        errors={errors}
                        setValue={setValue}
                        tanggal={
                          location.state?.sesi?.sesi?.paket_skema.tanggal
                        }
                      />
                    </TabPanel>
                    <TabPanel value="2">
                      <RekomendasiAsesi
                        data={asesi.data}
                        errors={errors}
                        setValue={setValue}
                      />
                    </TabPanel>
                    <TabPanel value="3">
                      <Catatan
                        user={user}
                        setValue={setValue}
                        errors={errors}
                      />
                    </TabPanel>
                  </TabContext>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FrAk05;

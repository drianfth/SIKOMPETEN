import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../../../context/userAuthStore";
import { Box, Card, CardContent, Tab } from "@mui/material";
import LoadingBackground from "../../../../components/Backdrop";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addAk06, getProsedurKeputusan } from "../../../../api/ak06";
import Loading from "../../../../components/Loading";
import { Form, Formik } from "formik";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import PrinsipAsesmen from "./PrinsipAsesmen";
import PemenuhanDimensi from "./PemenuhanDimensi";
import * as Yup from "yup";

const FrAk06 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const ak06 = useMutation(addAk06, {
    onMutate: () => {
      setOpen(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["ak06"]);
      setOpen(false);
      navigate(-1);
    },
  });

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("1");
  const [message1, setMessage1] = useState(null);
  // const [message2, setMessage2] = useState(null);

  const { user } = useAuthStore();
  const prosedurKeputusan = useQuery("prosedur_keputusan", () =>
    getProsedurKeputusan()
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // console.log(location.state.data);
  let data_prosedur_asesmen = {};
  let validasi_prosedur = {};
  let data_keputusan_asesmen = {};
  let validasi_keputusan = {};

  prosedurKeputusan.data?.result_prosedur?.map(
    (prosedur, index) =>
      (data_prosedur_asesmen["j_prosedur" + (index + 1)] = "")
  );
  prosedurKeputusan.data?.result_keputusan?.map(
    (prosedur, index) =>
      (data_keputusan_asesmen["j_keputusan" + (index + 1)] = "")
  );

  prosedurKeputusan.data?.result_prosedur?.map(
    (prosedur, index) =>
      (validasi_prosedur["j_prosedur" + (index + 1)] = Yup.array()
        .min(
          1,
          "Pilihan Kesesuaian dengan prinsip asesmen Minimal harus memilih setidaknya satu opsi"
        )
        .required("Pilihan Kesesuaian dengan prinsip asesmen harus diisi"))
  );

  prosedurKeputusan.data?.result_keputusan?.map(
    (prosedur, index) =>
      (validasi_keputusan["j_keputusan" + (index + 1)] = Yup.array()
        .min(
          1,
          "Pilihan Pemenuhan dimensi kompetensi Minimal harus memilih setidaknya satu opsi"
        )
        .required("Pilihan Pemenuhan dimensi kompetensi harus diisi"))
  );

  function convertJawabanToString(obj) {
    for (let key in obj) {
      if (Array.isArray(obj[key])) {
        // tambahkan pengecekan apakah nilai pada properti adalah sebuah array
        obj[key] = obj[key].join(", ");
      }
    }
    return obj;
  }

  let validationSchema = Yup.object({
    tuk: Yup.string("Masukkan TUK").required("Harap Isi TUK"),
    nama_peninjau: Yup.string("Masukkan Nama Peninjau").required(
      "Harap Isi Nama Peninjau"
    ),
    rprinsip_asesmen: Yup.string(
      "Masukkan Rekomendasi untuk peningkatan"
    ).required("Harap Isi Rekomendasi untuk peningkatan"),
    rpemenuhan_dimensik: Yup.string(
      "Masukkan Rekomendasi untuk peningkatan"
    ).required("Harap Isi Rekomendasi untuk peningkatan"),
    ...validasi_prosedur,
    ...validasi_keputusan,
  });

  const initialValues = {
    paket_skema_id: location.state?.data?.paket_skema.id,
    sesi_id: location.state?.data?.id,
    asesor_id: user.id,
    schema_id: location.state?.data?.paket_skema.schema_id,
    tuk: "",
    rprinsip_asesmen: "Tidak Ada",
    rpemenuhan_dimensik: "Tidak Ada",
    nama_peninjau: "",
    komentar: "",
    ...data_prosedur_asesmen,
    ...data_keputusan_asesmen,
  };

  const handleSubmit = async (values) => {
    // console.log(values);
    let data_prosedur_asesmen = {};
    let data_jawaban_prosedurAs = {};
    let data_keputusan_asesmen = {};
    let data_jawaban_keputusanAs = {};
    prosedurKeputusan.data?.result_prosedur?.map(
      (prosedur, index) =>
        (data_prosedur_asesmen["prosedur_asesmen" + (index + 1)] = prosedur.id)
    );

    prosedurKeputusan.data?.result_prosedur?.map(
      (prosedur, index) =>
        (data_jawaban_prosedurAs["j_prosedur" + (index + 1)] =
          values["j_prosedur" + (index + 1)])
    );

    prosedurKeputusan.data?.result_keputusan?.map(
      (dimensi, index) =>
        (data_keputusan_asesmen["keputusan_asesmen" + (index + 1)] = dimensi.id)
    );
    prosedurKeputusan.data?.result_keputusan?.map(
      (dimensi, index) =>
        (data_jawaban_keputusanAs["j_keputusan" + (index + 1)] =
          values["j_keputusan" + (index + 1)])
    );

    const dataPost = {
      data_inti: {
        paket_skema_id: values.paket_skema_id,
        sesi_id: values.sesi_id,
        schema_id: values.schema_id,
        asesor_id: values.asesor_id,
        tuk: values.tuk,
        rprinsip_asesmen: values.rprinsip_asesmen,
        rpemenuhan_dimensik: values.rpemenuhan_dimensik,
        nama_peninjau: values.nama_peninjau,
        komentar: values.komentar,
      },
      data_jkesesuaian_prinsip: {
        data_prosedur_asesmen,
        data_jawaban_prosedurAs: convertJawabanToString(
          data_jawaban_prosedurAs
        ),
      },
      data_jpemenuhan_dimensi: {
        data_keputusan_asesmen,
        data_jawaban_keputusanAs: convertJawabanToString(
          data_jawaban_keputusanAs
        ),
      },
    };

    // console.log(dataPost);
    ak06.mutate(dataPost);
  };

  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <LoadingBackground open={open} />
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.AK.06. MENINJAU PROSES ASESMEN
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {prosedurKeputusan.isLoading ? (
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
                        <Tab
                          label="Kesesuaian dengan prinsip asesmen"
                          value="1"
                        />
                        <Tab label="Pemenuhan dimensi kompetensi" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <PrinsipAsesmen
                        schema={location.state?.data.paket_skema.schema}
                        user={user}
                        errors={errors}
                        values={values}
                        tanggal={location.state.data.paket_skema.tanggal}
                        data={prosedurKeputusan.data?.result_prosedur}
                        setValue={setValue}
                      />
                    </TabPanel>
                    <TabPanel value="2">
                      <PemenuhanDimensi
                        setValue={setValue}
                        errors={errors}
                        values={values}
                        data={prosedurKeputusan.data?.result_keputusan}
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

export default FrAk06;

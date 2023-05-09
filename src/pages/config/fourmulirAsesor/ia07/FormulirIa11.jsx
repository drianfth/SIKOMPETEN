import { Box, Button, Card, CardContent, Tab } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingBackground from "../../../../components/Backdrop";
import { useMutation, useQuery } from "react-query";
import { addIa11, getUnitKegiatan } from "../../../../api/ia11";
import Loading from "../../../../components/Loading";
import { Form, Formik } from "formik";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import FieldInput from "../../../../components/apl01/FieldInput";
import * as Yup from "yup";
import DataTable from "../../../../components/DataTable";
import KegiatanAsesmen from "./KegiatanAsesmen";

const UnitKompetensiPeninjau = ({ errors, data, setValue }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Kode Unit",
        accessor: "kode_unit",
      },
      {
        Header: "Judul Unit",
        accessor: "judul_unit",
      },
    ],
    []
  );
  const dataTable = useMemo(() => data.data?.unit_kompetensi, [data.data]);
  return (
    <div className="">
      <div className="border border-gray-200 rounded-md p-4 shadow-sm grid grid-cols-1 gap-y-4">
        <FieldInput
          error={errors.nama_peninjau}
          label="Nama Peninjau"
          name="nama_peninjau"
          type="text"
          mandatory
        />
        <FieldInput
          label="Komentar siap digunakan"
          name="komentar"
          type="text"
        />
      </div>
      <div className="mt-8">
        <DataTable columns={columns} data={dataTable} nomor />
      </div>
      <div className="flex justify-between mt-4">
        <Button
          variant="contained"
          type="button"
          className="bg-sky-700"
          onClick={() => setValue("2")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const FormulirIa11 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("1");
  const createIA11Mutation = useMutation(addIa11, {
    onSuccess: () => {
      navigate(-2);
    },
  });
  const ak01 = location.state.ak01;
  const skema = location.state.skema;
  const apl01 = location.state.apl01;
  const data = useQuery("unitKegiatan", () => getUnitKegiatan(skema.id));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let yatidak_validasi = {};
  let komentar_validasi = {};
  let data_yatidak = {};
  data.data?.kegiatan_asesmen.map(
    (kegiatan, index) =>
      (yatidak_validasi["konfirmasi" + (index + 1)] =
        Yup.string("Pilih Ya/Tidak").required("Pilih Ya/Tidak"))
  );
  data.data?.kegiatan_asesmen.map(
    (kegiatan, index) =>
      (yatidak_validasi["komentar" + (index + 1)] = Yup.string(
        "Masukkan Komentar"
      ).required("Komentar tidak boleh kosong"))
  );
  let validationSchema = Yup.object({
    nama_peninjau: Yup.string("Masukkan Nama Peninjau").required(
      "Nama Peninjau tidak boleh kosong"
    ),
    ...yatidak_validasi,
    ...komentar_validasi,
  });

  data.data?.kegiatan_asesmen.map(
    (kegiatan, index) => (data_yatidak["konfirmasi" + (index + 1)] = "Ya")
  );

  const initialValues = {
    user_id: apl01.user_id,
    sesi_id: apl01.sesi_id,
    hasil_apl01_id: apl01.id,
    hasil_ak01_id: ak01.id,
    nama_peninjau: "",
    komentar: "",
    komentar1: "FRIA03 & FR.IA.07 (jumlah soal sesuai dengan T MAPA 01)",
    komentar2: "Memeriksa soal pada FRIA 03/07",
    komentar3: "Memeriksa FR MAPA 01 Bagian 1, Bagian 2",
    komentar4: "Memeriksa soal pada FR IA 03 & FR IA 07",
    komentar5: "Memeriksa FR IA 01 dan FR IA 02 sudah sesuai",
    komentar6: "FR IA 01 & FR IA 02 Sesuai dengan SKKNI",
    komentar7: "Tidak perlu modifikasi",
    komentar8: "Perangkat siap digunakan",
    ...data_yatidak,
  };

  const handleSubmit = async (values) => {
    let data_kegiatan = {};
    let data_yatidak = {};
    let data_komentar = {};

    data.data?.kegiatan_asesmen.map(
      (kegiatan, index) =>
        (data_kegiatan["kegiatan" + (index + 1)] = kegiatan.id)
    );
    data.data?.kegiatan_asesmen.map(
      (kegiatan, index) =>
        (data_yatidak["konfirmasi" + (index + 1)] =
          values["konfirmasi" + (index + 1)])
    );
    data.data?.kegiatan_asesmen.map(
      (kegiatan, index) =>
        (data_komentar["komentar" + (index + 1)] =
          values["komentar" + (index + 1)])
    );

    const dataPost = {
      data_inti: {
        user_id: values.user_id,
        sesi_id: values.sesi_id,
        hasil_apl01_id: values.hasil_apl01_id,
        hasil_ak01_id: values.hasil_ak01_id,
        nama_peninjau: values.nama_peninjau,
        komentar: values.komentar,
      },
      data_komentar_kegiatan: {
        data_kegiatan,
        data_yatidak,
        data_komentar,
      },
    };

    createIA11Mutation.mutate(dataPost);
  };

  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <LoadingBackground open={open} />
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.IA.11. CEKLIS MENINJAU INSTRUMEN ASESSMEN
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {data.isLoading ? (
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
                  {/* {console.log(values)} */}
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        variant="fullWidth"
                        // variant="scrollable"
                        scrollButtons="auto"
                      >
                        <Tab
                          label="Data Unit Kompetensi dan Peninjau"
                          value="1"
                        />
                        <Tab label="Kegiatan Asesmen" value="2" />
                      </TabList>
                    </Box>
                    {/* {console.log(values)} */}
                    <TabPanel value="1">
                      <UnitKompetensiPeninjau
                        data={data}
                        setValue={setValue}
                        errors={errors}
                      />
                    </TabPanel>
                    <TabPanel value="2">
                      <KegiatanAsesmen
                        data={data.data?.kegiatan_asesmen}
                        values={values}
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

export default FormulirIa11;

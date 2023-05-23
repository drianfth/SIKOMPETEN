import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Tab,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import LoadingBackground from "../../../../components/Backdrop";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import Loading from "../../../../components/Loading";
import { Field, Form, Formik } from "formik";
import { addAk02, getApl01 } from "../../../../api/ak02";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import FieldInput from "../../DetailApl01/FieldInput";
import DateInput from "../../../../components/apl01/DateInput";
import DataTable from "../../../../components/DataTable";
import CheckboxInput from "../../../../components/apl01/CheckboxInput";
import HasilAsesmen from "./HasilAsesmen";
import * as yup from "yup";

const FormAsesmen = ({ data, setValue }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Unit Kompetensi",
        accessor: "judul_unit",
      },
    ],
    []
  );
  const dataTable = useMemo(
    () => data?.schema.unit_kompetensis,
    [data?.schema.unit_kompetensis]
  );

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-x-4">
        <FieldInput label="Nama Asesi" value={data?.name} />
        <FieldInput label="Nama Asesor" value={data?.asesor.name} />
        <div className="col-span-2">
          <FieldInput
            label="Skema sertifikasi (bila tersedia)"
            value={data?.schema.name}
          />
        </div>
        <DateInput
          name="tanggal_mulai"
          label="Tanggal Mulai"
          mandatory={true}
        />
        <DateInput
          name="tanggal_selesai"
          label="Tanggal Selesai"
          mandatory={true}
        />
      </div>
      <div className="mt-4 max-w-5xl mx-auto">
        <DataTable columns={columns} data={dataTable} nomor />
      </div>
      <div className="">
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

const PertanyaanKompetensi = ({ unit, name, no }) => {
  const optionBukti = [
    {
      id: 1,
      label: "Observasi demonstrasi",
      value: "Observasi demonstrasi",
    },
    { id: 2, label: "Portofolio", value: "Portofolio" },
    {
      id: 3,
      label: "Pernyataan Pihak Ketiga Pertanyaan Wawancara",
      value: "Pernyataan Pihak Ketiga Pertanyaan Wawancara",
    },
    { id: 4, label: "Pertanyaan lisan", value: "Pertanyaan lisan" },
    { id: 5, label: "Pertanyaan tertulis", value: "Pertanyaan tertulis" },
    { id: 6, label: "Proyek kerja ", value: "Proyek kerja " },
    { id: 7, label: "Lainnya", value: "Lainnya" },
  ];
  return (
    <div className="">
      <CheckboxInput
        label={`${no}) ${unit}`}
        name={name}
        options={optionBukti}
      />
    </div>
  );
};

const BuktiKompetensi = ({ data, setValue }) => {
  return (
    <div className="">
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        <strong>
          Beri tanda centang (√) di kolom yang sesuai untuk mencerminkan bukti
          yang diperoleh untuk menentukan Kompetensi asesi untuk setiap Unit
          Kompetensi
        </strong>
      </Alert>
      <div className="flex flex-col gap-y-4 mt-8">
        {data?.schema.unit_kompetensis.map((unit, i) => (
          <PertanyaanKompetensi
            name={`jawaban${i + 1}`}
            unit={unit.judul_unit}
            key={i}
            no={i + 1}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Button
          variant="contained"
          type="button"
          className="bg-gray-500"
          onClick={() => setValue("1")}
        >
          Back
        </Button>
        <Button
          variant="contained"
          type="button"
          className="bg-sky-700"
          onClick={() => setValue("3")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const FrAk02 = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location)
  const [dataJawaban, setDataJawaban] = useState([]);
  const [message, setMessage] = useState("");
  const [validationSchema, setValidationSchema] = useState([]);
  const data = useQuery("data", () => getApl01(location.state.asesi.id));
  const [value, setValue] = React.useState("1");
  const createAK02Mutation = useMutation(addAk02, {
    onMutate: () => {
      setOpen(true);
    },
    onSuccess: () => {
      setOpen(false);
      navigate(-2);
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isValidasi = (errors) => {
    const status =
      Object.keys(errors).length === 0 && errors.constructor === Object;
    const message = status ? "" : "Harap Isi Semua Isian";
    setMessage(message);
  };

  useEffect(() => {
    let bukti_validasi = {};
    let data_jawaban = {};
    data.data?.schema.unit_kompetensis.map(
      (unit, index) => (data_jawaban["jawaban" + (index + 1)] = "")
    );
    data.data?.schema.unit_kompetensis.map(
      (unit, index) =>
        (bukti_validasi["jawaban" + (index + 1)] = yup
          .mixed("pilih bukti")
          .required("Terdapat Bukti yang belum diisi"))
    );
    const validasiInti = {
      tanggal_mulai: yup
        .date("Masukkan Tanggal Mulai")
        .required("Tanggal Mulai tidak boleh kosong"),
      tanggal_selesai: yup
        .date("Masukkan Tanggal Selesai")
        .required("Tanggal Selesai tidak boleh kosong"),
      rekomendasi: yup
        .string("Masukkan Rekomendasi hasil asesmen")
        .required("Rekomendasi hasil asesmen tidak boleh kosong"),
      tindak_lanjut: yup
        .string("Masukkan Tindak Lanjut")
        .required("Tindak Lanjut tidak boleh kosong"),
      komentar: yup
        .string("Masukkan Komentar")
        .required("Komentar tidak boleh kosong"),
    };
    const gabungan = {
      ...bukti_validasi,
      ...validasiInti,
    };
    setValidationSchema(yup.object(gabungan));

    setDataJawaban(data_jawaban);
  }, [data.data]);

  function convertJawabanToString(obj) {
    for (let key in obj) {
      if (Array.isArray(obj[key])) {
        // tambahkan pengecekan apakah nilai pada properti adalah sebuah array
        obj[key] = obj[key].join(", ");
      }
    }
    return obj;
  }
  

  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <LoadingBackground open={open} />
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.AK.02. FORMULIR REKAMAN ASESMEN KOMPETENSI
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {data.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            <Formik
              initialValues={{
                hasil_apl01_id: location.state.asesi.id,
                sesi_id: location.state.asesi.sesi_id,
                user_id: data.data?.user_id,
                asesor_id: data.data?.asesor_id,
                tanggal_mulai: Date.now(),
                tanggal_selesai: Date.now(),
                rekomendasi: "",
                tindak_lanjut: "",
                komentar: "",
                ...dataJawaban,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                let data_unit = {};
                let data_jawaban = {};
                data.data?.schema.unit_kompetensis.map(
                  (unit, index) => (data_unit["unit" + (index + 1)] = unit.id)
                );
                data.data?.schema.unit_kompetensis.map(
                  (unit, index) =>
                    (data_jawaban["jawaban" + (index + 1)] =
                      values["jawaban" + (index + 1)])
                );
                const hasil = convertJawabanToString(data_jawaban);
                const dataPost = {
                  data_inti: {
                    hasil_apl01_id: values.hasil_apl01_id,
                    sesi_id: values.sesi_id,
                    user_id: values.user_id,
                    asesor_id: values.asesor_id,
                    tanggal_mulai: values.tanggal_mulai,
                    tanggal_selesai: values.tanggal_selesai,
                    rekomendasi: values.rekomendasi,
                    tindak_lanjut: values.tindak_lanjut,
                    komentar: values.komentar,
                  },
                  data_bukti_jawaban: {
                    data_unit,
                    data_jawaban: hasil,
                  },
                };
                createAK02Mutation.mutate(dataPost);
              }}
            >
              {({ values, errors }) => (
                <Form>
                  {message && (
                    <Alert
                      severity="error"
                      className="w-1/2 mx-auto my-2 text-center"
                    >
                      {message}
                    </Alert>
                  )}
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
                        <Tab label="Data Asesmen" value="1" />
                        <Tab label="Bukti Kompetensi Asesi" value="2" />
                        <Tab label="Hasil Asesmen" value="3" />
                      </TabList>
                    </Box>
                    {/* {console.log(values)} */}
                    <TabPanel value="1">
                      <FormAsesmen data={data.data} setValue={setValue} />
                    </TabPanel>
                    <TabPanel value="2">
                      <BuktiKompetensi data={data.data} setValue={setValue} />
                    </TabPanel>
                    <TabPanel value="3">
                      <HasilAsesmen
                        data={data.data}
                        setValue={setValue}
                        errors={errors}
                        isValidasi={isValidasi}
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

export default FrAk02;

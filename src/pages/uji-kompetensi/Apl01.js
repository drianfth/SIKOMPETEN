import {
  Card,
  CardContent,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import Schema from "../../components/Schema";
import Alert from "@mui/material/Alert";
import useNavStore from "../../context/useNavStore";
import { Formik, Field, Form } from "formik";
import FormApl01 from "../../components/FormApl01";
import useApl01Store from "../../context/ujiKompetensi/useApl01Store";
import InitialKelengkapan from "../../data/kelengkapan.json";
import useAuth from "../../hooks/useAuth";
import * as yup from "yup";
import { addApl01, addRApl01api } from "../../api/apl01";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getOneKelengkapan } from "../../api/kelengkapan";

export const Warning = ({ open, setOpen }) => {
  return (
    <Alert
      onClose={() => setOpen(!open)}
      severity="error"
      className={`w-4/12 mx-auto mt-2 ${open ? "" : "hidden"}`}
    >
      Pilih Skema Terlebih dahulu !
    </Alert>
  );
};

const validationDataDiri = {
  email: yup.string("Masukkan Email").required("Email tidak boleh kosong"),
  name: yup.string("Masukkan nama").required("nama tidak boleh kosong"),
  kk_ktp_paspor: yup
    .string("Masukkan No. KTP/NIK/Paspor ")
    .required("No. KTP/NIK/Paspor  tidak boleh kosong"),
  tempat_lhr: yup
    .string("Masukkan Tempat Lahir ")
    .required("Tempat Lahir tidak boleh kosong"),
  tgl_lahir: yup
    .string("Masukkan Tanggal Lahir")
    .required("Tanggal Lahir tidak boleh kosong"),
  jns_kelamin: yup
    .string("Masukkan Jenis Kelamin")
    .required("Jenis Kelamin tidak boleh kosong"),
  kebangsaan: yup
    .string("Masukkan Kebangsaan")
    .required("Kebangsaan tidak boleh kosong"),
  pendidikan: yup
    .string("Masukkan Pendidikan")
    .required("Pendidikan tidak boleh kosong"),
  kode_pos: yup
    .string("Masukkan Kode Pos")
    .required("Kode Pos tidak boleh kosong"),
  perusahaan: yup
    .string("Masukkan Perusahaan")
    .required("Perusahaan tidak boleh kosong"),
  jabatan: yup
    .string("Masukkan jabatan")
    .required("jabatan tidak boleh kosong"),
  tujuan_asesmen: yup
    .string("Masukkan Tujuan Asesmen")
    .required("Tujuan Asesmen tidak boleh kosong"),
  alamat: yup.string("Masukkan Alamat").required("Alamat tidak boleh kosong"),
};

const Apl01 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const createApl01Mutation = useMutation(addApl01, {
    onSuccess: (data) => {
      navigate("/dashboard/uji-kompetensi", {
        state: "Selamat Anda Telah Berhasil Mengisi Form Apl 01",
      });
    },
  });

  const [open, setOpen] = useState(false);
  const steps = ["Pilih Skema", "Pengisian Form APL-01"];
  const { findNav, switchNav } = useNavStore();
  const currentPage = findNav("Uji Kompetensi");
  const { dataApl01, id_schema } = useApl01Store();
  const kelengkapans = useQuery(
    "kelengkapanData",
    () => getOneKelengkapan(id_schema),
    {
      refetchInterval: 2000,
    }
  );
  let validasiKelengkapan = {};
  kelengkapans.data?.map(
    (currentElement, index) =>
      (validasiKelengkapan["kelengkapan" + (index + 1)] = yup
        .string("Masukkan Jawaban")
        .required("Terdapat Soal Yang belum terjawab"))
  );
  let validationSchema = yup.object({
    ...validationDataDiri,
    ...validasiKelengkapan,
  });
  const { response, getUser } = useAuth();
  useEffect(() => {
    getUser();
  }, []);
  const id = "apl1" + crypto.randomUUID().substring(0, 8);
  dataApl01.id = id;
  dataApl01.user_id = response?.id;
  dataApl01.name = response?.name;
  dataApl01.email = response?.email;
  dataApl01.jns_kelamin = response?.jns_kelamin;
  dataApl01.no_telp = response?.no_telp;

  let obj = {};

  for (let index = 0; index < InitialKelengkapan.length; index++) {
    obj[InitialKelengkapan[index].id] = "";
  }
  // console.log(obj);

  useEffect(() => {
    switchNav(currentPage.id);
  }, []);
  // const {id_schema} = useApl01Store
  // console.log(data);
  const nextStep = (schema) => {
    if (currentIndex === 0) {
      if (schema !== "") {
        setCurrentIndex(currentIndex + 1);
      } else {
        setOpen(false);
      }
    } else {
      console.log("dikumpulkan");
    }
  };
  // console.log(validationDataDiri);

  return (
    <div>
      <Card className="shadow-lg transition-all duration-600">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            {steps[currentIndex]}
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>

          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={currentIndex} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Warning open={open} setOpen={setOpen} />
            <Formik
              initialValues={dataApl01}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const data_r_kelengkapan = {};
                const data_kelengkapan = {};
                const data_diri = {
                  id: values.id,
                  name: values.name,
                  schema_id: values.schema_id,
                  user_id: values.user_id,
                  paket_asesmen_id: values.paket_asesmen_id,
                  kk_ktp_paspor: values.kk_ktp_paspor,
                  tempat_lhr: values.tempat_lhr,
                  jns_kelamin: values.jns_kelamin,
                  kebangsaan: values.kebangsaan,
                  tgl_lahir: values.tgl_lahir,
                  alamat: values.alamat,
                  no_telp: values.no_telp,
                  email: values.email,
                  pendidikan: values.pendidikan,
                  kode_pos: values.kode_pos,
                  perusahaan: values.perusahaan,
                  jabatan: values.jabatan,
                  almt_kantor: values.almt_kantor,
                  telp_kantor: values.telp_kantor,
                  email_kantor: values.email_kantor,
                  kode_pos_kantor: values.kode_pos_kantor,
                  tujuan_asesmen: values.tujuan_asesmen,
                  fax: values.fax,
                };
                kelengkapans.data.map(
                  (currElement, index) =>
                    (data_r_kelengkapan["r_kelengkapan" + (index + 1)] =
                      values["kelengkapan" + (index + 1)])
                );
                kelengkapans.data.map(
                  (currElement, index) =>
                    (data_kelengkapan["kelengkapan" + (index + 1)] =
                      currElement.name)
                );
                const data = {
                  data_diri,
                  data_kelengkapan,
                  data_r_kelengkapan,
                };
                createApl01Mutation.mutate(data);
              }}
            >
              {({ values, errors, touched }) => (
                <Form>
                  <section className="flex justify-center space-x-10 py-10 transition-all duration-600">
                    {currentIndex === 0 && <Schema />}
                    {currentIndex === 1 && (
                      <FormApl01
                        schema_id={values.schema_id}
                        errors={errors}
                        touched={touched}
                      />
                    )}
                  </section>
                  {/* {console.log(values)} */}
                  <div className="flex justify-between transition-all duration-600">
                    <Button
                      variant="contained"
                      className="bg-gray-700"
                      onClick={() =>
                        currentIndex === 1 && setCurrentIndex(currentIndex - 1)
                      }
                    >
                      Back
                    </Button>
                    {currentIndex !== 0 && (
                      <Button
                        type="submit"
                        variant="contained"
                        className="bg-sky-700"
                      >
                        Kumpulkan
                      </Button>
                    )}
                    {currentIndex === 0 && (
                      <Button
                        variant="contained"
                        className="bg-sky-700"
                        onClick={() => nextStep(values.schema_id)}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Apl01;

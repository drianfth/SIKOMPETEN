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
import { useMutation } from "react-query";

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

const validationSchema = yup.object({
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
  alamat: yup.string("Masukkan Alamat").required("Alamat tidak boleh kosong"),
});

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
  const { dataApl01 } = useApl01Store();
  const { response, getUser } = useAuth();
  useEffect(() => {
    getUser();
  }, []);
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
  // console.log({ ...dataApl01 });

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
                createApl01Mutation.mutate(values);
                // try {
                //   const res = await addRApl01api({
                //     url: `http://127.0.0.1:8000/api/hasilapl01`,
                //     data: values,
                //   });
                //   console.log(res.data);
                //   navigate("/dashboard/uji-kompetensi", {
                //     state: "Selamat Anda Telah Berhasil Mengisi Form Apl 01",
                //   });
                //   // navigate("/login", {
                //   //   state: "Akun Berhasil Dibuat Silahkan Login",
                //   // });
                // } catch (err) {
                //   console.log(err.response);
                // }
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

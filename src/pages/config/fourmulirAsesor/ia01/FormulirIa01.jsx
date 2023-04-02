import { Card, CardContent } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Formik, Form } from "formik";
import FormSop from "../../../../components/ia01/FormSop";
import FormRekomendasi from "../../../../components/ia01/FormRekomendasi";
import { getElemen, getSubElemen } from "../../../../api/elemen";
import { useMutation, useQuery } from "react-query";
import Loading from "../../../../components/Loading";
import * as yup from "yup";
import { addIa01 } from "../../../../api/ia01";
import LoadingBackground from "../../../../components/Backdrop";
import UmpanBalik from "../../../../components/ia01/UmpanBalik";

const FormulirIa01 = () => {
  const location = useLocation();
  const [value, setValue] = React.useState("1");
  const [open, setOpen] = React.useState(false);
  const ak01 = location.state.ak01;
  const skema = location.state.skema;
  const apl01 = location.state.apl01;
  const navigate = useNavigate();
  const iaMutation = useMutation(addIa01, {
    onMutate: () => {
      setOpen(true);
    },
    onSuccess: () => {
      setOpen(false);
      navigate(-2);
    },
  });
  const subElemen = useQuery("subElemen", () => getSubElemen(skema.id));
  const elemens = useQuery("elemen", () => getElemen(skema.id), {
    enabled: !!subElemen,
  });
  let rekomendasi = {};
  let penilaian = {};
  subElemen.data?.map(
    (currSub, index) => (rekomendasi["rekomendasi" + (index + 1)] = "K")
  );
  subElemen.data?.map(
    (currSub, index) => (penilaian["penilaian" + (index + 1)] = "")
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let validasi = {};
  subElemen.data?.map(
    (currSub, index) =>
      (validasi["rekomendasi" + (index + 1)] = yup
        .string("Masukkan Jawaban")
        .required("Terdapat Soal Yang belum terjawab"))
  );
  const validationSchema = yup.object(validasi);
  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <LoadingBackground open={open} />
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.IA.01. CEKLIS OBSERVASI AKTIVITAS DI TEMPAT KERJA ATAU TEMPAT KERJA
          SIMULASI
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {elemens.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            <Formik
              initialValues={{
                user_id: apl01.user_id,
                sesi_id: apl01.sesi_id,
                hasil_apl01_id: apl01.id,
                hasil_ak01_id: ak01.id,
                umpan_balik: "",
                ...rekomendasi,
                ...penilaian,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                let data_elemen = {};
                let hasil_sop = {};
                let data_soal = {};
                let rekomendasi = {};
                let penilaian_lanjut = {};
                subElemen.data.map(
                  (sub, index) =>
                    (data_soal["sub_elemen" + (index + 1)] = sub.id)
                );
                elemens.data[0].elemens
                  .filter((elemen) => values.hasOwnProperty(`sop${elemen.id}`))
                  .map(
                    (elemen, index) =>
                      (data_elemen["elemen" + (index + 1)] = elemen.id)
                  );
                const indexElemen = Object.values(data_elemen);
                indexElemen.map(
                  (val, index) =>
                    (hasil_sop["sop" + (index + 1)] = values["sop" + val])
                );
                subElemen.data?.map(
                  (sub, index) =>
                    (rekomendasi["rekomendasi" + (index + 1)] =
                      values["rekomendasi" + (index + 1)])
                );
                subElemen.data?.map(
                  (sub, index) =>
                    (penilaian_lanjut["penilaian" + (index + 1)] =
                      values["penilaian" + (index + 1)])
                );
                const data = {
                  data_inti: {
                    user_id: values.user_id,
                    sesi_id: values.sesi_id,
                    umpan_balik: values.umpan_balik,
                    hasil_apl01_id: values.hasil_apl01_id,
                    hasil_ak01_id: values.hasil_ak01_id,
                  },
                  data_ujian: {
                    data_soal,
                    rekomendasi,
                    penilaian_lanjut,
                  },
                  data_sop: {
                    data_elemen,
                    hasil_sop,
                  },
                };
                iaMutation.mutate(data);
                
              }}
            >
              {({ values, errors }) => (
                <Form>
                  <TabContext value={value}>
                    <div className="">
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        variant="scrollable"
                        scrollButtons="auto"
                      >
                        <Tab
                          label="Benchmark SOP / spesifikasi produk industri"
                          value="1"
                        />
                        <Tab label="Umpan Balik" value="2" />
                        <Tab
                          label="Rekomendasi dan Penilaian Lanjut"
                          value="3"
                        />
                      </TabList>
                    </div>
                    {/* {console.log(values)} */}
                    <TabPanel value="1">
                      <FormSop
                        elemens={elemens.data[0]}
                        values={values}
                        setValue={setValue}
                      />
                    </TabPanel>
                    <TabPanel value="2">
                      <UmpanBalik values={values} setValue={setValue} />
                    </TabPanel>
                    <TabPanel value="3">
                      <FormRekomendasi
                        subElemens={subElemen.data}
                        values={values}
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

export default FormulirIa01;

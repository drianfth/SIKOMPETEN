import { Card, CardContent } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Formik, Form } from "formik";
import FormSop from "../../../../components/ia01/FormSop";
import FormRekomendasi from "../../../../components/ia01/FormRekomendasi";
import { getElemen } from "../../../../api/elemen";
import { useQuery } from "react-query";
import Loading from "../../../../components/Loading";

const FormulirIa01 = () => {
  const location = useLocation();
  const [value, setValue] = React.useState("1");
  const ak01 = location.state.ak01;
  const skema = location.state.skema;
  const apl01 = location.state.apl01;
  const elemens = useQuery("elemen", () => getElemen(skema.id));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card className="shadow-lg h-full">
      <CardContent>
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
              }}
              onSubmit={async (values) => {
                let data_elemen = {};
                let hasil_sop = {};

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
                const data = {
                  data_inti: {
                    user_id: values.user_id,
                    sesi_id: values.sesi_id,
                    hasil_apl01_id: values.hasil_apl01_id,
                    hasil_ak01_id: values.hasil_ak01_id,
                  },
                  data_sop: {
                    data_elemen,
                    hasil_sop,
                  },
                };
                console.log(data);
                alert(JSON.stringify(values, null, 2));
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
                        <Tab
                          label="Rekomendasi dan Penilaian Lanjut"
                          value="2"
                        />
                      </TabList>
                    </div>
                    <TabPanel value="1">
                      <FormSop elemens={elemens.data[0]} values={values} />
                    </TabPanel>
                    <TabPanel value="2">
                      <FormRekomendasi />
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

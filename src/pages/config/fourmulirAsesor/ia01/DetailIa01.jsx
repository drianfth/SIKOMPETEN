import { Card, CardContent } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getIa01 } from "../../../../api/ia01";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DetailSop from "../../../../components/ia01/DetailSop";
import DetailRekomendasi from "../../../../components/ia01/DetailRekomendasi";
import Loading from "../../../../components/Loading";
import FieldInput from "../../DetailApl01/FieldInput";

const DetailIa01 = () => {
  const { id } = useParams();
  const ia01 = useQuery("ia01", () => getIa01(id));
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.IA.01. CEKLIS OBSERVASI
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {ia01.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            {!ia01.data ? (
              <h1 className="text-center">Data Kosong</h1>
            ) : (
              <TabContext value={value}>
                <div className="">
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {/* <Tab
                      label="Benchmark (SOP / spesifikasi produk industri)"
                      value="1"
                    /> */}
                    <Tab label="Umpan Balik" value="1" />
                    <Tab label="Rekomendasi & Penilaian Lanjut" value="2" />
                  </TabList>
                </div>
                {/* <TabPanel value="1">
                  <DetailSop
                    sops={ia01.data[0].jawaban_sops}
                    setValue={setValue}
                  />
                </TabPanel> */}
                <TabPanel value="1">
                  <FieldInput
                    label="Umpan Balik ke Asesi"
                    value={
                      ia01.data[0].umpan_balik ? ia01.data[0].umpan_balik : ""
                    }
                  />
                </TabPanel>
                <TabPanel value="2">
                  <DetailRekomendasi
                    jawaban_ia01s={ia01.data[0].jawaban_ia01s}
                  />
                </TabPanel>
              </TabContext>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailIa01;

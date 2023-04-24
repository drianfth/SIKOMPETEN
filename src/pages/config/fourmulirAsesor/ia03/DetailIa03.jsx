import { Card, CardContent, Tab } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getIa03 } from "../../../../api/ia03";
import Loading from "../../../../components/Loading";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import DetailUmpanBalik from "../../../../components/ia03/DetailUmpanBalik";
import DetailHasil from "../../../../components/ia03/DetailHasil";

const DetailIa03 = () => {
  const { id } = useParams();
  const ia03 = useQuery("ia03", () => getIa03(id));
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.IA.03. PERTANYAAN UNTUK MENDUKUNG OBSERVASI
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {ia03.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            {!ia03.data ? (
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
                    <Tab label="Umpan Balik Tiap Unit" value="1" />
                    <Tab
                      label="Hasil FR.IA.03. Pertanyaan Untuk Mendukung Observasi"
                      value="2"
                    />
                  </TabList>
                </div>
                <TabPanel value="1">
                  <DetailUmpanBalik data={ia03.data[0]?.jawaban_unit_ia03s} />
                </TabPanel>
                <TabPanel value="2">
                  {/* <DetailHasil /> */}
                  <DetailHasil data={ia03.data[0]?.jawaban_ia03s} />
                </TabPanel>
              </TabContext>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailIa03;

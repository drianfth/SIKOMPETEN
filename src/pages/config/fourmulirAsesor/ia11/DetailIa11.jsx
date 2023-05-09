import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getIa11 } from "../../../../api/ia11";
import { Box, Card, CardContent, Tab } from "@mui/material";
import Loading from "../../../../components/Loading";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import DetailUnitPeninjau from "./DetailUnitPeninjau";
import DetailKegiatanAsesmen from "./DetailKegiatanAsesmen";

const DetailIa11 = () => {
  const { id } = useParams();
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const data = useQuery("ia11", () => getIa11(id));

  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.IA.11. CEKLIS MENINJAU INSTRUMEN ASESSMEN
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {data.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  variant="fullWidth"
                  // variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="Data Unit Kompetensi dan Peninjau" value="1" />
                  <Tab label="Kegiatan Asesmen" value="2" />
                </TabList>
              </Box>
              {/* {console.log(values)} */}
              <TabPanel value="1">
                <DetailUnitPeninjau data={data.data} setValue={setValue} />
              </TabPanel>
              <TabPanel value="2">
                <DetailKegiatanAsesmen data={data.data?.result[0]} />
              </TabPanel>
            </TabContext>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailIa11;

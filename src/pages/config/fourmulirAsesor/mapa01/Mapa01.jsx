import { Card, CardContent } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PendekatanAsesmen from "../../../../components/mapa01/PendekatanAsesmen";
import RencanaAsesmen from "../../../../components/mapa01/RencanaAsesmen";

const Mapa01 = () => {
  const location = useLocation();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          Formulir MAPA 01 {location.state.sesi?.nama_sesi}
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        <div className="">
          <TabContext value={value}>
            <div>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Menentukan Pendekatan Asesmen" value="1" />
                <Tab label="Mempersiapkan Rencana Asesmen" value="2" />
                <Tab label="Item Three" value="3" />
              </TabList>
            </div>
            <TabPanel value="1">
              <PendekatanAsesmen />
            </TabPanel>
            <TabPanel value="2">
              <RencanaAsesmen />
            </TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </div>
      </CardContent>
    </Card>
  );
};

export default Mapa01;

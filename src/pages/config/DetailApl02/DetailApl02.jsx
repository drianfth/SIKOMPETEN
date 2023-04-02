import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDetailApl02, getOneApl02 } from "../../../api/apl02";
import Loading from "../../../components/Loading";
import JawabanApl02 from "./JawabanApl02";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Apl02Pengesahan from "./Apl02Pengesahan";
const DetailApl02 = () => {
  let { id } = useParams();
  const { data, isLoading } = useQuery("detailApl02", () => getDetailApl02(id));
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Card className="shadow-lg h-full p-3">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            Detail Formulir APL 02
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          {!data ? (
            <div className="">
              <h1 className="text-center">Tidak Ada Data</h1>
            </div>
          ) : (
            <TabContext value={value}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                className="flex justify-items-center"
              >
                <Tab label="Hasil APL02" value="1" />
                <Tab label="Pengesahan" value="2" />
              </TabList>
              {isLoading ? (
                <Loading />
              ) : (
                <div className="">
                  <TabPanel value="1">
                    <JawabanApl02 data={data} />
                    
                  </TabPanel>
                  <TabPanel value="2">
                    <Apl02Pengesahan data={data[0]} />
                  </TabPanel>
                </div>
              )}
            </TabContext>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailApl02;

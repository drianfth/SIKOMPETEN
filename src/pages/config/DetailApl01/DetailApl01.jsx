import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getDetailApl01 } from "../../../api/apl01";
import { Card, CardContent, Tab, Tabs } from "@mui/material";
import Loading from "../../../components/Loading";
import Button from "../../../components/apl01/Button";
import DataPribadi from "./DataPribadi";
import DataPekerjaan from "./DataPekerjaan";
import BuktiKelengkapan from "./BuktiKelengkapan";
import DataPengesahan from "./DataPengesahan";

const HeadSchema = ({ schema }) => {
  return (
    <div className="flex mx-auto w-fit ">
      <div className="p-4 border border-gray-400 rounded-l-md">
        <p>Skema Sertifikasi</p>
        <span
          className={`${
            schema?.schema_sertifikasi === "KKNI"
              ? ""
              : "line-through hidden sm:inline"
          }`}
        >
          KKNI /
        </span>
        <span
          className={`${
            schema?.schema_sertifikasi === "Okupasi"
              ? ""
              : "line-through hidden sm:inline"
          }`}
        >
          {" "}
          Okupasi /
        </span>
        <span
          className={`${
            schema?.schema_sertifikasi === "Klaster"
              ? ""
              : "line-through hidden sm:inline"
          }`}
        >
          {" "}
          Klaster
        </span>
      </div>
      <div className="border-r border-gray-400 rounded-r-md">
        <div className="p-2 border-t  border-b border-gray-400">
          {schema?.name}
        </div>
        <div className="p-2  border-b border-gray-400">{schema?.nomor}</div>
      </div>
    </div>
  );
};

// const TabButton =

const DetailApl01 = () => {
  let { id } = useParams();
  const { data, isLoading } = useQuery(
    "detailApl01",
    () => getDetailApl01(id),
    {
      refetchInterval: 2000,
    }
  );
  const initialTab = [
    { id: 1, name: "Data Pribadi", active: true },
    { id: 2, name: "Data Pekerjaan", active: false },
    { id: 3, name: "Kelengkapan dan Sertifikasi", active: false },
    { id: 4, name: "Pengesahan", active: false },
  ];
  const [tab, setTab] = useState(initialTab);
  const [currentTab, setCurrentTab] = useState(1);
  const handleTab = (index) => {
    setCurrentTab(index);
    const tempTab = tab.map((t) => {
      if (t.id === index) {
        return {
          ...t,
          active: true,
        };
      } else {
        return {
          ...t,
          active: false,
        };
      }
    });
    setTab(tempTab);
  };
  const handleNextTab = (index) => {
    if (index >= 4) {
      handleTab(4);
    } else {
      handleTab(index + 1);
    }
  };
  const handleBackTab = (index) => {
    if (index <= 1) {
      handleTab(1);
    } else {
      handleTab(index - 1);
    }
  };

  return (
    <div>
      <Card className="shadow-lg h-full">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            Detail Formulir APL 01
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="">
              <HeadSchema schema={data[0].schema} />
              <div className="flex w-full px-3 mt-4">
                <div className="w-2/12 md:flex flex-col hidden">
                  {tab.map((t) => (
                    <Button
                      key={t.id}
                      active={t.active}
                      handleTab={() => handleTab(t.id)}
                    >
                      {t.name}
                    </Button>
                  ))}
                </div>
                <main className="w-full transition-all duration-600">
                  {currentTab === 1 && <DataPribadi data={data[0]} />}
                  {currentTab === 2 && <DataPekerjaan data={data[0]} />}
                  {currentTab === 4 && <DataPengesahan data={data[0]} />}
                  {currentTab === 3 && (
                    <BuktiKelengkapan
                      kelengkapan={data[0].r_kelengkapans}
                      tujuan={data[0].tujuan_asesmen}
                      link={data[0].link}
                    />
                  )}
                </main>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  className="bg-gray-200 px-4 py-2 rounded shadow"
                  onClick={() => handleBackTab(currentTab)}
                >
                  Back
                </button>
                <button
                  className="bg-gray-200 px-4 py-2 rounded shadow"
                  onClick={() => handleNextTab(currentTab)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailApl01;

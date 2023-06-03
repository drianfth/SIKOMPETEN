import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getDetailApl01 } from "../../../api/apl01";
import { Card, CardContent, Tab, Tabs } from "@mui/material";
import Loading from "../../../components/Loading";
import Button from "../../../components/apl01/Button";
import DataPribadi from "./DataPribadi";
import DataPekerjaan from "./DataPekerjaan";
import BuktiKelengkapan from "./BuktiKelengkapan";
import DataPengesahan from "./DataPengesahan";
import { getUnitKompetensi } from "../../../api/unitKompetensi";
import { useReactToPrint } from "react-to-print";
import { CanvasPdf } from "./PdfApl01";
import PrintIcon from "@mui/icons-material/Print";
import useAuthStore from "../../../context/userAuthStore";
import { getAllAdmin } from "../../../api/user";
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
  const { user } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => setLoading(true),
    onBeforePrint: () => setLoading(false),
    pageStyle: `@page {
      margin-top: 2.5cm;
      margin-left: 2.5cm;
      margin-bottom: 2cm;
      margin-right: 2cm;
      size: auto
    }
    @media print { body { -webkit-print-color-adjust: exact; } }"
    `,
  });

  const navigate = useNavigate();
  const { data, isLoading } = useQuery(
    "detailApl01",
    () => getDetailApl01(id),
    {
      refetchInterval: 2000,
    }
  );
  // console.log(data);
  const unitKompetensi = useQuery(
    "unitKompetensi",
    () => getUnitKompetensi(data[0].schema.id),
    {
      enabled: !!data,
    }
  );
  const admins = useQuery("admins", getAllAdmin);
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
  // console.log(user);
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
              <div className="">
                <CanvasPdf
                  componentRef={componentRef}
                  data={data[0]}
                  unitKompetensi={unitKompetensi?.data}
                />
                <button
                  className="bg-sky-700 px-4 py-2 text-white rounded shadow"
                  onClick={handlePrint}
                >
                  {!loading ? <PrintIcon /> : "Donwloading..."}
                </button>
              </div>
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
                  {currentTab === 3 && (
                    <BuktiKelengkapan
                      kelengkapan={data[0].r_kelengkapans}
                      tujuan={data[0].tujuan_asesmen}
                      link={data[0].link}
                    />
                  )}
                  {currentTab === 4 && user?.role === "admin" ? (
                    <DataPengesahan data={data[0]} admins={admins.data} />
                  ) : (
                    <div className="">
                      {currentTab === 4 && (
                        <h1 className="text-center">
                          Anda tidak punya wewenang untuk mengakses halaman ini
                        </h1>
                      )}
                    </div>
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
                  className="bg-sky-700 px-4 py-2 text-white rounded shadow"
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

import React, { useEffect, useState } from "react";
import BuktiKelengkapan from "./apl01/BuktiKelengkapan";
import Button from "./apl01/Button";
import DataPekerjaan from "./apl01/DataPekerjaan";
import DataPribadi from "./apl01/DataPribadi";
import DataSertifikasi from "./apl01/DataSertifikasi";
import useFetchAuth from "../hooks/useFetchAuth";
import Loading from "./Loading";
import kelengkapanApi from "../api/kelengkapan";
import useApl01Store from "../context/ujiKompetensi/useApl01Store";
import { showSchemaApi } from "../api/schema";

const FormApl01 = ({ schema_id, errors, touched }) => {
  // console.log("halo", schema_id);
  const { dataApl01, getKelengkapan } = useApl01Store();
  const [response, setResponse] = useState(null);
  const [dataSkema, setDataSkema] = useState(null);
  const { data, loading } = useFetchAuth(
    `http://127.0.0.1:8000/api/unit_kompetensi/${schema_id}`
  );
  // const {dataApl01} = useApl01Store

  const makeKelengkapan = async () => {
    try {
      const res = await kelengkapanApi({
        url: `http://127.0.0.1:8000/api/kelengkapan/${schema_id}`,
      });
      // console.log(res.data);
      setResponse(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getSchema = async () => {
    try {
      const res = await showSchemaApi({
        url: `http://127.0.0.1:8000/api/schema/${schema_id}`,
      });
      setDataSkema(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getKelengkapan(schema_id);
    makeKelengkapan();
    getSchema();
    // console.log("tes");
  }, []);

  const initialTab = [
    { id: 1, name: "Data Pribadi", active: true },
    { id: 2, name: "Data Pekerjaan", active: false },
    { id: 3, name: "Data Sertifikasi", active: false },
    { id: 4, name: "Bukti Kelengkapan", active: false },
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

  return (
    <div className="flex w-full px-3">
      <div className="w-2/12 flex flex-col ">
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
      {loading ? (
        <div className="mx-auto">
          <Loading />
        </div>
      ) : (
        <main className="w-full transition-all duration-600">
          {currentTab === 1 && (
            <DataPribadi errors={errors} touched={touched} />
          )}
          {currentTab === 2 && <DataPekerjaan />}
          {currentTab === 3 && (
            <DataSertifikasi
              dataUnit={data}
              dataSkema={dataSkema}
              schema_id={schema_id}
            />
          )}
          {currentTab === 4 && <BuktiKelengkapan kelengkapan={response} />}
        </main>
      )}
    </div>
  );
};

export default FormApl01;

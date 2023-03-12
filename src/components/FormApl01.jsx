import React, { useEffect, useState } from "react";
import useApl01Store from "../context/ujiKompetensi/useApl01Store";
import BuktiKelengkapan from "./apl01/BuktiKelengkapan";
import Button from "./apl01/Button";
import DataPekerjaan from "./apl01/DataPekerjaan";
import DataPribadi from "./apl01/DataPribadi";
import DataSertifikasi from "./apl01/DataSertifikasi";

const FormApl01 = ({ schema_id, errors, touched }) => {
  const { setSchemaId } = useApl01Store();
  useEffect(() => {
    setSchemaId(schema_id);
  }, [schema_id]);
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
    <div className="w-full">
      <div className="flex w-full md:px-3">
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
          {currentTab === 1 && (
            <DataPribadi errors={errors} touched={touched} />
          )}
          {currentTab === 2 && <DataPekerjaan errors={errors} />}
          {currentTab === 3 && (
            <DataSertifikasi schema_id={schema_id} errors={errors} />
          )}
          {currentTab === 4 && (
            <BuktiKelengkapan schema_id={schema_id} errors={errors} />
          )}
        </main>
      </div>
      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-200 px-4 py-2 rounded shadow"
          type="button"
          onClick={() => handleBackTab(currentTab)}
        >
          Back
        </button>
        {currentTab === 4 ? (
          <button
            type="submit"
            className="px-4 py-2 rounded shadow bg-sky-700 text-white"
            // onClick={() => handleNextTab(currentTab)}
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            className="bg-sky-700 px-4 py-2 rounded shadow text-white"
            onClick={() => handleNextTab(currentTab)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default FormApl01;

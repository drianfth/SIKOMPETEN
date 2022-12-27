import React, { useState } from "react";
import Button from "./apl01/Button";
import DataPribadi from "./apl01/DataPribadi";

const FormApl01 = () => {
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

      <main className="w-full transition-all duration-600">
        {currentTab === 1 && <DataPribadi />}
      </main>
    </div>
  );
};

export default FormApl01;

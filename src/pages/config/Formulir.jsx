import React from "react";
import { useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import DescriptionIcon from "@mui/icons-material/Description";

const Formulir = () => {
  const { id } = useParams();
  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Formulir {id}
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Menu
          name="Formulir APL 01"
          icon={
            <DescriptionIcon className="text-gray-700 group-hover:text-white" />
          }
          href={`/formulir/apl01/${id}`}
        />
        <Menu
          name="Formulir APL 02"
          icon={
            <DescriptionIcon className="text-gray-700 group-hover:text-white" />
          }
          href={`/formulir/apl01/${id}`}
        />
        <Menu
          name="Formulir MAPA 01"
          icon={
            <DescriptionIcon className="text-gray-700 group-hover:text-white" />
          }
          href={`/formulir/apl01/${id}`}
        />
        <Menu
          name="Formulir MAPA 02"
          icon={
            <DescriptionIcon className="text-gray-700 group-hover:text-white" />
          }
          href={`/formulir/apl01/${id}`}
        />
      </div>
    </div>
  );
};

export default Formulir;

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";

const Menu = ({ icon, name, navigate }) => {
  return (
    <div
      className="p-6 flex justify-between hover:cursor-pointer bg-sky-50 border border-gray-200 hover:text-white group rounded-lg shadow-sm hover:bg-sky-700"
      onClick={navigate}
    >
      <div className="flex space-x-3 truncate overflow-hidden">
        {icon}
        <h1 className="font-semibold">{name}</h1>
      </div>
    </div>
  );
};

const ListFr = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const openHasilAPL01 = () => {
    navigate(`/hasil/detailapl01/${id}`);
  };
  const openHasilAPL02 = () => {
    navigate(`/hasil/detailapl02/${id}`);
  };
  const openHasilAK01 = () => {
    navigate(`/hasil/detailak01/${id}`);
  };
  const openHasilIA01 = () => {
    navigate(`/hasil/detailia01/${id}`);
  };
  const openHasilIA03 = () => {
    navigate(`/hasil/detailia03/${id}`);
  };
  const openHasilIA07 = () => {
    navigate(`/hasil/detailia07/${id}`);
  };
  const openHasilAK02 = () => {
    navigate(`/hasil/detailak02/${id}`);
  };
  const openHasilAK03 = () => {
    navigate(`/hasil/detailak03/${id}`);
  };
  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        Kelola Paket Skema
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Menu
          name="Formulir APL-01"
          icon={
            <DescriptionIcon className="text-gray-700 group-hover:text-white" />
          }
          navigate={openHasilAPL01}
        />
        <Menu
          name="Formulir APL-02"
          icon={
            <DescriptionIcon className="text-gray-700 group-hover:text-white" />
          }
          navigate={openHasilAPL02}
        />
        <Menu
          name="Formulir AK-01"
          icon={
            <DescriptionIcon className="text-gray-700 group-hover:text-white" />
          }
          navigate={openHasilAK01}
        />
        <Menu
          name="Formulir IA-01"
          icon={
            <DescriptionIcon className="text-gray-700 group-hover:text-white" />
          }
          navigate={openHasilIA01}
        />
        <Menu
          name="Formulir IA-03"
          icon={
            <DescriptionIcon className="text-gray-700 group-hover:text-white" />
          }
          navigate={openHasilIA03}
        />
        <Menu
          name="Formulir IA-07"
          icon={
            <DescriptionIcon className="text-gray-700 group-hover:text-white" />
          }
          navigate={openHasilIA07}
        />
        <Menu
          name="Formulir AK-02"
          icon={
            <DescriptionIcon className="text-gray-700 group-hover:text-white" />
          }
          navigate={openHasilAK02}
        />
        <Menu
          name="Formulir AK-03"
          icon={
            <DescriptionIcon className="text-gray-700 group-hover:text-white" />
          }
          navigate={openHasilAK03}
        />
      </div>
    </div>
  );
};

export default ListFr;

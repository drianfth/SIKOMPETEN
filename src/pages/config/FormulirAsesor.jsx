import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import { useQuery } from "react-query";
import { getSesiNow } from "../../api/sesi";
import Loading from "../../components/Loading";

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

const FormulirAsesor = () => {
  const { id } = useParams();
  const { data: dataSesi, isLoading } = useQuery("sesiNow", () =>
    getSesiNow(id)
  );
  const navigate = useNavigate();
  const openDaftarAK = () => {
    navigate("/configuration/daftar-ak01/", {
      state: {
        sesi: dataSesi[0],
      },
    });
  };
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            Formulir {dataSesi[0]?.nama_sesi}
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Menu
              name="Formulir AK-01"
              icon={
                <DescriptionIcon className="text-gray-700 group-hover:text-white" />
              }
              navigate={openDaftarAK}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FormulirAsesor;

import { Button, Card, CardContent } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import useAuthStore from "../../../../context/userAuthStore";

const DetailAk05 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="">
      <div className="text-center font-bold pb-6 text-xl text-gray-800">
        FR.AK.05. LAPORAN ASESMEN
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>

      {user.id === location.state.sesi.asesor1_id ||
      user.id === location.state.sesi.asesor2_id ? (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          className="mb-4"
          // dis
          //   disabled={ak03.data?.result?.id ? true : false}
          onClick={() =>
            navigate(`/formulir/frak05/`, {
              state: {
                sesi: location.state,
              },
            })
          }
        >
          Isi FR.AK.05
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default DetailAk05;

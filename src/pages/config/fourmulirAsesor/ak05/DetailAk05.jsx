import { Button, Card, CardContent } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const DetailAk05 = () => {
  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate();
  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.AK.05. LAPORAN ASESMEN
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          className="mb-4"
          // dis
          //   disabled={ak03.data?.result?.id ? true : false}
          onClick={() => navigate(`/formulir/frak05/${id}`)}
        ></Button>
      </CardContent>
    </Card>
  );
};

export default DetailAk05;

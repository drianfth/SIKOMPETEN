import { Button, Card, CardContent } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAk03 } from "../../../api/ak03";
import FieldInput from "../../config/DetailApl01/FieldInput";
import RadioDetail from "../../../components/RadioDetail";
import TextAreaDetail from "../../../components/TextAreaDetail";

const formatAmPm = (tanggal) => {
  const date = new Date(tanggal);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;

  return tanggal === undefined ? "" : strTime;
};

const DetailAK03 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ak03 = useQuery("ak03", () => getAk03(id));
  const options = [
    { id: 1, label: "Ya", value: "Ya" },
    { id: 2, label: "Tidak", value: "Tidak" },
  ];
  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.AK.03. UMPAN BALIK DAN CATATAN ASESMEN
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          className="mb-4"
          // dis
          disabled={ak03.data?.result?.id ? true : false}
          onClick={() => navigate(`/formulir/frak03/${id}`)}
        >
          Isi Formulir AK-03
        </Button>
        {/* {console.log(!ak03.data?.result.id)} */}
        <div className="border border-gray-200 rounded-md p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
          <FieldInput
            label="Name Asesi"
            value={ak03.data?.result?.user?.name || ""}
          />
          <FieldInput
            label="Name Asesor"
            value={ak03.data?.result?.asesor?.name || ""}
          />
          <FieldInput
            label="Tanggal"
            value={ak03.data?.result?.tanggal || ""}
          />
          <FieldInput
            label="Waktu"
            value={formatAmPm(ak03.data?.result?.tanggal) || ""}
          />
        </div>
        <div className="">
          {ak03.data?.result?.jawaban_ak03s?.map((jawaban, index) => (
            <div className="" key={index}>
              <RadioDetail
                label={jawaban.komponen.name}
                options={options}
                value={jawaban.hasil}
                // key={index}
              />
              <FieldInput label="Catatan" value={jawaban.catatan || ""} />
            </div>
          ))}
        </div>
        <div className="border border-gray-200 rounded-md p-4 shadow-sm grid grid-cols-1 my-4 ">
          <TextAreaDetail
            label="Catatan/komentar lainnya"
            value={ak03.data?.result?.komentar}
          />
        </div>
        <Button
          variant="contained"
          type="button"
          className="bg-gray-400"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </CardContent>
    </Card>
  );
};

export default DetailAK03;

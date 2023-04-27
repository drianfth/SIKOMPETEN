import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailAk01 } from "../../api/ak01";
import { Button, Card, CardContent } from "@mui/material";
import Loading from "../../components/Loading";
import FieldInput from "../config/DetailApl01/FieldInput";

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

const formatAmPm = (tanggal) => {
  const date = new Date(tanggal);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

const DetailAk01U = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ak01 = useQuery("detailAk01", () => getDetailAk01(id));
  return (
    <Card>
      <CardContent>
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.AK.01
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {!ak01.data ? (
          <div className="">
            <h1 className="text-center">Tidak Ada Data</h1>
          </div>
        ) : (
          <div className="">
            {ak01.isLoading ? (
              <Loading />
            ) : (
              <>
                <HeadSchema schema={ak01.data[0].sesi.paket_skema.schema} />
                <div className="grid grid-cols-1 mt-3 md:grid-cols-2 gap-x-3">
                  <FieldInput label="TUK" value={ak01.data[0]?.tuk} />
                  <FieldInput label="Asesi" value={ak01.data[0]?.asesi.name} />
                  <FieldInput
                    label="Tanggal"
                    value={ak01.data[0]?.sesi.paket_skema.tanggal}
                  />
                  <FieldInput
                    label="Waktu"
                    value={formatAmPm(ak01.data[0]?.sesi.jam)}
                  />
                  <FieldInput
                    label="Tempat Uji Kompetensi"
                    value={ak01.data[0].sesi.paket_skema.tuk.nama_tuk}
                  />
                  <FieldInput label="Bukti" value={ak01.data[0].bukti} />
                  <FieldInput
                    label="Status Konfirmasi"
                    value={
                      ak01.data[0].konfirmasi_asesi === 1
                        ? "Sudah dikonfirmasi"
                        : "Belum Dikonfirmasi"
                    }
                  />
                </div>
                <Button
                  variant="contained"
                  className="bg-sky-700"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailAk01U;

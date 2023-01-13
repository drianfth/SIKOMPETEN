import { Card, CardContent } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import schemaApi from "../../api/schema";
import Loading from "../../components/Loading";
import SubTimeLine from "../../components/SubTimeLine";
import useAuthStore from "../../context/userAuthStore";
import useSchemaStore from "../../context/useSchemaStore";
import useFetchAuth from "../../hooks/useFetchAuth";
// import useNavStore from "../../context/useNavStore";

const UjiKompetensi = () => {
  const { data, loading } = useFetchAuth("http://127.0.0.1:8000/api/jadwal");

  return (
    <div className="">
      <Card className="shadow-lg h-full">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            Uji Kompetensi
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="flex justify-center my-10">
              <ol className="relative border-l w-9/12 ml-4 border-gray-200">
                {data?.map((jadwal) => (
                  <SubTimeLine
                    key={jadwal.id}
                    title={jadwal.name}
                    time={jadwal.tanggal}
                    href="/dashboard/apl01"
                    content={jadwal.deskripsi}
                    active={jadwal.status === 0 ? "" : "active"}
                  />
                ))}
              </ol>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UjiKompetensi;

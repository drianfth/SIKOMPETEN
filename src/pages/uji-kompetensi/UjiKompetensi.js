import { Card, CardContent } from "@mui/material";
import useAuthStore from "../../context/userAuthStore";
import { useQuery } from "react-query";
import { getOneApl01 } from "../../api/apl01";
import Loading from "../../components/Loading";
import SubTimeLine from "../../components/SubTimeLine";
import useFetchAuth from "../../hooks/useFetchAuth";

const UjiKompetensi = () => {
  const { data, loading } = useFetchAuth("http://127.0.0.1:8000/api/jadwal");
  const { user } = useAuthStore();

  const hasilQuery = useQuery("oneHasilApl01", () => getOneApl01(user.id));
  const isDoApl01 = hasilQuery.data?.some((t) => t.konfirmasi === 0);

  // console.log(isDoApl01);

  return (
    <div className="">
      <Card className="shadow-lg h-full">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            Uji Kompetensi
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>
          {/* {status && (
            <div className=" w-1/2 mx-auto">
              <Alert message={status} error={false} />
            </div>
          )} */}

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
                    href={jadwal.href}
                    content={jadwal.deskripsi}
                    isDoApl01={isDoApl01}
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

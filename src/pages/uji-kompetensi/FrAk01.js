import { Alert, Button, Card, CardContent } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { getAk01, updateAk01 } from "../../api/ak01";
import Loading from "../../components/Loading";
import useAuthStore from "../../context/userAuthStore";
import FieldInput from "../config/DetailApl01/FieldInput";
import Ak01 from "../config/fourmulirAsesor/ak01/Ak01";
import { useNavigate } from "react-router-dom";
import LoadingBackground from "../../components/Backdrop";

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
const FrAk01 = () => {
  const { user } = useAuthStore();
  const [open, setOpen] = React.useState(false);

  const updateMutation = useMutation(updateAk01, {
    onMutate: () => {
      setOpen(true);
    },
    onSuccess: () => {
      setOpen(false);
      navigate(-1);
    },
  });
  const navigate = useNavigate();

  // console.log(user.id);
  const ak02 = useQuery("detailAk01", () => getAk01(user.id));
  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <LoadingBackground open={open} />

        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.AK.01
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {ak02.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            <HeadSchema schema={ak02.data[0].sesi.paket_skema.schema} />
            <Alert
              variant="outlined"
              severity="info"
              className="mt-4 w-10/12 md:w-1/2 mx-auto"
            >
              Persetujuan Asesmen ini untuk menjamin bahwa Asesi telah diberi
              arahan secara rinci tentang perencanaan dan proses asesmen
            </Alert>
            <Formik
              initialValues={{ konfirmasi_asesi: 1 }}
              onSubmit={async (values) => {
                updateMutation.mutate({ data: values, id: ak02.data[0].id });
                // console.log(values);
              }}
            >
              {({ values }) => (
                <Form>
                  <div className="grid grid-cols-1 mt-3 md:grid-cols-2 gap-x-3">
                    {/* {console.log(values)} */}
                    <FieldInput label="TUK" value={ak02.data[0]?.tuk} />
                    <FieldInput
                      label="Asesor"
                      value={ak02.data[0]?.asesor.name}
                    />
                    <FieldInput
                      label="Tanggal"
                      value={ak02.data[0]?.sesi.paket_skema.tanggal}
                    />
                    <FieldInput
                      label="waktu"
                      value={formatAmPm(ak02.data[0]?.sesi.jam)}
                    />
                    <FieldInput
                      label="Tempat Uji Kompetensi"
                      value={ak02.data[0].sesi.paket_skema.tuk.nama_tuk}
                    />
                    <FieldInput label="Bukti" value={ak02.data[0].bukti} />
                  </div>
                  <Button
                    variant="contained"
                    type="submit"
                    className="bg-sky-700"
                  >
                    Konfirmasi
                  </Button>
                </Form>
              )}
            </Formik>
            <Alert
              variant="outlined"
              severity="info"
              className="mt-4 w-10/12 md:w-1/2 mx-auto"
            >
              <p>
                <strong>Asesi :</strong>{" "}
              </p>{" "}
              Bahwa Saya Sudah Mendapatkan Penjelasan Hak dan Prosedur Banding
              Oleh Asesor.
            </Alert>

            <Alert
              variant="outlined"
              severity="info"
              className="mt-4 w-10/12 md:w-1/2 mx-auto"
            >
              <p>
                <strong>Asesor :</strong>{" "}
              </p>{" "}
              Menyatakan tidak akan membuka hasil pekerjaan yang saya peroleh
              karena penugasan saya sebagai Asesor dalam pekerjaan Asesmen
              kepada siapapun atau organisasi apapun selain kepada pihak yang
              berwenang sehubungan dengan kewajiban saya sebagai Asesor yang
              ditugaskan oleh LSP
            </Alert>
            <Alert
              variant="outlined"
              severity="info"
              className="mt-4 w-10/12 md:w-1/2 mx-auto"
            >
              <p>
                <strong>Asesi :</strong>{" "}
              </p>{" "}
              Saya setuju mengikuti asesmen dengan pemahaman bahwa informasi
              yang dikumpulkan hanya digunakan untuk pengembangan profesional
              dan hanya dapat diakses oleh orang tertentu saja.
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FrAk01;

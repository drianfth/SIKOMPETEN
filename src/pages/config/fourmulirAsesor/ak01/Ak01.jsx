import { Alert, Button, Card, CardContent } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { addAk01 } from "../../../../api/ak01";
import CheckboxInput from "../../../../components/apl01/CheckboxInput";
import SelectInput from "../../../../components/apl01/SelectInput";
import useAuthStore from "../../../../context/userAuthStore";
import FieldInput from "../../DetailApl01/FieldInput";
import LoadingBackground from "../../../../components/Backdrop";

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

const Ak01 = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const { user } = useAuthStore();
  const createAk01Mutation = useMutation(addAk01, {
    onMutate: () => {
      setOpen(true);
    },
    onSuccess: () => {
      setOpen(false);
      navigate(-1);
    },
  });
  const schema = location.state.sesi.paket_skema.schema;
  const optionTUK = [
    { id: 1, value: "Sewaktu", name: "Sewaktu" },
    { id: 2, value: "Tempat Kerja", name: "Tempat Kerja" },
    { id: 3, value: "Mandiri", name: "Mandiri" },
  ];
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
  const optionBukti = [
    {
      id: 1,
      label: "TL : Verifikasi Portofolio  ",
      value: "TL : Verifikasi Portofolio  ",
    },
    { id: 2, label: "L : Observasi Langsung", value: "L : Observasi Langsung" },
    { id: 3, label: "T: Hasil Tes Tulis", value: "T: Hasil Tes Tulis" },
    { id: 4, label: "T: Hasil Tes Lisan", value: "T: Hasil Tes Lisan" },
    { id: 5, label: "T: Hasil Wawancara", value: "T: Hasil Wawancara" },
  ];
  console.log(location);
  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <LoadingBackground open={open} />

        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.AK.01 {location.state.sesi?.nama_sesi}
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        <HeadSchema schema={schema} />
        <div className="">
          <Alert
            variant="outlined"
            severity="info"
            className="mt-4 w-10/12 md:w-1/2 mx-auto"
          >
            Persetujuan Asesmen ini untuk menjamin bahwa Asesi telah diberi
            arahan secara rinci tentang perencanaan dan proses asesmen
          </Alert>
          <Formik
            initialValues={{
              asesi_id: "",
              asesor_id: user.id,
              sesi_id: location.state.sesi.id,
              tuk: "",
              bukti: [],
            }}
            onSubmit={async (values) => {
              const data = {
                asesi_id: values.asesi_id,
                asesor_id: values.asesor_id,
                sesi_id: values.sesi_id,
                tuk: values.tuk,
                bukti: values.bukti.toString(),
              };
              // alert(JSON.stringify(data, null, 2));
              createAk01Mutation.mutate(data);
            }}
          >
            {() => (
              <Form>
                <div className="grid grid-cols-1 px-5 gap-2 md:grid-cols-2 mt-4">
                  <SelectInput
                    label="TUK"
                    mandatory={true}
                    name="tuk"
                    option={optionTUK}
                  />
                  <FieldInput label="Asesor" value={user.name} />
                  <FieldInput
                    label="Tanggal"
                    value={location.state.sesi.paket_skema.tanggal}
                  />
                  <FieldInput
                    label="waktu"
                    value={formatAmPm(location.state.sesi.jam)}
                  />
                  <FieldInput
                    label="TUK"
                    value={location.state.sesi.paket_skema.tuk.nama_tuk}
                  />
                  <CheckboxInput
                    label="Bukti yang dikumpulkan"
                    name="bukti"
                    options={optionBukti}
                  />
                </div>
                <Button
                  variant="contained"
                  type="submit"
                  className="bg-sky-700"
                >
                  Submit
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
            karena penugasan saya sebagai Asesor dalam pekerjaan Asesmen kepada
            siapapun atau organisasi apapun selain kepada pihak yang berwenang
            sehubungan dengan kewajiban saya sebagai Asesor yang ditugaskan oleh
            LSP
          </Alert>
          <Alert
            variant="outlined"
            severity="info"
            className="mt-4 w-10/12 md:w-1/2 mx-auto"
          >
            <p>
              <strong>Asesi :</strong>{" "}
            </p>{" "}
            Saya setuju mengikuti asesmen dengan pemahaman bahwa informasi yang
            dikumpulkan hanya digunakan untuk pengembangan profesional dan hanya
            dapat diakses oleh orang tertentu saja.
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default Ak01;

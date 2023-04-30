import React, { useMemo } from "react";
import FieldInput from "../config/DetailApl01/FieldInput";
import DataTable from "../../components/DataTable";
import { Box, Button, Card, CardContent, Tab } from "@mui/material";
import TextAreaDetail from "../../components/TextAreaDetail";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAK02 } from "../../api/ak02";
import Loading from "../../components/Loading";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";

const DetailFormAsesmen = ({ data, setValue }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Unit Kompetensi",
        accessor: "judul_unit",
      },
    ],
    []
  );
  const dataTable = useMemo(
    () => data?.hasil_apl01.schema.unit_kompetensis,
    [data?.hasil_apl01.schema.unit_kompetensis]
  );

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-3">
        <FieldInput label="Nama Asesi" value={data?.user.name} />
        <FieldInput label="Nama Asesor" value={data?.asesor.name} />
        <div className="md:col-span-2">
          <FieldInput
            label="Skema Sertifikasi"
            value={data?.hasil_apl01.schema.name}
          />
        </div>
        <FieldInput label="Tanggal Mulai" value={data?.tanggal_mulai} />
        <FieldInput label="Tanggal Selesai" value={data?.tanggal_selesai} />
      </div>
      <div className="mt-4 max-w-5xl mx-auto">
        <DataTable columns={columns} data={dataTable} nomor />
      </div>
      <div className="">
        <Button
          variant="contained"
          type="button"
          className="bg-sky-700"
          onClick={() => setValue("2")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const DetailBuktiKompetensi = ({ data, setValue }) => {
  return (
    <div className="">
      <div className="">
        {data.map((jawaban, index) => (
          <div className="mb-4" key={index}>
            <TextAreaDetail
              label={`${index + 1}) ${jawaban.unit_kompetensi.judul_unit}`}
              value={jawaban.jawaban}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Button
          variant="contained"
          type="button"
          className="bg-gray-500"
          onClick={() => setValue("1")}
        >
          Back
        </Button>
        <Button
          variant="contained"
          type="button"
          className="bg-sky-700"
          onClick={() => setValue("3")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const DetailRekomendasi = ({ data, setValue }) => {
  return (
    <div className="">
      <div className="">
        <FieldInput
          label="Rekomendasi Hasil Asesmen"
          value={data.rekomendasi}
        />
        <FieldInput
          label="Tindak lanjut yang dibutuhkan"
          value={data.tindak_lanjut}
        />
        <FieldInput
          label="Komentar/ Observasi dari asesor"
          value={data.komentar}
        />
      </div>
      <div className="flex justify-start mt-4">
        <Button
          variant="contained"
          type="button"
          className="bg-gray-500"
          onClick={() => setValue("2")}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

const DetailAK02U = () => {
  const { id } = useParams();
  const ak02 = useQuery("ak02", () => getAK02(id));
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.AK.02. FORMULIR REKAMAN ASESMEN KOMPETENSI
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {ak02.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            {!ak02.data ? (
              <h1 className="text-center">Data Kosong</h1>
            ) : (
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    variant="fullWidth"
                    scrollButtons="auto"
                  >
                    <Tab label="Data Asesmen" value="1" />
                    <Tab label="Bukti Kompetensi Asesi" value="2" />
                    <Tab label="Hasil Asesmen" value="3" />
                  </TabList>
                </Box>

                <TabPanel value="1">
                  <DetailFormAsesmen data={ak02.data} setValue={setValue} />
                </TabPanel>
                <TabPanel value="2">
                  <DetailBuktiKompetensi
                    data={ak02.data?.jawaban_ak02s}
                    setValue={setValue}
                  />
                </TabPanel>
                <TabPanel value="3">
                  <DetailRekomendasi data={ak02.data} setValue={setValue} />
                </TabPanel>
              </TabContext>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailAK02U;

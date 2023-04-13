import React from "react";
import { useQuery } from "react-query";
import { getPertanyaanIa03 } from "../../../../api/pertanyaania03";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import Loading from "../../../../components/Loading";
import { Field } from "formik";

const HeadUnitKomptensi = ({ data }) => {
  return (
    <div className="flex justify-center">
      <div className="p-4 border border-gray-200 rounded-l-md text-center">
        <p className="font-semibold">Unit Komptensi</p>
      </div>
      <div className="border border-gray-200 rounded-r-md">
        <div className="p-2 border-b border-gray-200">
          <p>
            <span className="font-semibold">Kode Unit : </span>
            {data.kode_unit}
          </p>
        </div>
        <div className="p-2">
          <p>
            <span className="font-semibold">Judul Unit : </span>
            {data.judul_unit}
          </p>
        </div>
      </div>
    </div>
  );
};

const Question = ({ pertanyaan, nomor, nameRadio, nameJawaban }) => {
  // console.log(subElemen.elemen);
  return (
    <div className="">
      <HeadUnitKomptensi data={pertanyaan.unit_kompetensi} />
      <div className="w-full md:p-4">
        <ol>
          <li>
            <p className="mb-3">
              <strong> {nomor + 1}) Pertanyaan : </strong> {pertanyaan.name}
            </p>
            <div className=" ml-2 mt-5 ">
              <div className="mb-8">
                <label htmlFor="" className="font-bold">
                  Rekomendasi
                </label>
                <div className="flex gap-x-10">
                  <div className="flex items-center ">
                    <Field
                      type="radio"
                      value="K"
                      name={nameRadio}
                      id={nameRadio + "1"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      htmlFor={nameRadio + "1"}
                      className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Kompeten
                    </label>
                  </div>

                  <div className="flex items-center ">
                    <Field
                      type="radio"
                      value="BK"
                      name={nameRadio}
                      id={nameRadio + "2"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      htmlFor={nameRadio + "2"}
                      className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Belum Kompeten
                    </label>
                  </div>
                </div>
              </div>
              <div className="">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm  text-gray-900 font-bold"
                >
                  {" "}
                  Jawaban
                </label>
                <Field
                  as="textarea"
                  rows="4"
                  name={nameJawaban}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Jawaban Asesi"
                ></Field>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

const SectionUnit = ({ pertanyaan, unit_kompetensi }) => {
  const pertanyaan_unit = pertanyaan.filter(
    (pertanyaan) => pertanyaan.unit_kompetensi.id === unit_kompetensi.id
  );
  console.log("pertanyaan unit", pertanyaan_unit);
  return <div className="">{unit_kompetensi.judul_unit}</div>;
};

const FormulirIa03 = () => {
  const location = useLocation();
  const ak01 = location.state.ak01;
  const skema = location.state.skema;
  const apl01 = location.state.apl01;
  const pertanyaanIa03 = useQuery("pertanyaan-ia03", () =>
    getPertanyaanIa03(skema.id)
  );

  const unit_kompetensi =
    pertanyaanIa03.isFetched &&
    pertanyaanIa03.data
      .filter((pertanyaan, index) => {
        // Filter out any pertanyaans that have already occurred earlier in the array
        return (
          index ===
          pertanyaanIa03.data.findIndex((prevPertanyaan) => {
            // Use the indexOf method to compare pertanyaan equality
            return (
              JSON.stringify(prevPertanyaan.unit_kompetensi) ===
              JSON.stringify(pertanyaan.unit_kompetensi)
            );
          })
        );
      })
      .map((pertanyaan) => pertanyaan.unit_kompetensi);
  //   console.log(unit_kompetensi);
  return (
    <Card className="shadow-lg h-full">
      <CardContent>
        <div className="text-center font-bold pb-6 text-xl text-gray-800">
          FR.IA.03. PERTANYAAN UNTUK MENDUKUNG OBSERVASI
          <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
        </div>
        {pertanyaanIa03.isLoading ? (
          <Loading />
        ) : (
          <div className="">
            <SectionUnit
              unit_kompetensi={unit_kompetensi[0]}
              pertanyaan={pertanyaanIa03.data}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormulirIa03;

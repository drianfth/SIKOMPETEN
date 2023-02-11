import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getElemen } from "../../api/elemen";
import useSchemaStore from "../../context/ujiKompetensi/useSchemaStore";
import Loading from "../Loading";
import Question from "./Question";

const BoxNumber = ({ number, elemenIndex }) => {
  return (
    <div
      className={`${
        elemenIndex + 1 === number ? "bg-green-400" : "bg-gray-200"
      }  cursor-pointer p-3 h-12 text-center rounded-md hover:bg-gray-100 font-medium`}
    >
      {number}
    </div>
  );
};

const LabelSchema = ({ schema }) => {
  return (
    <div className="flex">
      <div className="p-4 border border-gray-200 rounded-l-md text-center">
        <p>Skema Sertifikasi</p>
        <p>({schema[0]?.schema_sertifikasi})</p>
      </div>
      <div className="border border-gray-200 rounded-r-md">
        <div className="p-2 border-b border-gray-200">
          <p>
            <span>Judul : </span>
            {schema[0]?.name}
          </p>
        </div>
        <div className="p-2">
          <p>
            <span>Nomor : </span> {schema[0]?.nomor}
          </p>
        </div>
      </div>
    </div>
  );
};

const FormApl02 = () => {
  const elemens = useQuery("elemens", () => getElemen(schema[0].id));
  const { schema } = useSchemaStore();
  const [elemenIndex, setElemenIndex] = useState(0);
  let num = 1;
  const elemenQues = useMemo(
    () => (elemens.isSuccess ? elemens.data[0].elemens : null),
    [elemens]
  );
  return (
    <div>
      {elemens.isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-center">
            <LabelSchema schema={schema} />
          </div>
          <div className="flex w-full gap-x-5 mt-5">
            <div className="basis-9/12">
              <Question elemen={elemenQues[elemenIndex]} nomor={elemenIndex} />
            </div>
            <div className=" basis-3/12  h-fit shadow-md rounded-md p-2">
              <h1 className="my-3 text-center font-semibold text-gray-800">
                Nomor Elemen
              </h1>
              <div className="grid grid-cols-5 gap-2">
                {elemens.data[0].elemens.map((e) => (
                  <BoxNumber
                    number={num++}
                    key={e.id}
                    elemenIndex={elemenIndex}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-10">
            <button
              className="btn btn-secondary"
              onClick={() => elemenIndex > 0 && setElemenIndex(elemenIndex - 1)}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() =>
                elemenIndex < elemenQues.length &&
                setElemenIndex(elemenIndex + 1)
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormApl02;

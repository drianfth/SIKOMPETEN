import React, { useState } from "react";
import RadioDetail from "../../../../components/RadioDetail";
import TextAreaDetail from "../../../../components/TextAreaDetail";

const Question = ({ nomor, data }) => {
  const options = [
    { id: 1, label: "Ya", value: "Ya" },
    { id: 2, label: "Tidak", value: "Tidak" },
  ];
  return (
    <div className="w-full md:p-4">
      <h1 className="mb-4 text-gray-800 w-full font-medium">
        <span className="font-bold">{nomor}) KegiatanAsesmen:</span>{" "}
        {data.kegiatan_asesmen.name}
      </h1>
      <RadioDetail
        options={options}
        label="Ya/Tidak"
        value={data["ya/tidak"]}
      />
      <div className="mt-5">
        <label className="block mb-2 text-sm font-semibold text-gray-900">
          Komentar
        </label>
        <TextAreaDetail label="Komentar" value={data.komentar} rows={4} />
      </div>
    </div>
  );
};

const BoxNumber = ({ number, kegiatanIndex, setKegiatanIndex, values }) => {
  // const isAnswere = values.hasOwnProperty("soal" + number);
  //   const name = "konfirmasi" + number;
  const isAnswere = values["ya/tidak"] === "Ya";
  let color = "";

  if (kegiatanIndex + 1 === number) {
    color = "bg-gray-100";
  } else if (isAnswere) {
    color = "bg-green-400";
  } else {
    color = "bg-red-400";
  }
  return (
    <div
      className={` ${color}  cursor-pointer p-3 h-12 text-center rounded-md hover:bg-gray-100 font-medium`}
      onClick={() => setKegiatanIndex(number - 1)}
    >
      {number}
    </div>
  );
};

const DetailKegiatanAsesmen = ({ data }) => {
  console.log(data.jawaban_ia11s);
  const [kegiatanIndex, setKegiatanIndex] = useState(0);

  return (
    <div className="flex flex-col">
      <div className="flex w-full gap-x-5 mt-5">
        <div className="basis-9/12">
          <Question
            nomor={kegiatanIndex + 1}
            data={data.jawaban_ia11s[kegiatanIndex]}
          />
        </div>
        <div className="hidden md:flex md:flex-col basis-3/12  h-fit shadow-md rounded-md p-2">
          <h1 className="my-3 text-center font-semibold text-gray-800">
            Nomor Kegiatan
          </h1>
          <div className="md:grid grid-cols-5 gap-2 ">
            {data.jawaban_ia11s.map((jawaban, index) => (
              <BoxNumber
                number={index + 1}
                key={jawaban.id}
                values={jawaban}
                setKegiatanIndex={setKegiatanIndex}
                kegiatanIndex={kegiatanIndex}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-10">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() =>
            kegiatanIndex > 0 && setKegiatanIndex(kegiatanIndex - 1)
          }
        >
          Back
        </button>
        {kegiatanIndex + 1 < data.jawaban_ia11s.length && (
          <button
            className="btn btn-primary"
            type="button"
            onClick={() =>
              kegiatanIndex < data.jawaban_ia11s.length &&
              setKegiatanIndex(kegiatanIndex + 1)
            }
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailKegiatanAsesmen;

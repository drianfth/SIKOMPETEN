import React from "react";

const Question = ({ elemen, nomor }) => {
  return (
    <div className="w-full p-4">
      <h1 className="w-2/3 mt-2 font-bold text-gray-800">
        {elemen.unit_kompetensi.pertanyaan}
      </h1>
      <ol className=" ml-3 mt-2">
        <li>
          <p>
            {nomor + 1}) Elemen: {elemen.name}. Kriteria Unjuk Kerja:
          </p>
          <ul className="list-disc ml-14">
            {elemen.sub_elemens.map((sub_elemen) => (
              <li key={sub_elemen.id}>{sub_elemen.name}</li>
            ))}
          </ul>
          <div className="flex gap-x-10 ml-14 mt-5">
            <div className="flex items-center">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />

              <label className="ml-2 text-sm font-medium text-gray-900">
                Kompeten
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />

              <label className="ml-2 text-sm font-medium text-gray-900">
                Belum Kompeten
              </label>
            </div>
          </div>
          <div className="ml-14 mt-10">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Bukti Relevan
            </label>
            <textarea
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Ketikkan Bukti yang Relevan"
            ></textarea>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default Question;

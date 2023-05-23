import React from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";

const DaftarAK06 = () => {
  const location = useLocation();
  const formik = useFormik({
    initialValues: {
      rekomendasi: "Tidak Ada",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  // console.log(location);
  return (
    <div>
      <div className="text-center font-bold pb-8 text-xl text-gray-800">
        FR.AK.06. MENINJAU PROSES ASESMEN
        <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              name="rekomendasi"
              value="Tidak Ada"
              checked={formik.values.rekomendasi === "Tidak Ada"}
              onChange={formik.handleChange}
            />
            Tidak Ada
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="rekomendasi"
              value="Ada"
              checked={formik.values.rekomendasi === "Ada"}
              onChange={formik.handleChange}
            />
            Ada
          </label>
        </div>
        {formik.values.rekomendasi !== "Tidak Ada" ||
        formik.values.rekomendasi === "" ? (
          <div>
            <label>
              Jawaban:
              <input
                type="text"
                name="rekomendasi"
                value={formik.values.rekomendasi}
                onChange={formik.handleChange}
              />
            </label>
          </div>
        ) : (
          ""
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DaftarAK06;

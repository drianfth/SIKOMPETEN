import { Form, Formik } from "formik";
import React from "react";
import SelectInput from "../apl01/SelectInput";

const PendekatanAsesmen = () => {
  const option = [
    {
      id: 1,
      value: "Hasil pelatihan dan / atau pendidikan",
      name: "Hasil pelatihan dan / atau pendidikan",
    },
    {
      id: 2,
      value: "Pekerja berpengalaman",
      name: "Pekerja berpengalaman",
    },
    {
      id: 3,
      value: "Pelatihan / belajar mand3ri",
      name: "Pelatihan / belajar mandiri",
    },
  ];
  return (
    <div>
      <Formik>
        {({ values, errors }) => (
          <Form>
            <SelectInput />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PendekatanAsesmen;

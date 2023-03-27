import React from "react";
import { getElemen } from "../../api/elemen";
import FieldInput from "../apl01/FieldInput";
import { useQuery } from "react-query";
import Loading from "../Loading";
import { Button } from "@mui/material";
import { Field } from "formik";

const FormSop = ({ elemens, values }) => {
  return (
    <div className="">
      <div className="">
        {elemens.elemens.map((elemen, index) => (
          <div className="pt-6" key={elemen.id}>
            <p className="font-semibold text-gray-800">
              {index + 1}) {elemen.name}
            </p>
            {/* <FieldInput label="SOP" name={"sop" + elemen.id} type="text" key={index} /> */}
            <div className="">
              <label className={`block mb-2 text-sm font-medium text-gray-900`}>
                SOP
              </label>
              <Field
                name={"sop" + elemen.id}
                type="text"
                className={` bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-2  text-sm rounded-lg   block w-full p-2.5 outline-none`}
              />
            </div>
            {
              // if (values.hasOwnProperty(`sop${elemen.id}`)) {
              //   data_elemen['elemen'+elemen.id] = elemen[elemen.id]
              // }
            }
          </div>
        ))}
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FormSop;

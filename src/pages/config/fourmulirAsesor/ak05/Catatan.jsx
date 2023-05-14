import React from "react";
import TextAreaInput from "../../../../components/apl01/TextAreaInput";
import FieldInput from "../../DetailApl01/FieldInput";
import { Button } from "@mui/material";

const Catatan = ({ user, setValue, errors }) => {
  // console.log(user);
  return (
    <div>
      <div className="border border-gray-200 gap-y-4 rounded-md p-4 shadow-sm grid grid-cols-1 mt-4">
        <TextAreaInput
          label="Aspek Negatif dan Positif dalam Asesemen"
          name="aspek_asesmen"
          mandatory={true}
          error={errors.aspek_asesmen}
        />
        <TextAreaInput
          error={errors.catatan_penolakan}
          label="Pencatatan Penolakan Hasil Asesmen"
          name="catatan_penolakan"
          mandatory={true}
        />
        <TextAreaInput
          error={errors.saran_perbaikan}
          label="Saran Perbaikan : (Asesor/Personil Terkait)"
          name="saran_perbaikan"
          mandatory={true}
        />
      </div>
      <div className="border border-gray-200 rounded-md p-4 shadow-sm grid grid-cols-1 mt-4">
        <TextAreaInput
          label="Catatan"
          name="catatan"
          mandatory={true}
          error={errors.catatan}
        />
        <div className="mt-4">
          <FieldInput label="Nama" value={user.name} />
        </div>
        <FieldInput label="No Reg" value={user.no_reg} />
      </div>
      <div className="flex justify-between mt-4">
        <Button
          variant="contained"
          type="button"
          className="bg-gray-500"
          onClick={() => setValue("2")}
        >
          Back
        </Button>
        <button
          className="btn btn-primary"
          type="submit"
          // onClick={() => isValidasi(errors)}
        >
          Submit
        </button>
        {/* <button type="submit">submit</button> */}
      </div>
    </div>
  );
};

export default Catatan;

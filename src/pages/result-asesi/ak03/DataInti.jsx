import React from "react";
import DateInput from "../../../components/apl01/DateInput";
import FieldInput from "../../config/DetailApl01/FieldInput";
import TimeInput from "../../../components/apl01/TimeInput";

const DataInti = ({ errors, values, asesi, asesor }) => {
  return (
    <div className="border border-gray-200 rounded-md p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
      <FieldInput label="Nama Asesi" value={asesi} />
      <FieldInput label="Nama Asesor" value={asesor} />
      <DateInput error={errors.tanggal} label="Tanggal" name="tanggal" />
      <div className="mt-4">
        <TimeInput
          name="waktu"
          label="waktu"
          mandatory={true}
          error={errors.waktu}
        />
      </div>
    </div>
  );
};

export default DataInti;

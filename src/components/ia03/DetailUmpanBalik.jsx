import React from "react";
import FieldInput from "../../pages/config/DetailApl01/FieldInput";

const DetailUmpanBalik = ({ data }) => {
  //   console.log(data);
  return (
    <div>
      {data.map((umpan_balik, index) => (
        <FieldInput
          label={`${index + 1}) ${umpan_balik.unit_kompetensi.judul_unit}`}
          value={umpan_balik.umpan_balik}
          key={index}
        />
      ))}
    </div>
  );
};

export default DetailUmpanBalik;

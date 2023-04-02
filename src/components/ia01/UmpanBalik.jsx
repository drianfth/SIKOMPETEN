import { Button } from "@mui/material";
import React from "react";
import FieldInput from "../apl01/FieldInput";

const UmpanBalik = ({ values, setValue }) => {
  return (
    <div>
      <FieldInput
        label="Umpan Balik untuk Asesi"
        name="umpan_balik"
        type="text"
      />
      <div className="flex justify-end mt-4">
        <Button
          variant="contained"
          type="button"
          className="bg-sky-700"
          onClick={() => setValue("3")}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default UmpanBalik;

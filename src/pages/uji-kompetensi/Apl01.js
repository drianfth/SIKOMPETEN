import {
  Card,
  CardContent,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import { useState } from "react";
import Schema from "../../components/Schema";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";

export const Warning = ({ open, setOpen }) => {
  console.log(open);
  return (
    <Alert
      onClose={() => setOpen(!open)}
      severity="error"
      className={`w-4/12 mx-auto mt-2 ${open ? "" : "hidden"}`}
    >
      Pilih Skema Terlebih dahulu !
    </Alert>
  );
};

const Apl01 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const steps = ["Pilih Skema", "Pengisian Form APL-01"];
  const [skemaValue, setSkemaValue] = useState(null);
  // console.log("open " + open);
  const nextStep = () => {
    if (currentIndex === 0) {
      if (skemaValue != null) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setOpen(!open);
      }
    } else {
      console.log("dikumpulkan");
    }
  };

  return (
    <div>
      <Card className="shadow-lg ">
        <CardContent>
          <div className="text-center font-bold pb-8 text-xl text-gray-800">
            {steps[currentIndex]}
            <div className="w-full h-0.5 bg-gray-100 mt-3"></div>
          </div>

          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={currentIndex} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Warning open={open} setOpen={setOpen} />
            <section className="flex justify-center space-x-10 py-10">
              {currentIndex === 0 && (
                <Schema skemaValue={skemaValue} setSkemaValue={setSkemaValue} />
              )}
            </section>

            <div className="flex justify-between">
              <Button
                variant="contained"
                className="bg-gray-700"
                onClick={() =>
                  currentIndex === 1 && setCurrentIndex(currentIndex - 1)
                }
              >
                Back
              </Button>
              <Button
                variant="contained"
                className="bg-sky-700"
                onClick={nextStep}
              >
                Next
              </Button>
            </div>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Apl01;

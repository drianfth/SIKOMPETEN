import {
  Card,
  CardContent,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import Schema from "../../components/Schema";
import Alert from "@mui/material/Alert";
import useNavStore from "../../context/useNavStore";
import { Formik, Field, Form } from "formik";
import FormApl01 from "../../components/FormApl01";
import useApl01Store from "../../context/ujiKompetensi/useApl01Store";
import InitialKelengkapan from "../../data/kelengkapan.json";

export const Warning = ({ open, setOpen }) => {
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
  const { findNav, switchNav } = useNavStore();
  const currentPage = findNav("Uji Kompetensi");
  const { dataApl01 } = useApl01Store();

  let obj = {};

  for (let index = 0; index < InitialKelengkapan.length; index++) {
    obj[InitialKelengkapan[index].id] = "";
  }
  // console.log(obj);

  useEffect(() => {
    switchNav(currentPage.id);
  }, []);

  // console.log(data);
  const nextStep = (schema) => {
    if (currentIndex === 0) {
      if (schema !== "") {
        setCurrentIndex(currentIndex + 1);
      } else {
        setOpen(false);
      }
    } else {
      console.log("dikumpulkan");
    }
  };
  console.log({ ...dataApl01 });

  return (
    <div>
      <Card className="shadow-lg transition-all duration-600">
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
            <Formik
              initialValues={dataApl01}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {({ values }) => (
                <Form>
                  <section className="flex justify-center space-x-10 py-10 transition-all duration-600">
                    {currentIndex === 0 && <Schema />}
                    {currentIndex === 1 && <FormApl01 />}
                  </section>
                  {/* {console.log(values)} */}
                  <div className="flex justify-between transition-all duration-600">
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
                      onClick={() => nextStep(values.schema)}
                    >
                      Next
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Apl01;

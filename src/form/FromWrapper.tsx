import React, { useEffect, useState } from "react";
import { FromInput } from "./FormInput";
// import { withRouter } from 'react-router-dom';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import "./form.css";
import { SelectPokemon } from "./SelectPokemon";
import { Review } from "./Review";
import { Confirmation } from "./Confirmation";

const steps = ["Fill Details", "Select Pokemon", "Review", "Submit"];

export const FromWrapper: React.FC = () => {
  const initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
  };

  const resetForm = () => {
    setFormValues(initialFormValues);
  };

  const setFormValues = (formValues: any) => {
    setValues({...values, ...formValues});
    localStorage.setItem("form", JSON.stringify(formValues));
  };

  useEffect(() => {
    const formLocalStorage = localStorage.getItem("form");
    if (formLocalStorage) {
      const formValues = JSON.parse(formLocalStorage);
      setValues(formValues);
    }
    setIsLoading(false);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState(initialFormValues);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getCurrentStepComponent = () => {
    let component;
    switch (activeStep) {
      case 0:
        component = (
          <FromInput
            onNext={handleNext}
            setValues={setFormValues}
            values={values}
          />
        );
        break;
      case 1:
        component = (
          <SelectPokemon
            onNext={handleNext}
            onBack={handleBack}
            setValues={setValues}
            values={values}
          />
        );
        break;
      case 2:
        component = (
          <Review
            onNext={handleNext}
            onBack={handleBack}
            values={values}
            resetForm={resetForm}
          />
        );
        break;
      case 3:
        component = <Confirmation />;
        break;
      // no default
    }
    return component;
  };

  return (
    <Box className="form-wrapper">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div style={{margin: "20px"}}>
            {isLoading ? <p>Loading ...</p> : getCurrentStepComponent()}
          </div>
        </React.Fragment>
      )}
    </Box>
  );
};
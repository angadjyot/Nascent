import React from "react";
import { Paper, Grid, Button } from "@mui/material";

interface ReviewProps {
  onNext: () => void;
  onBack: () => void;
  resetForm: () => void;
  values: any;
}

export const Review: React.FC<ReviewProps> = ({
  onNext = () => {},
  onBack = () => {},
  resetForm = () => {},
  values,
}) => {
  const onSubmit = () => {
    resetForm();
    onNext();
  };
  return (
    <Paper style={{ padding: 16 }}>
      <div>First Name: {values.firstName}</div>
      <br />
      <div>Last Name: {values.lastName}</div>
      <br />
      <div>Email: {values.email}</div>
      <br />
      <div>Street: {values.street}</div>
      <br />
      <div>City: {values.city}</div>
      <br />
      <div>State: {values.state}</div>
      <br />
      <div>Pokemon: {values.pokemon}</div>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        style={{ marginTop: 16 }}
      >
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={onBack}
        >
          Previous
        </Button>
        <Button
          sx={{ marginLeft: "5px" }}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Paper>
  );
};

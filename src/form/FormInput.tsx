import React from "react";
import { TextField, Paper, Grid, Button } from "@mui/material";

interface FromInputProps {
  onNext: () => void;
  setValues: (values: any) => void;
  values: any;
}

export const FromInput: React.FC<FromInputProps> = ({
  onNext = () => {},
  setValues,
  values,
}) => {
  const onSubmit = async (e: any) => {
    e.preventDefault();
    onNext();
  };

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Paper style={{ padding: 16 }}>
      <form autoComplete="off" onSubmit={onSubmit}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputValue}
              // onBlur={handleInputValue}
              defaultValue={values.firstName}
              fullWidth
              required
              name="firstName"
              label="First Name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputValue}
              // onBlur={handleInputValue}
              defaultValue={values.lastName}
              fullWidth
              required
              name="lastName"
              label="Last Name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleInputValue}
              // onBlur={handleInputValue}
              defaultValue={values.email}
              fullWidth
              required
              name="email"
              label="Email"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleInputValue}
              // onBlur={handleInputValue}
              defaultValue={values.street}
              fullWidth
              required
              name="street"
              label="Street"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputValue}
              // onBlur={handleInputValue}
              defaultValue={values.city}
              fullWidth
              required
              name="city"
              label="City"
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputValue}
              // onBlur={handleInputValue}
              defaultValue={values.state}
              fullWidth
              required
              name="state"
              label="State"
              variant="standard"
            />
          </Grid>
          <Grid container direction="row" justifyContent="flex-end" style={{ marginTop: 16 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

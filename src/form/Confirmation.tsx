import React from "react";
import { Paper } from "@mui/material";

interface ConfirmationProps {}

export const Confirmation: React.FC<ConfirmationProps> = ({}) => {
  return (
    <Paper style={{ padding: 16 }}>
      <div>Congratulatoins! you form has been submitted</div>
    </Paper>
  );
};

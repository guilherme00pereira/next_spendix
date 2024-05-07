import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AuthType, IAuthContainerProps } from "./AuthContainer";

const RegisterForm = ({ handler }: IAuthContainerProps) => {
  return (
  <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ minHeight: "400px" }}>
    <Button color="primary" onClick={() => handler(AuthType.LOGIN)} sx={{ mt: 2 }}>
        Login
        </Button>
  </Stack>
  );
};

export default RegisterForm;

"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import LoginForm from "@/app/components/auth/LoginForm";
import RegisterForm from "@/app/components/auth/RegisterForm";
import { AuthType } from "@/types/enums";

export interface IAuthContainerProps {
  handler: React.Dispatch<React.SetStateAction<AuthType>>;
}

const Container = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "25%",
  padding: "16px",
  backgroundColor: "white",
}));

const AuthContainer = () => {
  const [authComponent, setAuthComponent] = React.useState<AuthType>(AuthType.LOGIN);

  return (
    <Container>
      {authComponent === AuthType.LOGIN && <LoginForm handler={setAuthComponent} />}
      {authComponent === AuthType.REGISTER && <RegisterForm handler={setAuthComponent} />}
    </Container>
  );
};

export default AuthContainer;

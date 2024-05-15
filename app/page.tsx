import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";

export default function SignIn() {

  return (
    <Container component="main" sx={styles.container} maxWidth={false}>
      <Typography variant="h4" sx={styles.title}>MY WALLET</Typography>
      <Stack spacing={2} direction="row">
      <Button variant="contained" color="primary" href="/auth/login">Login</Button>
      <Button variant="contained" color="primary" href="/dashboard">Painel</Button>
      </Stack>
    </Container>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: "#F0F1F7",
  },
  title: {
    textAlign: 'center',
    mb: 2,
    color: "#845ADF"
  },
}
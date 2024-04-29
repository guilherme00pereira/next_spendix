"use client";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";
import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Entrar");

  const handleCodeChange = () => {
    setLoading(true);
    setButtonText("Aguarde...");
    let code = (document.querySelector("input[name=code]") as HTMLInputElement).value;
    if (code === "1861") {//"f9d1152547c0bde01830b7e8bd60024c"
      //TODO: implement supabase auth and middleware
      router.push("/dashboard");
    } else {
      setError(true);
      setHelperText("Código inválido");
    }
    setLoading(false);
    setButtonText("Entrar");
  }

  return (
    <Container component="main" sx={styles.container} maxWidth={false}>
      <Typography variant="h4" sx={styles.title}>MY WALLET</Typography>
      <Paper sx={styles.card}>
        <Stack direction="column" spacing={2}>
          <TextField label="Código" error={error} helperText={helperText} variant="outlined" name="code"
                     onKeyDown={(e) => {
                       if (e.key === "Enter") {
                          handleCodeChange();
                       }
                     }}/>
          <Button variant="contained" onClick={handleCodeChange} sx={{mt: 2}}>
            {buttonText}
          </Button>
        </Stack>
      </Paper>
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
    backgroundColor: (theme: any) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
  },
  card: {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    width: "280px",
    height: "180px"
  },
  title: {
    textAlign: 'center',
    mb: 2,
    color: (theme: any) => theme.palette.primary.main
  },
}
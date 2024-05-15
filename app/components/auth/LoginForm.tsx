import React from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthType, IAuthContainerProps } from "./AuthContainer";
import { loginFormSubmit } from "@/app/lib/actions/auth-actions";


const LoginForm = ({ handler }: IAuthContainerProps) => {
  const router = useRouter();
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Entrar");

  return (
    <form action={loginFormSubmit}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ minHeight: "400px" }}>
        <TextField
          label="E-mail"
          error={error}
          helperText={helperText}
          variant="outlined"
          name="email"
          autoComplete="email"
        />
        <TextField
          label="Senha"
          error={error}
          helperText={helperText}
          variant="outlined"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {buttonText}
        </Button>
        <Button color="primary" onClick={() => handler(AuthType.REGISTER)} sx={{ mt: 2 }}>
          Registrar
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;

import React from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthType, IAuthContainerProps } from "./AuthContainer";

const LoginForm = ({ handler }: IAuthContainerProps) => {
  const router = useRouter();
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Entrar");

  const handleCodeChange = () => {
    setLoading(true);
    setButtonText("Aguarde...");
    let code = (document.querySelector("input[name=code]") as HTMLInputElement).value;
    if (code === "1861") {
      //TODO: implement supabase auth and middleware
      router.push("/dashboard");
    } else {
      setError(true);
      setHelperText("Código inválido");
    }
    setLoading(false);
    setButtonText("Entrar");
  };

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ minHeight: "400px" }}>
      <TextField
        label="Código"
        error={error}
        helperText={helperText}
        variant="outlined"
        name="code"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCodeChange();
          }
        }}
      />
      <Button variant="contained" onClick={handleCodeChange} sx={{ mt: 2 }}>
        {buttonText}
      </Button>
      <Button color="primary" onClick={() => handler(AuthType.REGISTER)} sx={{ mt: 2 }}>
        Registrar
        </Button>
    </Stack>
  );
};

export default LoginForm;

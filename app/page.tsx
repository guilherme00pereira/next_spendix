"use client";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignIn() {
  const router = useRouter();

  return (
    <Grid>
      <Button type="button" onClick={() => router.push("/dashboard")} fullWidth sx={{ mt: 3, mb: 2 }}>
        Go to Dashboard
      </Button>
      <Button type="button" onClick={() => router.push("/auth")} fullWidth sx={{ mt: 3, mb: 2 }}>
        Go to Auth
      </Button>
    </Grid>
  );
}

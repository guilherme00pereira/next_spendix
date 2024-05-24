import React from "react";
import { useColorScheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

const DarkModeButton = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")}>
      {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </IconButton>
  );
};

export default DarkModeButton;

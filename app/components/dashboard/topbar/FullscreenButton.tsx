import React from "react";
import IconButton from "@mui/material/IconButton";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";

const FullscreenButton = () => {
  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <IconButton onClick={handleFullScreen}>
      <FullscreenOutlinedIcon />
    </IconButton>
  );
};

export default FullscreenButton;

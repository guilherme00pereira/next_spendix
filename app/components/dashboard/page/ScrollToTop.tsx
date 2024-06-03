"use client";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Fab } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

const ScrollButton = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 180,
  right: 30,
  backgroundColor: theme.palette.primary.dark,
}));

const ScrollToTop = () => {
  const [visible, setVisible] = React.useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, []);

  return (
    <>
      {visible && (
        <ScrollButton onClick={handleClick}>
          <ArrowUpwardRoundedIcon />
        </ScrollButton>
      )}
    </>
  );
};

export default ScrollToTop;

"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

const ScrollButton = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 120,
  right: 30,
  backgroundColor: theme.palette.primary.dark,
}));

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);

  const handleShowButton = () => {
    console.log(window.scrollY);
    if (!showButton && window.scrollY > 300) {
      setShowButton(true);
      return;
    }
    if (!showButton && window.scrollY <= 300) {
      setShowButton(false);
      return;
    }
  };
  window.addEventListener("scroll", handleShowButton);


  useEffect(() => {
    return window.removeEventListener("scroll", handleShowButton);
  });

  const handleClick = () => {
    if (divRef.current) {
      divRef.current.scrollTo({
        top: divRef.current.offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {showButton && (
        <ScrollButton ref={divRef} onClick={handleClick}>
          <ArrowUpwardRoundedIcon />
        </ScrollButton>
      )}
    </>
  );
};

export default ScrollToTop;

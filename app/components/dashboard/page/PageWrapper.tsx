'use client'
import React from 'react';
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Box from '@mui/material/Box';

const LayoutBoxWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.vars.palette.background.default,
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    "&::-webkit-scrollbar": {
        webkitAppearance: "none",
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,0.5)",
      },
  }));

const PageWrapper = ({children}: {children: React.ReactNode}) => {
    return (
        <LayoutBoxWrapper component="main">
            {children}
        </LayoutBoxWrapper>
    );
};

export default PageWrapper;
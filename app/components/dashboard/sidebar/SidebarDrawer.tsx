'use client'
import React from 'react';
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import MuiDrawer from "@mui/material/Drawer";
import { neutral } from "@/theme/colors";
import { useSidebarContext } from "@/app/lib/contexts";

const drawerWidth: number = 210;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: theme.vars.palette.background.paper,
    [theme.getColorSchemeSelector("light")]: {
      backgroundColor: neutral[900],
    },
    border: "none",
    color: neutral[200],
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "& .MuiToolbar-root": {
      backgroundColor: theme.vars.palette.background.paper,
      [theme.getColorSchemeSelector("light")]: {
        backgroundColor: neutral[900],
      },
      color: "#FFF",
      "& .MuiIconButton-root": {
        color: "#FFF",
      },
    },
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up("sm")]: {
        width: "52px",
      },
    }),
  },
}));

const SidebarDrawer = ({children}: {children: React.ReactNode}) => {
    const { openSidebar } = useSidebarContext();

    return (
        <Drawer variant="permanent" open={openSidebar}>
            {children}
        </Drawer>
    );
};

export default SidebarDrawer;
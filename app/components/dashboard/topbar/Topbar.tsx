"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { IDashboardLayoutProps } from "@/types/interfaces";
import { Badge } from "@mui/material";
import { Stack } from "@mui/system";
import { useSidebarContext } from "@/app/lib/contexts";
import ToggleSidebarButton from "./ToggleSidebarButton";
import LanguageButton from "./LanguageButton";
import ProfileButton from "./ProfileButton";
import DarkModeButton from "./DarkModeButton";
import FullscreenButton from "./FullscreenButton";

const drawerWidth: number = 210;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<IDashboardLayoutProps>(({ theme, open }) => ({
  left: 0,
  [theme.breakpoints.up("md")]: {
    backgroundColor: theme.vars.palette.background.paper,
    color: theme.vars.palette.text.primary,
    "& .MuiSvgIcon-root": {
      color: theme.vars.palette.primary.main,
      [theme.getColorSchemeSelector("light")]: {
        color: theme.vars.palette.primary.dark,
      },
    },
    left: open ? "0px" : "52px",
    width: open ? `calc(100% - 210px)` : `calc(100% - 52px)`,
  },
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Topbar = () => {
  const { openSidebar } = useSidebarContext();

  

  return (
    <AppBar position="absolute" open={openSidebar}>
      <Toolbar sx={{ minHeight: "52px !important" }} variant="dense">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
          <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "row", justifyContent: "start" }}>
            <ToggleSidebarButton />
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "row", justifyContent: "end" }}>
            <DarkModeButton />
            <LanguageButton />
            <IconButton>
              <Badge badgeContent={4} color="warning">
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton>
            <FullscreenButton />
            <ProfileButton />
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

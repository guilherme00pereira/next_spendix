'use client'
import React, { useState } from "react";
import { styled, useColorScheme } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { IDashboardLayoutProps } from "@/types/interfaces";
import SelectMonthYear from "@/app/components/dashboard/calendar/SelectMonthYear";
import { useRouter } from "next/navigation";
import { Badge } from "@mui/material";
import { Stack } from "@mui/system";
import { useSidebarContext } from "@/app/lib/contexts";

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
    },
    left: open ? "0px" : "52px",
    width: open ? `calc(100% - 240px)` : `calc(100% - 52px)`,
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

const ToggleIconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "48px",
  [theme.breakpoints.up("md")]: {
    backgroundColor: theme.vars.palette.background.paper,
    "& .MuiSvgIcon-root": {
      color: theme.vars.palette.text.primary,
    },
  },
  padding: 0,
}));

const Topbar = () => {
  const {openSidebar, setOpenSidebar} = useSidebarContext();
  const router = useRouter();
  const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(null);
  const [anchorLanguage, setAnchorLanguage] = useState<null | HTMLElement>(null);
  const { mode, setMode } = useColorScheme();

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const handleToggleDrawer = () => {
    setOpenSidebar && setOpenSidebar(!openSidebar);
  };

  const handleLanguageSwitch = (lang: string) => {
    setAnchorLanguage(null);
    console.log(lang);
  }

  return (
    <AppBar position="absolute" open={openSidebar}>
      <Toolbar sx={{ minHeight: "52px !important" }} variant="dense">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{width: "100%"}}>
        <Box>
          <ToggleIconBox>
            {openSidebar || (
              <IconButton edge="start" aria-label="open drawer" onClick={handleToggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
            {openSidebar && (
              <IconButton edge="start" aria-label="close drawer" onClick={handleToggleDrawer}>
                <MenuOpenIcon />
              </IconButton>
            )}
          </ToggleIconBox>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "row", justifyContent: "end" }}>
          <IconButton onClick={(e) => setAnchorLanguage(e.currentTarget)}>
            <LanguageOutlinedIcon />
          </IconButton>
          <Menu id="menu-language" anchorEl={anchorLanguage} keepMounted open={Boolean(anchorLanguage)} onClose={() => setAnchorLanguage(null)}>
            <MenuItem onClick={() => handleLanguageSwitch("en")}>English</MenuItem>
            <MenuItem onClick={() => handleLanguageSwitch("pt")}>Portuguese</MenuItem>
            <MenuItem onClick={() => handleLanguageSwitch("auto")}>Auto</MenuItem>
          </Menu>
          <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")}>
            {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
          <IconButton>
            <Badge badgeContent={4} color="warning">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={handleFullScreen}>
            <FullscreenOutlinedIcon />
          </IconButton>
          <IconButton size="large" onClick={(e) => setAnchorProfile(e.currentTarget)}>
            <AccountCircle sx={{ fontSize: "1.5rem" }} />
          </IconButton>
          <Menu id="menu-profile" anchorEl={anchorProfile} keepMounted open={Boolean(anchorProfile)} onClose={() => setAnchorProfile(null)}>
            <MenuItem onClick={() => router.push("/dashboard/profile")}>Profile</MenuItem>
            <MenuItem onClick={() => router.push("/")}>Logout</MenuItem>
          </Menu>
        </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

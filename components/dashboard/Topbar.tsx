import React, { useState } from "react";
import {styled, useColorScheme} from "@mui/material/styles";
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
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IDashboardLayoutProps } from "@/types/interfaces";
import SelectMonthYear from "@/components/dashboard/SelectMonthYear";
import { useRouter } from "next/navigation";
import { Badge } from "@mui/material";

const drawerWidth: number = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<IDashboardLayoutProps>(({ theme, open }) => ({
  left: 0,
  [theme.breakpoints.up("md")]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
    left: open ? "0px" : "56px",
    width: open ? `calc(100% - 240px)` : `calc(100% - 56px)`,
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

const IconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "48px",
  [theme.breakpoints.up("md")]: {
    backgroundColor: theme.palette.background.paper,
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
  },
  padding: 0,
}));

const Topbar = ({ open, toggleDrawer }: IDashboardLayoutProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mode, setMode } = useColorScheme();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar sx={{ minHeight: "48px !important" }} variant="dense">
        <Box>
          <IconBox>
            {open || (
              <IconButton edge="start" color="primary" aria-label="open drawer" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
            {open && (
              <IconButton edge="start" color="primary" aria-label="close drawer" onClick={toggleDrawer}>
                <MenuOpenIcon />
              </IconButton>
            )}
          </IconBox>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <SelectMonthYear />
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
            {mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
          <IconButton>
            <Badge badgeContent={4} color="warning">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={handleFullScreen}>
            <FullscreenOutlinedIcon />
          </IconButton>
        </Box>
        <IconButton size="large" onClick={handleMenu}>
          <AccountCircle sx={{ fontSize: "2rem" }} />
        </IconButton>
        <Menu id="menu-profile" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => router.push("/dashboard/profile")}>Profile</MenuItem>
          <MenuItem onClick={() => router.push("/")}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

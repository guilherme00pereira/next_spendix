import React, { useState } from "react";
import { styled } from "@mui/material/styles";
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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { IDashboardLayoutProps } from "@/types/interfaces";
import SelectMonthYear from "@/components/dashboard/SelectMonthYear";
import { neutral } from "@/theme/colors";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { Badge } from "@mui/material";
import Stack from "@mui/system/Stack";

const drawerWidth: number = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<IDashboardLayoutProps>(({ theme, open }) => ({
  left: 0,
  [theme.breakpoints.up("md")]: {
    backgroundColor: "white",
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
    backgroundColor: "white",
    "& .MuiSvgIcon-root": {
      color: neutral[500],
    },
  },
  padding: 0,
}));

const Title = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    marginLeft: "24px",
    display: "block",
  },
  display: "none",
}));

const Topbar = ({ open, toggleDrawer }: IDashboardLayoutProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

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
                <ChevronLeftIcon />
              </IconButton>
            )}
          </IconBox>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <SelectMonthYear />
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton>
            {darkMode ? <LightModeOutlinedIcon onClick={() => setDarkMode(false)} /> : <DarkModeOutlinedIcon onClick={() => setDarkMode(true)} />}
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

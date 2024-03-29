import React, {useState} from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IDashboardLayoutProps } from "@/types/interfaces";
import SelectMonthYear from "@/components/dashboard/SelectMonthYear";
import { neutral } from "@/theme/colors";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/navigation";

const drawerWidth: number = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<IDashboardLayoutProps>(({ theme, open }) => ({
  left: 0,
  [theme.breakpoints.up("md")]: {
    backgroundColor: 'white',
    color: theme.palette.text.primary,
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
    left: open ? "0px" : "56px",
    width: open? `calc(100% - 240px)` : `calc(100% - 56px)`,
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
  display: "block",
  [theme.breakpoints.up("md")]: {
    backgroundColor: neutral[800],
    display: "none",
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

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar sx={{minHeight:"48px !important"}}>
        <IconBox>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </IconBox>
        {open || (
          <Title variant="h5" color="primary">
            SMALL WALLET
          </Title>
        )}
        <SelectMonthYear />
        <IconButton size="large" onClick={handleMenu}>
          <AccountCircle sx={{fontSize: "2rem"}} />
        </IconButton>
        <Menu
          id="menu-profile"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => router.push("/dashboard/profile")}>Profile</MenuItem>
          <MenuItem onClick={() => router.push("/")}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

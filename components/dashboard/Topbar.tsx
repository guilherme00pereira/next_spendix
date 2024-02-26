import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IDashboardLayoutProps } from "@/types/interfaces";
import SelectMonthYear from "@/components/dashboard/SelectMonthYear";
import { neutral } from "@/theme/colors";
import Typography from "@mui/material/Typography";

const drawerWidth: number = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<IDashboardLayoutProps>(({ theme, open }) => ({
  left: 0,
  [theme.breakpoints.up("md")]: {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.primary,
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
    left: "56px",
    width: `calc(100% - 56px)`,
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

const Topbar = ({ props }: { props: IDashboardLayoutProps }) => {
  return (
    <AppBar position="absolute" open={props.open}>
      <Toolbar>
        <IconBox>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={props.toggleDrawer}
            sx={{
              ...(props.open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </IconBox>
        {props.open || (
          <Title variant="h5" color="primary">
            ORC
          </Title>
        )}
        <SelectMonthYear />
          <AccountCircle />
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

import React from 'react';
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useSidebarContext } from '@/app/lib/contexts';

const ToggleIconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "48px",
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.vars.palette.background.paper,
      "& .MuiSvgIcon-root": {
        color: theme.vars.palette.primary.main,
      },
    },
    padding: 0,
  }));

const ToggleSidebarButton = () => {
    const { openSidebar, setOpenSidebar } = useSidebarContext();

    const handleToggleDrawer = () => {
        setOpenSidebar && setOpenSidebar(!openSidebar);
      };
    
    return (
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
    );
};

export default ToggleSidebarButton;
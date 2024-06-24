'use client'
import React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import { useSettingsContext } from "@/app/lib/contexts";
import Typography from "@mui/material/Typography";

const RightDrawer = styled(Drawer)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    "& .MuiDrawer-paper": {
      width: "400px",
      padding: "16px",
    },
  }));

const SettingsRightDrawer = ({title, children}: {title: string, children: React.ReactNode}) => {
    const { openDrawer, setOpenDrawer } = useSettingsContext();

    return (
        <RightDrawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(!openDrawer)}>
            <Typography variant="h6">{title}</Typography>
            {children}
        </RightDrawer>
    );
};

export default SettingsRightDrawer;
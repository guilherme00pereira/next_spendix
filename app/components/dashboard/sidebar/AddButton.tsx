'use client'
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button } from "@mui/material";
import { margin, padding } from "@mui/system";

const StyledAddButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: "6px 8px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  minWidth: "auto",
  marginLeft: "8px",
  marginBottom: "12px",
}));

const AddButton = () => {
  const [anchorAdd, setAnchorAdd] = useState<null | HTMLElement>(null);

  return (
    <>
      <StyledAddButton onMouseOver={(e) => setAnchorAdd(e.currentTarget)}>
        <AddRoundedIcon />
      </StyledAddButton>
      <Menu id="menu-add" anchorEl={anchorAdd} keepMounted open={Boolean(anchorAdd)} onClose={() => setAnchorAdd(null)}>
        <MenuItem onClick={() => console.log("")}>Transaction</MenuItem>
        <MenuItem onClick={() => console.log("")}>Income</MenuItem>
        <MenuItem onClick={() => console.log("")}>Expense</MenuItem>
      </Menu>
    </>
  );
};

export default AddButton;

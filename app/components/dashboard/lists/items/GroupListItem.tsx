"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { IGroupListItemProps } from "@/types/interfaces";
import { useGroupContext } from "@/app/lib/contexts";
import { InfoActionButton, DangerActionButton, PrimaryActionButton } from "@/app/components/dashboard/commonStyledComponents";

const ListItem = styled(Stack)(({ theme }) => ({
  width: "100%",
  margin: "4px 0",
  padding: "8px 16px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  color: theme.vars.palette.text.primary,
  backgroundColor: theme.vars.palette.background.paper,
  borderBlockEnd: "1px solid",
  borderColor: theme.vars.palette.divider,
  "&:hover": {
    backgroundColor: theme.vars.palette.action.hover,
  },
}));

const GroupListItem = ({ group, handleConfirmDelete, handleEdit }: IGroupListItemProps) => {
  const { setSelectedGroup } = useGroupContext();

  return (
    <ListItem direction="row" justifyContent="space-between">
      <Box sx={{ flexGrow: 1 }}>{group.name}</Box>
      <Box>
        <Stack direction="row" spacing={1}>
          <PrimaryActionButton size="small" variant="text" onClick={() => setSelectedGroup(group)}>
            <FormatListBulletedOutlinedIcon />
          </PrimaryActionButton>
          <InfoActionButton size="small" variant="text" onClick={() => handleEdit(group.id)}>
            <EditOutlinedIcon />
          </InfoActionButton>
          <DangerActionButton size="small" variant="text" onClick={() => handleConfirmDelete(group.id, group.name)}>
            <DeleteOutlinedIcon />
          </DangerActionButton>
        </Stack>
      </Box>
    </ListItem>
  );
};

export default GroupListItem;

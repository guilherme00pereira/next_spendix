"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { IGroupListItemProps } from "@/types/interfaces";
import { useGroupContext } from "@/app/lib/contexts";
import {
  InfoActionButton,
  DangerActionButton,
  PrimaryActionButton,
  ListItem,
} from "@/app/components/dashboard/commonStyledComponents";


const GroupListItem = ({ group, handleConfirmDelete, handleEdit, handleOpenChart }: IGroupListItemProps) => {
  const { setSelectedGroup, setShowChart } = useGroupContext();

  const handleShowCategories = (group: any) => {
    setSelectedGroup(group);
    setShowChart(false);
  }

  return (
    <ListItem direction="row" justifyContent="space-between">
      <Box sx={{ flexGrow: 1 }}>{group.name}</Box>
      <Box>
        <Stack direction="row" spacing={1}>
          <PrimaryActionButton size="small" variant="text" onClick={() => handleOpenChart(group.id)}>
            <BarChartOutlinedIcon />
          </PrimaryActionButton>
          <PrimaryActionButton size="small" variant="text" onClick={() => handleShowCategories(group)}>
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

'use client'
import React from 'react';
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import ListIcon from '@mui/icons-material/List';
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IGroupListItemProps } from '@/types/interfaces';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useGroupContext } from '@/app/lib/contexts';

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

const GroupListItem = ({group, handleConfirmDelete, handleEdit}: IGroupListItemProps) => {
    const {setSelectedGroup} = useGroupContext();

    return (
        <ListItem direction="row" justifyContent="space-between">
            <Box sx={{ flexGrow: 1 }}>
                {group.name}
            </Box>
            <Box>
        <Stack direction="row">
        <ButtonGroup size="small">
        <Button
              size="small"
              variant="text"
              onClick={() => setSelectedGroup(group)}
            >
              <ListIcon sx={{ fontSize: "1rem" }} color="action" />
            </Button>
            <Button
              size="small"
              variant="text"
              onClick={() => handleEdit(group.id)}
            >
              <EditRoundedIcon sx={{ fontSize: "1rem" }} color="action" />
            </Button>
            <Button
              size="small"
              variant="text"
              onClick={() => handleConfirmDelete(group.id, group.name)}
            >
              <DeleteRoundedIcon sx={{ fontSize: "1rem" }} color="action" />
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
        </ListItem>
    );
};



export default GroupListItem;
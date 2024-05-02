'use client'
import React from 'react';
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IGroupListItemProps } from '@/types/interfaces';

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
    return (
        <ListItem direction="row" justifyContent="space-between">
            <Box sx={{ flexGrow: 1 }}>
                {group.name}
            </Box>
            <Box>
        <Stack direction="row" spacing={1}>
          <Box>
            <Button
              size="small"
              variant="text"
              color="info"
              onClick={() => handleEdit(group.id)}
            >
              <EditRoundedIcon fontSize="small" />
            </Button>
          </Box>
          <Box>
            <Button
              size="small"
              variant="text"
              color="error"
              onClick={() => handleConfirmDelete(group.id, group.name)}
            >
              <DeleteRoundedIcon fontSize="small" />
            </Button>
          </Box>
        </Stack>
      </Box>
        </ListItem>
    );
};



export default GroupListItem;
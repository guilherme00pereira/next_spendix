import React from "react";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { ICategoryListItemProps } from "@/types/interfaces";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";

const getTypeColor = (type: string) => {
  switch (type) {
    case "Receita":
      return "success";
    case "Despesa":
      return "secondary";
    default:
      return "primary";
  }
};

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

const CategoriesListItem = ({ category, handleEdit, handleConfirmDelete }: ICategoryListItemProps) => {
  return (
    <ListItem direction="row" justifyContent="space-between">
      <Box sx={{ width: "50%" }}>
        <Link href={`/dashboard/categories/${category.slug}`}>{category.name}</Link>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Chip label={category.type} size="small" variant="outlined" color={getTypeColor(category.type)} />
      </Box>
      <Box>
        <Stack direction="row" spacing={1}>
          <Box>
            <Button size="small" variant="text" color="info" onClick={() => handleEdit(category.id)}>
              <EditRoundedIcon fontSize="small" />
            </Button>
          </Box>
          <Box>
            <Button size="small" variant="text" color="error" onClick={() => handleConfirmDelete(category.id, category.name)}>
              <DeleteRoundedIcon fontSize="small" />
            </Button>
          </Box>
        </Stack>
      </Box>
    </ListItem>
  );
};

export default CategoriesListItem;

import React from "react";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { ICategoryListItemProps } from "@/types/interfaces";
import Chip from "@mui/material/Chip";
import SubdirectoryArrowRightOutlinedIcon from "@mui/icons-material/SubdirectoryArrowRightOutlined";
import { InfoActionButton, DangerActionButton, PrimaryActionButton } from "@/app/components/dashboard/commonStyledComponents";

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

const CategoryLink = styled(Link)(({ theme }) => ({
  color: theme.vars.palette.text.primary,
}));

const CategoriesListItem = ({
  category,
  handleEdit,
  handleConfirmDelete,
  isSubCategory,
}: ICategoryListItemProps) => {
  return (
    <ListItem direction="row" justifyContent="space-between">
      {isSubCategory && (
        <Box sx={{ width: "50px" }}>
          <SubdirectoryArrowRightOutlinedIcon fontSize="small" />
        </Box>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <CategoryLink href={`/dashboard/categories/${category.slug}`} underline="none" variant="subtitle2">
          {category.name}
        </CategoryLink>
      </Box>
      <Box sx={{ pr: "3em" }}>
        <Chip
          label={category.type}
          size="small"
          variant="outlined"
          color={getTypeColor(category.type)}
          sx={{borderRadius: "4px"}}
        />
      </Box>
      <Box>
        <Stack direction="row" spacing={1}>
        <PrimaryActionButton size="small" variant="text" onClick={() => console.log(`/dashboard/categories/${category.slug}`)}>
          <VisibilityOutlinedIcon />
        </PrimaryActionButton>
            <InfoActionButton
              size="small"
              variant="text"
              onClick={() => handleEdit(category.id)}
            >
              <EditOutlinedIcon />
            </InfoActionButton>
            <DangerActionButton
              size="small"
              variant="text"
              onClick={() => handleConfirmDelete(category.id, category.name)}
            >
              <DeleteOutlinedIcon />
            </DangerActionButton>
        </Stack>
      </Box>
    </ListItem>
  );
};

export default CategoriesListItem;

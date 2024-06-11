import React from "react";
import Box from "@mui/material/Box";
import { CategoryType } from "@/types/entities";
import { DangerActionButton, ListItem } from "@/app/components/dashboard/commonStyledComponents";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Typography } from "@mui/material";

interface IGroupCategoriesListItemProps {
  category: CategoryType;
  removeAction: (category: CategoryType) => void;
}

const GroupCategoriesListItem = ({ category, removeAction }: IGroupCategoriesListItemProps) => {
  return (
    <ListItem key={category.id}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2">{category.name}</Typography>
      </Box>
      <Box>
        <DangerActionButton size="small" variant="text" onClick={() => removeAction(category)}>
          <DeleteOutlinedIcon />
        </DangerActionButton>
      </Box>
    </ListItem>
  );
};

export default GroupCategoriesListItem;

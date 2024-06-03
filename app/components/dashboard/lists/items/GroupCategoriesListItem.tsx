import React from "react";
import { ListItem, Button, Box } from "@mui/material";
import { CategoryType } from "@/types/entities";
import { DangerActionButton } from "@/app/components/dashboard/commonStyledComponents";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface IGroupCategoriesListItemProps {
  category: CategoryType;
  removeAction: (category: CategoryType) => void;
}

const GroupCategoriesListItem = ({ category, removeAction }: IGroupCategoriesListItemProps) => {
  return (
    <ListItem key={category.id}>
      <Box sx={{ flexGrow: 1 }}>{category.name}</Box>
      <Box>
        <DangerActionButton size="small" variant="text" onClick={() => removeAction(category)}>
          <DeleteOutlinedIcon />
        </DangerActionButton>
      </Box>
    </ListItem>
  );
};

export default GroupCategoriesListItem;

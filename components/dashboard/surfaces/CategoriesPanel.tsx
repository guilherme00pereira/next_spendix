import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TransactionByCategoryTable from "@/components/dashboard/tables/TransactionsByCategoryTable";
import { ICategoriesPanelProps } from "@/types/interfaces";

const CategoriesPanel = ({ id, action }: ICategoriesPanelProps) => {
  return (
    <Paper sx={{ width: "45%" }}>
      <Box p={2}>
        {id > 0 && <TransactionByCategoryTable id={id} action={action} />}
      </Box>
    </Paper>
  );
};

export default CategoriesPanel;

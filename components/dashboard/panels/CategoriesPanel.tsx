import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TransactionByCategoryTable from "@/components/dashboard/tables/TransactionsByCategoryTable";
import ParentCategoriesPieChart from "@/components/dashboard/charts/ParentCategoriesPieChart";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { ICategoryTransactionsPanelProps } from "@/types/interfaces";

const CategoriesPanel = ({ id, action }: ICategoryTransactionsPanelProps) => {
  return (
    <Paper sx={{ width: "45%" }}>
      <Box p={2}>
        <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ pb: 2 }}>
          <Typography variant="h6" textAlign="center">
            {id > 0 ? "Transações" : "Gráfico"}
          </Typography>
          {id > 0 && (
            <IconButton edge="end" onClick={() => action(0)} aria-label="close" sx={{ p: 0 }}>
              <CloseIcon />
            </IconButton>
          )}
        </Stack>
        {id > 0 && <TransactionByCategoryTable id={id} action={action} />}
        {id === 0 && <ParentCategoriesPieChart categories={[]} />}
      </Box>
    </Paper>
  );
};

export default CategoriesPanel;

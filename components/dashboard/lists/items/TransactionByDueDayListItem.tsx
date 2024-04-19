import React from "react";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Stack from "@mui/material/Stack";
import { TransactionType } from "@/types/entities";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { amountFormatter } from "@/lib/functions";

const ListItem = styled(Stack)(({ theme }) => ({
    width: "100%",
    height: "62px",
    padding: "8px 16px",
    margin: "4px 0",
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


const TransactionByDueDayListItem = ({ transaction }: {transaction: TransactionType}) => {


  return (
    <ListItem direction="row" justifyContent="space-between">
      <Stack direction="column" justifyContent="center">
        <Typography variant="subtitle1">{transaction.categories?.name}</Typography>
        <Typography variant="subtitle2">{transaction.description}</Typography>
      </Stack>
      <Box>
        <Typography variant="body1">{amountFormatter(transaction.amount)}</Typography>
        </Box>
    </ListItem>
  );
};

export default TransactionByDueDayListItem;

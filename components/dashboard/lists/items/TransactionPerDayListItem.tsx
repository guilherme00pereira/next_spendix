import React from "react";
import Stack from "@mui/material/Stack";
import { TransactionType } from "@/types/entities";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { amountFormatter } from "@/lib/functions";
import { TransactionListItem } from "@/components/dashboard/commonStyledComponents";
import { useSpeedDialStore } from "@/lib/store";
import dayjs from "dayjs";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useTransactionContext } from "@/lib/hooks";


const TransactionPerDayListItem = ({ transaction }: { transaction: TransactionType }) => {
  const { setTransaction, actionShowTransactionDialog, setIncome, actionShowIncomeDialog } = useSpeedDialStore();
  const { actionShowTransactionDetail, setSelectedTransaction } = useTransactionContext();

  const handleEdit = (t: TransactionType) => {
    const obj = {
      id: t.id,
      amount: t.amount,
      due_date: dayjs(t.due_date),
      description: t.description,
      cashed: !!t.payments?.id,
      category_id: t.categories?.id ?? 0,
      payment_date: t.payments?.date ? dayjs(t.payments.date) : null,
      payed_amount: t.payments?.amount ?? null,
      payment_method_id: 1,
      payment_id: t.payments?.id ?? 0,
      in_installments: !!t.installments,
      installments: 2,
      draft: t.draft,
      tags: [],
    };

    if (t.categories?.type === "Receita") {
      setIncome(obj);
      actionShowIncomeDialog(true);
    } else {
      setTransaction(obj);
      actionShowTransactionDialog(true);
    }
  };

  const handleShowDetail = (t: TransactionType) => {
    setSelectedTransaction(t);
    actionShowTransactionDetail(true);
  };

  return (
    <TransactionListItem>
      <Stack direction="column" justifyContent="center" sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">{transaction.categories?.name}</Typography>
        <Typography variant="subtitle2">{transaction.description}</Typography>
      </Stack>
      <Box sx={{pr: "14px"}}>
        <Typography variant="body1" color={transaction.categories?.type == "Receita" ? "success.dark" : "error.dark"}>
          {amountFormatter(transaction.payments?.amount ?? transaction.amount)}
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="end">
        <ButtonGroup size="small">
          <Button size="small" variant="text" onClick={() => handleShowDetail(transaction)}>
            <VisibilityRoundedIcon fontSize="small" color="action" sx={{fontSize: "1rem"}} />
          </Button>
          <Button size="small" variant="text" onClick={() => handleEdit(transaction)}>
            <EditRoundedIcon fontSize="small" color="action" sx={{fontSize: "1rem"}} />
          </Button>
        </ButtonGroup>
      </Stack>
    </TransactionListItem>
  );
};

export default TransactionPerDayListItem;

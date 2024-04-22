import React from "react";
import Stack from "@mui/material/Stack";
import { TransactionType } from "@/types/entities";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { amountFormatter } from "@/lib/functions";
import { TransactionListItem } from "@/components/dashboard/commonStyledComponents";
import { useSpeedDialStore } from "@/lib/store";
import dayjs from "dayjs";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const TransactionPerDayListItem = ({
  transaction,
}: {
  transaction: TransactionType;
}) => {
  const {
    setTransaction,
    actionShowTransactionDialog,
    setIncome,
    actionShowIncomeDialog,
  } = useSpeedDialStore();

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

  return (
    <TransactionListItem>
      <Stack direction="column" justifyContent="center" sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">
          {transaction.categories?.name}
        </Typography>
        <Typography variant="subtitle2">{transaction.description}</Typography>
      </Stack>
      <Box>
        <Typography variant="body1">
          {amountFormatter(transaction.amount)}
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="end">
        <Button size="small" variant="text" sx={{ minWidth: 0 }}>
          <VisibilityRoundedIcon fontSize="small" />
        </Button>
        <Button
          size="small"
          variant="text"
          onClick={() => handleEdit(transaction)}
          sx={{ minWidth: 0 }}
        >
          <EditRoundedIcon fontSize="small" />
        </Button>
      </Stack>
    </TransactionListItem>
  );
};

export default TransactionPerDayListItem;

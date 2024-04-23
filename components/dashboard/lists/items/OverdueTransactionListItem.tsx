import { amountFormatter } from "@/lib/functions";
import { Typography, ButtonGroup, Button } from "@mui/material";
import { Stack, Box } from "@mui/system";
import React from "react";
import { TransactionListItem } from "../../commonStyledComponents";
import { TransactionType } from "@/types/entities";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useTransactionContext } from "@/lib/hooks";
import { useSpeedDialStore } from "@/lib/store";
import dayjs from "dayjs";

const getOverdueDays = (dueDate: string) => {
  const due = dayjs(dueDate);
  const today = dayjs();
  const overdue = today.diff(due, "days");
  let color = "info.dark";
  if(overdue > 30) color = "error.main";
  if(overdue > 15 && overdue <= 30) color = "warning.dark";
  return (
    <Typography variant="body2" color={color}>
      {overdue} dias
    </Typography>
  );
};

const OverdueTransactionListItem = ({ transaction }: { transaction: TransactionType }) => {
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
      <Box sx={{ mr: "24px" }}>
        {getOverdueDays(transaction.due_date)}
      </Box>
      <Stack direction="column" justifyContent="center" sx={{ flexGrow: 1 }}>
        <Typography variant="body1">{transaction.categories?.name}</Typography>
        <Typography variant="body2">{transaction.description}</Typography>
      </Stack>
      <Box sx={{ pr: "14px" }}>
        <Typography variant="body1">
          {amountFormatter(transaction.amount)}
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="end">
        <ButtonGroup size="small">
          <Button size="small" variant="text" onClick={() => handleShowDetail(transaction)}>
            <VisibilityRoundedIcon fontSize="small" color="action" sx={{ fontSize: "1rem" }} />
          </Button>
          <Button size="small" variant="text" onClick={() => handleEdit(transaction)}>
            <EditRoundedIcon fontSize="small" color="action" sx={{ fontSize: "1rem" }} />
          </Button>
        </ButtonGroup>
      </Stack>
    </TransactionListItem>
  );
};

export default OverdueTransactionListItem;

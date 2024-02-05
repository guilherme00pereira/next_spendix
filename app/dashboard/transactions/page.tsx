"use client";
import { useEffect, useState } from "react";
import { Stack, Container, Typography, Button, SvgIcon } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TransactionFormDialog from "@/components/dashboard/modals/TransactionFormDialog";
import ListTransactionsTable from "@/components/dashboard/tables/ListTransactionsTable";
import Box from "@mui/material/Box";
import { useAppStore, usePageContext, TransactionContext } from "@/lib/hooks";
import {TransactionType, TransactionFormData} from "@/types/entities";
import { TransactionDefaultData } from "@/lib/data";
import dayjs from "dayjs";

const TransactionsPage = () => {
  const {date} = useAppStore();
  const { showModal, actionShowModal } = usePageContext();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [formTransactionObject, setFormTransactionObject] = useState<TransactionFormData>(TransactionDefaultData);
  const [monthAndYear, setMonthAndYear] = useState<string>(dayjs().format("MMMM [de] YYYY"));

  const handleAddNew = () => {
    actionShowModal(true);
    setFormTransactionObject(TransactionDefaultData);
  };

  useEffect(() => {
    setMonthAndYear(dayjs(date).format("MMMM [de] YYYY"));
  }, [date]);

  return (
    <TransactionContext.Provider
      value={{
        balanceTotal: [],
        transaction: formTransactionObject,
        setTransaction: setFormTransactionObject,
        list: transactions,
        setList: setTransactions,
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent={{ xs: "center", sm: "space-between" }} alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h5" textAlign="center">
              Transações em {monthAndYear}
            </Typography>
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <AddRoundedIcon />
                </SvgIcon>
              }
              variant="contained"
              onClick={handleAddNew}
            >
              Add
            </Button>
          </Stack>
          {showModal && <TransactionFormDialog />}
          <ListTransactionsTable />
        </Box>
      </Container>
    </TransactionContext.Provider>
  );
};

export default TransactionsPage;

'use client'
import { Stack, Container, Typography, Button, SvgIcon } from "@mui/material";
import {TransactionContext, usePageContext} from "@/lib/hooks";
import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {TransactionFormData, TransactionType} from "@/types/entities";
import {TransactionDefaultData} from "@/lib/data";
import SelectMonthYear from "@/components/dashboard/SelectMonthYear";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ListCashFlowTable from "@/components/dashboard/tables/ListCashFlowTable";

const CashFlowPage = () => {
  const { showModal, actionShowModal } = usePageContext();
  const [selectedDayAndMonth, setSelectedDayAndMonth] = useState<Dayjs>(dayjs());
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [formTransactionObject, setFormTransactionObject] = useState<TransactionFormData>(TransactionDefaultData);

  const handleAddNew = () => {
    actionShowModal(true);
    setFormTransactionObject(TransactionDefaultData);
  };

  const monthAndYear = selectedDayAndMonth.format("MMMM [de] YYYY");

  return (
    <TransactionContext.Provider
      value={{
        balanceTotal: [],
        transaction: formTransactionObject,
        setTransaction: setFormTransactionObject,
        date: selectedDayAndMonth,
        setDate: setSelectedDayAndMonth,
        list: transactions,
        setList: setTransactions,
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent={{ xs: "center", sm: "space-between" }} alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" textAlign="center">
            Fluxo de Caixa {monthAndYear}
          </Typography>
          <SelectMonthYear />
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
        <ListCashFlowTable />
      </Container>
    </TransactionContext.Provider>
  );
};

export default CashFlowPage;
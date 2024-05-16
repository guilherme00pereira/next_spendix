import React from "react";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import { getTransactions } from "@/app/lib/actions/transactions-actions";
import dayjs from "dayjs";
import TransactionsTable from "@/app/components/dashboard/tables/TransactionsTable";
import { Stack } from "@mui/system";

const AllTransactions = async () => {
  const transactions = await getTransactions(
    dayjs().startOf("M").format("YYYY-MM-DD"),
    dayjs().endOf("M").format("YYYY-MM-DD")
  );

  return (
    <PageContainer title="Lista de Transações do mês">
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="center">
        <TransactionsTable transactions={transactions} />
      </Stack>
    </PageContainer>
  );
};

export default AllTransactions;

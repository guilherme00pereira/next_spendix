import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import Stack from "@mui/material/Stack";
import SelectDayOfMonth from "@/app/components/dashboard/calendar/SelectDayOfMonth";
import TransactionsPerDayProvider from "@/app/lib/providers/TransactionsPerDayProvider";
import TransactionsPerDayBalanceListItem from "./items/TransactionsPerDayBalanceListItem";
import TransactionsPerDayListItems from "./items/TransactionsPerDayListItems";
import { TransactionType } from "@/types/entities";
import { groupTransactionsByDate } from "@/app/lib/functions";



const TransactionsPerDayList = async ({transactions}: {transactions: TransactionType[]}) => {
  const filtered = transactions.filter((transaction: any) => transaction.categories.id != 43)
  const mapped = groupTransactionsByDate(filtered as TransactionType[])

  return (
    <PaperContainer sx={{ minHeight: "400px" }}>
      <PaperHeader
        title="Transações diárias"
        link={{
          show: true,
          text: "Ver todas",
          target: "/dashboard/transactions/all",
        }}
      />
      <Stack>
        <TransactionsPerDayProvider>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <SelectDayOfMonth days={Array.from(mapped.keys())} />
          </Stack>
          <TransactionsPerDayListItems transactions={mapped} />
          <TransactionsPerDayBalanceListItem />
        </TransactionsPerDayProvider>
      </Stack>
    </PaperContainer>
  );
};

export default TransactionsPerDayList;

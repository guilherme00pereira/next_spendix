import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import Stack from "@mui/material/Stack";
import SelectDayOfMonth from "@/app/components/dashboard/calendar/SelectDayOfMonth";
import TransactionsPerDayProvider from "@/app/lib/providers/TransactionsPerDayProvider";
import TransactionsPerDayBalanceListItem from "./items/TransactionsPerDayBalanceListItem";
import TransactionsPerDayListItems from "./items/TransactionsPerDayListItems";
import { TransactionType } from "@/types/entities";
import { groupTransactionsByDate } from "@/app/lib/functions";
import dayjs from "dayjs";



const TransactionsPerDayList = async ({transactions}: {transactions: TransactionType[]}) => {
  const filtered = transactions.filter((transaction: any) => transaction.categories.id != 43)
  const mapped = groupTransactionsByDate(filtered as TransactionType[])

  const daysOfTheMonth = () => {
    const existingDays = Array.from(mapped.keys())
    const today = dayjs().format("YYYY-MM-DD")
    if(!existingDays.includes(today)) {
      existingDays.push(today)
    }
    return existingDays
  } 

  return (
    <PaperContainer sx={{ minHeight: "400px" }}>
      <PaperHeader
        title="Transações realizadas no mês / dia"
        link={{
          show: true,
          text: "Ver todas",
          target: "/dashboard/transactions/all",
        }}
      />
      <Stack>
        <TransactionsPerDayProvider>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <SelectDayOfMonth days={daysOfTheMonth()} />
          </Stack>
          <TransactionsPerDayListItems transactions={mapped} />
          <TransactionsPerDayBalanceListItem />
        </TransactionsPerDayProvider>
      </Stack>
    </PaperContainer>
  );
};

export default TransactionsPerDayList;

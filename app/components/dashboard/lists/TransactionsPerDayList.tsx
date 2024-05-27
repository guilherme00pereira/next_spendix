import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import Stack from "@mui/material/Stack";
import TransactionsPerDayProvider from "@/app/lib/providers/TransactionsPerDayProvider";
import TransactionsPerDayListItems from "./items/TransactionsPerDayListItems";
import { TransactionType } from "@/types/entities";
import { groupTransactionsByDate } from "@/app/lib/functions";
import dayjs from "dayjs";
import PaperHeaderLink from "../widgets/paper-header/PaperHeaderLink";
import TabsDayOfMonth from "../calendar/TabsDayOfMonth";

const TransactionsPerDayList = async ({ transactions }: { transactions: TransactionType[] }) => {
  const mapped = groupTransactionsByDate(transactions);

  const daysOfTheMonth = () => {
    const existingDays = Array.from(mapped.keys());
    const today = dayjs().format("YYYY-MM-DD");
    if (!existingDays.includes(today)) {
      existingDays.push(today);
    }
    return existingDays;
  };

  return (
    <PaperContainer sx={{ minHeight: "400px" }}>
      <PaperHeader title="Transações realizadas no mês / dia">
        <PaperHeaderLink text="Ver todas" target="/dashboard/transactions/all" />
      </PaperHeader>
      <Stack>
        <TransactionsPerDayProvider>
          {/* <SelectDayOfMonth days={daysOfTheMonth()} /> */}
          <TabsDayOfMonth days={daysOfTheMonth()} />
          <TransactionsPerDayListItems transactions={mapped} />
      </TransactionsPerDayProvider>
      </Stack>
    </PaperContainer>
  );
};

export default TransactionsPerDayList;

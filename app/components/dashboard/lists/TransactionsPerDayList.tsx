import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import Stack from "@mui/material/Stack";
import TransactionsPerDayProvider from "@/app/lib/providers/TransactionsPerDayProvider";
import TransactionsPerDayListItems from "./items/TransactionsPerDayListItems";
import { TransactionType } from "@/types/entities";
import dayjs from "dayjs";
import PaperHeaderLink from "../widgets/paper-header/PaperHeaderLink";
import TabsDayOfMonth from "../calendar/TabsDayOfMonth";

interface TransactionsPerDayListProps {
  transactions: Map<string, TransactionType[]>;
  headerLink: string;
  selectedDate: string;
}

const TransactionsPerDayList = async ({ transactions, headerLink, selectedDate }: TransactionsPerDayListProps) => {

  const daysOfTheMonth = () => {
    const existingDays = Array.from(transactions.keys());
    const today = dayjs();
    if (!existingDays.includes(today.format("YYYY-MM-DD")) && (selectedDate === "" || selectedDate === today.format("YYYYMM"))) {
      existingDays.push(today.format("YYYY-MM-DD"));
    }
    return existingDays;
  };

  return (
    <PaperContainer width="50%" sx={{ minHeight: "400px" }}>
      <PaperHeader title="Transações realizadas no mês / dia">
        <PaperHeaderLink text="Ver todas" target={headerLink} />
      </PaperHeader>
      <Stack>
        <TransactionsPerDayProvider>
          <TabsDayOfMonth days={daysOfTheMonth()} />
          <TransactionsPerDayListItems transactions={transactions} />
      </TransactionsPerDayProvider>
      </Stack>
    </PaperContainer>
  );
};

export default TransactionsPerDayList;

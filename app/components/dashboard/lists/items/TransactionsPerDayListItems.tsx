"use client";
import { useMemo } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { TransactionType } from "@/types/entities";
import Typography from "@mui/material/Typography";
import { amountFormatter } from "@/app/lib/functions";
import { RegularLink, TransactionListItem } from "@/app/components/dashboard/commonStyledComponents";
import TransactionActionButtons from "@/app/components/dashboard/widgets/buttons/TransactionActionButtons";
import { useTransactionsPerDayContext } from "@/app/lib/contexts";
import dayjs from "dayjs";

const TransactionsPerDayListItems = ({ transactions }: { transactions: Map<string, TransactionType[]> }) => {
  const { selectedDay } = useTransactionsPerDayContext();

  const getTransactionsOfTheDay = useMemo(() => {
    if (transactions === undefined) return [];
    if (selectedDay === undefined) return transactions.get(dayjs().format("YYYY-MM-DD"));
    return transactions.get(selectedDay);
  }, [selectedDay]);

  const dayBalance = useMemo(() => {
    if (transactions === undefined) return 0;
    if (selectedDay === undefined) return 0;
    return transactions.get(selectedDay)?.reduce((acc, curr) => {
      const v = curr.payments?.amount ?? curr.amount;
      return curr.categories?.type == "Receita" ? acc + v : acc - v;
    }, 0);
  }, [selectedDay]);

  return (
    <>
      {getTransactionsOfTheDay?.map((transaction: TransactionType) => (
        <TransactionListItem key={transaction.id}>
          <Stack direction="column" justifyContent="center" sx={{ flexGrow: 1 }}>
            <RegularLink
              href={`/dashboard/categories/${transaction.categories?.slug}`}
              underline="none"
              variant="subtitle2"
            >
              {transaction.categories?.name}
            </RegularLink>
            <Typography variant="subtitle2">{transaction.description}</Typography>
          </Stack>
          <Box sx={{ pr: "14px" }}>
            <Typography
              variant="body1"
              color={transaction.categories?.type == "Receita" ? "success.dark" : "error.dark"}
            >
              {transaction.categories?.type == "Receita" ? "+ " : "- "}
              {amountFormatter(transaction.payments?.amount ?? transaction.amount)}
            </Typography>
          </Box>
          <Stack direction="row" justifyContent="end">
            <TransactionActionButtons transaction={transaction} />
          </Stack>
        </TransactionListItem>
      ))}
      <TransactionListItem>
        <Typography variant="body1" fontWeight={600}>
          Saldo:
        </Typography>
        <Typography variant="body1" fontWeight={700}>
          {amountFormatter(dayBalance ?? 0)}
        </Typography>
      </TransactionListItem>
    </>
  );
};

export default TransactionsPerDayListItems;

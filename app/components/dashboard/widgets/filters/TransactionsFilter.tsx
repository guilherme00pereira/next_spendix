"use client";
import React, { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Stack from "@mui/material/Stack";
import { FormControl, OutlinedInput, Paper } from "@mui/material";
import { useTransactionsTableFilterContext } from "@/app/lib/contexts";
import { TransactionType } from "@/types/entities";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { PaperHeaderButton } from "../../commonStyledComponents";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";

const TransactionsFilter = ({ transactions }: { transactions: TransactionType[] }) => {
  const { setFilteredTransactions } = useTransactionsTableFilterContext();
  const pathname = usePathname();
  const params = useSearchParams();

  const searchTransaction = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const search = (e.target as HTMLInputElement).value;
    if (search === "") {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(
        (t) =>
          t.description.toLowerCase().includes(search.toLowerCase()) ||
          t.categories?.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTransactions(filtered);
    }
  };

  const dueDateUrl = params.get('due_date') === '1' ? pathname : `${pathname}?due_date=1`;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <FormControl>
        <OutlinedInput
          id="search"
          size="small"
          type="search"
          fullWidth
          onChange={(e) => searchTransaction(e)}
          endAdornment={<SearchOutlinedIcon color="action" fontSize="small" />}
        />
      </FormControl>
      <PaperHeaderButton
        variant="outlined"
        size="small"
        color="primary"
        href={dueDateUrl}
        startIcon={<SyncRoundedIcon />}
      >
        Mostrar por {params.get('due_date') === '1' ? "data de pagamento" : "data de vencimento"}
      </PaperHeaderButton>
    </Stack>
  );
};

export default TransactionsFilter;

"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import { FormControl, IconButton, OutlinedInput } from "@mui/material";
import { useTransactionsTableFilterContext } from "@/app/lib/contexts";
import { TransactionType } from "@/types/entities";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const TransactionsFilter = ({ transactions }: { transactions: TransactionType[] }) => {
  const { setFilteredTransactions } = useTransactionsTableFilterContext();
  
  const searchTransaction = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const search = (e.target as HTMLInputElement).value;
    if (search === "") {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter((t) => t.description.toLowerCase().includes(search.toLowerCase()) 
      || t.categories?.name.toLowerCase().includes(search.toLowerCase()));
      setFilteredTransactions(filtered);
    }
  };
  
    return (
      <Stack direction="row">
        <FormControl>
          <OutlinedInput
            id="search"
            size="small"
            type="search"
            fullWidth
            onChange={(e) => searchTransaction(e)}
            endAdornment={
              <SearchOutlinedIcon color="action" fontSize="small" />
            }
          />
        </FormControl>
      </Stack>
    );
  };

export default TransactionsFilter;
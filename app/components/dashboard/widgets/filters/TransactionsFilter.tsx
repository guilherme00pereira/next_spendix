"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import { FormControl, IconButton, OutlinedInput } from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { useTransactionsTableFilterContext } from "@/app/lib/contexts";
import { TransactionType } from "@/types/entities";

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

  const handleResetSearch = () => {
    setFilteredTransactions(transactions);
  }
  
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
              <IconButton onClick={handleResetSearch}>
                <FilterListRoundedIcon color="primary" fontSize="small" />
              </IconButton>
            }
          />
        </FormControl>
      </Stack>
    );
  };

export default TransactionsFilter;
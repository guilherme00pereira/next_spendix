"use client";
import React from "react";
import { usePathname, useParams } from "next/navigation";
import Stack from "@mui/material/Stack";
import { FormControl, OutlinedInput } from "@mui/material";
import { useTransactionsTableFilterContext } from "@/app/lib/contexts";
import { TransactionType } from "@/types/entities";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { PaperHeaderButton } from "../../commonStyledComponents";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";

const TransactionsFilter = ({ transactions }: { transactions: TransactionType[] }) => {
  const { setFilteredTransactions } = useTransactionsTableFilterContext();
  const pathname = usePathname();
  const params = useParams();
  
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
      <Stack direction="row" alignItems="center" spacing={2}>
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
        <PaperHeaderButton
          variant="outlined"
          size="small"
          color="primary"
          href={pathname + (params.due_date ? "" : "?due_date=true")}
          startIcon={<SyncRoundedIcon />}
        >
          Listar por {params.due_date ? "data pagamento" : "data devida"} 
        </PaperHeaderButton>
      </Stack>
    );
  };

export default TransactionsFilter;
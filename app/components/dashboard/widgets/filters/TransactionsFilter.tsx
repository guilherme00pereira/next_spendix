"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Stack from "@mui/material/Stack";
import { FormControl, Menu, MenuItem, OutlinedInput } from "@mui/material";
import { useTransactionsTableFilterContext } from "@/app/lib/contexts";
import { TransactionType } from "@/types/entities";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { PaperHeaderButtonWithHover } from "@/app/components/dashboard/commonStyledComponents";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const TransactionsFilter = ({ transactions }: { transactions: TransactionType[] }) => {
  const { setFilteredTransactions } = useTransactionsTableFilterContext();
  const [anchorDay, setAnchorDay] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorDay);
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

  const handleCalendarChange = (date: any) => {
    setAnchorDay(null);
    setFilteredTransactions(transactions.filter((t) => t.due_date === date.format("YYYY-MM-DD")));
  };

  const dueDateUrl = params.get("dd") === "1" ? pathname : `${pathname}?dd=1`;

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
      <PaperHeaderButtonWithHover
        variant="outlined"
        size="small"
        color="primary"
        onClick={(e: any) => setAnchorDay(e.currentTarget)}
        startIcon={<CalendarMonthOutlinedIcon />}
      >
        Dia
      </PaperHeaderButtonWithHover>
      
        <Menu anchorEl={anchorDay} keepMounted open={open} onClose={() => setAnchorDay(null)}>
          <MenuItem>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateCalendar"]}>
                <DateCalendar views={["day"]} onChange={handleCalendarChange} />
              </DemoContainer>
            </LocalizationProvider>
          </MenuItem>
        </Menu>
      
      <PaperHeaderButtonWithHover
        variant="outlined"
        size="small"
        color="primary"
        href={dueDateUrl}
        startIcon={<SyncRoundedIcon />}
      >
        Mostrar por {params.get("due_date") === "1" ? "data de pagamento" : "data de vencimento"}
      </PaperHeaderButtonWithHover>
    </Stack>
  );
};

export default TransactionsFilter;

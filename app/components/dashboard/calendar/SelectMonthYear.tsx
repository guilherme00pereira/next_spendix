'use client'
import { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

const DateSelector = styled(Stack)(({ theme }) => ({
  width: "75%",
  borderBottom: "1px solid",
  borderTop: "1px solid",
  borderColor: theme.palette.primary.main,
  padding: "0.25em",
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  padding: "0 0.75em",
}));

const SelectMonthYear = () => {
  const searchParams = useSearchParams()
  const date = useMemo(() => {
    if(searchParams.get("date")) {
      return dayjs(searchParams.get("date")).format("YYYYMM")
    } else {
      return dayjs().format("YYYYMM")
    }
    }, [searchParams]);
  const prevLink = dayjs(date).subtract(1, "month").format("YYYYMM");
  const nextLink = dayjs(date).add(1, "month").format("YYYYMM");

  return (
    <Stack direction="row" justifyContent="center" spacing={2} sx={{width: "100%"}}>
      <DateSelector direction="row" justifyContent="center" alignItems="center">
        <IconButton href={`/dashboard/transactions/all?date=${prevLink}`}>
          <ArrowBackIosRoundedIcon color="primary" />
        </IconButton>
        <DateText>{dayjs(date).format("MMMM YYYY")}</DateText>
        <IconButton href={`/dashboard/transactions/all?date=${nextLink}`}>
          <ArrowForwardIosRoundedIcon color="primary" />
        </IconButton>
      </DateSelector>
    </Stack>
  );
};

export default SelectMonthYear;

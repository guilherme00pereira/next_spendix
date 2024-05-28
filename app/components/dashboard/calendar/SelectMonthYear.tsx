'use client'
import { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { IconButton, Stack, Typography } from "@mui/material";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

const DateSelector = styled(Stack)(({ theme }) => ({
  borderBottom: "1px solid",
  borderTop: "1px solid",
  borderColor: theme.palette.primary.main,
  padding: "0.25em",
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
          <ArrowCircleLeftRoundedIcon />
        </IconButton>
        <Typography fontSize="18px">{dayjs(date).format("MMMM [/] YYYY")}</Typography>
        <IconButton href={`/dashboard/transactions/all?date=${nextLink}`}>
          <ArrowCircleRightRoundedIcon />
        </IconButton>
      </DateSelector>
    </Stack>
  );
};

export default SelectMonthYear;

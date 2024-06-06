'use client'
import { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { usePathname, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

const DateSelector = styled(Stack)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "calc(50% - 16px)",
  },
  [theme.breakpoints.up("lg")]: {
    width: "calc(20% - 16px)",
  },
  borderBottom: "1px solid",
  borderTop: "1px solid",
  //@ts-ignore
  borderColor: theme.palette.primary.alpha50,
  padding: "8px 0",
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  padding: "0 0.75em",
}));

const SelectMonthYear = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const date = useMemo(() => {
    if(searchParams.get("date")) {
      return dayjs(searchParams.get("date")).format("YYYYMM")
    } else {
      return dayjs().format("YYYYMM")
    }
    }, [searchParams]);
  const prevLink = dayjs(date).subtract(1, "month").format("YYYYMM");
  const nextLink = dayjs(date).add(1, "month").format("YYYYMM");

  const disablePrevLink = useMemo(() => {
    if(pathname.includes("upcoming")) {
      if(!searchParams.get("date") || dayjs(searchParams.get("date")).isBefore(dayjs(), "month")) {
        return true
      }
    }
    return false
  }, [pathname, searchParams])

  return (
      <DateSelector direction="row" justifyContent="center" alignItems="center">
        <IconButton href={`${pathname}?date=${prevLink}`} disabled={disablePrevLink}>
          <ArrowBackIosRoundedIcon color={disablePrevLink ? "disabled" : "primary"} />
        </IconButton>
        <DateText>{dayjs(date).format("MMMM YYYY")}</DateText>
        <IconButton href={`${pathname}?date=${nextLink}`}>
          <ArrowForwardIosRoundedIcon color="primary" />
        </IconButton>
      </DateSelector>
  );
};

export default SelectMonthYear;

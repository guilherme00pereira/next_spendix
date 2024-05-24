"use client";
import React, { useCallback, useEffect } from "react";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { useTransactionsPerDayContext } from "@/app/lib/contexts";

const Day = styled(Tab)(({ theme }) => ({
  fontSize: "0.875rem",
  width: "60px",
  padding: "4px !important",
  marginLeft: "12px !important",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  color: theme.vars.palette.text.primary,
  backgroundColor: theme.vars.palette.background.paper,
  border: "1px solid",
  borderRadius: "5px",
  borderColor: theme.vars.palette.divider,
  "&.today": {
    borderColor: theme.vars.palette.primary.main,
    color: theme.vars.palette.primary.main,
  },
}));

const TabsDayOfMonth = ({ days }: { days: string[] }) => {
  const { setSelectedDay } = useTransactionsPerDayContext();
  const today = dayjs().format("YYYY-MM-DD");
  const [value, setValue] = React.useState<string>(today);
  const divRef = React.useRef<HTMLDivElement>(null);

  const checkIfToday = (day: string) => {
    return day === today ? "today" : "";
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleDayClick = (event: React.MouseEvent<HTMLDivElement>, day: string) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    if (divRef && divRef.current) {
      divRef.current.scrollLeft = divRef.current.scrollWidth;
    }
  }, [divRef]);

  return (
    <div>
      <Tabs
        id="days-container"
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        ref={divRef}
      >
        {days.map((day) => (
          <Day
            key={day}
            label={
              <>
                <div>{dayjs(day).format("DD")}</div>
                <div>{dayjs(day).format("ddd")}</div>
              </>
            }
            onClick={(e: React.MouseEvent<HTMLDivElement>) => handleDayClick(e, day)}
            className={checkIfToday(day)}
            disableRipple
          />
        ))}
      </Tabs>
    </div>
  );
};

export default TabsDayOfMonth;

import React from 'react';
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import {IDayOfMonthProps} from "@/types/interfaces";

const Day = styled(Stack)(({theme}) => ({
  fontSize: "0.875rem",
  width: "42px",
  height: "52px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.vars.palette.text.primary,
  backgroundColor: theme.vars.palette.background.paper,
  border: "1px solid",
  borderColor: theme.vars.palette.divider,
  "&:hover": {
    backgroundColor: theme.vars.palette.action.hover,
  },
  "&.selected": {
    backgroundColor: theme.vars.palette.action.selected,
  },
  "&.today": {
    backgroundColor: theme.vars.palette.action.selected,
  },
}));

const SelectDayOfMonth = ({days, selectedDate, setSelectedDate}: IDayOfMonthProps) => {

    return (
        <Stack direction="row" justifyContent="center" spacing={1} sx={{flexWrap: "nowrap", overflow: "hidden"}}>
          {days.map((day) => (
            <Day direction="column" onClick={() => setSelectedDate(day)}>
              <div>
                {dayjs(day).format("DD")}
              </div>
              <div>
                {dayjs(day).format("ddd")}
              </div>
            </Day>
          ))}
        </Stack>
    );
};

export default SelectDayOfMonth;
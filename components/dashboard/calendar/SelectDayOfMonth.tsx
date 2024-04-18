import React from 'react';
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {IDayOfMonthProps} from "@/types/interfaces";

const SelectDayOfMonth = ({days, selectedDate, setSelectedDate}: IDayOfMonthProps) => {

    return (
        <Stack direction="row" justifyContent="center" spacing={1} sx={{flexWrap: "nowrap", overflow: "hidden"}}>
          {days.map((day) => (
            <Button variant="outlined" key={day}>
              {dayjs(day).format("DD")}
            </Button>
          ))}
        </Stack>
    );
};

export default SelectDayOfMonth;
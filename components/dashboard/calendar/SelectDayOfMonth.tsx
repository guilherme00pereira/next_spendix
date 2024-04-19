import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { IDayOfMonthProps } from "@/types/interfaces";

//TODO: add side buttons and load ant end of the month
const DaysWrapper = styled(Stack)(({ theme }) => ({
  width: "90%",
  height: "100%",
  padding: "8px",
  marginBlockEnd: "12px",
  overflowX: "scroll",
  scrollBehaviorX: "smooth",
  scrollSnapType: "x mandatory",
  overscrollBehaviorX: "contain",
  scrollbarWidth: "none",
  scrollPaddingLeft: "calc((100% - 60px) / 2)",
  whiteSpace: "nowrap",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const Day = styled(Stack)(({ theme }) => ({
  fontSize: "0.875rem",
  width: "60px",
  padding: "8px",
  margin: "0 8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  color: theme.vars.palette.text.primary,
  backgroundColor: theme.vars.palette.background.paper,
  border: "1px solid",
  borderRadius: "5px",
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

const SelectDayOfMonth = ({
  days,
  selectedDate,
  setSelectedDate,
}: IDayOfMonthProps) => {

  return (
    <DaysWrapper direction="row" justifyContent="flex-start" spacing={2}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {days.map((day, index) => (
          <Day
            key={day}
            direction="column"
            onClick={() => setSelectedDate(day)}
          >
            <div>{dayjs(day).format("DD")}</div>
            <div>{dayjs(day).format("ddd")}</div>
          </Day>
        ))}
      </Stack>
    </DaysWrapper>
  );
};

export default SelectDayOfMonth;

"use client";
import React, { useRef, useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import dayjs from "dayjs";
import { useTransactionsPerDayContext } from "@/app/lib/contexts";
import { ScrollMenu, VisibilityContext, getItemsPos } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./buttons/Arrows";
import { DragManager } from "@/app/lib/drag-manager";
import "react-horizontal-scrolling-menu/dist/styles.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const Day = styled("div")(({ theme }) => ({
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
    cursor: "pointer",
  },
  "&.selected": {
    backgroundColor: theme.vars.palette.primary.main,
    color: "white !important",
  },
  "&.today": {
    borderColor: theme.vars.palette.primary.main,
    color: theme.vars.palette.primary.main,
  },
}));

const SelectDayOfMonth = ({ days }: { days: string[] }) => {
  const { setSelectedDay } = useTransactionsPerDayContext();
  const today = dayjs().format("YYYY-MM-DD");
  const dragState = useRef(new DragManager());
  const v = useContext(VisibilityContext)

  const checkIfToday = (day: string) => {
    return day === today ? "today" : "";
  };

  const handleDayClick =
    (event: React.MouseEvent<HTMLDivElement>, day: string) => {
      setSelectedDay(day);
      const divDays = document.querySelectorAll(".react-horizontal-scrolling-menu--item");
      divDays.forEach((el) => {
        el.firstElementChild?.classList.remove("selected");
      });
      event.currentTarget.classList.add("selected");
    };

    useEffect(() => {
      
    }, [])

  return (
    <div className="example">
      <div onMouseLeave={dragState.current.dragStop}>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          onInit={({ getItemById, scrollToItem }: scrollVisibilityApiType) => {
            scrollToItem(getItemById(today), "smooth", "center");
          }}
        >
          {days.map((day) => (
            <Day
              role="button"
              key={day}
              id={day}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => handleDayClick(e, day)}
              className={checkIfToday(day)}
            >
              <div>{dayjs(day).format("DD")}</div>
              <div>{dayjs(day).format("ddd")}</div>
            </Day>
          ))}
        </ScrollMenu>
      </div>
    </div>
  );
};

export default SelectDayOfMonth;


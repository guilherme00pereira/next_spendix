"use client";
import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { useTransactionsPerDayContext } from "@/app/lib/contexts";
import { ScrollMenu, VisibilityContext, getItemsPos, slidingWindow } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./buttons/Arrows";
import { DragManager } from "@/app/lib/drag-manager";
import "react-horizontal-scrolling-menu/dist/styles.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const DaysWrapper = styled(Stack)(({ theme }) => ({
  width: "90%",
  height: "100%",
  padding: "8px",
  marginBlockEnd: "12px",
  overflowX: "scroll",
  scrollBehavior: "smooth",
  scrollbarWidth: "none",
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

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragState.current.dragMove(ev, (posDiff: number) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = useState<string>("");

  const checkIfToday = (day: string) => {
    return day === today ? "today" : "";
  };

  const handleDayClick = (event: React.MouseEvent<HTMLDivElement>, day: string) => {
    setSelectedDay(day);
    event.currentTarget.parentElement?.querySelectorAll(".selected").forEach((el) => el.classList.remove("selected"));
    event.currentTarget.classList.add("selected");
  };

  return (
    // <DaysWrapper id="days-wrapper" direction="row" justifyContent="start" spacing={2}>
    //   <Stack direction="row" justifyContent="center" alignItems="center">
      <div className="example">
      <div onMouseLeave={dragState.current.dragStop}>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          onWheel={onWheel}
          onMouseDown={() => dragState.current.dragStart}
          onMouseUp={({ getItemById, scrollToItem, items }: scrollVisibilityApiType) =>
            () => {
              dragState.current.dragStop();
              const { center } = getItemsPos(items.toItems());
              scrollToItem(getItemById(center), "smooth", "center");
            }}
          onMouseMove={handleDrag}
        >
        {days.map((day) => (
          <Day
            key={day}
            direction="column"
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
      // </Stack>
     // </DaysWrapper>
  );
};

export default SelectDayOfMonth;


function onWheel({ getItemById, items, scrollToItem }: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  const allItems = items.toItems();
  const visibleItems = allItems.map((el) => el[0]);

  if (ev.deltaY < 0) {
    // NOTE: for center items
    const nextGroupItems = slidingWindow(allItems, visibleItems).next();
    const { center } = getItemsPos(nextGroupItems);
    scrollToItem(getItemById(center), "smooth", "center");
  } else if (ev.deltaY > 0) {
    const prevGroupItems = slidingWindow(allItems, visibleItems).prev();
    const { center } = getItemsPos(prevGroupItems);
    scrollToItem(getItemById(center), "smooth", "center");
  }
}
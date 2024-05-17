import { styled } from "@mui/material/styles";
import { IconButton, Stack, Typography } from "@mui/material";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import dayjs from "dayjs";

const DateSelector = styled(Stack)(({ theme }) => ({
  borderRadius: "0.5em",
  border: "1px solid",
  width: "fit-content",
  borderColor: theme.palette.primary.main,
  padding: "0.25em",
  height: "40px",
}));

const SelectMonthYear = () => {
  const date = dayjs().format("YYYYMM");

  const handleClick = (action: string) => {
    if (action === "add") {
      const d = dayjs(date).add(1, "month");
    } else {
      const d = dayjs(date).subtract(1, "month");
    }
  };

  return (
    <Stack direction="row" justifyContent="center" spacing={2} sx={{width: "100%"}}>
      <DateSelector direction="row" justifyContent="center" alignItems="center">
        <IconButton onClick={() => handleClick("del")}>
          <ArrowCircleLeftRoundedIcon color="primary" />
        </IconButton>
        <Typography fontSize="14px">{dayjs(date).format("MMMM [/] YYYY")}</Typography>
        <IconButton onClick={() => handleClick("add")}>
          <ArrowCircleRightRoundedIcon color="primary" />
        </IconButton>
      </DateSelector>
    </Stack>
  );
};

export default SelectMonthYear;

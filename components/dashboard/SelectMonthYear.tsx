import {useState} from 'react';
import dayjs from 'dayjs';
import {useAppStore} from '@/lib/hooks';
import {IconButton, Stack} from '@mui/material';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import {styled} from "@mui/material/styles";

const DateSelector = styled(Stack)(({theme}) => ({
    marginLeft: "-56px",
    borderRadius: "0.5em",
    border: "2px solid",
    width: "fit-content",
    borderColor: theme.palette.primary.main,
    padding: "0.25em",
}));

const SelectMonthYear = () => {
  const {date, setDate} = useAppStore();
  const [monthAndYear, setMonthAndYear] = useState<string>(dayjs(date).format('MMMM [de] YYYY'));

  const handleClick = (action: string) => {
    if (action === 'add') {
      const d = dayjs(date).add(1, 'month')
      setMonthAndYear(d.format('MMMM [de] YYYY'));
      setDate(d.format('YYYYMM'));
    } else {
      const d = dayjs(date).subtract(1, 'month')
      setMonthAndYear(d.format('MMMM [de] YYYY'));
      setDate(d.format('YYYYMM'));
    }
  }

  return (
    <Stack direction="row" justifyContent="center" sx={{flexGrow: "1"}}>
      <DateSelector direction="row" justifyContent="center" alignItems="center">
        <IconButton onClick={() => handleClick("del")}>
          <ArrowCircleLeftRoundedIcon sx={{color: "white"}}/>
        </IconButton>
        {monthAndYear}
        <IconButton onClick={() => handleClick("add")}>
          <ArrowCircleRightRoundedIcon sx={{color: "white"}}/>
        </IconButton>
      </DateSelector>
    </Stack>
  );
};

export default SelectMonthYear;
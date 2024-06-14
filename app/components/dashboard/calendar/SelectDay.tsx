import React from 'react';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from 'dayjs';
import { Typography } from '@mui/material';

interface SelectDayProps {
    value: Dayjs;
    action: () => void;
}


const SelectDay = ({action, value}: SelectDayProps) => {
    const [showCalendar, setShowCalendar] = React.useState(false);

    return (
        <>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 2 }}>Today</Typography>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 2 }}>Yesterday</Typography>
            <Typography variant="subtitle2" sx={{ mt: 2, mb: 2 }}>Custom</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]} sx={{ pt: "0" }}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      onChange={action}
                      value={value}
                      name="due_date"
                      label="Vencimento"
                    />
                  </DemoContainer>
                </LocalizationProvider>
        </>
    );
};

export default SelectDay;
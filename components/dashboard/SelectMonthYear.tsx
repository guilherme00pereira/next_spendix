import React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const SelectMonthYear = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="Selecione o mês e ano"
                        defaultValue={dayjs()}
                        onYearChange={() => {console.log('changed')}}
                        views={['month', 'year']}
                        openTo={'month'}
                    />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default SelectMonthYear;
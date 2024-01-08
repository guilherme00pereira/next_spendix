import React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const SelectDayOfMonth = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    label="Filtrar por dia"
                    onChange={() => {console.log('changed')}}
                    views={['day']}
                    openTo={'day'}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default SelectDayOfMonth;
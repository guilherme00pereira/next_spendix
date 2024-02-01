import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTransactionContext } from '@/lib/hooks';


const SelectMonthYear = () => {
    const {setDate} = useTransactionContext();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="Selecione o mês e ano"
                        defaultValue={dayjs()}
                        onYearChange={(e) => setDate(e)}
                        views={['month', 'year']}
                        openTo={'month'}
                    />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default SelectMonthYear;
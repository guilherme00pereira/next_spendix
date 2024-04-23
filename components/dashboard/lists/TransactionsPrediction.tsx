import React from 'react';
import Stack from "@mui/material/Stack";
import {PaperContainer} from "@/components/dashboard/commonStyledComponents";
import PaperHeader from "@/components/dashboard/surfaces/PaperHeader";
import ScrollerSelectDayOfMonth from '../calendar/ScrollerSelectDayOfMonth';

const TransactionsPrediction = () => {
  return (
    <PaperContainer>
      <PaperHeader title='Próximas transações'/>
      <Stack>
        <ScrollerSelectDayOfMonth />
      </Stack>
    </PaperContainer>
  );
};

export default TransactionsPrediction;
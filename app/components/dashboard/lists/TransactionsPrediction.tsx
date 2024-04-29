import React from 'react';
import Stack from "@mui/material/Stack";
import {PaperContainer} from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";


const TransactionsPrediction = () => {
  return (
    <PaperContainer>
      <PaperHeader title='Próximas transações'/>
      <Stack>
        
      </Stack>
    </PaperContainer>
  );
};

export default TransactionsPrediction;
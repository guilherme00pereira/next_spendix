import {useEffect, useState} from 'react';
import {getTotalAmountAvailable} from "@/lib/supabase/methods/payment-methods";
import {Stack} from "@mui/system";
import {amountFormatter} from "@/lib/functions";
import DashboardTopCard from '../panels-and-cards/DashboardTopCard';
import { DashboardTopCardContentInfo } from '@/components/common-styled';

const DashboardTotalAmountAvailable = () => {
  const [bankAmount, setBankAmount] = useState(0)
  const [creditCardAmount, setCreditCardAmount] = useState(0)

  useEffect(() => {
    getTotalAmountAvailable().then((data) => {
      setBankAmount(data[0].total)
      setCreditCardAmount(data[1].total)
    })
  }, [])

  return (
    <DashboardTopCard title="Total disponível" bottomValue={amountFormatter(bankAmount + creditCardAmount)}>
        
          <Stack direction="row" justifyContent="space-between">
            <DashboardTopCardContentInfo variant='subtitle2'>Cartões:</DashboardTopCardContentInfo>
            <DashboardTopCardContentInfo variant='subtitle2'>{amountFormatter(bankAmount)}</DashboardTopCardContentInfo>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <DashboardTopCardContentInfo variant='subtitle2'>C/C:</DashboardTopCardContentInfo>
            <DashboardTopCardContentInfo variant='subtitle2'>{amountFormatter(creditCardAmount)}</DashboardTopCardContentInfo>
          </Stack>
        
      </DashboardTopCard>
  );
};

export default DashboardTotalAmountAvailable;
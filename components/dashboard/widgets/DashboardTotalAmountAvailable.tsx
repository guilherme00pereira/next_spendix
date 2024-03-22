import {useState} from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useQuery} from '@tanstack/react-query';
import {getTotalAmountAvailable} from "@/lib/supabase/methods/payment-methods";
import {Stack} from "@mui/system";
import {amountFormatter} from "@/lib/functions";

const DashboardTotalAmountAvailable = () => {
  const [bankAmount, setBankAmount] = useState(0)
  const [creditCardAmount, setCreditCardAmount] = useState(0)

  const {data: totalAmountAvailable} = useQuery({
    queryKey: ["total_amount_available"],
    queryFn: () => getAvailableValues(),
  });

  const getAvailableValues = () => {
    getTotalAmountAvailable().then((data) => {
      setBankAmount(data[0].total)
      setCreditCardAmount(data[1].total)
    })
  }

  return (
    <Card>
      <CardHeader
        title="Dinheiro Disponível"
        color="primary"
      />
      <CardContent sx={{display: "flex", justifyContent: "end"}}>
        <Stack direction="column" justifyContent="flex-end">
          <Stack direction="row" justifyContent="space-between">
            <span>Cartões:</span>
            <span>{amountFormatter(bankAmount)}</span>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <span>C/C:</span>
            <span>{amountFormatter(creditCardAmount)}</span>
          </Stack>
          <Typography variant="h4" color="secondary">
            {amountFormatter(bankAmount + creditCardAmount)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DashboardTotalAmountAvailable;
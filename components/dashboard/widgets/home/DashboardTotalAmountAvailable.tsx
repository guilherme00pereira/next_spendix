import { useEffect, useState } from "react";
import { getTotalAmountAvailable } from "@/lib/supabase/methods/payment-methods";
import { amountFormatter } from "@/lib/functions";
import DashboardTopCard from "./DashboardTopCard";
import {
  DashboardTopCardContentInfo,
  DashboardTopCardContentRow,
} from "@/components/common-styled";

const DashboardTotalAmountAvailable = () => {
  const [bankAmount, setBankAmount] = useState(0);
  const [creditCardAmount, setCreditCardAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTotalAmountAvailable().then((data) => {
      setBankAmount(data[0].total);
      setCreditCardAmount(data[1].total);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardTopCard
      title="Total disponível"
      bottomValue={amountFormatter(bankAmount + creditCardAmount)}
      loading={loading}
    >
      <DashboardTopCardContentRow
        direction="row"
        justifyContent="space-between"
        width="70%"
      >
        <DashboardTopCardContentInfo variant="subtitle2">
          Cartões:
        </DashboardTopCardContentInfo>
        <DashboardTopCardContentInfo variant="subtitle2">
          {amountFormatter(bankAmount)}
        </DashboardTopCardContentInfo>
      </DashboardTopCardContentRow>
      <DashboardTopCardContentRow
        direction="row"
        justifyContent="space-between"
        width="70%"
      >
        <DashboardTopCardContentInfo variant="subtitle2">
          C/C:
        </DashboardTopCardContentInfo>
        <DashboardTopCardContentInfo variant="subtitle2">
          {amountFormatter(creditCardAmount)}
        </DashboardTopCardContentInfo>
      </DashboardTopCardContentRow>
    </DashboardTopCard>
  );
};

export default DashboardTotalAmountAvailable;

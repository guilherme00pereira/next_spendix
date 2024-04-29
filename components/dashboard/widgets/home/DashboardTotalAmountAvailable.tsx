import { getTotalAmountAvailable } from "@/lib/supabase/methods/payment-methods";
import { amountFormatter } from "@/lib/functions";
import DashboardTopCard from "./DashboardTopCard";
import {
  DashboardTopCardContentInfo,
  DashboardTopCardContentRow,
} from "@/components/dashboard/commonStyledComponents";

async function getAccountAndCardsTotal() {
  const res: any = await getTotalAmountAvailable();
  return res;
}

const DashboardTotalAmountAvailable = async () => {
  const totals = await getAccountAndCardsTotal();

  return (
    <DashboardTopCard
      title="Total disponível"
      bottomValue={amountFormatter(totals[0].total + totals[1].total)}
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
          {amountFormatter(totals[1].total)}
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
          {amountFormatter(totals[0].total)}
        </DashboardTopCardContentInfo>
      </DashboardTopCardContentRow>
    </DashboardTopCard>
  );
};

export default DashboardTotalAmountAvailable;

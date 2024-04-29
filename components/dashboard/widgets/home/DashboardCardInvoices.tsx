import DashboardTopCard from "@/components/dashboard/widgets/home/DashboardTopCard";
import { CreditCardInvoiceType } from "@/types/entities";
import {
  DashboardTopCardContentInfo,
  DashboardTopCardContentRow,
} from "@/components/dashboard/commonStyledComponents";
import { amountFormatter } from "@/lib/functions";
import dayjs from "dayjs";
import { getCreditCardsInvoices } from "@/lib/supabase/methods/credit-cards";

async function getInvoices(): Promise<CreditCardInvoiceType[]> {
  const res:any = await getCreditCardsInvoices();
  const invoices = res.filter((card: any) => dayjs(card.date) < dayjs().add(1, 'month') && dayjs(card.date) > dayjs())
  return invoices;
}

const DashboardCardInvoices = async () => {
  const invoices = await getInvoices();

  return (
    <DashboardTopCard
      title="Próximas Faturas"
      bottomValue={amountFormatter(invoices.reduce((acc, card) => acc + card.amount, 0))}
    >
      {invoices.map((invoice) => (
        <DashboardTopCardContentRow
          direction="row"
          justifyContent="space-between"
          key={invoice.id}
        >
          <DashboardTopCardContentInfo variant="subtitle2">
            {invoice.credit_cards?.name} ({invoice.credit_cards?.due_day}):
          </DashboardTopCardContentInfo>
          <DashboardTopCardContentInfo variant="subtitle2">
            {amountFormatter(invoice.amount)}
          </DashboardTopCardContentInfo>
        </DashboardTopCardContentRow>
      ))}
    </DashboardTopCard>
  );
};

export default DashboardCardInvoices;

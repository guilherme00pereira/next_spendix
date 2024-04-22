import { useState, useEffect } from "react";
import DashboardTopCard from "@/components/dashboard/widgets/home/DashboardTopCard";
import { getCreditCards } from "@/lib/supabase/methods/credit-cards";
import { CreditCardType } from "@/types/entities";
import {
  DashboardTopCardContentInfo,
  DashboardTopCardContentRow,
} from "@/components/dashboard/commonStyledComponents";
import { amountFormatter } from "@/lib/functions";

const DashboardCardInvoices = () => {
  const [invoices, setInvoices] = useState<CreditCardType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCreditCards().then((data) => {
      setInvoices(data as CreditCardType[]);
      setTotal(data.reduce((acc, card) => acc + card.current_invoice, 0));
      setLoading(false);
    });
  }, []);

  return (
    <DashboardTopCard
      title="Próximas Faturas"
      bottomValue={amountFormatter(total)}
      loading={loading}
    >
      {invoices.map((invoice) => (
        <DashboardTopCardContentRow
          direction="row"
          justifyContent="space-between"
          key={invoice.id}
        >
          <DashboardTopCardContentInfo variant="subtitle2">
            {invoice.name} ({invoice.due_day}):
          </DashboardTopCardContentInfo>
          <DashboardTopCardContentInfo variant="subtitle2">
            {amountFormatter(invoice.current_invoice)}
          </DashboardTopCardContentInfo>
        </DashboardTopCardContentRow>
      ))}
    </DashboardTopCard>
  );
};

export default DashboardCardInvoices;

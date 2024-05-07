import React from 'react';
import { PaperContainer } from '../commonStyledComponents';
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { CreditCardType } from '@/types/entities';
import CreditCardsListItem from '@/app/components/dashboard/lists/items/CreditCardsListItem';
import { getCreditCardPaymentMethods } from '@/app/lib/supabase/methods/payment-methods';
import Button from '@mui/material/Button';

async function fetchCreditCards() {
  const res = await getCreditCardPaymentMethods();
  if (res instanceof Error) {
    console.error(res);
    return [];
  }
  return res
}

const CreditCardsList = async () => {
  const cards = await fetchCreditCards();
  return (
    <PaperContainer>
      <PaperHeader  title="Cartões de Crédito">
        <Button variant="contained" size="small" color="primary">Adicionar</Button>
      </PaperHeader>
      {cards && cards.map((card: CreditCardType) => (
        <CreditCardsListItem key={card.id} card={card} />
      ))}
    </PaperContainer>
  );
};

export default CreditCardsList;
import React from 'react';
import { PaperContainer } from '../commonStyledComponents';
import PaperHeader from "@/components/dashboard/surfaces/PaperHeader";
import { CreditCardType } from '@/types/entities';
import CreditCardsListItem from '@/components/dashboard/lists/items/CreditCardsListItem';
import { getCreditCardPaymentMethods } from '@/lib/supabase/methods/payment-methods';

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
      <PaperHeader  title="Cartões de Crédito" />
      {cards && cards.map((card: CreditCardType) => (
        <CreditCardsListItem key={card.id} card={card} />
      ))}
    </PaperContainer>
  );
};

export default CreditCardsList;
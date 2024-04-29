import React from 'react';
import { PaperContainer } from '../commonStyledComponents';
import PaperHeader from "@/components/dashboard/surfaces/PaperHeader";
import { CreditCardType } from '@/types/entities';
import CreditCardsListItem from '@/components/dashboard/lists/items/CreditCardsListItem';

const CreditCardsList = ({cards}: {cards: CreditCardType[]}) => {
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
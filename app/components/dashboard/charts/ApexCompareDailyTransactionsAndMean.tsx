import React from "react";
import { PaperContainer } from "../commonStyledComponents";
import PaperHeader from "../surfaces/PaperHeader";
import ScrollerSelectDayOfMonth from '../calendar/ScrollerSelectDayOfMonth';

const ApexCompareDailyTransactionsAndMean = () => {
  return (
    <PaperContainer>
      <PaperHeader title="Transações por dia X média" />
      <ScrollerSelectDayOfMonth />
    </PaperContainer>
  );
};

export default ApexCompareDailyTransactionsAndMean;

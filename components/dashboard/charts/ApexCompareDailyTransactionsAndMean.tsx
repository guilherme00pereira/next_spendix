import React from "react";
import { PaperContainer } from "../commonStyledComponents";
import PaperHeader from "../surfaces/PaperHeader";

const ApexCompareDailyTransactionsAndMean = () => {
  return (
    <PaperContainer>
      <PaperHeader title="Transações por dia X média" showSettingButon />
    </PaperContainer>
  );
};

export default ApexCompareDailyTransactionsAndMean;

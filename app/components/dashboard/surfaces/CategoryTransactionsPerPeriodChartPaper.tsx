import React from "react";
import { PaperContainer } from "../commonStyledComponents";
import PaperHeader from "./PaperHeader";

async function fetchChartData() {}

const CategoryTransactionsPerPeriodChartPaper = () => {
  return (
    <PaperContainer>
      <PaperHeader title="Evolução por período" />
    </PaperContainer>
  );
};

export default CategoryTransactionsPerPeriodChartPaper;

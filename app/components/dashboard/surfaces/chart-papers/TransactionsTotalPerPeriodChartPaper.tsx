'use client';
import React from "react";
import { PaperContainer } from "../../commonStyledComponents";
import PaperHeader from "../PaperHeader";
import { useGroupContext } from "@/app/lib/contexts";

async function fetchChartData() {}

const TransactionsTotalPerPeriodChartPaper = () => {
  const { showChart } = useGroupContext();

  return (
    <>
      {showChart && (
        <PaperContainer>
          <PaperHeader title="Evolução por período" />
        </PaperContainer>
      )}
    </>
  );
};

export default TransactionsTotalPerPeriodChartPaper;

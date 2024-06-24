'use client';
import React from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { useGroupContext } from "@/app/lib/contexts";
import { TransactionType } from "@/types/entities";


const TransactionsTotalPerPeriodChartPaper = ({ transactions }: { transactions: TransactionType[] }) => {
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

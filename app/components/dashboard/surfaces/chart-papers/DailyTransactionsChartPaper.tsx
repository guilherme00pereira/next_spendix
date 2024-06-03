import React from 'react';
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import ApexDailyTransactionsChart from '@/app/components/dashboard/charts/ApexDailyTransactionsLineChart';
import { ApexDailyTransactionsChartProps } from '@/types/interfaces';

const DailyTransactionsChartPaper = ({values, show}: {values: ApexDailyTransactionsChartProps, show:boolean}) => {
    return (
        <PaperContainer sx={{ minHeight: "400px", maxWidth: "50%" }}>
          <PaperHeader title="Evolução por dia" />
            {show && <ApexDailyTransactionsChart {...values}  />}
            {show || "Nenhum dado disponível"}
        </PaperContainer>
    );
};

export default DailyTransactionsChartPaper;
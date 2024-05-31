import React from 'react';
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import ApexDailyTransactionsChart from '@/app/components/dashboard/charts/ApexDailyTransactionsLineChart';
import { ApexDailyTransactionsChartProps } from '@/types/interfaces';

const DailyTransactionsChartPaper = (props: ApexDailyTransactionsChartProps) => {
    return (
        <PaperContainer sx={{ minHeight: "400px", maxWidth: "50%" }}>
          <PaperHeader title="Evolução por dia" />
            <ApexDailyTransactionsChart {...props}  />
        </PaperContainer>
    );
};

export default DailyTransactionsChartPaper;
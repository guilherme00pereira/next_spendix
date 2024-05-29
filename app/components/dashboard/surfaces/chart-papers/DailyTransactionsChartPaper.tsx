import React from 'react';
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { ChartBarType } from '@/types/chart-types';
import ApexDailyTransactionsChart from '../../charts/ApexDailyTransactionsChart';

const DailyTransactionsChartPaper = ({ data }: { data: ChartBarType[] }) => {
    return (
        <PaperContainer>
          <PaperHeader title="Evolução por dia" />
            <ApexDailyTransactionsChart data={data} />
        </PaperContainer>
    );
};

export default DailyTransactionsChartPaper;
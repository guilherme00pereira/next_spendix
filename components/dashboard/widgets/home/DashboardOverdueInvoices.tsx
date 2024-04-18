import { useState } from 'react';
import DashboardTopCard from './DashboardTopCard';
import { DashboardTopCardContentInfo, DashboardTopCardContentRow } from '@/components/common-styled';

//TODO: supabase function to get overdue bills sum and count
const DashboardOverdueInvoices = () => {
    const [loading, setLoading] = useState(false);
    return (
        <DashboardTopCard title="Contas em atraso" bottomValue='R$ 0,00' loading={loading}>
            <DashboardTopCardContentRow direction="row" justifyContent="space-between" width="40%">
            <DashboardTopCardContentInfo variant='subtitle2'>total</DashboardTopCardContentInfo>
            <DashboardTopCardContentInfo variant='subtitle2'>12</DashboardTopCardContentInfo>
          </DashboardTopCardContentRow>
        </DashboardTopCard>
    );
};

export default DashboardOverdueInvoices;
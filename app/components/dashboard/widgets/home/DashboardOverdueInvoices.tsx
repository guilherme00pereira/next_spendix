import DashboardTopCard from './DashboardTopCard';
import { DashboardTopCardContentInfo, DashboardTopCardContentRow } from '@/app/components/dashboard/commonStyledComponents';

//TODO: supabase function to get overdue bills sum and count
const DashboardOverdueInvoices = () => {
    
    return (
        <DashboardTopCard title="Contas em atraso" bottomValue='R$ 0,00'>
            <DashboardTopCardContentRow direction="row" justifyContent="space-between" width="40%">
            <DashboardTopCardContentInfo variant='subtitle2'>total</DashboardTopCardContentInfo>
            <DashboardTopCardContentInfo variant='subtitle2'>12</DashboardTopCardContentInfo>
          </DashboardTopCardContentRow>
        </DashboardTopCard>
    );
};

export default DashboardOverdueInvoices;
import Paper from "@mui/material/Paper";
import PageContainer from "@/app/components/dashboard/page/PageContainer";
import Breadcrumbs from "@/app/components/dashboard/widgets/Breadcrumbs";

const ReportPage = () => {
  return (
    <PageContainer title="Relatórios" breadcrumb={<Breadcrumbs steps={[{ title: "Relatórios" }]} />}>
      <Paper sx={{ width: "100%" }}>Reports</Paper>
    </PageContainer>
  );
};

export default ReportPage;

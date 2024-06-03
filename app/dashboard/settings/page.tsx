import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import PageContainer from "@/app/components/dashboard/page/PageContainer";

const Settings = () => {
  return (
    <PageContainer title="Configurações">
        <Paper sx={{width: "100%"}}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", p: 2 }}>
            <Tabs value={0} aria-label="basic tabs example">
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </Box>
        </Paper>
    </PageContainer>
  );
};

export default Settings;

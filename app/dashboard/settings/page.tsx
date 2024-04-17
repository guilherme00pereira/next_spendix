"use client";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import PageTitle from "@/components/dashboard/page/PageTitle";
import PageContainer from "@/components/dashboard/page/PageContainer";

const Settings = () => {
  return (
    <PageContainer>
      <Stack>
      <PageTitle title="Configurações" />
        <Paper>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
            <Tabs value={0} aria-label="basic tabs example">
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
            </Tabs>
        </Box>
        </Paper>
      </Stack>
    </PageContainer>
  );
};

export default Settings;

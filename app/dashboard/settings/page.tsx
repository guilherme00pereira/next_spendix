"use client";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import PageTitle from "@/components/dashboard/PageTitle";

const Settings = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
    </Container>
  );
};

export default Settings;

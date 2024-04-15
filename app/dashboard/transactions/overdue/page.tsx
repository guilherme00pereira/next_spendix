import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PageContainer from "@/components/dashboard/PageContainer";

const OverduePage = () => {
  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" textAlign="center">
          Contas vencidas
        </Typography>
      </Box>
    </PageContainer>
  );
};

export default OverduePage;

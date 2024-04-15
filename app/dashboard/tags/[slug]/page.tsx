import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import PageContainer from "@/components/dashboard/PageContainer";

//TODO: list transactions related to this tag
const TagDetailsPage = ({ params }: { params: { slug: string } }) => {
  return (
    <PageContainer>
      <Stack>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack sx={{ width: "75%" }}>
            <Typography variant="h2" fontSize="1.5em" color="primary">
              Tag: {params.slug}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Paper sx={{ width: "50%" }}>
            <Box flexWrap="wrap" sx={{ p: 2 }}>
              
            </Box>
          </Paper>
          
        </Stack>
      </Stack>
    </PageContainer>
  );
};

export default TagDetailsPage;

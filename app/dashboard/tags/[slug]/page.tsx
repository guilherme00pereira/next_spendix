import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

//TODO: list transactions related to this tag
const TagDetailsPage = ({ params }: { params: { slug: string } }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
    </Container>
  );
};

export default TagDetailsPage;

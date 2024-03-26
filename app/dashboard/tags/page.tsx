"use client";
import { Stack, Container } from "@mui/material";
import TagsTable from "@/components/dashboard/tables/TagsTable";
import PageTitle from "@/components/dashboard/PageTitle";

const TagsPage = () => {

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <PageTitle title="Tags" />
        <TagsTable />
      </Stack>
    </Container>
  );
};

export default TagsPage;

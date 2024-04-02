"use client";
import { Stack, Container } from "@mui/material";
import PageTitle from "@/components/dashboard/PageTitle";
import TagList from "@/components/dashboard/lists/TagList";
import { useState } from "react";
import { TagType } from "@/types/entities";
import { TagContext } from "@/lib/hooks";
import TagFormDialog from "@/components/dashboard/dialogs/TagFormDialog";

const TagsPage = () => {
  const [editableTag, setEditableTag] = useState({} as TagType);

  return (
    <TagContext.Provider value={{ editableObject: editableTag, setEditableObject: setEditableTag }}>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack>
        <PageTitle title="Tags" />
        <TagList />
        <TagFormDialog />
      </Stack>
    </Container>
    </TagContext.Provider>
  );
};

export default TagsPage;

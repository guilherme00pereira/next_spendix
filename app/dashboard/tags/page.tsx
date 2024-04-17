"use client";
import { Stack } from "@mui/material";
import PageTitle from "@/components/dashboard/page/PageTitle";
import TagList from "@/components/dashboard/lists/TagList";
import { useState } from "react";
import { TagType } from "@/types/entities";
import { TagContext } from "@/lib/hooks";
import TagFormDialog from "@/components/dashboard/dialogs/TagFormDialog";
import PageContainer from "@/components/dashboard/page/PageContainer";

const TagsPage = () => {
  const [editableTag, setEditableTag] = useState({} as TagType);

  return (
    <TagContext.Provider value={{ editableObject: editableTag, setEditableObject: setEditableTag }}>
      <PageContainer>
        <Stack>
          <PageTitle title="Tags" />
          <TagList />
          <TagFormDialog />
        </Stack>
      </PageContainer>
    </TagContext.Provider>
  );
};

export default TagsPage;

import React from "react";
import { getTags } from "@/lib/supabase/methods/tags";
import { useQuery } from "@tanstack/react-query";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {usePageContext, useTagContext} from "@/lib/hooks";

const TagList = () => {
  const { actionShowModal } = usePageContext();
  const{ setEditableObject } = useTagContext();

  const { data: tags, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getTags(),
  });

  const deleteTag = async (id: string) => {
    // Implement delete tag
  }

  const editTag = async (tag: any) => {
    setEditableObject(tag);
    actionShowModal(true);
  }

  const addTag = async () => {
    actionShowModal(true);
    setEditableObject({id: 0, name: ""});
  }

  return (
    <Paper sx={{p: 6}}>
      <Stack direction="row" justifyContent="flex-start">
        {tags?.map((tag) => (
          <Chip key={tag.id} label={tag.name} variant="outlined" onClick={() => editTag(tag)} color="primary" sx={{mx: 2}} onDelete={deleteTag} />
        ))}
        <Chip label="Nova tag" color="success" sx={{mx: 2}} icon={<AddCircleOutlineRoundedIcon />} onClick={addTag} />
      </Stack>
    </Paper>
  );
};

export default TagList;

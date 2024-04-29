'use client'
import { useState } from "react";
import { getTags, removeTag } from "@/app/lib/supabase/methods/tags";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { usePageContext, useTagContext } from "@/app/lib/contexts";
import ConfirmDeleteDialog from "@/app/components/dashboard/dialogs/ConfirmDeleteDialog";
import { IRemovableEntity } from "@/types/interfaces";
import NodeRepeaterLoader from "../loaders/RepeatableLoader";

const TagList = () => {
  const queryClient = useQueryClient();
  const { actionShowModal } = usePageContext();
  const { setEditableObject } = useTagContext();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [removableTag, setRemovableTag] = useState<IRemovableEntity>({
    id: 0,
    name: "",
    type: "tag",
  });

  const { data: tags, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getTags(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => removeTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  const handleConfirmDelete = (id: number, name: string) => {
    setRemovableTag({ ...removableTag, id, name });
    setOpenConfirm(true);
  };

  const processDelete = () => {
    if (removableTag.id > 0) {
      deleteMutation.mutate(removableTag.id);
    }
    setOpenConfirm(false);
  };

  const editTag = async (tag: any) => {
    setEditableObject(tag);
    actionShowModal(true);
  };

  const addTag = async () => {
    actionShowModal(true);
    setEditableObject({ id: 0, name: "" });
  };

  //TODO: change Chip component to a custom component that allows to delete, edit and go to the tag page. Also show a badge with the number of transactions related to this tag
  return (
    <Paper sx={{ p: 6 }}>
      <Stack direction="row" justifyContent="flex-start">
        {isLoading && <NodeRepeaterLoader items={5} width={100} height={50} />}
        {isLoading ||
          tags?.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              variant="outlined"
              onClick={() => editTag(tag)}
              color="primary"
              sx={{ mx: 2 }}
              onDelete={() => handleConfirmDelete(tag.id, tag.name)}
            />
          ))}
        <Chip
          label="Nova tag"
          color="success"
          sx={{ mx: 2 }}
          icon={<AddCircleOutlineRoundedIcon />}
          onClick={addTag}
        />
      </Stack>
      <ConfirmDeleteDialog
        entity={removableTag}
        open={openConfirm}
        handleClose={setOpenConfirm}
        handleDelete={processDelete}
      />
    </Paper>
  );
};

export default TagList;

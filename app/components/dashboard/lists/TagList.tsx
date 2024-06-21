"use client";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { usePageContext, useTagContext } from "@/app/lib/contexts";
import ConfirmDeleteDialog from "@/app/components/dashboard/dialogs/ConfirmDeleteDialog";
import { IRemovableEntity } from "@/types/interfaces";
import { TagType } from "@/types/entities";
import { deleteTag } from "@/app/lib/actions/tag-actions";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";

const TagList = ({tags}: {tags: TagType[]}) => {
  const { actionShowModal } = usePageContext();
  const { setEditableObject } = useTagContext();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [removableTag, setRemovableTag] = useState<IRemovableEntity>({
    id: 0,
    name: "",
    type: "tag",
  });

  const handleConfirmDelete = (id: number, name: string) => {
    setRemovableTag({ ...removableTag, id, name });
    setOpenConfirm(true);
  };

  const processDelete = () => {
    if (removableTag.id > 0) {
      deleteTag(removableTag.id);
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
    <PaperContainer width="50%">
      <Stack direction="row" justifyContent="flex-start">
        
          {tags.map((tag) => (
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
        <Chip label="Nova tag" color="success" sx={{ mx: 2 }} icon={<AddCircleOutlineRoundedIcon />} onClick={addTag} />
      </Stack>
      <ConfirmDeleteDialog
        entity={removableTag}
        open={openConfirm}
        handleClose={setOpenConfirm}
        handleDelete={processDelete}
      />
    </PaperContainer>
  );
};

export default TagList;

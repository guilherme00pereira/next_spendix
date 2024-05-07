"use client";
import React from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { GroupType } from "@/types/entities";
import { Stack } from "@mui/system";
import GroupListItem from "./items/GroupListItem";
import { useSpeedDialStore } from "@/app/lib/store";
import ConfirmDeleteDialog from "../dialogs/ConfirmDeleteDialog";
import { useGroupContext } from "@/app/lib/contexts";
import { deleteGroup } from "@/app/lib/actions/group-actions";

const GroupsList = ({ groups }: { groups: GroupType[] }) => {
  const { actionShowGroupDialog, setGroup } = useSpeedDialStore();
  const { openConfirm, setOpenConfirm, removableObject, setRemovableObject } = useGroupContext();

  const handleConfirmDelete = (id: number, name: string) => {
    setRemovableObject({ ...removableObject, id, name });
    setOpenConfirm(true);
  };

  const handleEdit = (id: number) => {
    actionShowGroupDialog(true);
    const g = groups?.filter((group) => group.id === id)[0] ?? ({} as GroupType);
    setGroup({
      id: g.id ?? 0,
      name: g.name ?? "",
      icon: g.icon ?? null,
      color: g.color ?? null,
    });
  };

  return (
    <PaperContainer>
      <PaperHeader title="Grupos" />
      <Stack>
        {groups.map((group) => (
          <GroupListItem
            key={group.id}
            group={group}
            handleEdit={handleEdit}
            handleConfirmDelete={handleConfirmDelete}
          />
        ))}
      </Stack>
      <ConfirmDeleteDialog
        entity={removableObject}
        open={openConfirm}
        handleClose={setOpenConfirm}
        handleDelete={() => {
          deleteGroup(removableObject.id);
          setOpenConfirm(false);
        }}
      />
    </PaperContainer>
  );
};

export default GroupsList;

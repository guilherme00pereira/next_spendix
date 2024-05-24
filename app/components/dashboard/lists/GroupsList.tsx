"use client";
import React from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { GroupType } from "@/types/entities";
import { Stack } from "@mui/system";
import GroupListItem from "./items/GroupListItem";
import ConfirmDeleteDialog from "../dialogs/ConfirmDeleteDialog";
import { useGroupContext } from "@/app/lib/contexts";
import { deleteGroup } from "@/app/lib/actions/group-actions";
import Button from "@mui/material/Button";

const GroupsList = ({ groups }: { groups: GroupType[] }) => {
  const { 
    openConfirm, 
    setOpenConfirm, 
    removableObject, 
    setRemovableObject, 
    setShowGroupDialog, 
    setEditableGroup, 
    setShowChart, 
    setSelectedGroup 
  } = useGroupContext();

  const handleConfirmDelete = (id: number, name: string) => {
    setRemovableObject({ ...removableObject, id, name });
    setOpenConfirm(true);
  };

  const handleEdit = (id: number) => {
    setShowGroupDialog(true);
    const g = groups?.filter((group) => group.id === id)[0] ?? ({} as GroupType);
    setEditableGroup({
      id: g.id ?? 0,
      name: g.name ?? "",
      icon: g.icon ?? null,
      color: g.color ?? null,
    });
  };

  const handleAdd = () => {
    setShowGroupDialog(true);
    setEditableGroup({
      id: 0,
      name: "",
      icon: null,
      color: null,
    });
  };

  const handleOpenChart = (id: number) => {
    setShowChart(true);
    setSelectedGroup({} as GroupType);
    
  };

  return (
    <PaperContainer>
      <PaperHeader title="Grupos">
        <Button variant="contained" size="small" color="primary" onClick={handleAdd}>
          Adicionar
        </Button>
      </PaperHeader>
      <Stack>
        {groups.map((group) => (
          <GroupListItem key={group.id} group={group} handleEdit={handleEdit} handleConfirmDelete={handleConfirmDelete} handleOpenChart={handleOpenChart} />
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

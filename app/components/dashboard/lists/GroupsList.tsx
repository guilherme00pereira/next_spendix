'use client'
import React from "react";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { GroupType } from "@/types/entities";
import { Stack } from "@mui/system";
import GroupListItem from "./items/GroupListItem";
import { useSpeedDialStore } from "@/app/lib/store";

const GroupsList = ({groups}: {groups: GroupType[]}) => {
  const {actionShowGroupDialog, setGroup} = useSpeedDialStore();

  const handleEdit = (id: number) => {
    actionShowGroupDialog(true);
    const g = groups?.filter((group) => group.id === id)[0] ?? ({} as GroupType);
    setGroup({
      id,
      name: g.name ?? "",
      icon: g.icon ?? "",
      color: g.color ?? "",
    });
  };

  return (
    <PaperContainer>
      <PaperHeader title="Grupos" />
      <Stack>
        {groups.map((group) => (
          <GroupListItem key={group.id} group={group} handleEdit={handleEdit} handleConfirmDelete={() => console.log('oi')}  />
        ))}
      </Stack>
    </PaperContainer>
  );
};

export default GroupsList;

"use client";
import React, { useState } from "react";
import { GroupContext } from "@/app/lib/contexts";
import { GroupFormData, GroupType } from "@/types/entities";
import { IRemovableEntity } from "@/types/interfaces";

const GroupProvider = ({ children }: { children: React.ReactNode }) => {
  const [editableGroup, setEditableGroup] = useState<GroupFormData>({} as GroupFormData);
  const [ showGroupDialog, setShowGroupDialog ] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<GroupType>({} as GroupType);
  const [removableGroup, setRemovableGroup] = useState<IRemovableEntity>({
    id: 0,
    name: "",
    type: "grupo",
  });

  return <GroupContext.Provider value={{ 
    selectedGroup, 
    setSelectedGroup,
    removableObject: removableGroup,
    setRemovableObject: setRemovableGroup,
    openConfirm,
    setOpenConfirm,
    editableGroup,
    setEditableGroup,
    showGroupDialog,
    setShowGroupDialog,
   }}>{children}</GroupContext.Provider>;
};

export default GroupProvider;

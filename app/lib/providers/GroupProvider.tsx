"use client";
import React, { useState } from "react";
import { GroupContext } from "@/app/lib/contexts";
import { GroupType } from "@/types/entities";

const GroupProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedGroup, setSelectedGroup] = useState<GroupType>({} as GroupType);
  return <GroupContext.Provider value={{ selectedGroup, setSelectedGroup }}>{children}</GroupContext.Provider>;
};

export default GroupProvider;

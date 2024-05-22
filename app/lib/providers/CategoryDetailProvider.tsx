"use client";
import React, { useState } from "react";
import { CategoryDetailContext } from "@/app/lib/contexts";
import { IRemovableEntity } from "@/types/interfaces";

const CategoryDetailProvider = ({ children }: { children: React.ReactNode }) => {
  const [groupByMonth, setGroupByMonth] = useState<boolean>(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [removableCategory, setRemovableCategory] = useState<IRemovableEntity>({
    id: 0,
    name: "",
    type: "categoria",
  });

  return (
    <CategoryDetailContext.Provider
      value={{
        removableObject: removableCategory,
        setRemovableObject: setRemovableCategory,
        openConfirm,
        setOpenConfirm,
        groupByMonth,
        setGroupByMonth,
      }}
    >
      {children}
    </CategoryDetailContext.Provider>
  );
};

export default CategoryDetailProvider;

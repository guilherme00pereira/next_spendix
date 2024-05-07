"use client";
import React, { useState } from "react";
import { CategoryContext } from "@/app/lib/contexts";
import { IRemovableEntity } from "@/types/interfaces";

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [removableCategory, setRemovableCategory] = useState<IRemovableEntity>({
    id: 0,
    name: "",
    type: "categoria",
  });

  return (
    <CategoryContext.Provider
      value={{
        removableObject: removableCategory,
        setRemovableObject: setRemovableCategory,
        openConfirm,
        setOpenConfirm,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;

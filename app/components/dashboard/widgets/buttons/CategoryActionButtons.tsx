"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Stack from "@mui/material/Stack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { useSpeedDialStore } from "@/app/lib/store";
import { PrimaryActionButton, InfoActionButton, DangerActionButton } from "../../commonStyledComponents";
import { useCategoryContext } from "@/app/lib/contexts";
import { CategoryWithStatsType } from "@/types/entities";

const CategoryActionButtons = ({category}: {category: CategoryWithStatsType}) => {
    const { actionShowCategoryDialog, setCategory } = useSpeedDialStore();
    const { setOpenConfirm, removableObject, setRemovableObject } = useCategoryContext();
  const router = useRouter();

  const handleConfirmDelete = (id: number, name: string) => {
    setRemovableObject({ ...removableObject, id, name });
    setOpenConfirm(true);
  };

  const handleEdit = (id: number) => {
    actionShowCategoryDialog(true);
    //const c = categories?.filter((category) => category.id === id)[0] ?? ({} as CategoryWithStatsType);
    setCategory({
      id,
      name: category.name ?? "",
      type: category.type ?? "Receita",
      color: category.color ?? null,
      icon: category.icon ?? null,
      slug: category.slug ?? "",
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      <PrimaryActionButton
        size="small"
        variant="text"
        onClick={() => router.push(`/dashboard/categories/${category.slug}/transactions`)}
      >
        <BarChartOutlinedIcon />
      </PrimaryActionButton>
      <InfoActionButton size="small" variant="text" onClick={() => handleEdit(category.id)}>
        <EditOutlinedIcon />
      </InfoActionButton>
      <DangerActionButton size="small" variant="text" onClick={() => handleConfirmDelete(category.id, category.name)}>
        <DeleteOutlinedIcon />
      </DangerActionButton>
    </Stack>
  );
};

export default CategoryActionButtons;

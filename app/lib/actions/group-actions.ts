"use server";
import { GroupType } from "@/types/entities";
import { revalidateTag } from "next/cache";
import { editGroup, addGroup, removeGroup } from "@/app/lib/supabase/methods/groups";
import { addCategoriesToGroup, removeCategoryFromGroup } from "@/app/lib/supabase/methods/group-categories";


export async function submitGroupForm(data: object): Promise<void> {
  const values = data as GroupType;
  if (values.id) {
    await editGroup(values)
  } else {
    await addGroup(values)
  }
  revalidateTag("get_groups")
}

export async function deleteGroup(id: number): Promise<void> {
  await removeGroup(id);
  revalidateTag("get_groups");
}

export async function submitGroupCategories(groupId: number, categories: number[]): Promise<void> {
  await addCategoriesToGroup(groupId, categories);
  revalidateTag("get_groups");
}

export async function deleteGroupCategoryRelation(groupId: number, categoryId: number): Promise<void> {
  await removeCategoryFromGroup(groupId, categoryId);
  revalidateTag("get_groups");  
}




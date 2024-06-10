"use server";
import { GroupType } from "@/types/entities";
import { revalidateTag } from "next/cache";
import { editGroup, addGroup, removeGroup } from "@/app/lib/supabase/methods/groups";


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


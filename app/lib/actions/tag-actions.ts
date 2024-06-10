"use server";
import { TagType } from "@/types/entities";
import { revalidateTag } from "next/cache";
import { editTag, addTag, removeTag } from "@/app/lib/supabase/methods/tags";

export async function submitTagForm(data: object): Promise<void> {
  const values = data as TagType;
  if (values.id) {
    await editTag(values);
  } else {
    await addTag(values.name);
  }
  revalidateTag("get_tags");
}

export async function deleteTag(id: number): Promise<void> {
  await removeTag(id);
  revalidateTag("get_tags");
}
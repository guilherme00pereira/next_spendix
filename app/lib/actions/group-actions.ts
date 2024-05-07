"use server";
import { revalidatePath } from "next/cache";
import { editGroup, addGroup, removeGroup } from "@/app/lib/supabase/methods/groups";

export async function submitGroupForm(values: any): Promise<void> {
  if (values.id) {
    editGroup(values);
  } else {
    addGroup(values);
  }
  revalidatePath("/dashboard/groups");
}

export async function deleteGroup(id: number): Promise<void> {
  removeGroup(id);
  revalidatePath("/dashboard/groups");
}
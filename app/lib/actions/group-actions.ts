"use server";
import { revalidatePath } from "next/cache";
import { editGroup, addGroup } from "@/app/lib/supabase/methods/groups";

export async function submitGroupForm(values: any): Promise<void> {
  if (values.id) {
    editGroup(values);
  } else {
    addGroup(values);
  }
  revalidatePath("/dashboard/groups");
}
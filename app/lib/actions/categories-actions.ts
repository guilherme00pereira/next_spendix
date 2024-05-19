"use server";
import { revalidateTag, revalidatePath } from "next/cache";
import { CategoryFormData } from "@/types/entities";
import { addCategory, editCategory } from "@/app/lib/supabase/methods/categories";

export async function submitCategoryForm(data: object): Promise<void> {
  const values = data as CategoryFormData;
  if (values.id) {
    await editCategory(values);
    revalidateCategories();
  } else {
    await addCategory(values);
    revalidateCategories();
  }
}

export const revalidateCategories = () => {
  revalidatePath("/dashboard/categories");
  revalidateTag("get_categories");
};

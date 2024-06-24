import { createClientServerSide } from "@/app/lib/supabase/server";

export const addCategoriesToGroup = async (groupId: number, categories: number[]) => {
  const supabase = createClientServerSide();
  const { data, error } = await supabase
    .from("group_categories")
    .insert(categories.map((categoryId) => ({ group_id: groupId, category_id: categoryId })));
  if (error) {
    throw error;
  }
  return data;
};

export const removeCategoryFromGroup = async (groupId: number, category: number) => {
  const supabase = createClientServerSide();
  const { data, error } = await supabase
    .from("group_categories")
    .delete()
    .eq("group_id", groupId)
    .eq("category_id", category)
    .single();
  if (error) {
    throw error;
  }
  return data;
};
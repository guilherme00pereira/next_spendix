import { createClientServerSide } from "@/app/lib/supabase/server";
import { unstable_cache } from "next/cache";
import { GroupType } from "@/types/entities";

const supabase = createClientServerSide();

export const getGroups = unstable_cache(async () => {
  const { data, error } = await supabase.from("groups").select("*");
  if (error) {
    throw error;
  }
  return data;
}, ["get_groups"]);

export const addGroup = async ({ name }: GroupType) => {
  const { data, error } = await supabase.from("groups").insert({ name });
  if (error) {
    throw error;
  }
  return data;
};

export const editGroup = async ({ id, name, color }: GroupType) => {
  const { data, error } = await supabase.from("groups").update({ name, color }).match({ id });
  if (error) {
    throw error;
  }
  return data;
};

export const removeGroup = async (id: number) => {
  const { data, error } = await supabase.from("groups").delete().match({ id });
  if (error) {
    throw error;
  }
  return data;
};

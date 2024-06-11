import { createClientServerSide } from "@/app/lib/supabase/server";
import { unstable_cache } from "next/cache";
import { GroupType } from "@/types/entities";

export const getGroups = async () => {
  const supabase = createClientServerSide();
  const { data, error } = await supabase.from("groups").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export const addGroup = async ({ name }: GroupType) => {
  const supabase = createClientServerSide();
  const { data, error } = await supabase.from("groups").insert({ name });
  if (error) {
    throw error;
  }
  return data;
};

export const editGroup = async ({ id, name, color }: GroupType) => {
  const supabase = createClientServerSide();
  const { data, error } = await supabase.from("groups").update({ name, color }).match({ id });
  if (error) {
    throw error;
  }
  return data;
};

export const removeGroup = async (id: number) => {
  const supabase = createClientServerSide();
  const { data, error } = await supabase.from("groups").delete().match({ id });
  if (error) {
    throw error;
  }
  return data;
};

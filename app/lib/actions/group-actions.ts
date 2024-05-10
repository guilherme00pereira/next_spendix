"use server";
import { createClientServerSide } from "@/app/lib/supabase/server";
import { GroupType } from "@/types/entities";
import { revalidateTag, unstable_cache } from "next/cache";

const supabase = createClientServerSide()

export async function submitGroupForm(data: object): Promise<void> {
  const values = data as GroupType;
  if (values.id) {
    editGroup(values);
  } else {
    addGroup(values);
  }
  revalidateTag("get-groups");
}

export async function deleteGroup(id: number): Promise<void> {
  removeGroup(id);
  revalidateTag("get-groups");
}

export const getGroups = unstable_cache( 
  async () => {
    const {data, error} = await supabase.from('groups').select('*')
    if (error) {
        throw error
    }
    return data
  },
  ['get-groups']
)

export const getGroupCategories = unstable_cache(
  async (groupId: number) => {
    const {data, error} = await supabase.from('group_categories').select('categories(*)').match({group_id: groupId})
    if (error) {
        throw error
    }
    return data
  }
)

const addGroup = async ({name}: GroupType) => {
  const {data, error} = await supabase.from('groups').insert({name})
  if (error) {
      throw error
  }
  return data
}

const editGroup = async ({id, name, color}: GroupType) => {
  const {data, error} = await supabase.from('groups').update({name, color}).match({id})
  if (error) {
      throw error
  }
  return data
}

const removeGroup = async (id: number) => {
  const {data, error} = await supabase.from('groups').delete().match({id})
  if (error) {
      throw error
  }
  return data
}
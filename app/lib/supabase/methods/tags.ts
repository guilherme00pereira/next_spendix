import { createClientServerSide } from "@/app/lib/supabase/server";
import {TagType} from "@/types/entities";

const getTags = async () => {
  const supabase = createClientServerSide();
  const {data, error} = await supabase.from('tags').select('*').order("name", {ascending: true})
  if (error) {
    throw error
  }
  return data
}

const addTag = async (name: string) => {
  const supabase = createClientServerSide();
  const {data, error} = await supabase.from('tags').insert({name})
  if (error) {
    throw error
  }
  return data
}

const editTag = async ({id, name}: TagType) => {
  const supabase = createClientServerSide();
  const {data, error} = await supabase.from('tags').update({name}).match({id: id})
  if (error) {
    throw error
  }
  return data
}

const removeTag = async (id: number) => {
  const supabase = createClientServerSide();
  const {data, error} = await supabase.from('tags').delete().match({id})
  if (error) {
    throw error
  } else {
    await supabase.from('transactions_tags').delete().match({tag_id: id})
  }
  return data
}

export {
  getTags,
  addTag,
  editTag,
  removeTag
}
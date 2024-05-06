import { createClient } from "@/app/lib/supabase/client";
import { GroupType } from "@/types/entities";

const supabase = createClient()

const getGroups = async () => {
    const {data, error} = await supabase.from('groups').select('*')
    if (error) {
        throw error
    }
    return data
}

const getGroupCategories = async (groupId: number) => {
    const {data, error} = await supabase.from('group_categories').select('categories(*)').match({group_id: groupId})
    if (error) {
        throw error
    }
    return data
}

const addGroup = async ({name, color}: GroupType) => {
    const {data, error} = await supabase.from('groups').insert({name, color})
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

export {
    getGroups,
    getGroupCategories,
    addGroup,
    editGroup,
    removeGroup
}
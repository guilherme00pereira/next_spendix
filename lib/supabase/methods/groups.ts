import {supabase} from "@/lib/supabase/supabase-client";

const getGroups = async () => {
    const {data, error} = await supabase.from('groups').select('*').order("name", {ascending: true})
    if (error) {
        throw error
    }
    return data
}

const addGroup = async (name: string) => {
    const {data, error} = await supabase.from('groups').insert({name})
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
    addGroup,
    removeGroup
}
import {supabase} from "@/lib/supabase/supabase-client";

const getTags = async () => {
    const {data, error} = await supabase.from('tags').select('*').order("name", {ascending: true})
    if (error) {
        throw error
    }
    return data
}

const addTag = async (name: string) => {
    const {data, error} = await supabase.from('tags').insert({name})
    if (error) {
        throw error
    }
    return data
}

const removeTag = async (id: number) => {
    const {data, error} = await supabase.from('tags').delete().match({id})
    if (error) {
        throw error
    }
    return data
}

export {
    getTags,
    addTag,
    removeTag
}
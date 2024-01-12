import {CategoryForm} from "@/types/entities";
import {supabase} from "@/lib/supabase/supabase-client";

const getCategories = async () => {
    const {
        data,
        error
    } = await supabase.from('categories').select('*').order("type", {ascending: true}).order("name", {ascending: true})
    if (error) {
        throw error
    }
    return data
}

const addCategory = async ({name, type}: CategoryForm) => {
    const {data, error} = await supabase.from('categories').insert({name, type})
    if (error) {
        throw error
    }
    return data
}

const editCategory = async ({id, name, type}: CategoryForm) => {
    const {data, error} = await supabase.from('categories').update({name, type}).match({id})
    if (error) {
        throw error
    }
    return data
}

const removeCategory = async (id: number) => {
    const {data, error} = await supabase.from('categories').delete().match({id})
    if (error) {
        throw error
    }
    return data
}





export {
    getCategories,
    addCategory,
    editCategory,
    removeCategory,
}
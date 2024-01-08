import {createClient} from '@supabase/supabase-js'
import {Database} from '@/types/supabase'
import {CategoryForm, CategoryType} from "@/types/entities";

export const supabase = createClient<Database>(
    "https://zgjgxiwgvjqaplsjwubx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpnamd4aXdndmpxYXBsc2p3dWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1MjIwODcsImV4cCI6MjAxNjA5ODA4N30.o76NQebipIu4YP6NaCunPtxxmFKZHCF4rP4R_F8AF74"
)

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



export {
    getCategories,
    getGroups,
    addGroup,
    addCategory
}
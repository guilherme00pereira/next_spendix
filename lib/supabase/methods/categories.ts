import {CategoryFormData} from "@/types/entities";
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



const getExpenseCategoriesTransactionsSum = async (initial_date: string, final_date: string) => {
    const {
        data,
        error
    } = await supabase.from('categories').select('id, name, type, transactions: transactions(amount, due_date, payment_id)')
                    .eq('type', 'Despesa')
                    .gte('transactions.payment_id', 0)
                    .gte('transactions.due_date', initial_date)
                    .lte('transactions.due_date', final_date)
    if (error) {
        throw error
    }
    return data.filter((category: any) => category.transactions.length > 0).reduce((acc: any, curr: any) => {
        acc.push({id: curr.id, name: curr.name, value: curr.transactions.reduce((acc: number, curr: any) => acc + curr.amount, 0) })
        return acc
    }, [])
}

const addCategory = async ({name, type, slug, parent, color, icon}: CategoryFormData) => {
    const {data, error} = await supabase.from('categories').insert({name, type, slug, parent, color, icon})
    if (error) {
        throw error
    }
    return data
}

const editCategory = async ({id, name, type, slug, parent, color, icon}: CategoryFormData) => {
    const {data, error} = await supabase.from('categories').update({name, type, slug, parent, color, icon}).match({id})
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
    getExpenseCategoriesTransactionsSum,
}
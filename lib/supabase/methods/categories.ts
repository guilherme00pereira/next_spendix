import {CategoryFormData} from "@/types/entities";
import {supabase} from "@/lib/supabase/supabase-client";
import dayjs from "dayjs";

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

const getCategoryLastSixMonthsTransactions = async (category_id: number) => {
    const {
        data,
        error
    } = await supabase.from('transactions').select('*, categories(name)')
                    .eq('category_id', category_id)
                    .gte('due_date', dayjs().subtract(6, 'month').format('YYYY-MM-DD'))
                    .order('due_date', {ascending: false})
    if (error) {
        throw error
    }
    return data
}

const getExpenseCategoriesTransactionsSum = async (initial_date: string, final_date: string) => {
    const {
        data,
        error
    } = await supabase.from('categories').select('id, name, type, transactions: transactions(amount, due_date)')
                    .eq('type', 'Despesa')
                    .neq('id', 43)
                    .gte('transactions.due_date', initial_date)
                    .lte('transactions.due_date', final_date)
    if (error) {
        throw error
    }
    return data.filter((category: any) => category.transactions.length > 0).reduce((acc: any, curr: any) => {
        acc.push({name: curr.name, value: curr.transactions.reduce((acc: number, curr: any) => acc + curr.amount, 0) })
        return acc
    }, [])
}

const addCategory = async ({name, type}: CategoryFormData) => {
    const {data, error} = await supabase.from('categories').insert({name, type})
    if (error) {
        throw error
    }
    return data
}

const editCategory = async ({id, name, parent, type}: CategoryFormData) => {
    const {data, error} = await supabase.from('categories').update({name, parent, type}).match({id})
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
    getCategoryLastSixMonthsTransactions,
    addCategory,
    editCategory,
    removeCategory,
    getExpenseCategoriesTransactionsSum,
}
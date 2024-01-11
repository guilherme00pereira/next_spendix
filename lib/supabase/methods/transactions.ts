import {Dayjs} from "dayjs";
import {supabase} from "@/lib/supabase/supabase-client";
import { TransactionForm } from "@/types/entities";

const getTransactions = async (di: string, df: string) => {
    const {
        data,
        error
    } = await supabase.from('transactions').select('id, amount, date, description, cashed, categories(id, name, type)').gte('date', di).lte('date', df).order("date", {ascending: true})
    if (error) {
        throw error
    }
    return data
}

const getTransactionsByCategory = async (di: string, df: string, category_id: number) => {
    const {
        data,
        error
    } = await supabase.from('transactions').select('id, amount, date, description, cashed, categories(name, type)').gte('date', di).lte('date', df).eq('category_id', category_id).order("date", {ascending: true})
    if (error) {
        throw error
    }
    return data
}

const addTransaction = async (
    {amount, date, description, cashed, categories, times, recurring}: TransactionForm
) => {
    if (recurring) {
        const rows = [];
        for (let i = 0; i < times; i++) {
            let desctext = `${description} (${i+1}/${times})`
            rows.push({
                amount,
                date: date.add(i, 'month').format('YYYY-MM-DD'),
                description: desctext,
                cashed,
                category_id: categories[0]
            })
        }
        const {data, error} = await supabase.from('transactions').insert(rows)
        if (error) {
            throw error
        }
        return data
    } else {
        const {data, error} = await supabase.from('transactions').insert({
            amount,
            date: date.format('YYYY-MM-DD'),
            description,
            cashed,
            category_id: categories[0]
        })
        if (error) {
            throw error
        }
        return data
    }
}

const updateTransaction = async (
    id: number,
    amount: number,
    date: Dayjs,
    description: string,
    categories: number[],
) => {
    const {data, error} = await supabase.from('transactions').update({
        amount,
        date: date.format('YYYY-MM-DD'),
        description,
        category_id: categories[0]
    }).eq('id', id)
    if (error) {
        throw error
    }
    return data
}

const updateTransactionCashedStatus = async (
    id: number
) => {
    const {data, error} = await supabase.from('transactions').update({
        cashed: true
    }).eq('id', id)
    if (error) {
        throw error
    }
    return data
}

const removeTransaction = async (id: number) => {
    const {data, error} = await supabase.from('transactions').delete().eq('id', id)
    if (error) {
        throw error
    }
    return data
}

const getSumIncomeTransactions = async (di: string, df: string) => {
    const {data, error} = await supabase.from('transactions').select('amount, categories(type)').gte('date', di).lte('date', df).eq('cashed', true).eq('categories.type', 'Receita').single()
    if (error) {
        throw error
    }
    return data
}


export {
    getTransactions,
    getTransactionsByCategory,
    addTransaction,
    updateTransaction,
    updateTransactionCashedStatus,
    removeTransaction,
    getSumIncomeTransactions
}
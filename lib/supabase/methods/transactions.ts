
import {supabase} from "@/lib/supabase/supabase-client";
import { TransactionFormData, TransactionUpdateStatusProps } from "@/types/entities";

const getQuery = 'id, amount, due_date, description, cashed, categories(*), payments(*)'

const getTransactions = async (di: string, df: string) => {
    const {
        data,
        error
    } = await supabase.from('transactions').select(getQuery).gte('due_date', di).lte('due_date', df).order("due_date", {ascending: true})
    if (error) {
        throw error
    }
    return data
}

const getTransactionsByCategory = async (di: string, df: string, category_id: number) => {
    const {
        data,
        error
    } = await supabase.from('transactions').select(getQuery).gte('due_date', di).lte('due_date', df).eq('category_id', category_id).order("due_date", {ascending: true})
    if (error) {
        throw error
    }
    return data
}

const addTransaction = async (
    {amount, due_date, description, cashed, category_id, payment_date, payed_amount, payment_id, times}: TransactionFormData
) => {
    // if (recurring) {
    //     const rows = [];
    //     for (let i = 0; i < times; i++) {
    //         let desctext = `${description} (${i+1}/${times})`
    //         rows.push({
    //             amount,
    //             due_date: due_date.add(i, 'month').format('YYYY-MM-DD'),
    //             description: desctext,
    //             cashed,
    //             category_id,
    //             payment_id,
    //             payment_date: cashed && payment_date ? payment_date.add(i, 'month').format('YYYY-MM-DD') : null,
    //             payed_amount: cashed && payed_amount ? payed_amount : null,
    //         })
    //     }
    //     const {data, error} = await supabase.from('transactions').insert(rows).select(getQuery)
    //     if (error) {
    //         throw error
    //     }
    //     return data
    // } else {
        let pay_id = null;
        if(cashed) {
            const {data, error} = await supabase.from('payments').insert({
                date: payment_date.format('YYYY-MM-DD'),
                amount: payed_amount,
                method: payment_id,
                times: times
            }).select('id')
            
        if (error) {
            throw error
        }
            pay_id = data[0].id
        }
        const {data, error} = await supabase.from('transactions').insert({
            amount,
            due_date: due_date.format('YYYY-MM-DD'),
            description,
            cashed,
            category_id,
            payment_id: pay_id
        }).select(getQuery)
        
        if (error) {
            throw error
        }
        return data
    //}
}

const editTransaction = async ({id, amount, cashed, due_date, description, category_id, payment_date, payed_amount, payment_id}: TransactionFormData) => {
    const {data, error} = await supabase.from('transactions').update({
        amount,
        due_date: due_date.format('YYYY-MM-DD'),
        description,
        category_id,
        payment_id,
        payment_date: cashed && payment_date ? payment_date.format('YYYY-MM-DD') : null,
        payed_amount: cashed && payed_amount ? payed_amount : null,
        cashed
    }).match({id}).select(getQuery)
    if (error) {
        throw error
    }
    return data
}

const updateTransactionCashedStatus = async (
  {id, cashed, payed_amount} : TransactionUpdateStatusProps
) => {
    const {data, error} = await supabase.from('transactions').update({
        cashed: cashed,
        payed_amount: payed_amount,
        payment_date: new Date().toISOString(),
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
    editTransaction,
    updateTransactionCashedStatus,
    removeTransaction,
    getSumIncomeTransactions
}
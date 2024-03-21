import {supabase} from "@/lib/supabase/supabase-client";
import { TransferMoneyFormData } from "@/types/entities";

const getAllPaymentMethods = async () => {
    const {data, error} = await supabase.from('payment_methods').select('*, credit_cards(*), accounts(*)')
    if (error) {
        throw error
    }
    return data
}

const getCreditCardPaymentMethods = async () => {
    const {data, error} = await supabase.from('payment_methods').select('credit_cards(*)').not('credit_card_id', 'is', null)
    if (error) {
        throw error
    }
    return data
}

const getAccountPaymentMethods = async () => {
    const {data, error} = await supabase.from('payment_methods').select('accounts(*)').not('account_id', 'is', null)
    if (error) {
        throw error
    }
    return data
}

const transferMoney = async ({outcomeId, outcomeType, incomeId, incomeType, amount }: TransferMoneyFormData) => {
    
    const {data, error} = await supabase.rpc('transfer_money', {
        outid: outcomeId, 
        outtype: outcomeType, 
        inid: incomeId, 
        intype: incomeType, 
        amount
    })
    if (error) {
        throw error
    }
    return data
}

export {
    getAllPaymentMethods,
    getCreditCardPaymentMethods,
    getAccountPaymentMethods,
    transferMoney
}
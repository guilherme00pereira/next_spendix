import { createClientServerSide } from "@/app/lib/supabase/server";
import { BankAccountType, TransferMoneyFormData } from "@/types/entities";

const getAllPaymentMethods = async () => {
    const supabase = createClientServerSide();
    const {data, error} = await supabase.from('payment_methods').select('*, credit_cards(*), accounts(*)')
    if (error) {
        throw error
    }
    return data
}

const getCreditCardPaymentMethods = async () => {
    const supabase = createClientServerSide();
    const {data, error} = await supabase.from('credit_cards').select('*, credit_cards_invoices(*)')
    if (error) {
        throw error
    }
    return data
}

const getAccountPaymentMethods = async () => {
    const supabase = createClientServerSide();
    const {data, error} = await supabase.from('payment_methods').select('accounts(*)').not('account_id', 'is', null)
    if (error) {
        throw error
    }
    return data.map((pm: any) => pm.accounts as BankAccountType)
}

const transferMoney = async ({outcomeId, outcomeType, incomeId, incomeType, amount }: TransferMoneyFormData) => {
    const supabase = createClientServerSide();
    
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

const getTotalAmountAvailable = async () => {
    const supabase = createClientServerSide();
    const {data, error} = await supabase.rpc('total_available_amount')
    if (error) {
        throw error
    }
    console.log(data)
    return data
}

export {
    getAllPaymentMethods,
    getCreditCardPaymentMethods,
    getAccountPaymentMethods,
    transferMoney,
    getTotalAmountAvailable
}
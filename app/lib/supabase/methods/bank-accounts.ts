import { createClient } from "@/app/lib/supabase/client";
import { BankAccountType } from "@/types/entities";

const supabase = createClient()

const getBankAccounts = async () => {
    const {data, error} = await supabase.from('accounts').select('*')
    if (error) {
        throw error
    }
    return data
}

const addBankAccount = async ({bank, balance, color}: BankAccountType) => {
    const {data, error} = await supabase.from('accounts').insert({bank, balance, color})
    if (error) {
        throw error
    }
    return data
}

const editBankAccount = async ({id, bank, balance, color}: BankAccountType) => {
    const {data, error} = await supabase.from('accounts').update({bank, balance, color}).match({id})
    if (error) {
        throw error
    }
    return data
}

const removeBankAccount = async (id: number) => {
    const {data, error} = await supabase.from('accounts').delete().match({id})
    if (error) {
        throw error
    }
    return data
}

export {
    getBankAccounts,
    addBankAccount,
    editBankAccount,
    removeBankAccount
}
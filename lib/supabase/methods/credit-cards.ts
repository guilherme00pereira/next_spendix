import {supabase} from "@/lib/supabase/supabase-client";

const getCreditCards = async () => {
    const {data, error} = await supabase.from('creditcards').select('*')
    if (error) {
        throw error
    }
    return data
}

const addCreditCard = async (name: string) => {
    const {data, error} = await supabase.from('creditcards').insert({name})
    if (error) {
        throw error
    }
    return data
}

const removeCreditCard = async (id: number) => {
    const {data, error} = await supabase.from('creditcards').delete().match({id})
    if (error) {
        throw error
    }
    return data
}

export {
    getCreditCards,
    addCreditCard,
    removeCreditCard
}
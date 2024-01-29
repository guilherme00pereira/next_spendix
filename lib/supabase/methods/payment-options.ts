import {supabase} from "@/lib/supabase/supabase-client";

const getPaymentOptions = async () => {
    const {data, error} = await supabase.from('payment_options').select('*').order("name", {ascending: true})
    if (error) {
        throw error
    }
    return data
}

const addPaymentOptions = async (name: string) => {
    const {data, error} = await supabase.from('payment_options').insert({name})
    if (error) {
        throw error
    }
    return data
}

const removePaymentOptions = async (id: number) => {
    const {data, error} = await supabase.from('payment_options').delete().match({id})
    if (error) {
        throw error
    }
    return data
}

export {
    getPaymentOptions,
    addPaymentOptions,
    removePaymentOptions
}
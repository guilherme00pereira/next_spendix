import {supabase} from "@/lib/supabase/supabase-client";

const getPayments = async () => {
    const {data, error} = await supabase.from('payments').select('*')
    if (error) {
        throw error
    }
    return data
}

const updatePayment = async ({id, }) => {
    const {data, error} = await supabase.from('payments').update(payment).eq('id', id)
    if (error) {
        throw error
    }
    return data
}

export {
    getPayments,
}
import { getTransactionsByCategoriesLastYear } from "@/app/lib/supabase/methods/transactions";
import { TransactionType } from "@/types/entities";

export async function GET(request: Request, { params }: { params: { id: number } })
{
    const id = params.id   
    const res = await (await getTransactionsByCategoriesLastYear(id)) as TransactionType[]
    if (!res) {
        return new Response("Not found", { status: 404 })
    } 
    return new Response(JSON.stringify(res), { status: 200 })
            
}
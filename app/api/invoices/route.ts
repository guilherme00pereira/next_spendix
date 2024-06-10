import { getCreditCardsInvoices } from "@/app/lib/supabase/methods/credit-cards";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return new Response("Missing id", { status: 400 });
    } else {
      try {
        const res = await getCreditCardsInvoices(parseInt(id));
        return Response.json(res);
      } catch (error) {
        return new Response("Error", { status: 500 });
      }
    }
}
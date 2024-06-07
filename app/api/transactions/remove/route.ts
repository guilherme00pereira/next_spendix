import { removeTransaction } from "@/app/lib/supabase/methods/transactions";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const payment_id = searchParams.get("payment_id");
  if (!id || !payment_id) {
    return { status: 400, body: { message: "Missing id or payment_id" } };
  } else {
    try {
      const res = await removeTransaction({ id: parseInt(id), payment_id: parseInt(payment_id) });
      return { status: 200, body: res };
    } catch (error) {
      return { status: 500, body: error };
    }
  }
}

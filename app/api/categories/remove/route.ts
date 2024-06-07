import { removeCategory } from "@/app/lib/supabase/methods/categories";


export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return { status: 400, body: { message: "Missing id" } };
  } else {
    try {
      const res = await removeCategory(parseInt(id));
      return { status: 200, body: res };
    } catch (error) {
      return { status: 500, body: error };
    }
  }
}

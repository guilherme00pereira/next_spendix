import { createClientServerSide } from "@/app/lib/supabase/server";
import { unstable_cache } from "next/cache";
import { CategoryFormData } from "@/types/entities";

const supabase = createClientServerSide();

const getCategories = unstable_cache(async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*, groups: groups(*)")
    .order("type", { ascending: true })
    .order("name", { ascending: true });
  if (error) {
    throw error;
  }
  return data;
}, ["get_categories"]);

const getCategoriesWithStats = async () => {
  const { data, error } = await supabase
    .from("categories_with_stats")
    .select("*")
  if (error) {
    throw error;
  }
  return data;
}

const getSingleCategory = async (slug: string) => {
  const { data, error } = await supabase.from("categories").select("*").eq("slug", slug);
  if (error) {
    throw error;
  }
  return data[0];
};

const getExpenseCategoriesTransactionsSum = async (initial_date: string, final_date: string) => {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, type, transactions: transactions(amount, due_date, payment_id)")
    .eq("type", "Despesa")
    .gte("transactions.payment_id", 0)
    .gte("transactions.due_date", initial_date)
    .lte("transactions.due_date", final_date);
  if (error) {
    throw error;
  }
  return data
    .filter((category: any) => category.transactions.length > 0)
    .reduce((acc: any, curr: any) => {
      acc.push({
        id: curr.id,
        name: curr.name,
        value: curr.transactions.reduce((acc: number, curr: any) => acc + curr.amount, 0),
      });
      return acc;
    }, []);
};

const addCategory = async ({ name, type, slug, color, icon }: CategoryFormData) => {
  const { data, error } = await supabase.from("categories").insert({ name, type, slug, color, icon });
  if (error) {
    throw error;
  }
  return data;
};

const editCategory = async ({ id, name, type, slug, color, icon }: CategoryFormData) => {
  const { data, error } = await supabase
    .from("categories")
    .update({ name, type, slug, color, icon })
    .match({ id });
  if (error) {
    throw error;
  }
  return data;
};

const removeCategory = async (id: number) => {
  const { data, error } = await supabase.from("categories").delete().match({ id });
  if (error) {
    throw error;
  }
  return data;
};

export {
  getCategories,
  getCategoriesWithStats,
  getSingleCategory,
  addCategory,
  editCategory,
  removeCategory,
  getExpenseCategoriesTransactionsSum,
};

'use server'
import { getExpenseCategoriesTransactionsSum } from "@/app/lib/supabase/methods/categories";
import { ChartBarType } from "@/types/chart-types";
import dayjs from "dayjs";

const excludedCategories = [2, 43, 63];

export async function GET() {
  const startDate = dayjs().startOf("M").format("YYYY-MM-DD");
  const endDate = dayjs().endOf("M").format("YYYY-MM-DD");
  const res = await getExpenseCategoriesTransactionsSum(startDate, endDate);
  const items = res.filter((item: any) => !excludedCategories.includes(item.id));
  const data: ChartBarType[] = items
    .sort((a: ChartBarType, b: ChartBarType) => a.value - b.value)
    .reverse()
    .map((item: ChartBarType) => {
      return {
        name: item.name,
        value: item.value,
        label: "R$" + item.value.toFixed(2),
      };
    });
  return Response.json(data);
}

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const startDate = searchParams.get("startDate") ?? dayjs().startOf("M").format("YYYY-MM-DD");
//   const endDate = searchParams.get("endDate") ?? dayjs().endOf("M").format("YYYY-MM-DD");
//   const res = await getExpenseCategoriesTransactionsSum(startDate, endDate);
//   const items = res.filter((item: any) => !excludedCategories.includes(item.id));
//   const data: ChartBarType[] = items
//     .sort((a: ChartBarType, b: ChartBarType) => a.value - b.value)
//     .reverse()
//     .map((item: ChartBarType) => {
//       return {
//         name: item.name,
//         value: item.value,
//         label: "R$" + item.value.toFixed(2),
//       };
//     });
//   return Response.json(data);
// }

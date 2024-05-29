import React from "react";
import { PaperContainer } from "../../commonStyledComponents";
import PaperHeader from "../PaperHeader";
import { getExpenseCategoriesTransactionsSum } from "@/app/lib/supabase/methods/categories";
import ApexCategoriesPieChart from "@/app/components/dashboard/charts/ApexCategoriesPieChart";
import dayjs from "dayjs";
import { amountFormatter } from "@/app/lib/functions";

const excludedCategories = [2, 43, 63];

async function fetchChartData() {
  const res = await getExpenseCategoriesTransactionsSum(dayjs().startOf("M").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD"));
  const items = res.filter((item: any) => !excludedCategories.includes(item.id));
  const series: number[] = items.map((item: any) => item.value);
  const labels: string[] = items.map((item: any) => item.name + " - " + amountFormatter(item.value));
  return { series, labels };
}

const CategoriesPizzaChartPaper = async ({title}: {title:string}) => {
  const { series, labels } = await fetchChartData();
  return (
    <PaperContainer>
      <PaperHeader title={title} />
      {(series && labels) && <ApexCategoriesPieChart series={series} labels={labels} />}
    </PaperContainer>
  );
};

export default CategoriesPizzaChartPaper;

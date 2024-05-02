import React from "react";
import { PaperContainer } from "../commonStyledComponents";
import PaperHeader from "./PaperHeader";
import ApexParentCategoriesBarChart from "../charts/ApexParentCategoriesBarChart";
import { getExpenseCategoriesTransactionsSum } from "@/app/lib/supabase/methods/categories";
import { ChartBarType } from "@/types/chart-types";
import dayjs from "dayjs";

const excludedCategories = [43, 63];

async function fetchChartData() {
  const res = await getExpenseCategoriesTransactionsSum(dayjs().startOf("M").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD"));
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
  return data;
}

const ParentCategoriesChartPaper = async ({title}: {title:string}) => {
  const data = await fetchChartData();
  return (
    <PaperContainer>
      <PaperHeader title={title} />
      {data && <ApexParentCategoriesBarChart data={data} />}
    </PaperContainer>
  );
};

export default ParentCategoriesChartPaper;

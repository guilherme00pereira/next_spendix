"use client";
import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import { PaperContainer } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import { useCategoriesPageContext } from "@/app/lib/contexts";
import { useColorScheme } from "@mui/material";
import { ChartBarType } from "@/types/chart-types";
import { chartColors } from "@/theme/colors";
import dayjs from "dayjs";

const TransactionsTotalPerPeriodChartPaper = () => {
  const { transactions, showCategoryTotalsChart } = useCategoriesPageContext();
  const { mode } = useColorScheme();

  const data = useMemo(() => {
    const data = transactions.reduce((acc, transaction) => {
      const period = dayjs(transaction.due_date).format("MMM");
      const index = acc.findIndex((item: any) => item.name === period);
      if (index === -1) {
        acc.push({ name: period, value: transaction.amount, label: "R$" + transaction.amount });
      } else {
        acc[index].value += transaction.amount;
        acc[index].label = "R$" + acc[index].value.toFixed(2);
      }
      return acc;
    }, [] as ChartBarType[]);
    const periods = data.reverse().slice(12);
    return periods;
  }, [transactions]);

  return (
    <>
      {showCategoryTotalsChart && (
        <PaperContainer>
          <PaperHeader title="Evolução por período" />

          <Chart
            options={{
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: data.map((item) => item.name),
                labels: {
                  style: {
                    colors: mode === "dark" ? chartColors.darkThemeLabel : chartColors.lightThemeLabel,
                  },
                  rotate: -45,
                  rotateAlways: true,
                },
              },
              yaxis: {
                labels: {
                  style: {
                    colors: mode === "dark" ? chartColors.darkThemeLabel : chartColors.lightThemeLabel,
                  },
                  formatter: function (val: any) {
                    return val;
                  },
                },
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  barHeight: "75%",
                  distributed: true,
                  dataLabels: {
                    position: "top",
                  },
                },
              },
              dataLabels: {
                enabled: true,
                textAnchor: "middle",
                style: {
                  colors: mode === "dark" ? ["white"] : [chartColors.lightThemeLabel],
                },
                formatter: function (val: any) {
                  return "R$ " + val.toFixed(2);
                },
                offsetX: 0,
              },
              grid: {
                borderColor: mode === "dark" ? "#333333" : "#BEBFBF",
              },
              legend: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
            }}
            series={[
              {
                name: "Despesas",
                data: data.map((item) => item.value),
              },
            ]}
            type="bar"
            height={360}
          />
        </PaperContainer>
      )}
    </>
  );
};

export default TransactionsTotalPerPeriodChartPaper;

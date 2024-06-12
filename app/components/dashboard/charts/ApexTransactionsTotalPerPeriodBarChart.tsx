"use client";
import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { ChartBarType } from "@/types/chart-types";
import { TransactionType } from "@/types/entities";
import { PaperContainer, OutlinedButtonWithHover } from "../commonStyledComponents";
import PaperHeader from "../surfaces/PaperHeader";
import { useColorScheme } from "@mui/material";
import { chartColors } from "@/theme/colors";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useCategoryDetailContext } from "@/app/lib/contexts";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import dayjs from "dayjs";

dayjs.extend(weekOfYear);

const ApexTransactionsTotalPerPeriodBarChart = ({ transactions }: { transactions: TransactionType[] }) => {
  const { groupByMonth, setGroupByMonth } = useCategoryDetailContext();
  const [buttonText, setButtonText] = useState("Semanal" as string);
  const { mode } = useColorScheme();

  const data = useMemo(() => {
    const data = transactions.reduce((acc, transaction) => {
      const period = groupByMonth
        ? dayjs(transaction.due_date).format("MMM")
        : "semana " + dayjs(transaction.due_date).week().toString();
      const index = acc.findIndex((item: any) => item.name === period);
      if (index === -1) {
        acc.push({ name: period, value: transaction.amount, label: "R$" + transaction.amount });
      } else {
        acc[index].value += transaction.amount;
        acc[index].label = "R$" + acc[index].value.toFixed(2);
      }
      return acc;
    }, [] as ChartBarType[]);
    const periods = groupByMonth ? data.reverse() : data.reverse().slice(12);
    return periods;
  }, [groupByMonth, transactions]);

  const handleButtonClick = () => {
    setGroupByMonth(!groupByMonth);
    setButtonText(groupByMonth ? "Semanal" : "Mensal");
  };

  return (
    <PaperContainer sx={{ width: "80%" }}>
      <PaperHeader title="Evolução por período">
        {transactions.length > 12 && (
          <OutlinedButtonWithHover
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleButtonClick}
            startIcon={<SyncRoundedIcon />}
          >
            {buttonText}
          </OutlinedButtonWithHover>
        )}
      </PaperHeader>

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
  );
};

export default ApexTransactionsTotalPerPeriodBarChart;

"use client";
import React, { useEffect, useState } from "react";
import { PaperContainer, PaperHeaderButton } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import ApexParentCategoriesBarChart from "@/app/components/dashboard/charts/ApexParentCategoriesBarChart";
import { useCategoriesPageContext } from "@/app/lib/contexts";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Fade } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { getDates } from "@/app/lib/functions";
import dayjs from "dayjs";

const CategoriesChartPaper = () => {
  const [chartData, setChartData] = useState([]);
  const { showChart, setShowChart } = useCategoriesPageContext();
  const searchParams = useSearchParams();
  const date = searchParams.get("date") ?? dayjs().format("YYYYMM");
  const [startDate, endDate] = getDates(date);

  useEffect(() => {
    fetch(`/api/charts/get-ects?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => setChartData(data));
  }, [startDate, endDate]);

  return (
    <>
      {showChart && (
        <Fade in={showChart} timeout={1000} easing="ease-out">
          <PaperContainer width="50%">
            <PaperHeader title={`Despesas por categorias no mês`}>
              <PaperHeaderButton
                variant="outlined"
                size="small"
                onClick={() => setShowChart(false)}
                startIcon={<VisibilityOffOutlinedIcon />}
              >
                Hide
              </PaperHeaderButton>
            </PaperHeader>
            {chartData.length > 0 && <ApexParentCategoriesBarChart data={chartData} />}
          </PaperContainer>
        </Fade>
      )}
    </>
  );
};

export default CategoriesChartPaper;

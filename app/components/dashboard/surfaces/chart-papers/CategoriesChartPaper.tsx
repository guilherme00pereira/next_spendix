"use client";
import React, { useEffect, useState } from "react";
import { PaperContainer, PaperHeaderButtonWithHover } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import ApexCategoriesBarChart from "@/app/components/dashboard/charts/ApexCategoriesBarChart";
import { useCategoriesPageContext } from "@/app/lib/contexts";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Fade } from "@mui/material";
import { ChartBarType } from "@/types/chart-types";

const CategoriesChartPaper = ({ title, data }: { title: string; data: ChartBarType[] }) => {
  const { showCategoriesChart, setShowCategoriesChart } = useCategoriesPageContext();
  return (
    <>
      {showCategoriesChart && (
        <Fade in={showCategoriesChart} timeout={1000} easing="ease-out">
         <PaperContainer width="40%">
          <PaperHeader title={title}>
            <PaperHeaderButtonWithHover variant="outlined" size="small" onClick={() => setShowCategoriesChart(false)} startIcon={<VisibilityOffOutlinedIcon />}>
              Hide
            </PaperHeaderButtonWithHover>
          </PaperHeader>
          {data && <ApexCategoriesBarChart data={data} />}
        </PaperContainer>
        </Fade>
      )}
    </>
  );
};

export default CategoriesChartPaper;

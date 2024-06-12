"use client";
import React, { useEffect, useState } from "react";
import { PaperContainer, OutlinedButtonWithHover } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import ApexParentCategoriesBarChart from "@/app/components/dashboard/charts/ApexParentCategoriesBarChart";
import { useCategoriesPageContext } from "@/app/lib/contexts";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Fade } from "@mui/material";
import { ChartBarType } from "@/types/chart-types";

const CategoriesChartPaper = ({ title, data }: { title: string; data: ChartBarType[] }) => {
  const { showChart, setShowChart } = useCategoriesPageContext();
  return (
    <>
      {showChart && (
        <Fade in={showChart} timeout={1000} easing="ease-out">
         <PaperContainer width="40%">
          <PaperHeader title={title}>
            <OutlinedButtonWithHover variant="outlined" size="small" onClick={() => setShowChart(false)} startIcon={<VisibilityOffOutlinedIcon />}>
              Hide
            </OutlinedButtonWithHover>
          </PaperHeader>
          {data && <ApexParentCategoriesBarChart data={data} />}
        </PaperContainer>
        </Fade>
      )}
    </>
  );
};

export default CategoriesChartPaper;

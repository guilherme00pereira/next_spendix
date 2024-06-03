"use client";
import React from "react";
import { PaperContainer, PaperHeaderButton } from "@/app/components/dashboard/commonStyledComponents";
import PaperHeader from "@/app/components/dashboard/surfaces/PaperHeader";
import ApexParentCategoriesBarChart from "@/app/components/dashboard/charts/ApexParentCategoriesBarChart";
import { ChartBarType } from "@/types/chart-types";
import { useCategoriesPageContext } from "@/app/lib/contexts";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Fade } from "@mui/material";

const CategoriesChartPaper = ({ title, data }: { title: string; data: ChartBarType[] }) => {
  const { showChart, setShowChart } = useCategoriesPageContext();

  return (
    <>
      {showChart && (
        <Fade in={showChart} timeout={1000} easing="ease-out">
        <PaperContainer width="40%">
          <PaperHeader title={title}>
            <PaperHeaderButton variant="outlined" size="small" onClick={() => setShowChart(false)} startIcon={<VisibilityOffOutlinedIcon />}>
              Hide
            </PaperHeaderButton>
          </PaperHeader>
          {data && <ApexParentCategoriesBarChart data={data} />}
        </PaperContainer>
        </Fade>
      )}
    </>
  );
};

export default CategoriesChartPaper;

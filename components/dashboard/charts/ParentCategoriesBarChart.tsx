import React, { useEffect, useMemo } from "react";
import { CategoryType } from "@/types/entities";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ParentCategoriesBarChart = () => {
  
const data: any = []
  

  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ pb: 2 }}>
        <Typography variant="h6" textAlign="center">
          Despesas
        </Typography>
      </Stack>
      <ResponsiveContainer width="100%" height={700}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={200} interval={0} tickMargin={5} />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ParentCategoriesBarChart;

import React from 'react';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import {Pie, PieChart, Cell, ResponsiveContainer} from 'recharts';

const data = [
  {name: 'Group A', value: 400},
  {name: 'Group B', value: 300},
  {name: 'Group C', value: 300},
  {name: 'Group D', value: 200},
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
// @ts-ignore
const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ParentCategoriesPieChart = () => {
  return (
    <Paper sx={{width: "45%"}}>
      <Box p={2}>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default ParentCategoriesPieChart;
import React from 'react';
import CustomBarChart from '@/themes/components/custom-bar-chart';
import { ExpenseData } from '@/interfaces/expense';

interface MonthlyExpensesChartProps {
  data: ExpenseData[];
  className?: string;
}

const MonthlyExpensesChart: React.FC<MonthlyExpensesChartProps> = ({ 
  data, 
  className = "" 
}) => {
  return (
    <CustomBarChart
      data={data.map(item => ({
        month: item.date,
        amount: item.amount
      }))}
      title="Monthly Expenses Over Last 6 Months"
      className={className}
    />
  );
};

export default MonthlyExpensesChart;

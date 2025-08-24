import React from 'react';
import CustomBarChart from '@/themes/components/custom-bar-chart';

interface MonthlyExpenseData {
  month: string;
  amount: number;
}

interface MonthlyExpensesChartProps {
  data: MonthlyExpenseData[];
  className?: string;
}

const MonthlyExpensesChart: React.FC<MonthlyExpensesChartProps> = ({ 
  data, 
  className = "" 
}) => {
  return (
    <CustomBarChart
      data={data}
      title="Monthly Expenses Over Last 6 Months"
      className={className}
    />
  );
};

export default MonthlyExpensesChart;

import React from 'react';
import CustomPieChart from '@/themes/components/custom-pie-chart';

interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
}

interface ExpenseDistributionChartProps {
  data: ExpenseCategory[];
  className?: string;
}

const ExpenseDistributionChart: React.FC<ExpenseDistributionChartProps> = ({ 
  data, 
  className = "" 
}) => {
  return (
    <CustomPieChart
      data={data}
      title="Expense Distribution by Category"
      className={className}
    />
  );
};

export default ExpenseDistributionChart;

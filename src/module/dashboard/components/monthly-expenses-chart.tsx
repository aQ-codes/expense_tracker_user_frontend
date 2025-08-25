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
  // Ensure data is properly formatted and filtered
  const formattedData = data
    .filter(item => item.amount > 0) // Only show months with expenses
    .map(item => ({
      month: item.date,
      amount: item.amount
    }))
    .sort((a, b) => {
      // Sort by month for proper display order
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <CustomBarChart
      data={formattedData}
      title="Monthly Expenses Over Last 6 Months"
      className={className}
    />
  );
};

export default MonthlyExpensesChart;

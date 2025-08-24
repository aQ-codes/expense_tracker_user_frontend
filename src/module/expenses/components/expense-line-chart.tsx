'use client';

import React from 'react';
import CustomLineChart from '../../../themes/components/custom-line-chart';
import { ExpenseData } from '../../../interfaces/expense';

interface ExpenseLineChartProps {
  data: ExpenseData[];
  className?: string;
  onAddExpense?: () => void;
}

const ExpenseLineChart: React.FC<ExpenseLineChartProps> = ({ 
  data, 
  className = "",
  onAddExpense
}) => {
  // Transform data to match CustomLineChart expected format
  const transformedData = data.map(item => ({
    month: item.date,
    amount: item.amount
  }));

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Expense Overview</h3>
          <p className="text-sm text-gray-600 mt-1">
            Track your spending trends over time and gain insights into where your money goes.
          </p>
        </div>
        <button 
          onClick={onAddExpense}
          className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors"
        >
          + Add Expense
        </button>
      </div>
      
      <div className="h-80">
        <CustomLineChart 
          data={transformedData} 
          height={320}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default ExpenseLineChart;

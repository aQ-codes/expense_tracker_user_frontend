'use client';

import React from 'react';
import CustomLineChart from '../../../themes/components/custom-line-chart';
import { ExpenseData } from '@/interfaces/expense';

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
  // Backend now provides data in the exact format needed by CustomLineChart
  // No transformation needed - data already has { date, amount } format

  // Debug logging
  console.log('ExpenseLineChart - Chart data:', data);

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Expense Overview</h3>
          <p className="text-sm text-gray-600 mt-1">
            Track your spending trends over time and gain insights into where your money goes.
          </p>
          {/* Debug info */}
          <p className="text-xs text-gray-400 mt-1">
            Data points: {data.length} | Total amount: ${data.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
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
        {data.length > 0 ? (
          <CustomLineChart 
            data={data} 
            height={320}
            className="rounded-lg"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm">No chart data available</p>
              <p className="text-xs text-gray-400">Add some expenses to see your spending trends</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseLineChart;

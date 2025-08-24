'use client';

import React from 'react';

interface MonthlySummaryProps {
  totalSpent: number;
  totalExpenses: number;
  averagePerDay: number;
  selectedMonth: number;
  selectedYear: number;
}

const MonthlySummary: React.FC<MonthlySummaryProps> = ({
  totalSpent,
  totalExpenses,
  averagePerDay,
  selectedMonth,
  selectedYear
}) => {
  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1];
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Spent */}
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-red-600 mb-2">Total Spent</h3>
            <p className="text-2xl font-bold text-red-700">
              ${totalSpent.toLocaleString()}
            </p>
            <p className="text-sm text-red-600 mt-1">
              {getMonthName(selectedMonth)} {selectedYear}
            </p>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-600 mb-2">Total Expenses</h3>
            <p className="text-2xl font-bold text-blue-700">
              {totalExpenses}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              transactions
            </p>
          </div>
        </div>

        {/* Average Per Day */}
        <div className="text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-600 mb-2">Daily Average</h3>
            <p className="text-2xl font-bold text-green-700">
              ${averagePerDay.toFixed(2)}
            </p>
            <p className="text-sm text-green-600 mt-1">
              per day ({daysInMonth} days)
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {totalSpent > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Monthly Spending Progress</span>
            <span>${totalSpent.toLocaleString()} / ${(totalSpent * 1.2).toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((totalSpent / (totalSpent * 1.2)) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlySummary;
